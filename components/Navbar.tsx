"use client"

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4">
      <div 
        className="flex cursor-pointer md:hidden"      
      >
        <Menu 
          className="font-bold text-2xl"
          onClick={() => setOpenMenu(true)} 
        />
        <X 
          className={`absolute top-4 left-[40%] text-white text-3xl z-20 cursor-pointer md:hidden ${!openMenu ? 'hidden' : null}`} 
          onClick={() => setOpenMenu(false)}
        />
      </div>
      <div className="flex gap-12 items-center">
        <Link href="/">
          <Image
            src={"/assets/logo.png"}
            width={50}
            height={50}
            alt="Logo"
            className="object-contain "
          />
        </Link>
        <ul className={`absolute top-0 ${openMenu ? 'left-0' : '-left-full md:left-0'} w-1/2 h-full bg-[#ff9a04] py-24 z-10 md:z-0 md:py-0 md:bg-transparent md:w-auto md:h-auto md:relative flex gap-6 flex-col md:flex-row transition-all`}>
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/" className="block text-center md:flex">
                    Home
                </Link>
            </li>
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/" className="block text-center md:flex">
                    About us
                </Link>
            </li>
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/" className="block text-center md:flex">
                    Help
                </Link>
            </li>
        </ul>
      </div>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};

export default Navbar;
