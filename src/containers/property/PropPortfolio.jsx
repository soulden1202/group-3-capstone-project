import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropertyDetailModal } from "./PropertyDetailModal";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

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
    const deleteUrl =
        "https://studentrentapi20230411081843.azurewebsites.net/api/Property/DeleteProperty";

    const [loading, setloading] = useState(false);
    const [homeData, sethomeData] = useState([]);

    const search = async () => {
        setloading(true);
        await axios({
            method: "post",
            url: searchUrl,
            headers: {},
            data: {
                accountId: user.id,
            },
        })
            .then((res) => {
                sethomeData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setloading(false);
    };

    const handleDelete = async (propertyId) => {
        const confirmed = window.confirm("Are you sure you want to delete this property?");
        if (confirmed) {
            await axios({
                method: "delete",
                url: `${deleteUrl}?id=${propertyId}`,
                headers: {},
            })
                .then((res) => {
                    console.log(`Property with id ${propertyId} has been deleted.`);
                    const successMsg = document.createElement('div');
                    successMsg.textContent = `Property with id ${propertyId} has been deleted successfully.`;
                    document.body.appendChild(successMsg);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        document.title = "Property - Livin it";
        search();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={`flex flex-col w-full h-full gap-4 items-start md:ml-0 ml-10 md:items-center mt-[2%]`}>
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
                    <div className="font-bold text-lg">Property Portfolio</div>
                    {homeData.length === 0 ? (
                        <div className="text-lg justify-center mt-[15%]">
                            No properties found.
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-between mt-4">
                            {homeData.map((value, key) => (
                                <div
                                    className="flex w-full md:w-[100%] h-auto border-[1px] border-blue-400 mt-1 ml-1 rounded-md flex-row hover:border-blue-600 hover:border-2"
                                    key={key}
                                >
                                    <div className="flex w-[50%] lg:w-[20%] h-full mr-1 object-cover items-center justify-center bg-gray-100">
                                        <img
                                            className="h-[100%] w-[100%] object-cover"
                                            src={value.coverImage}
                                            alt="Home"
                                        />
                                    </div>
                                    <div className="flex w-[50%] lg:w-[80%] flex-row">
                                        <div className="flex w-[80%] flex-col">
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
                                        <div className="flex w-[20%] flex-col mr-3 gap-1 lg:gap-2">
                                            <div className="flex w-full h-full items-center justify-end">
                                                <PropertyDetailModal
                                                    homeData={value}
                                                    withId={true}
                                                    fromWatchList={false}
                                                    sethomeData={sethomeData}
                                                ></PropertyDetailModal>
                                            </div>
                                            <div className="flex w-full h-full items-center justify-end">
                                                <button
                                                    className="bg-red-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                    onClick={() => handleDelete(value.propertyId)}
                                                >
                                                    Delete Property
                                                </button>
                                            </div>
                                            <div className="flex w-full h-full items-center justify-end">
                                                <Link
                                                    className="bg-green-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                    to={`/updateproperty/${value.propertyId}`}
                                                >
                                                    Update Property Information
                                                </Link>
                                        </div>
                                    </div>
                                </div>
</div>
                    ))}
                </div>
            )}
        </>
    )
}
</div >
);
};

export default PropPortfolio;
