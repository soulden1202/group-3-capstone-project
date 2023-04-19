import React from "react";
import { useEffect, useState } from "react";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import { db } from "../../firebase/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import { CreateCustomerPortal } from "./CreateCustomerPortal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stripe from "stripe";
import moment from "moment/moment";
import { Oval } from "react-loader-spinner";

const Subscription = () => {
  const user = useSelector((state) => state.user);
  const [stripeId, setstripeId] = useState("");
  const [subsInfo, setsubsInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const stripe = new Stripe(process.env.REACT_APP_STRIPE_API_KEY);

  const isPremium = usePremiumStatus(user);
  const navigate = useNavigate();

  const handleOnclick = () => {
    setLoading(true);
    if (isPremium && stripeId !== "") {
      CreateCustomerPortal(stripeId);
    }
  };

  const getSubsInfor = async () => {
    const infor = await stripe.subscriptions.list({
      customer: stripeId,
    });
    setsubsInfo(infor.data[0]);
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
    if (stripeId) {
      getSubsInfor();
    }
    // eslint-disable-next-line
  }, [isPremium, user.id, stripeId]);

  return (
    <>
      <div className="z-0 fixed w-full h-full align-middle items-center justify-center">
        <div className="flex flex-col w-full h-full">
          {loading ? (
            <div className="flex w-full h-full justify-center items-center align-middle">
              <Oval
                color="#ADD8E6"
                height={80}
                width={80}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#e8f4f8"
                strokeWidth={2}
                strokeWidthSecondary={2}
              ></Oval>
            </div>
          ) : (
            <>
              {" "}
              <div className="flex items-center justify-center text-xl mt-5 font-bold">
                Your Subscription
              </div>
              {isPremium ? (
                <div className="flex flex-col items-center justify-center text-xl gap-4 mt-[5%]">
                  <div>
                    <b>Status:</b>{" "}
                    {subsInfo.status === "active" && (
                      <span className="text-green-500">Active</span>
                    )}
                  </div>
                  <div>
                    <b>Subscription start:</b>{" "}
                    {moment.unix(subsInfo.current_period_start).format("LLL")}{" "}
                  </div>
                  <div>
                    <b>Subscription end:</b>{" "}
                    {moment.unix(subsInfo.current_period_end).format("LLL")}{" "}
                  </div>
                  <div>
                    <b>Auto renewal:</b>{" "}
                    {subsInfo.cancel_at_period_end ? (
                      <span className="text-red-500">False</span>
                    ) : (
                      <span className="text-green-500">True</span>
                    )}
                  </div>

                  <button
                    className="flex cursor-pointer justify-center items-center h-11 w-[15rem] text-sm font-semibold transition-colors rounded-xl text-gray-600 bg-gray-100 hover:text-white hover:bg-gradient-to-r hover:bg-red-500 hover:from-red-400 hover:to-red-500"
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Subscription;
