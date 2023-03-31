import React, { useState } from "react";

import {
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsHouseAdd, BsHouseGear } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAttachMoney } from "react-icons/md";
const Sidenav = ({
  accountType,
  onAccountPage,
  onAddPropertyPage,
  onPropretyPage,
  onWatchingListPage,
  onSubscriptionPage,
}) => {
  const [isMinimized, setisMinimized] = useState(false);

  return (
    <div
      className={`fixed flex flex-col left-0 ${
        isMinimized ? "w-10" : "w-64"
      } bg-gray-100 border-t-2  h-full border-r transition z-10 `}
    >
      {!isMinimized ? (
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8 justify-between">
                <div className="text-sm font-light tracking-wide text-gray-500 cursor-default">
                  Menu
                </div>
                <button onClick={() => setisMinimized(true)}>
                  <AiOutlineClose></AiOutlineClose>
                </button>
              </div>
            </li>
            <li>
              <div
                onClick={onAccountPage}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <div>
                    <AiOutlineUser></AiOutlineUser>
                  </div>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Account
                </span>
              </div>
            </li>
            {(accountType === "Property Owner" || accountType === "Both") && (
              <>
                <li>
                  <div
                    onClick={onAddPropertyPage}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <div>
                        <BsHouseAdd></BsHouseAdd>
                      </div>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate ">
                      Add Property
                    </span>
                    {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                  </div>
                </li>
                <li>
                  <div
                    onClick={onPropretyPage}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <div>
                        <BsHouseGear></BsHouseGear>
                      </div>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Manage Properties
                    </span>
                    {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                  </div>
                </li>
              </>
            )}
            {(accountType === "Renter" || accountType === "Both") && (
              <li>
                <div
                  onClick={onWatchingListPage}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <div>
                      <AiOutlineUnorderedList></AiOutlineUnorderedList>
                    </div>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Watching List
                  </span>
                  {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                </div>
              </li>
            )}
            <li>
              <div
                onClick={onSubscriptionPage}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <div>
                    <MdAttachMoney></MdAttachMoney>
                  </div>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Subscription
                </span>
                {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="ml-3">
              <div className="flex flex-row items-center h-8">
                <button onClick={() => setisMinimized(false)}>
                  <RxHamburgerMenu></RxHamburgerMenu>
                </button>
              </div>
            </li>
            <li>
              <div
                onClick={onAccountPage}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
              >
                <span className="inline-flex justify-center items-center ml-2">
                  <div>
                    <AiOutlineUser></AiOutlineUser>
                  </div>
                </span>
              </div>
            </li>
            {accountType === "Property Owner" && (
              <>
                <li>
                  <div
                    onClick={onAddPropertyPage}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center ml-2">
                      <div>
                        <BsHouseAdd></BsHouseAdd>
                      </div>
                    </span>

                    {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                  </div>
                </li>
                <li>
                  <div
                    onClick={onPropretyPage}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center ml-2">
                      <div>
                        <BsHouseGear></BsHouseGear>
                      </div>
                    </span>

                    {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                  </div>
                </li>
              </>
            )}
            {(accountType === "Renter" || accountType === "Both") && (
              <li>
                <div
                  onClick={onWatchingListPage}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    <div>
                      <AiOutlineUnorderedList></AiOutlineUnorderedList>
                    </div>
                  </span>
                  {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
                </div>
              </li>
            )}
            <li>
              <div
                onClick={onSubscriptionPage}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
              >
                <span className="inline-flex justify-center items-center ml-2">
                  <div>
                    <MdAttachMoney></MdAttachMoney>
                  </div>
                </span>

                {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span> */}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidenav;
