"use client"

import AutoCompleted from "./AutoCompleted"

const Booking = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
        <h2 className="text-xl md:text-2xl font-semibold">
            Escolher destino
        </h2>
        <AutoCompleted />
    </div>
  )
}

export default Booking