import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropertyDetailModal } from "../property/PropertyDetailModal";
import { useSelector } from "react-redux";

const Watchinglist = () => {
  const user = useSelector((state) => state.user);
  const watchList = user.watchList;
  const isNavbarMinimized = user.navBarMinimized;

  const [executed, setexecuted] = useState(false);

  const searchUrl =
    "https://studentrentapi20230322222647.azurewebsites.net/api/Property/SearchById";

  const [homeData, sethomeData] = useState([]);

  const search = async () => {
    let data = [];
    for (let i = 0; i < watchList.length; i++) {
      await axios({
        method: "post",
        url: searchUrl,
        headers: {},
        data: {
          propertyId: watchList[i],
        },
      }).then((res) => {
        data.push(res.data[0]);
      });
    }
    sethomeData(data);
    setexecuted(true);
    console.log(1);
  };

  useEffect(() => {
    if (!executed) {
      search();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`flex flex-row w-full h-full gap-4 ${
        isNavbarMinimized ? "ml-5" : "ml-[15%]"
      }`}
    >
      {homeData.map((value, key) => (
        <>
          <div className="flex w-[25%] h-[15%] border-[1px] border-blue-400 mt-1 ml-1 rounded-md flex-row hover:border-blue-600 hover:border-2">
            <div className="flex w-[20%] h-full mr-1 object-cover items-center justify-center bg-gray-100">
              <img
                className="h-[100%] w-[100%] object-cover"
                src={value.coverImage}
                alt="Home"
              />
            </div>
            <div className="flex w-[70%] flex-row">
              <div className="flex w-[80%] flex-col ">
                <div>
                  {value.address}, {value.city}, {value.state.toUpperCase()},{" "}
                  {value.zipCode}
                </div>
                <div>Bedroom(s): {value.numberOfBedroom}</div>
                <div>Bathroom(s): {value.numberOfBathroom}</div>
                <div>Year Built: {value.yearBuilt}</div>
                <div>{value.acreage}ft</div>
                <div className="md:hidden flex text-blue-700">
                  Display on Map
                </div>
              </div>
              <div className="flex w-[20%] flex-col mr-3">
                <div className="flex w-full h-full items-center justify-end">
                  <PropertyDetailModal
                    homeData={value}
                    withId={true}
                  ></PropertyDetailModal>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Watchinglist;
