import Image from "next/image";
import Link from "next/link";
import { BsMoonFill } from "react-icons/bs";

export default function Header() {
  return (
    <header className="">
      <Image
        src="/bg-pattern-header.svg"
        alt="bg pattern header"
        className="w-full"
        width={1440}
        height={162}
      />

      <div className="relative -top-9 max-w-xs md:max-w-2xl md:-top-20 lg:max-w-6xl lg:-top-28 mx-auto flex justify-between items-center text-white">
        <Link href="/">
          <h1 className="text-sm md:text-2xl font-bold">devjobs</h1>
        </Link>
        <BsMoonFill className="text-sm md:text-xl" />
      </div>
    </header>
  );
}
