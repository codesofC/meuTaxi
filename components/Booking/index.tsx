"use client";

import { useDirectionData } from "@/utils/context/useDirectionData";
import AutoCompleted from "./AutoCompleted";
import Cars from "./Cars";
import PaymentsMode from "./PaymentsMode";

const Booking = () => {

  const { directionData } = useDirectionData()

  return (
    <div className="flex flex-col gap-6 p-6 border">
      <h1 className="text-xl md:text-2xl font-semibold">Choose destination</h1>
      <h4 className="font-semibold text-sm"> Valid only with US addresses. </h4>
      <div className="p-5 border rounded-md">
        <AutoCompleted />
        <Cars />
        <PaymentsMode />
        <button 
          className={`mt-10 font-bold w-full py-2 px-3 rounded-md bg-[#ff9a04] ${!directionData?.routes ? 'bg-gray-200' : 'cursor-pointer'}`}
          disabled={!directionData?.routes}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
