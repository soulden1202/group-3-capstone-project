import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createCheckoutSession } from "./createCheckoutSession";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import { BallTriangle } from "react-loader-spinner";

const Pricing = () => {
  const user = useSelector((state) => state.user);

  const [isYearly, setisYearly] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const userIsPremium = usePremiumStatus(user);

  const handleOnclick = (userType) => {
    if (userType === "Renter") {
      setisLoading(true);
      if (isYearly) {
        createCheckoutSession(user.id, "price_1MqwyTHCd0MN7uajnfpTQloC");
      } else {
        createCheckoutSession(user.id, "price_1MqvgPHCd0MN7uajmFI176CZ");
      }
    }
    if (userType === "Property Owner") {
      setisLoading(true);
      if (isYearly) {
        createCheckoutSession(user.id, "price_1MqyNKHCd0MN7uajCYTTRpIx");
      } else {
        createCheckoutSession(user.id, "price_1MqyNKHCd0MN7uajn1jlRDnl");
      }
    }
  };

  return (
    <div>
      <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          {isLoading ? (
            <>
              <div className="flex w-full h-full justify-center items-center align-middle">
                <BallTriangle></BallTriangle>
              </div>
            </>
          ) : (
            <>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mx-auto mb-[50px] max-w-[510px] text-center lg:mb-10">
                    <span className="text-primary mb-2 block text-lg font-semibold">
                      Pricing Table
                    </span>
                    <h2 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                      Our Pricing Plan
                    </h2>
                    <p className="text-body-color text-base">
                      There are many variations of passages of Lorem Ipsum
                      available but the majority have suffered alteration in
                      some form.
                    </p>
                    <div className="flex flex-row w-full mt-5 justify-center">
                      <button
                        onClick={() => setisYearly(false)}
                        className={`${
                          isYearly === false
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        } px-1 py-1 rounded-tl-2xl rounded-bl-2xl transition`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setisYearly(true)}
                        className={`${
                          isYearly === true
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        } px-3 py-1 rounded-tr-2xl rounded-br-2xl transition`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-4 flex flex-wrap justify-center">
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                  <div className="border-primary shadow-pricing relative z-10 mb-10 overflow-hidden rounded-xl border border-opacity-20 bg-white py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12">
                    <span className="text-primary mb-4 block text-lg font-semibold">
                      Tenant
                    </span>
                    <h2 className="text-dark mb-5 text-[42px] font-bold">
                      ${isYearly ? "50" : "5"}
                      <span className="text-body-color text-base font-medium">
                        {" "}
                        / {isYearly ? "yearly" : "monthly"}
                      </span>
                    </h2>
                    <p className="text-body-color mb-8 border-b border-[#F2F2F2] pb-8 text-base">
                      Perfect for user who looking for a place to rent.
                    </p>
                    <div className="mb-7">
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Able to directly contact with property owner
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Able to see listing from same owner
                      </p>

                      <p className="text-body-color mb-1 text-base leading-loose">
                        3 Months support
                      </p>
                    </div>
                    {user.id !== null && (
                      <button
                        onClick={() => handleOnclick("Renter")}
                        disabled={
                          userIsPremium || user.accountType !== "Renter"
                            ? true
                            : false
                        }
                        className={`${
                          userIsPremium || user.accountType !== "Renter"
                            ? "bg-gray-500 text-gray-200"
                            : "bg-transparent hover:text-white hover:bg-blue-500"
                        } text-primary hover:bg-primary hover:border-primary block w-full rounded-md border border-[#D4DEFF]  p-4 text-center text-base font-semibold transition`}
                      >
                        {userIsPremium ? "Already a member" : "Choose Tenant"}
                      </button>
                    )}

                    <div>
                      <span className="absolute right-0 top-7 z-[-1]">
                        <svg
                          width="77"
                          height="172"
                          viewBox="0 0 77 172"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="86"
                            cy="86"
                            r="86"
                            fill="url(#paint0_linear)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#3056D3" stop-opacity="0.09" />
                              <stop
                                offset="1"
                                stopColor="#C4C4C4"
                                stop-opacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute right-4 top-4 z-[-1]">
                        <svg
                          width="41"
                          height="89"
                          viewBox="0 0 41 89"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="38.9138"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 38.9138 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 38.9138 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 38.9138 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 38.9138 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 38.9138 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 38.9138 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 38.9138 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="1.42021"
                            r="1.42021"
                            transform="rotate(180 38.9138 1.42021)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 26.4157 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 26.4157 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 26.4157 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 26.4157 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 26.4157 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 26.4157 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 26.4157 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 26.4157 1.4202)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 13.9177 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 13.9177 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 13.9177 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 13.9177 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 13.9177 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 13.9177 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 13.9177 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="1.42019"
                            r="1.42021"
                            transform="rotate(180 13.9177 1.42019)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 1.41963 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 1.41963 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 1.41963 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 1.41963 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 1.41963 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 1.41963 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 1.41963 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 1.41963 1.4202)"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                  <div className="border-primary shadow-pricing relative z-10 mb-10 overflow-hidden rounded-xl border border-opacity-20 bg-white py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12">
                    <span className="text-primary mb-4 block text-lg font-semibold">
                      Property Owner
                    </span>
                    <h2 className="text-dark mb-5 text-[42px] font-bold">
                      ${isYearly ? "100" : 10}
                      <span className="text-body-color text-base font-medium">
                        {" "}
                        / {isYearly ? "yearly" : "monthly"}
                      </span>
                    </h2>
                    <p className="text-body-color mb-8 border-b border-[#F2F2F2] pb-8 text-base">
                      Perfect for property owner who want to reach out for
                      tenants.
                    </p>
                    <div className="mb-7">
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Unlimited listing.
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Able to receive message from people who intrested in
                        listing.
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Free updates
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        4 Months support
                      </p>
                    </div>

                    {user.id !== null && (
                      <button
                        onClick={() => handleOnclick("Property Owner")}
                        disabled={
                          userIsPremium || user.accountType !== "Property Owner"
                            ? true
                            : false
                        }
                        className={`${
                          userIsPremium || user.accountType !== "Property Owner"
                            ? "bg-gray-500 text-gray-200"
                            : "bg-transparent hover:text-white hover:bg-blue-500"
                        } text-primary hover:bg-primary hover:border-primary block w-full rounded-md border border-[#D4DEFF]  p-4 text-center text-base font-semibold transition`}
                      >
                        {userIsPremium
                          ? "Already a member"
                          : "Choose Property Owner"}
                      </button>
                    )}
                    <div>
                      <span className="absolute right-0 top-7 z-[-1]">
                        <svg
                          width="77"
                          height="172"
                          viewBox="0 0 77 172"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="86"
                            cy="86"
                            r="86"
                            fill="url(#paint0_linear)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#3056D3" stop-opacity="0.09" />
                              <stop
                                offset="1"
                                stopColor="#C4C4C4"
                                stop-opacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute right-4 top-4 z-[-1]">
                        <svg
                          width="41"
                          height="89"
                          viewBox="0 0 41 89"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="38.9138"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 38.9138 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 38.9138 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 38.9138 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 38.9138 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 38.9138 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 38.9138 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 38.9138 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="1.42021"
                            r="1.42021"
                            transform="rotate(180 38.9138 1.42021)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 26.4157 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 26.4157 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 26.4157 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 26.4157 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 26.4157 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 26.4157 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 26.4157 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 26.4157 1.4202)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 13.9177 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 13.9177 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 13.9177 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 13.9177 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 13.9177 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 13.9177 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 13.9177 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="1.42019"
                            r="1.42021"
                            transform="rotate(180 13.9177 1.42019)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 1.41963 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 1.41963 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 1.41963 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 1.41963 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 1.41963 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 1.41963 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 1.41963 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 1.41963 1.4202)"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                  <div className="border-primary shadow-pricing relative z-10 mb-10 overflow-hidden rounded-xl border border-opacity-20 bg-white py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12">
                    <span className="text-primary mb-4 block text-lg font-semibold">
                      Tenant & Property Owner
                    </span>
                    <h2 className="text-dark mb-5 text-[42px] font-bold">
                      ${isYearly ? "120" : "15"}
                      <span className="text-body-color text-base font-medium">
                        {" "}
                        / {isYearly ? "yearly" : "monthly"}
                      </span>
                    </h2>
                    <p className="text-body-color mb-8 border-b border-[#F2F2F2] pb-8 text-base">
                      Perfect for using in a Professional website or a client
                      project.
                    </p>
                    <div className="mb-7">
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Unlimited Listing
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Able to send and receive message
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Able to see listing from same owner
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        Free updates
                      </p>
                      <p className="text-body-color mb-1 text-base leading-loose">
                        12 Months support
                      </p>
                    </div>
                    <button
                      disabled={userIsPremium ? true : false}
                      className={`${
                        userIsPremium
                          ? "bg-gray-500 text-gray-200"
                          : "bg-transparent hover:text-white hover:bg-blue-500"
                      } text-primary hover:bg-primary hover:border-primary block w-full rounded-md border border-[#D4DEFF]  p-4 text-center text-base font-semibold transition`}
                    >
                      {userIsPremium ? "Already a member" : "Be Both!"}
                    </button>
                    <div>
                      <span className="absolute right-0 top-7 z-[-1]">
                        <svg
                          width="77"
                          height="172"
                          viewBox="0 0 77 172"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="86"
                            cy="86"
                            r="86"
                            fill="url(#paint0_linear)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#3056D3" stop-opacity="0.09" />
                              <stop
                                offset="1"
                                stopColor="#C4C4C4"
                                stop-opacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute right-4 top-4 z-[-1]">
                        <svg
                          width="41"
                          height="89"
                          viewBox="0 0 41 89"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="38.9138"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 38.9138 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 38.9138 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 38.9138 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 38.9138 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 38.9138 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 38.9138 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 38.9138 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="38.9138"
                            cy="1.42021"
                            r="1.42021"
                            transform="rotate(180 38.9138 1.42021)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 26.4157 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 26.4157 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 26.4157 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 26.4157 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 26.4157 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 26.4157 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 26.4157 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="26.4157"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 26.4157 1.4202)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 13.9177 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 13.9177 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 13.9177 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 13.9177 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 13.9177 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 13.9177 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 13.9177 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="13.9177"
                            cy="1.42019"
                            r="1.42021"
                            transform="rotate(180 13.9177 1.42019)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="87.4849"
                            r="1.42021"
                            transform="rotate(180 1.41963 87.4849)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="74.9871"
                            r="1.42021"
                            transform="rotate(180 1.41963 74.9871)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="62.4892"
                            r="1.42021"
                            transform="rotate(180 1.41963 62.4892)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="38.3457"
                            r="1.42021"
                            transform="rotate(180 1.41963 38.3457)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="13.634"
                            r="1.42021"
                            transform="rotate(180 1.41963 13.634)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="50.2754"
                            r="1.42021"
                            transform="rotate(180 1.41963 50.2754)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="26.1319"
                            r="1.42021"
                            transform="rotate(180 1.41963 26.1319)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.41963"
                            cy="1.4202"
                            r="1.42021"
                            transform="rotate(180 1.41963 1.4202)"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
