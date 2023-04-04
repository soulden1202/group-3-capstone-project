import React from "react";
import { useEffect, useState } from "react";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import { db } from "../../firebase/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import { CreateCustomerPortal } from "./CreateCustomerPortal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const user = useSelector((state) => state.user);
  const [stripeId, setstripeId] = useState("");

  const isPremium = usePremiumStatus(user);
  const navigate = useNavigate();

  const handleOnclick = () => {
    if (isPremium && stripeId !== "") {
      CreateCustomerPortal(stripeId);
    }
  };

  useEffect(() => {
    if (isPremium) {
      onSnapshot(doc(db, "users", user.id), async (snap) => {
        const { stripeId } = snap.data();
        if (stripeId) {
          setstripeId(stripeId);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="z-0 fixed w-full h-full align-middle items-center justify-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex items-center justify-center text-xl mt-5 font-bold">
            Your Subscription
          </div>
          {isPremium ? (
            <div className="flex items-center justify-center text-xl">
              <button
                className="flex cursor-pointer mt-[15%] justify-center items-center h-11 w-[15rem] text-sm font-semibold transition-colors rounded-xl text-gray-600 bg-gray-100 hover:text-white hover:bg-gradient-to-r hover:bg-red-500 hover:from-red-400 hover:to-red-500"
                onClick={handleOnclick}
              >
                Manage your membership
              </button>
            </div>
          ) : (
            <div className=" mt-[15%] text-center flex flex-col items-center justify-center sm:ml-0 text-lg md:text-xl">
              <p>You don't have any subscription.</p>
              <br></br>
              <p className="">
                Check out our{" "}
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => navigate("/pricing")}
                >
                  pricing page
                </span>{" "}
                <br></br>
                for more information.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Subscription;
