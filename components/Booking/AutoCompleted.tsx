"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { UserLocationProps } from "@/utils/types";
import { useAddressFromCoordinates } from "@/utils/context/useAddressFromCoordinates";
import { useAddressDestinationCoordinates } from "@/utils/context/useAddressDestinationCoordinates";

type InputProps = {
  destination: string;
  from: string;
};
type ChangeInputProps = {
  destination: boolean;
  from: boolean;
};


//Constants Url fetch adress
const Base_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/"
const session_token = "0b592197-0a02-446b-9f12-48a3cf2c8495"

const AutoCompleted = () => {
  const [input, setInput] = useState<InputProps>({
    destination: "",
    from: "",
  });

  const [changeInput, setChangeInput] = useState<ChangeInputProps>({
    destination: false,
    from: false,
  });
  const [adressList, setAdressList] = useState<any>([]);

  const { setFromAddressCoordinates} = useAddressFromCoordinates()
  const { setDestinationAddressCoordinates} = useAddressDestinationCoordinates()


  useEffect(() => {
    const timeOut = setTimeout(() => {
      getAdressList();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [input.destination, input.from]);

  const getAdressList = async () => {
    setAdressList([]);
    const query = changeInput.from ? input.from : input.destination;

    const res = await fetch(`/api/search-adress?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setAdressList(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    if (e.target.id === "from") {
      setChangeInput({
        destination: false,
        from: true,
      });
    } else {
      setChangeInput({
        destination: true,
        from: false,
      });
    }
  };

  const getCoordonateData = async (id: string): Promise<UserLocationProps | null> => {
    const res = await fetch(`${Base_URL}${id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);

    const result = await res.json()

    if(!result){
      return null
    }

    return {
      longitude: result.features[0].geometry.coordinates[0],
      latitude: result.features[0].geometry.coordinates[1]
    }
  }


  const onAddressFromClick = async (item: any) => {
    setInput(prev => ({
      ...prev,
      from: item.full_address,
    }));
    setAdressList([]);
    setChangeInput((prev) => ({
      ...prev,
      from: false,
    }));

    const fetchData = await getCoordonateData(item.mapbox_id)

    if(fetchData !== null){
      setFromAddressCoordinates({
        longitude: fetchData.longitude,
        latitude: fetchData.latitude,
      })
    }
  }

  const onAddressDestinationClick = async (item: any) => {
    setInput((prev) => ({
      ...prev,
      destination: item.full_address,
    }));
    setAdressList([]);
    setChangeInput((prev) => ({
      ...prev,
      destination: false,
    }));

    const fetchData = await getCoordonateData(item.mapbox_id)

    if(fetchData !== null){
      setDestinationAddressCoordinates({
        longitude: fetchData.longitude,
        latitude: fetchData.latitude,
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 rounded-md">
      <div className="relative flex flex-col gap-3">
        <i className="font-semibold text-sm"> Valid only with US addresses. </i>
        <label>From </label>
        <input
          type="text"
          id="from"
          className="bg-transparent px-3 py-1 border rounded-md outline-none focus:border-orange-600 focus:border-[1px] w-full"
          value={input.from}
          onChange={(e) => handleChange(e)}
          
        />

        {adressList?.suggestions && changeInput.from ? (
          <ul className="absolute w-full bg-white shadow-md rounded-md top-full z-10">
            {adressList.suggestions?.map((item: any, index: number) => (
              <li
                key={index}
                className="text-black hover:bg-gray-200 cursor-pointer p-2"
                onClick={() => onAddressFromClick(item)}
              >
                {item.full_address}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative flex flex-col gap-3">
        <label> To </label>
        <input
          type="text"
          id="destination"
          className="bg-transparent px-3 py-1 border rounded-md outline-none focus:border-orange-600 focus:border-[1px] w-full"
          value={input.destination}
          onChange={(e) => handleChange(e)}
        />

        {adressList?.suggestions && changeInput.destination ? (
          <ul className="absolute w-full bg-white shadow-md rounded-md top-full z-10">
            {adressList.suggestions?.map((item: any, index: number) => (
              <li
                key={index}
                className="text-black hover:bg-gray-200 cursor-pointer p-2"
                onClick={() => onAddressDestinationClick(item)}
              >
                {item.full_address}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleted;
