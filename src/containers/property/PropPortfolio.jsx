import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PropertyDetailModal } from "./PropertyDetailModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropPortfolio = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user.id, navigate]);

  const searchUrl =
    "https://studentrentapi20230411081843.azurewebsites.net/api/Property/SearchById";

  const [homeData, sethomeData] = useState([]);
  const { userId } = useParams();
  const withId = (WrappedComponent) => {
    const ComponentWithId = (props) => {
      const { id } = useParams();
      return <WrappedComponent {...props} id={id} />;
    };
    return ComponentWithId;
  };

  useEffect(() => {
    document.title = "Property - Livin it";
    search();
    // eslint-disable-next-line
  }, []);

  const search = async () => {
    await axios({
      method: "post",
      url: searchUrl,
      headers: {},
      data: {
        accountId: userId,
      },
    }).then((res) => {
      sethomeData(res.data);
    });
  };

  const onCardSelected = (address, city, state, zipCode) => {
    console.log(
      `Address: ${address}, City: ${city}, State: ${state}, Zip Code: ${zipCode}`
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
      {homeData.map((value, key) => (
        <div
          key={key}
          className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
        >
          <div
            className="h-57 w-full bg-cover relative"
            style={{ backgroundImage: "none" }}
            onClick={() =>
              onCardSelected(
                value.address,
                value.city,
                value.state,
                value.zipCode
              )
            }
          >
            <img
              src={value.coverImage}
              alt={value.address}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="flex justify-end items-end h-full w-full bg-gray-900 bg-opacity-50"></div>
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700 uppercase">{value.address}</h3>
            <span className="text-gray-500 mt-2">${value.price}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-3">
            <PropertyDetailModal homeData={value} withId={withId} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default PropPortfolio;
