import { useState } from "react";
import { useSelector } from "react-redux";

const UploadProperty = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [numberOfBedroom, setNumberOfBedroom] = useState(0);
    const [numberOfBathroom, setNumberOfBathroom] = useState(0);
    const [acreage, setAcreage] = useState(0);
    const [yearBuilt, setYearBuilt] = useState(0);
    const [price, setPrice] = useState(0);

    const accountId = useSelector((state) => state.user.id);

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleOtherImagesChange = (e) => {
        setOtherImages(e.target.files);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleZipcodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleNumberOfBedroomChange = (e) => {
        setNumberOfBedroom(e.target.value);
    };

    const handleNumberOfBathroomChange = (e) => {
        setNumberOfBathroom(e.target.value);
    };

    const handleAcreageChange = (e) => {
        setAcreage(e.target.value);
    };

    const handleYearBuiltChange = (e) => {
        setYearBuilt(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleUploadProperty = async () => {
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        for (let i = 0; i < otherImages.length; i++) {
            formData.append("otherImages", otherImages[i]);
        }
        formData.append("accountId", accountId);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipCode", zipcode);
        formData.append("numberOfBedroom", numberOfBedroom);
        formData.append("numberOfBathroom", numberOfBathroom);
        formData.append("acreage", acreage);
        formData.append("yearBuilt", yearBuilt);
        formData.append("price", price);
        formData.append("propertyId", "");

        try {
            const response = await fetch(
                "https://studentrentapi.azurewebsites.net/api/Property/Add",
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            alert("Property uploaded successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to upload property.");
        }
    };


    return (
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                            Cover Image:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherImages">
                            Other Images:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="otherImages"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleOtherImagesChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={handleCityChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                            State:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="state"
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={handleStateChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipcode">
                            Zipcode:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="zipcode"
                            type="text"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={handleZipcodeChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfBedroom">
                            Number of Bedrooms:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="numberOfBedroom"
                            type="number"
                            placeholder="Number of Bedrooms"
                            value={numberOfBedroom}
                            onChange={handleNumberOfBedroomChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfBathroom">
                            Number of Bathrooms:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="numberOfBathroom"
                            type="number"
                            placeholder="Number of Bathrooms"
                            value={numberOfBathroom}
                            onChange={handleNumberOfBathroomChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="acreage">
                            Acreage:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="acreage"
                            type="number"
                            placeholder="Acreage"
                            value={acreage}
                            onChange={handleAcreageChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearBuilt">
                            Year Built:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="yearBuilt"
                            type="number"
                            placeholder="Year Built"
                            value={yearBuilt}
                            onChange={handleYearBuiltChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleUploadProperty}
                        >
                            Create Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadProperty;

