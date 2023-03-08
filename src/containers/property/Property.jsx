import React, { useState } from "react";
import { PropertyCard } from "./PropertyCard";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { BallTriangle } from "react-loader-spinner";
import Geocode from "react-geocode";

const Property = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
  const searchUrl =
    "https://studentrentapi.azurewebsites.net/api/Property/Search";

  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [homeData, sethomeData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [center, setcenter] = useState({});
  const [position, setpostion] = useState({});

  const search = async () => {
    console.log(address, city, state, zipCode);

    setisLoading(true);
    await axios({
      method: "post",
      url: searchUrl,
      headers: {},
      data: {
        address: address,
        city: city,
        state: state.toLowerCase(),
        zipCode: zipCode === "" ? null : Number(zipCode),
      },
    }).then((res) => {
      sethomeData(res.data);
      setisLoading(false);
    });
  };

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setzipCode(e.target.value);
    }
  };

  const onCardSelected = (address, city, state, zipCode) => {
    var searhAdress = `${address}, ${city}, ${state.toUpperCase()}, ${zipCode}`;
    console.log(searhAdress);
    Geocode.fromAddress(searhAdress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setcenter({ lat: lat, lng: lng });
        setpostion({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
        setcenter({});
        setpostion({});
      }
    );
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="flex flex-col fixed w-full h-full ">
      <div className="flex items-center my-2 w-full">
        <div className="flex space-x-1 w-[100%] md:w-[40%]">
          <input
            type="text"
            className="block w-[90%] px-4 py-2 text-black bg-white border-2 rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Address"
            onChange={(e) => setaddress(e.target.value)}
          />
          <input
            type="text"
            className="block w-[30%] px-4 py-2 text-black bg-white border-2 rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="City"
            onChange={(e) => setcity(e.target.value)}
          />
          <select
            type="text"
            className="block w-[30%] px-4 py-2 text-black bg-white border-2 rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="State"
            onChange={(e) => setstate(e.target.value)}
          >
            <option value="">Not selected</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <input
            type="text"
            className="block w-[20%] px-4 py-2 text-black bg-white border-2 rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Zipcode"
            value={zipCode}
            onChange={onChange}
          />
          <button
            className="px-4 text-white bg-blue-600 rounded-full"
            onClick={search}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full h-full ">
        <div className="flex w-full md:w-[40%] h-full flex-col overflow-y-auto">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <BallTriangle
                height={100}
                width={100}
                radius={4}
                color="#ADD8E6"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
            </div>
          )}
          {homeData.length > 0 &&
            !isLoading &&
            homeData.map((value, key) => (
              <PropertyCard
                homeData={value}
                key={value.propertyId}
                onCardSelected={onCardSelected}
              />
            ))}
          {!isLoading && homeData.length === 0 && (
            <div className="flex justify-center items-center h-full">
              No data to show
            </div>
          )}
        </div>
        {!isObjEmpty(center) ? (
          <div className="w-[0%] md:w-[60%] md:flex hidden h-full justify-center items-center">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={position} />
              </GoogleMap>
            </LoadScript>
          </div>
        ) : (
          <div className="w-[0%] md:w-[60%] md:flex hidden h-full justify-center items-center">
            No information to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Property;
