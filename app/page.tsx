import { Booking } from "@/components"
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="">
          <Booking />
        </div>
        <div className="col-span-2 bg-red-200 order-first md:order-last">
          Map
        </div>
      </div>
    </main>
  );
}
