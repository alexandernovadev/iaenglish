import React from "react";
import NextLink from "next/link";

export const NavbarMain = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white">
      <div className="flex justify-between">
        <NextLink
          href="/mywords"
          className="w-full text-center py-2 hover:bg-gray-700"
        >
          WORDS
        </NextLink>
        <NextLink
          href="/"
          className="w-full text-center py-2 hover:bg-gray-700"
        >
          Story
        </NextLink>
        <NextLink
          href="/profile"
          className="w-full text-center py-2 hover:bg-gray-700"
        >
          PROfiles
        </NextLink>
      </div>
    </div>
  );
};
