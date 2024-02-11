"use client";

import AutoCompleted from "./AutoCompleted";
import Cars from "./Cars";
import PaymentsMode from "./PaymentsMode";

const Booking = () => {
  return (
    <div className="flex flex-col gap-6 p-6 border">
      <h1 className="text-xl md:text-2xl font-semibold">Escolher destino</h1>
      <div className="p-5 border rounded-md">
        <AutoCompleted />
        <Cars />
        <PaymentsMode />
        <button 
          className="mt-10 font-bold w-full py-2 px-3 rounded-md bg-[#ffa600]"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Booking;
