import React from "react";
import logo from "../../../public/images/logo.webp";
import Image from "next/image";
import { FaBookBookmark, FaBookOpenReader, FaBook } from "react-icons/fa6";
import { GrTest } from "react-icons/gr";
import Link from "next/link";

export const MainLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-gray-900 flex text-white">
      <nav className="w-[5%] h-[100vh]  flex flex-col border-r-2 border-gray-800">
        <div className="flex flex-col items-center justify-center mb-4">
          <span className="border border-gray-700 rounded-md w-full h-[50px]">
            <Image
              src={logo}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </span>
        </div>
        <div className="flex flex-col items-center py-5 gap-4">
          <Link href={"/"} className="cursor-pointer" title="Dicctionary">
            <FaBookBookmark className="text-purple-500 text-3xl" />
          </Link>
          <Link href={"/"} className="cursor-pointer" title="Dicctionary">
            <FaBook className="text-yellow-500 text-3xl" />
          </Link>
          <Link href={"/exams"} className="cursor-pointer" title="Dicctionary">
            <GrTest className="text-amber-500 text-3xl" />
          </Link>
          <Link href={"/"} className="cursor-pointer" title="Dicctionary">
            <FaBookOpenReader className="text-orange-500 text-3xl" />
          </Link>
        </div>
      </nav>
      <section className="w-[95%]  h-[100vh] p-4">{children}</section>
    </div>
  );
};
