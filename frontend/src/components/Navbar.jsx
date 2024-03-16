import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-[#ddc28f]">
      <div className="max-w-[1280px] flex mx-auto justify-between items-center py-5 px-3">
        <h1 className="md:text-3xl text-2xl">QuickAPI</h1>
        <Link href={"https://github.com/enggsatyamraj"} target="_blank">
          <FaGithub size={30}/>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
