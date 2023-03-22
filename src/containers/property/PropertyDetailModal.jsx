import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import "./adjust.css";

export const PropertyDetailModal = ({ homeData, withId }) => {
  const [open, setopen] = useState(false);
  const [disable, setdisable] = useState(true);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id !== null) setdisable(false);
    if (user.id === null) setdisable(true);
  }, [user.id, disable]);

  let images = [];
  homeData.otherImages.forEach((image) => {
    images.push({
      original: image,
      thumbnail: image,
    });
  });

  return (
    <>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setopen(true)}
      >
        More Detail
      </button>
      {open === true && (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full">
          <div className="flex relative w-full h-full ">
            <div className="relative w-full bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900">
                  Details Information
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setopen(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="flex flex-col w-full h-full">
                <div className="w-full items-center">
                  <ImageGallery
                    classNames="w-full"
                    items={images}
                    showThumbnails={false}
                    showPlayButton={false}
                    showBullets={true}
                    showFullscreenButton={false}
                  ></ImageGallery>
                </div>
                <div className="flex flex-col w-full items-center">
                  <div className="flex flex-row space-x-5 items-center justify-center right-5 mt-[4%] w-ful">
                    {disable ? (
                      <>
                        <button
                          class="bg-gray-500  text-white font-bold py-2 px-4"
                          disabled={true}
                        >
                          Contact
                        </button>
                        <button
                          disabled={true}
                          class="bg-gray-500  text-white font-bold py-2 px-4"
                        >
                          Add to watch list
                        </button>
                      </>
                    ) : (
                      <>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                          Contact
                        </button>
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          Add to watch list
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-between items-center ml-[10%] mt-[2%] w-full lg:w-[30%] text-black ">
                    <div className="flex flex-col w-[50%] justify-center text-left">
                      <p>Address:</p>
                      <p>{homeData.address}</p>
                      <p>
                        {homeData.city}, {homeData.state}, {homeData.zipCode}
                      </p>
                    </div>
                    <div className="flex flex-col w-[50%] justify-center text-left">
                      <p>Number of Bedroom(s): {homeData.numberOfBedroom}</p>
                      <p>Number of Bathroom(s): {homeData.numberOfBathroom}</p>
                      <p>Year Built: {homeData.yearBuilt}</p>
                      <p>Acreage: {homeData.acreage}ft</p>
                      <p>Price: ${homeData.price}</p>
                    </div>
                  </div>
                  {withId === true ? (
                    <></>
                  ) : (
                    <>
                      {user.accountType === "Renter" && (
                        <div className="flex items-center">
                          <button
                            // disabled={!user.isSubscripted}
                            onClick={() =>
                              navigate(`/property/${homeData.accountId}`)
                            }
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                          >
                            See Listing From Same Owner
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
