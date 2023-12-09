import React from "react";
import NextLink from "next/link";
import { FaBook } from "react-icons/fa";
import { RiSpeakFill } from "react-icons/ri";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white overflow-hidden">
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex ">
          <div className="flex gap-4 justify-between p-4">
            <NextLink href="/dictionary" passHref>
              <FaBook style={{ fontSize: 32 }} />
            </NextLink>
            <NextLink href="/sounds" passHref>
              <RiSpeakFill style={{ fontSize: 32 }} />
            </NextLink>
          </div>
        </div>
        <div className="flex overflow-auto p-2 bg-slate-800 pb-16 pt-8 h-full">{children}</div>
      </div>
    </div>
  );
};
