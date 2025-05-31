// import React, { FC } from "react";
// import LocationInput from "../LocationInput";
// import GuestsInput from "../GuestsInput";
// import StayDatesRangeInput from "./StayDatesRangeInput";
// import { StaySearchFormFields } from "../../type";

// export interface StaySearchFormProps {
//   defaultFieldFocus?: StaySearchFormFields;
// }

// const StaySearchForm: FC<StaySearchFormProps> = ({ defaultFieldFocus }) => {
//   const renderForm = () => {
//     return (
//       <form className="w-[85%] relative flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
//         <LocationInput
//           // onInputDone={() => setDateFocused("startDate")}
//           className="flex-[1.5]"
//           autoFocus={defaultFieldFocus === "location"}
//         />
//         <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
//         <StayDatesRangeInput className="flex-[1.2]" />

//         <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
//         <GuestsInput
//           className="flex-1"
//           autoFocus={defaultFieldFocus === "guests"}
//           submitLink="/listing-stay"
//         />
//       </form>
//     );
//   };

//   return renderForm();
// };

// export default StaySearchForm;



import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { StaySearchFormFields } from "../../type";
import ButtonSubmit from "../ButtonSubmit";
import axios from "axios";

export interface StaySearchFormProps {
  defaultFieldFocus?: StaySearchFormFields;
}

const StaySearchForm: FC<StaySearchFormProps> = ({ defaultFieldFocus }) => {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
   const [featuredPlaces, setFeaturedPlaces] = useState([])
  const [guests, setGuests] = useState<{ adults: number; children: number; infants: number }>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formatDate = (date: Date | null): string | null => {
      return date ? date.toISOString().split("T")[0] : null;
    };
  
    const formData = {
      location,
      checkin: formatDate(startDate),
      checkout: formatDate(endDate),
      guest: guests.adults + guests.children + guests.infants,
    };
  
    console.log("Search Form Data:", formData);
  
    try {
      const res = await axios.post(
        "https://homestay.kliffhost.in/api/homesearch",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
          },
        }
      );
      setFeaturedPlaces(res.data.data)
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[85%] relative flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
    >
      <LocationInput
        className="flex-[1.5]"
        autoFocus={defaultFieldFocus === "location"}
        value={location}
        onChange={setLocation}
      />

      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

      <StayDatesRangeInput
        className="flex-[1.2]"
        startDate={startDate}
        endDate={endDate}
        onChangeDate={handleDateChange}
      />


      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

      <GuestsInput
        className="flex-1"
        autoFocus={defaultFieldFocus === "guests"}
        value={guests}
        onChange={setGuests}
        submitLink="/" 
      />
      <div className="pr-2 m-2">
          <ButtonSubmit />
        </div>
    </form>
  );
};

export default StaySearchForm;



