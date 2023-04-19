import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateWatchList } from "../login/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./adjust.css";

export const PropertyDetailModal = ({
  homeData,
  withId,
  fromWatchList = false,
  watchListData,
  setwatchListData,
}) => {
  const [open, setopen] = useState(false);
  const [disable, setdisable] = useState(true);
  const navigate = useNavigate();

  const [isInWatchList, setisInWatchList] = useState(false);

  const dispatch = useDispatch();

  const url =
    "https://studentrentapi20230411081843.azurewebsites.net/api/Property/WatchList";

  const user = useSelector((state) => state.user);
  const isPremium = usePremiumStatus(user);

  const templateSubject = `Inquiry About Rental Property`;
  const templateBody = `
Dear [Landlord/Property Manager],

I hope this email finds you well. I am writing to express my interest in renting the property located at ${
    homeData.address +
    ", " +
    homeData.city +
    ", " +
    homeData.state +
    ", " +
    homeData.zipCode
  }. I came across this property on https://livin-it.netlify.app/ and was impressed by its features.

If it's possible, could you please let me know the availability of the property and arrange a time for me to view it? Additionally, I would like to know more about the rental terms, such as the rent price, deposit, lease term, and any other necessary details.

Thank you for your time and consideration, and I look forward to hearing back from you soon.

Best regards,

${user.firstName + " " + user.lastName}
`;

  const formattedTemplateBody = templateBody.replace(/\n/g, "%0D%0A");

  useEffect(() => {
    if (user.id !== null) setdisable(false);
    if (user.id === null) setdisable(true);
    if (user.watchList) {
      if (user.watchList.includes(homeData.propertyId)) {
        setisInWatchList(true);
      } else {
        setisInWatchList(false);
      }
    } else {
      setisInWatchList(false);
    }
    // eslint-disable-next-line
  }, [user.id, disable, user.watchList]);

  let images = [];
  homeData.otherImages.forEach((image) => {
    images.push({
      original: image,
      thumbnail: image,
    });
  });

  const handleAddToWatchList = async () => {
    await axios({
      method: "post",
      url: url,
      headers: {},
      data: {
        accountId: user.id,
        propertyId: homeData.propertyId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          let data = [];
          data = data.concat(user.watchList);

          data.push(homeData.propertyId);

          dispatch(
            updateWatchList({
              watchList: data,
            })
          );
        }
        toast.success("Added to watch list!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("Add to watch list failed", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleRemoveFromWatchList = async () => {
    await axios({
      method: "post",
      url: url,
      headers: {},
      data: {
        accountId: user.id,
        propertyId: homeData.propertyId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          let data = [];

          data = data.concat(user.watchList);

          data = data.filter((id) => id !== homeData.propertyId);

          dispatch(
            updateWatchList({
              watchList: data,
            })
          );
        }
        if (fromWatchList) {
          const homeFiltered = watchListData.filter(
            (item) => item.propertyId !== homeData.propertyId
          );
          setwatchListData(homeFiltered);
          setopen(false);
        }
        toast.success("Removed from watch list!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove from watch list", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

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
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden inset-0 h-full">
          <div className="flex relative w-full h-full ">
            <div className="relative w-full bg-white rounded-lg shadow h-full overflow-y-scroll ">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mt-20">
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
                      <></>
                    ) : (
                      <>
                        {(isPremium && user.accountType === "Renter") ||
                        (isPremium && user.accountType === "Both") ? (
                          <>
                            <button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                              onClick={() =>
                                window.open(
                                  `mailto:${homeData.email}?subject=${templateSubject}&body=${formattedTemplateBody}`
                                )
                              }
                            >
                              Contact
                            </button>

                            {isInWatchList ? (
                              <button
                                onClick={() => handleRemoveFromWatchList()}
                                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                              >
                                Remove from watch list
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAddToWatchList()}
                                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                              >
                                Add to watch list
                              </button>
                            )}
                            <ToastContainer></ToastContainer>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                toast.warn(
                                  "You need correct account type and subscription to use this feature.",
                                  {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  }
                                )
                              }
                              class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                            >
                              Contact
                            </button>
                            <button
                              onClick={() =>
                                toast.warn(
                                  "You need correct account type and subscription to use this feature.",
                                  {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                  }
                                )
                              }
                              class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                            >
                              Add to watch list
                            </button>
                            <ToastContainer></ToastContainer>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-between items-center  mt-[2%] w-full lg:w-[30%] text-black ">
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
                      <p>{homeData.acreage} sqft</p>
                      <p>${homeData.price}/month</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full mt-5">
                    {withId || disable ? (
                      <></>
                    ) : (
                      <>
                        {(isPremium && user.accountType === "Renter") ||
                        (isPremium && user.accountType === "Both") ? (
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
                        ) : (
                          <>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  toast.warn(
                                    "You need correct account type and subscription to use this feature.",
                                    {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    }
                                  )
                                }
                                class="bg-gray-500  text-white font-bold py-2 px-4"
                              >
                                See Listing From Same Owner
                              </button>
                              <ToastContainer></ToastContainer>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
