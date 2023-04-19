import React, { useState, useEffect } from "react";
import { PropertyCard } from "./PropertyCard";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { BallTriangle } from "react-loader-spinner";
import Geocode from "react-geocode";
import { useParams } from "react-router-dom";

const PropretyById = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
  const searchUrl =
    "https://studentrentapi20230411081843.azurewebsites.net/api/Property/SearchById";

  // const searchUrl = "https://localhost:7228/api/Property/SearchById";
  const [homeData, sethomeData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [center, setcenter] = useState({});
  const [position, setpostion] = useState({});
  const [latlng, setlatlng] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    document.title = "Property - Livin it";
    search();
    // eslint-disable-next-line
  }, []);

  const search = async () => {
    setisLoading(true);
    await axios({
      method: "post",
      url: searchUrl,
      headers: {},
      data: {
        accountId: userId,
      },
    }).then((res) => {
      sethomeData(res.data);
      setLatandlng(res.data);
    });
  };

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  //   const onChange = (e) => {
  //     const re = /^[0-9\b]+$/;
  //     if (e.target.value === "" || re.test(e.target.value)) {
  //       setzipCode(e.target.value);
  //     }
  //   };

  const onCardSelected = (address, city, state, zipCode) => {
    var searhAdress = `${address}, ${city}, ${state.toUpperCase()}, ${zipCode}`;
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

  const setLatandlng = (data) => {
    data.forEach(async (home) => {
      var searhAdress = `${home.address}, ${
        home.city
      }, ${home.state.toUpperCase()}, ${home.zipCode}`;

      await Geocode.fromAddress(searhAdress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;

          setlatlng((prevState) => [
            ...prevState,
            {
              lat: lat,
              lng: lng,
            },
          ]);
        },

        (error) => {
          console.error(error);
        }
      );
    });
    console.log(latlng);
    setisLoading(false);
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="flex fixed w-full h-full ">
      <div className="flex md:flex-row flex-col w-full h-full ">
        <div className="flex w-full md:w-[40%] h-[100%] flex-col overflow-y-scroll">
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
          {homeData.length > 0 && !isLoading && (
            <div>
              {homeData.map((value, key) => (
                <PropertyCard
                  homeData={value}
                  key={value.propertyId}
                  onCardSelected={onCardSelected}
                  withId={true}
                />
              ))}
            </div>
          )}
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
                {latlng.map((pos, key) => (
                  <Marker opacity={0.4} position={pos} />
                ))}
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

export default PropretyById;
