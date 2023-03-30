import React, { useState, useEffect } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { useParams } from "react-router-dom";
import { PropertyDetailModal } from "./PropertyDetailModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropPortfolio = () => {
    let navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (!user.id) {
            navigate('/login');
        }
    }, [user.id, navigate]);
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    const searchUrl =
        "https://studentrentapi20230322222647.azurewebsites.net/api/Property/SearchById";

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
            setLatandlng(res.data);
        });
    };

    const onCardSelected = (address, city, state, zipCode) => {
        var searhAdress = `${address}, ${city}, ${state.toUpperCase()}, ${zipCode}`;
        Geocode.fromAddress(searhAdress).then(
            (response) => {
                //const { lat, lng } = response.results[0].geometry.location;
                //const center = { lat: lat, lng: lng };
                //const position = { lat: lat, lng: lng };
               // console.log(center, position);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const setLatandlng = (data) => {
        data.forEach(async (home) => {
            var searhAdress = `${home.address}, ${home.city
                }, ${home.state.toUpperCase()}, ${home.zipCode}`;

            await Geocode.fromAddress(searhAdress).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                },

                (error) => {
                    console.error(error);
                }
            );
        });
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {homeData.map((value, key) => (
                <div key={key} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                    <div className="h-56 w-full bg-cover" style={{ backgroundImage: `url(${value.mainImage})` }} onClick={() => onCardSelected(value.address, value.city, value.state, value.zipCode)}>
                        <div className="flex justify-end items-end h-full w-full bg-gray-900 bg-opacity-50"></div>
                    </div>
                    <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">{value.address}</h3>
                        <span className="text-gray-500 mt-2">${value.price}</span>
                    </div>
                    <PropertyDetailModal homeData={value} withId={withId} />
                </div>
            ))}
        </div>
    );

};
export default PropPortfolio;
