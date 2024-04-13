import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoPeopleSharp } from "react-icons/io5";
import { GiPositionMarker } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { GiStaticGuard } from "react-icons/gi";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from 'next/link';

const Sidebar = () => {

  const menus = [
    { name: "Home", link: "/dashboard", icon: FaHome },
    { name: "People", link: "/people", icon: IoPeopleSharp },
    { name: "Stations", link: "/stations", icon: GiPositionMarker },
    { name: "Generate List", link: "/generate", icon: IoIosCreate },
    { name: "Logout", link: "/", icon: RiLogoutBoxFill },
  ];
  const [open, setOpen] = useState(true);

  const [openSidebarWidth, setOpenSidebarWidth] = useState("w-72");

  useEffect(() => {
    const handleResize = () => {
      let screenWidth = window.innerWidth;
      if (screenWidth > 1000) setOpenSidebarWidth("w-72");
      else setOpenSidebarWidth("w-42");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex">
      <div className={`bg-gray-700 min-h-screen ${open ? openSidebarWidth : "w-16"} duration-500 px-4`}>
        <div className="py-3 flex justify-end text-gray-100">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <div className="flex gap-4 relative flex-row font-bold text-3xl font-serif items-center text-gray-100">
            <GiStaticGuard size={50} className="cursor-pointer" />
            iGuard
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4 relative text-gray-100">
          {menus?.map((menu, i) => 
            (
            <Link
              href={menu?.link}
              key={i}
              className="mt-5 group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
