import React from "react";
import { useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="mt-4 h-[70px] flex justify-end items-center bg-[#fffcfb]">
      <div className="flex items-center justify-between gap-4 p-[15px_48px] bg-[#fffcfb] mr-32 shadow-sm rounded-md">
        <LuUser className="text-lg mr-2 w-6 h-6" />
        <div className="text-sm text-black">
          {user ? user.email : "Guest"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
