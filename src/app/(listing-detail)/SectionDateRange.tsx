import React, { FC, Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";


export interface SectionDateRangeProps {
  propertyDates?: any;
  previousPrice?: number; // Default price if date doesn't match
  setDaysToStay?: any,
  startDate?: any,
  setStartDate?: any,
  endDate?: any,
  setEndDate?: any,
  setRoomPrice?: any,
}

const SectionDateRange: FC<SectionDateRangeProps> = ({ setRoomPrice, propertyDates, previousPrice, setDaysToStay, startDate, setStartDate, endDate, setEndDate }) => {
  // const [startDate, setStartDate] = useState<Date | null>(
  //   new Date("2023/02/06")
  // );
  // const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  // const onChangeDate = (dates: [Date | null, Date | null]) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  // const [startDate, setStartDate] = useState<Date | null>(
  //     new Date(),
  //   )
  //   // const [endDate, setEndDate] = useState<Date | null>(new Date())
  //   const [endDate, setEndDate] = useState<Date | null>(() => {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + 1);
  //     return tomorrow;
  //     });


  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  useEffect(() => {
    if (startDate && endDate) {
      // Convert startDate and endDate to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if the dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert('Invalid date format');
        return;
      }

      // Calculate the difference in milliseconds
      const differenceInTime = end.getTime() - start.getTime();

      // Convert milliseconds to days
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      // Update the state with the calculated number of days
      setDaysToStay(differenceInDays);
    }
  }, [startDate,endDate]);

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          {/* <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            // renderDayContents={(day, date) => (
            //   <DatePickerCustomDay dayOfMonth={day} date={date} />
            // )}
            renderDayContents={(day: any, date: any) => {
              // Convert the date to UTC to prevent timezone shifts
              const utcDate = new Date(date);
              utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset()); // Adjust to UTC
              const dateStr = utcDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

              const property = propertyDates?.find((item: any) => item.date === dateStr);
              // const price = property ? property.price : previousPrice;
              const price =
                previousPrice !== undefined
                  ? property
                    ? previousPrice + (property.price / 100) * previousPrice
                    : previousPrice
                  : null;
              // setRoomPrice(price)

              return (
                <div className="date-cell">
                  <DatePickerCustomDay dayOfMonth={day} date={date} />
                  {price !== null && (
                    <div className="property-price text-[10px] text-gray-500">
                      ₹{price}
                    </div>
                  )}
                </div>
              );
            }}
          /> */}

          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            minDate={new Date()} // 🚫 Prevent past date selection
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day: any, date: any) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Normalize time

              const currentDate = new Date(date);
              currentDate.setHours(0, 0, 0, 0); // Normalize time

              const isPast = currentDate < today;

              // Convert to UTC string to match propertyDates format
              const utcDate = new Date(date);
              utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
              const dateStr = utcDate.toISOString().split("T")[0];

              const property = propertyDates?.find((item: any) => item.date === dateStr);

              const price =
                previousPrice !== undefined
                  ? property
                    ? previousPrice + (property.price / 100) * previousPrice
                    : previousPrice
                  : null;

              return (
                <div className={`date-cell ${isPast ? 'pointer-events-none opacity-40' : ''}`}>
                  <div className={`text-sm ${isPast ? 'line-through text-red-400' : ''}`}>
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  </div>
                  {price !== null && (
                    <div className="property-price text-[10px] text-gray-500">
                      ₹{price}
                    </div>
                  )}
                </div>
              );
            }}
          />

        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
