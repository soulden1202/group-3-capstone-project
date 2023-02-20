import React from "react";
import { PropertyCard } from "./PropertyCard";

const Property = () => {
  const testobj = [
    { address: "abc", id: 1 },
    { address: "abc", id: 2 },
    { address: "abc", id: 3 },
    { address: "abc", id: 4 },
  ];

  return (
    <div className="flex flex-col fixed w-full h-full ">
      <div>Search Bar</div>
      <div className="flex md:flex-row flex-col w-full h-full ">
        <div className="flex w-full md:w-[40%] h-full flex-col">
          {testobj.map((value, key) => (
            <PropertyCard propId={value.id} />
          ))}
        </div>
        <div className="w-[0%] md:w-[60%] md:flex hidden h-full justify-center items-center">
          Map display
        </div>
      </div>
    </div>
  );
};

export default Property;
