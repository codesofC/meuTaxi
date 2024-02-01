import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-4">
      <div className="flex md:hidden">
        <Menu />
      </div>
      <div className="flex gap-12 items-center">
        <Link href="/">
          <Image
            src={"/assets/logo-taxi.png"}
            width={120}
            height={70}
            alt="Logo"
            className="object-contain "
          />
        </Link>
        <ul className="flex gap-6">
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/">
                    Início
                </Link>
            </li>
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/sobrenos">
                    Nossa historia
                </Link>
            </li>
            <li className="p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black">
                <Link href="/ajuda">
                    Ajuda
                </Link>
            </li>
        </ul>
      </div>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};

export default Navbar;
