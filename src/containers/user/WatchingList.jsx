import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropertyDetailModal } from "../property/PropertyDetailModal";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

const Watchinglist = () => {
  const user = useSelector((state) => state.user);
  const watchList = user.watchList;
  //const isNavbarMinimized = user.navBarMinimized;

  const [loading, setloading] = useState(false);

  const [executed, setexecuted] = useState(false);

  const searchUrl =
    "https://studentrentapi20230411081843.azurewebsites.net/api/Property/SearchById";

  const [watchListData, setwatchListData] = useState([]);
  const search = async () => {
    let data = [];

    setloading(true);
    if (!executed) {
      for (let i = 0; i < watchList.length; i++) {
        await axios({
          method: "post",
          url: searchUrl,
          headers: {},
          data: {
            propertyId: watchList[i],
          },
        })
          .then((res) => {
            data.push(res.data[0]);
            setexecuted(true);
          })
          .catch((err) => {
            console.log(err);
            setexecuted(true);
          });
      }
    }

    setwatchListData(data);
    setloading(false);
  };

  useEffect(() => {
    if (!executed && watchList.length > 0) {
      search();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`flex flex-col w-full h-full gap-4 items-start md:ml-0 ml-10 md:items-center mt-[2%]`}
    >
      {watchList.length === 0 ? (
        <div className="text-lg justify-center mt-[15%]">
          You don't have any property in watch list
        </div>
      ) : (
        <>
          <div className="font-bold text-lg">Your Watch List</div>
          {loading ? (
            <>
              <div className="flex w-full h h-full justify-center items-center mt-[15%]">
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
            </>
          ) : (
            <>
              {watchListData.map((value, key) => (
                <div className="flex w-[100%] md:w-[50%] h-auto border-[1px] border-blue-400 mt-1 ml-1 rounded-md flex-row hover:border-blue-600 hover:border-2">
                  <div className="flex w-[50%] lg:w-[20%] h-full mr-1 object-cover items-center justify-center bg-gray-100">
                    <img
                      className="h-[100%] w-[100%] object-cover"
                      src={value.coverImage}
                      alt="Home"
                    />
                  </div>
                  <div className="flex w-[50%] lg:w-[80%] flex-row">
                    <div className="flex w-[80%] flex-col ">
                      <div>
                        {value.address}, {value.city},{" "}
                        {value.state.toUpperCase()}, {value.zipCode}
                      </div>
                      <div>Bedroom(s): {value.numberOfBedroom}</div>
                      <div>Bathroom(s): {value.numberOfBathroom}</div>
                      <div>Year Built: {value.yearBuilt}</div>
                      <div>{value.acreage}ft</div>
                      <div className="md:hidden flex text-blue-700">
                        Display on Map
                      </div>
                    </div>
                    <div className="flex w-[20%] flex-col  mr-3 gap-1 lg:gap-2">
                      <div className="flex w-full h-full items-center justify-end">
                        <PropertyDetailModal
                          homeData={value}
                          withId={true}
                          fromWatchList={true}
                          watchListData={watchListData}
                          setwatchListData={setwatchListData}
                        ></PropertyDetailModal>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Watchinglist;
