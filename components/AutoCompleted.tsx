"use client";

import { ChangeEvent, useEffect, useState } from "react";

type InputProps = {
  destination: string;
  from: string;
};
type ChangeInputProps = {
  destination: boolean;
  from: boolean;
};
type DataApiReceived = {
  full_adress: string;
};

const AutoCompleted = () => {
  const [input, setInput] = useState<InputProps>({
    destination: "",
    from: "",
  });

  const [changeInput, setChangeInput] = useState<ChangeInputProps>({
    destination: false,
    from: false,
  });
  const [adressList, setAdressList] = useState([]);

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

  return (
    <div className="flex flex-col gap-4 border p-6 rounded-md h-[70vh]">
      <div className="relative flex flex-col gap-3">
        <label>Partida </label>
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
                onClick={() => {
                  setInput(prev => ({
                    ...prev,
                    from: item.full_address,
                  }));
                  setAdressList([]);
                  setChangeInput((prev) => ({
                    ...prev,
                    from: false,
                  }));
                }}
              >
                {item.full_address}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative flex flex-col gap-3">
        <label>Destino </label>
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
                onClick={() => {
                  setInput((prev) => ({
                    ...prev,
                    destination: item.full_address,
                  }));
                  setAdressList([]);
                  setChangeInput((prev) => ({
                    ...prev,
                    destination: false,
                  }));
                }}
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
