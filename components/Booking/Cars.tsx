"use client"

import { cars } from '@/utils/constants'
import { useDirectionData } from '@/utils/context/useDirectionData'
import Image from 'next/image'
import { useState } from 'react'

const Cars = () => {

    const [carChoice, setCarChoice] = useState(1)

    const { directionData } = useDirectionData()

    const getCost = (charges: number) => {

        return (charges * directionData.routes[0].distance * 0.00211).toFixed(2)
    }

  return (
    <div className='mt-5 flex flex-col gap-5'>
        <h2 className='font-bold'> Selecione o carro </h2>
        <div 
            className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center'
        >
            {cars.map(car => (
                <div 
                    key={car.id}
                    className={`flex flex-col gap-2 items-center justify-center w-full min-h-20 p-2 border rounded-md cursor-pointer ${carChoice === car.id + 1 ? 'border-orange-500 border-[2px]' : ''} hover:border-orange-500 hover:border-[2px] transition-all`}
                    onClick={() => setCarChoice(car.id + 1)}
                >
                    <Image 
                        src={car.imageUrl}
                        alt={car.name}
                        width={90}
                        height={60}
                        className="object-contain"
                    />
                    <div
                        className='flex justify-center gap-2 sm:justify-between items-center flex-wrap w-full text-[12px]'
                    >
                        <span className='font-semibold'> { car.name} </span>
                        {directionData !== null && directionData.routes ? (
                            <span> { getCost(car.charges) } $ </span>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cars