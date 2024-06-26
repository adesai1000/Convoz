import React, { useState, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { RiHome7Line, RiMessageLine } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { RiVipCrownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ username }) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [searchQuery, setSearchQuery] = useState("");

  const Logout = () => {
    removeCookie("token");
    localStorage.removeItem("currentUser");
    toast.success("Signed Out!");
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/home");
  };
  const handleMessenger = () => {
    navigate("/messenger");
  };
  const vip = () => {
    navigate("/vip")
  }
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <header className="bg-black border-b-2 border-slate-600">
      <div className="flex justify-between items-center max-w-4xl mx-auto p-3">
        <h1 className="font-bold text-2xl sm:text-4xl flex-wrap">
          <span
            className="text-[#1976D2] hover:text-[#1976d2e2] cursor-pointer "
            onClick={handleHome}
          >
            Convoz
          </span>
        </h1>
        <form
          className="border-2 border-slate-600 p-2 rounded flex items-center text-white focus:border-[#1976D2]"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        <div className="flex gap-8 items-center">
          <ul className="flex gap-8 items-center">
            <li className="text-white cursor-pointer" onClick={handleHome}>
              <RiHome7Line size="1.6rem" />
            </li>
            <li className="text-white cursor-pointer" onClick={handleMessenger}>
              <RiMessageLine size="1.6rem" />
            </li>
          </ul>
          <div className="flex gap-8 items-center">
            <Menu as="div" className="relative">
              <Menu.Button className=" overflow-hidden relative flex rounded-full bg-[#E8E8E8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:ring-offset-1 focus:ring-offset-white">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-7 w-7 rounded-full overflow-hidden"
                  src={`https://robohash.org/${username}`}
                  alt={username}
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10  w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 border-2 border-slate-600 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active ? "bg-[#1976D2] justify-center" : "bg-black",
                          " px-4 py-2 text-xl border-b-2 border-slate-600 font-bold text-white cursor-pointer flex flex-row items-center"
                        )}
                        onClick={handleProfile}
                      >
                        <CgProfile className="mr-2" /> Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={vip}
                        className={classNames(
                          active ? "bg-[#093726] justify-center" : "bg-black",
                          "border-b-2 border-slate-600 px-4 py-2 text-xl font-bold  cursor-pointer flex flex-row items-center text-[#eab308]"
                        )}
                      >
                        <RiVipCrownLine className="mr-2 text-[#eab308]" /> VIP <RiVipCrownLine className="ml-2 text-[#eab308]" />
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={Logout}
                        className={classNames(
                          active ? "bg-[#1976D2] justify-center" : "bg-black",
                          "px-4 py-2 text-xl font-bold text-white cursor-pointer flex flex-row items-center"
                        )}
                      >
                        <VscSignOut className="mr-2" /> Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
