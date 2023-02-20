import React from "react";
import img from "../../../src/assets/img1.jpg";
import { PropertyDetailModal } from "./PropertyDetailModal";

export const PropertyCard = ({ propId }) =>
  //   propertyId,
  //   address,
  //   numOfBedroom,
  //   numOfBathRoom,
  //   acreage,
  //   yearBuilt

  {
    return (
      <div className="flex w-full h-[20%] border-[1px] border-blue-400 mt-1 ml-1 rounded-md flex-row hover:border-blue-600 hover:border-2">
        <div className="flex w-[30%] h-full mr-1 object-cover items-center justify-center bg-gray-100">
          <img src={img} alt="Home" />
        </div>
        <div className="flex w-[70%] flex-row">
          <div className="flex w-[80%] flex-col ">
            <div>123 King raoad, PA,14444</div>
            <div>Bedroom(s): 2</div>
            <div>Bathroom(s): 1</div>
            <div>Year Built: 1990</div>
            <div>1920ft</div>
            <div className="md:hidden flex text-blue-700">Display on Map</div>
          </div>
          <div className="flex w-[20%] flex-col mr-3">
            <div className="flex w-full h-full items-center justify-end">
              <PropertyDetailModal propId={propId}></PropertyDetailModal>
            </div>
          </div>
        </div>
      </div>
    );
  };
