import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideNav } from "../../components";
import Account from "./Account";
import PropPortfolio from "../property/PropPortfolio";
import UploadProperty from "../property/UploadProperty";
import Subscription from "./Subscription";
import WatchingList from "./WatchingList";

const UserPage = () => {
  let navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector((state) => state.user);

  const [isAccountPage, setisAccountPage] = useState(true);
  const [isPropretyPage, setisPropretyPage] = useState(false);
  const [isAddPropertyPage, setIsAddPropertyPage] = useState(false);
  const [isSubscriptionPage, setIsSubscriptionPage] = useState(false);
  const [isWatchingList, setIsWatchingList] = useState(false);

  const onAccountPage = () => {
    setisAccountPage(true);
    setisPropretyPage(false);
    setIsAddPropertyPage(false);
    setIsSubscriptionPage(false);
    setIsWatchingList(false);
  };
  const onPropretyPage = () => {
    setisAccountPage(false);
    setisPropretyPage(true);
    setIsAddPropertyPage(false);
    setIsSubscriptionPage(false);
    setIsWatchingList(false);
  };
  const onAddPropertyPage = () => {
    setisAccountPage(false);
    setisPropretyPage(false);
    setIsAddPropertyPage(true);
    setIsSubscriptionPage(false);
    setIsWatchingList(false);
  };
  const onSubscriptionPage = () => {
    setisAccountPage(false);
    setisPropretyPage(false);
    setIsAddPropertyPage(false);
    setIsSubscriptionPage(true);
    setIsWatchingList(false);
  };
  const onWatchingListPage = () => {
    setisAccountPage(false);
    setisPropretyPage(false);
    setIsAddPropertyPage(false);
    setIsSubscriptionPage(false);
    setIsWatchingList(true);
  };

  useEffect(() => {
    if (user.id !== null && user.id !== userId) {
      navigate(`/user/${user.id}`);
    }

    if (user.id === null) {
      navigate(`/login`);
    }

    document.title = `${user.firstName} ${user.lastName} - Livin it`;
    // eslint-disable-next-line
  }, []);

  const accountType = user.accountType;

  return (
    <div className="fixed w-full h-full overflow-y-scroll">
      <div className="flex flex-row justify-center">
        <div>
          <SideNav
            className="z-10"
            accountType={accountType}
            onAccountPage={onAccountPage}
            onAddPropertyPage={onAddPropertyPage}
            onPropretyPage={onPropretyPage}
            onWatchingListPage={onWatchingListPage}
            onSubscriptionPage={onSubscriptionPage}
          ></SideNav>
        </div>
        <div className="w-full h-full">
          {isAccountPage && <Account></Account>}
          {isPropretyPage && <PropPortfolio></PropPortfolio>}
          {isAddPropertyPage && <UploadProperty></UploadProperty>}
          {isSubscriptionPage && <Subscription></Subscription>}
          {isWatchingList && (
            <WatchingList isWatchingList={isWatchingList}></WatchingList>
          )}
        </div>
      </div>

      {/* {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex justify-center">
          <div className="flex justify-center">
            {isPropertyOwner && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded self-center mr-4"
                onClick={() => navigate(`./UploadProperty`)}
              >
                Add Property
              </button>
            )}
            {isPropertyOwner && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded self-center"
                onClick={() => navigate(`./PropPortfolio`)}
              >
                View My Properties
              </button>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserPage;
