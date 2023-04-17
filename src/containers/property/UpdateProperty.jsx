import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProperty = () => {
    const [property, setProperty] = useState(null);
    const { propertyId } = useParams();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(
                    `https://studentrentapi20230411081843.azurewebsites.net/api/Property/SearchById`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ propertyId }),
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchProperty();
    }, [propertyId]);

    useEffect(() => {
        if (property?.[0]?.accountId && user.id !== property[0].accountId) {
            navigate("/");
        }
    }, [property?.[0]?.accountId, user.id, navigate]);

    const handleAddressChange = (e) => {
        setProperty({ ...property, address: e.target.value });
    };

    const handleCityChange = (e) => {
        setProperty({ ...property, city: e.target.value });
    };

    const handleStateChange = (e) => {
        setProperty({ ...property, state: e.target.value });
    };

    const handleZipcodeChange = (e) => {
        setProperty({ ...property, zipCode: e.target.value });
    };

    const handleNumberOfBedroomChange = (e) => {
        setProperty({ ...property, numberOfBedroom: e.target.value });
    };

    const handleNumberOfBathroomChange = (e) => {
        setProperty({ ...property, numberOfBathroom: e.target.value });
    };

    const handleAcreageChange = (e) => {
        setProperty({ ...property, acreage: e.target.value });
    };

    const handlePriceChange = (e) => {
        setProperty({ ...property, price: e.target.value });
    };

    //const handleYearBuiltChange = (e) => {
    //    setProperty({ ...property, yearBuilt: e.target.value });
    //};

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("PropertyId", propertyId);
            formData.append("Address", property.address || "");
            formData.append("City", property.city || "");
            formData.append("State", property.state || "");
            formData.append("ZipCode", property.zipCode || "");
            formData.append("NumberOfBedroom", property.numberOfBedroom || "");
            formData.append("NumberOfBathroom", property.numberOfBathroom || "");
            formData.append("Acreage", property.acreage || "");
            formData.append("Price", property.price || "");
            //formData.append("yearBuilt", property.yearBuilt || "");

            const response = await fetch(
                `https://studentrentapi20230411081843.azurewebsites.net/api/Property/Update`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(`Updated property ${propertyId} with address ${property.address}`);
            console.log(data);
            setMessage("Property updated successfully!");
            navigate(`/property/${propertyId}`);
        } catch (error) {
            console.error("Error:", error);
            setMessage("Failed to update the property. Please check the input fields and try again.");
        }
    };




    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center mt-10 sm:ml-0 ml-5 z-0">
            <div className="w-full max-w-md p-8 rounded-md shadow-lg bg-white">
                <h1 className="text-center font-bold text-2xl mb-5">Update Property</h1>
                <div className="mb-4">
                    <label htmlFor="address" className="block font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={property.address || ""}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block font-medium text-gray-700 mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={property.city || ""}
                        onChange={handleCityChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                 {/*{message && <div className="text-center mt-4">{message}</div>}  */}

                <div className="mb-4">
                    <label htmlFor="state" className="block font-medium text-gray-700 mb-2">
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        value={property.state || ""}
                        onChange={handleStateChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="zipcode" className="block font-medium text-gray-700 mb-2">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        value={property.zipCode || ""}
                        onChange={handleZipcodeChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bedroom" className="block font-medium text-gray-700 mb-2">
                        Number of Bedrooms
                    </label>
                    <input
                        type="number"
                        name="bedroom"
                        id="bedroom"
                        value={property.numberOfBedroom || ""}
                        onChange={handleNumberOfBedroomChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bathroom" className="block font-medium text-gray-700 mb-2">
                        Number of Bathrooms
                    </label>
                    <input
                        type="number"
                        name="bathroom"
                        id="bathroom"
                        value={property.numberOfBathroom || ""}
                        onChange={handleNumberOfBathroomChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="acreage" className="block font-medium text-gray-700 mb-2">
                        Acreage
                    </label>
                    <input
                        type="number"
                        name="acreage"
                        id="acreage"
                        value={property.acreage || ""}
                        onChange={handleAcreageChange
                        }
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium text-gray-700 mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={property.price || ""}
                        onChange={handlePriceChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>
                {/*<div className="mb-4">*/}
                {/*    <label htmlFor="yearbuilt" className="block font-medium text-gray-700 mb-2">*/}
                {/*        Year Built*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        type="number"*/}
                {/*        name="yearbuilt"*/}
                {/*        id="yearbuilt"*/}
                {/*        value={property.yearBuilt || ""}*/}
                {/*        onChange={handleYearBuiltChange}*/}
                {/*        className="w-full p-2 border border-gray-400 rounded-md"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleUpdate}
                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProperty;