import { useState, useEffect } from "react";

interface PropertyDate {
  date: string; // 'YYYY-MM-DD' format
  price: number; // Surge price for the day
}

interface PriceCalculatorProps {
  startDate: any;
  endDate: any;
  normalFare: number; // Normal price for each day
  propertyDates: PropertyDate[]; // Array of property dates with surged prices
  setSurgedPrice: any;
  convenienceFee?: any;
  gst?: any;
  propertyType?: any;
  daysToStay?: any;
  workStation?: any;
  setWorkationDiscount?: any;
  guestChildrenInputValue?: number;
  childrenPricePerHead?: number;
  extraGuestPrice?: any;
  extraGuest?: any;
  totalPrice?: any;
  setTotalPrice?: any;

}

const PriceCalculator = ({
  startDate,
  endDate,
  normalFare,
  propertyDates,
  setSurgedPrice,
  convenienceFee, 
  gst,
  daysToStay,
  propertyType,
  workStation,
  setWorkationDiscount,
  extraGuestPrice, extraGuest,
  totalPrice, setTotalPrice,
  guestChildrenInputValue,
  childrenPricePerHead  
}: PriceCalculatorProps) => {
  // const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      const currentDate = new Date(startDate);

      // Loop through each day from startDate to endDate
      while (currentDate.getTime() < new Date(endDate).getTime()) {
        const currentDateStr = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

        // Check if the current date is in the propertyDates array
        const surgeDate = propertyDates.find((item) => item.date === currentDateStr);

        // If the date is found, apply the surged price
        if (surgeDate) {
          const surgedPrice = normalFare + ((surgeDate?.price / 100) * normalFare);
          total += surgedPrice;
        } else {
          total += normalFare; // Else, use the normal fare
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if(extraGuest > 0){
        const extraGuestFee = (extraGuest * extraGuestPrice)
        console.log("extrea gesut fee::" , extraGuestFee)
        total += extraGuestFee
      }
      if (guestChildrenInputValue && childrenPricePerHead) {
          const childFee = guestChildrenInputValue * childrenPricePerHead;
          total += childFee;
        }

      // if(propertyType === 'Workstation'){
      //   for(const item of workStation){
      //     if(item?.days === daysToStay){
      //       setWorkationDiscount(item?.discount)
      //       const discountPrice = total * ((item?.discount)/100)
      //       total = total - discountPrice
      //     }
      //   }
      // }

      // Workstation discount
    // if (propertyType === 'Workstation' && Array.isArray(workStation)) {
    //   const matched = workStation.find((item: any) => item?.days === daysToStay);
    //   if (matched?.discount) {
    //     const discountValue = matched.discount;
    //     setWorkationDiscount(discountValue); // Update external state
    //     total -= total * (discountValue / 100);
    //   } else {
    //     setWorkationDiscount(0); // Reset if no match
    //   }
    // }

    if (propertyType === 'Workstation' && Array.isArray(workStation)) {
      // Get all discount tiers that apply
      const validTiers = workStation
        .filter((item: any) => item.days <= daysToStay)
        .sort((a: any, b: any) => b.days - a.days); // Sort descending by days
    
      if (validTiers.length > 0) {
        const bestTier = validTiers[0]; // Highest applicable discount
        const discountValue = bestTier.discount;
        setWorkationDiscount(discountValue); // Update external state
        total -= total * (discountValue / 100);
       
      } else {
        setWorkationDiscount(0); // No discount applies
      }
    }
    
   
        
      setSurgedPrice(total);

      // applying convenienceFee and gst 
      total = total + ((convenienceFee/100) * total)
      total = total + ((gst/100) * total)

      setTotalPrice(Math.round(total)); // Set the total price after calculating
    };

    calculateTotalPrice();
  }, [startDate,endDate,normalFare,propertyDates,setSurgedPrice,convenienceFee,gst,daysToStay,propertyType,workStation,setWorkationDiscount,extraGuestPrice, extraGuest, guestChildrenInputValue, childrenPricePerHead, totalPrice, setTotalPrice]); // Added surgedPrice to dependencies

  return <p>{totalPrice.toFixed(0)}</p>;
};

export default PriceCalculator;