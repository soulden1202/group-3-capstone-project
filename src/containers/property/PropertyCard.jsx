import React from "react";
import { PropertyDetailModal } from "./PropertyDetailModal";

export const PropertyCard = ({
  homeData,
  onCardSelected,
  withId = false,
  position,
}) =>
  //   propertyId,
  //   address,
  //   numOfBedroom,
  //   numOfBathRoom,
  //   acreage,
  //   yearBuilt

  {
    return (
      <div
        className="flex w-full h-auto border-[1px] border-blue-400 mt-1 ml-1 rounded-md flex-row hover:border-blue-600 hover:border-2"
        onClick={() =>
          onCardSelected(
            homeData.address,
            homeData.city,
            homeData.state,
            homeData.zipCode
          )
        }
      >
        <div className="flex w-[40%] h-full mr-1 object-fill items-center justify-center bg-gray-100">
          <img className="h-auto w-auto" src={homeData.coverImage} alt="Home" />
        </div>
        <div className="flex w-[70%] flex-row">
          <div className="flex w-[80%] flex-col ">
            <div>
              {homeData.address}, {homeData.city},{" "}
              {homeData.state.toUpperCase()}, {homeData.zipCode}
            </div>
            <div>Bedroom(s): {homeData.numberOfBedroom}</div>
            <div>Bathroom(s): {homeData.numberOfBathroom}</div>
            <div>${homeData.price}/month</div>

            {withId === true ? (
              <></>
            ) : (
              <a
                className="md:hidden flex hover:text-blue-700 text-blue-500"
                href={`https://maps.google.com/?q=${position?.lat},${position?.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Display on Map
              </a>
            )}
          </div>
          <div className="flex w-[20%] flex-col mr-3">
            <div className="flex w-full h-full items-center justify-end">
              <PropertyDetailModal
                homeData={homeData}
                withId={withId}
              ></PropertyDetailModal>
            </div>
          </div>
        </div>
      </div>
    );
  };
