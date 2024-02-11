"use client"

import Image from "next/image"
import { useState } from "react"
import { paymentMode } from "../utils/constants"

const PaymentsMode = () => {

    const [methodSelected, setMethodSelected] = useState(1)

  return (
    <div className="mt-5 flex flex-col gap-5">
        <h3 className="font-semibold"> Payments Methods </h3>
        <div
            className="grid grid-cols-6 items-center justify-center gap-3"
        >
            {paymentMode.map(mode => (
                <div 
                    key={mode.id}
                    className={`flex flex-col items-center justify-between border py-1 px-2 cursor-pointer rounded-md ${methodSelected === mode.id + 1 ? 'border-orange-500' : null} transition-all`}
                    onClick={() => setMethodSelected(mode.id + 1)}
                    title={mode.name}
                >
                    <Image 
                        src={mode.imageUrl}
                        alt={mode.name}
                        width={35}
                        height={35}
                        className="object-contain aspect-square"
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default PaymentsMode