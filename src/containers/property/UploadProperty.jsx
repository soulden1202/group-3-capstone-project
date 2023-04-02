import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { propertiesAdded } from "../login/userSlice";
import usePremiumStatus from "../../stripe/usePremiumStatus";
const UploadProperty = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user.id, navigate]);

  const [coverImage, setCoverImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [otherImagesData, setOtherImagesData] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [numberOfBedroom, setNumberOfBedroom] = useState("");
  const [numberOfBathroom, setNumberOfBathroom] = useState("");
  const [acreage, setAcreage] = useState("");

  const [price, setPrice] = useState("");

  const accountId = useSelector((state) => state.user.id);
  const currentProperties = user.properties;
  const isPremium = usePremiumStatus(user);

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return {
        file: file,
        name: file.name,
      };
    });
    setOtherImagesData([...otherImagesData, ...newImages]);
    setOtherImages([...otherImages, ...files]);
  };

  const handleRemoveOtherImage = (index) => {
    const newOtherImages = [...otherImages];
    newOtherImages.splice(index, 1);
    setOtherImages(newOtherImages);
    const newOtherImagesData = [...otherImagesData];
    newOtherImagesData.splice(index, 1);
    setOtherImagesData(newOtherImagesData);
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

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const [isUploading, setIsUploading] = useState(false);
  const handleUploadProperty = async () => {
    setIsUploading(true);
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
    formData.append("email", user.email);
    formData.append("price", price);
    formData.append("propertyId", "");

    try {
      const response = await fetch(
        "https://studentrentapi20230322222647.azurewebsites.net/api/Property/Add",
        //"https://localhost:7228/api/Property/Add",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsUploading(false);
      alert("Property uploaded successfully!");
      dispatch(
        propertiesAdded({
          properties: currentProperties + 1,
        })
      );

      // setCoverImage(null);
      // setOtherImages([]);
      // setOtherImagesData([]);
      // setAddress("");
      // setCity("");
      // setAcreage("");
      // setState("");
      // setZipCode("");
      // setNumberOfBathroom("");
      // setNumberOfBedroom("");
      // setPrice("");
    } catch (error) {
      console.error("Error:", error);
      setIsUploading(false);
      alert("Failed to upload property.");
    }
  };

  return (
    <>
      {!isPremium && currentProperties >= 5 ? (
        <>
          <div className=" mt-[15%] text-center flex flex-col items-center justify-center sm:ml-0 text-lg md:text-xl">
            <p>You had exceed number of free properties listing.</p>
            <br></br>
            <p>Consider subscribe to our product for unlimited listing.</p>
            <br></br>
            <p className="">
              Check out our{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => navigate("/pricing")}
              >
                pricing page
              </span>{" "}
              <br></br>
              for more information.
            </p>
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-10 sm:ml-0 ml-5 z-0">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="coverImage"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="otherImages"
                >
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
              {otherImages.length > 0 && (
                <div className="mb-4">
                  <p className="font-bold mb-2">Other Images Selected:</p>
                  <ul>
                    {otherImages.map((image, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <span>{image.name}</span>
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => handleRemoveOtherImage(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  value={state}
                  onChange={handleStateChange}
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
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="zipcode"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="numberOfBedroom"
                >
                  Number of Bedrooms:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numberOfBedroom"
                  type="text"
                  placeholder="Number of Bedrooms"
                  value={numberOfBedroom}
                  onChange={handleNumberOfBedroomChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="numberOfBathroom"
                >
                  Number of Bathrooms:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numberOfBathroom"
                  type="text"
                  placeholder="Number of Bathrooms"
                  value={numberOfBathroom}
                  onChange={handleNumberOfBathroomChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="acreage"
                >
                  Acreage:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="acreage"
                  type="text"
                  placeholder="Acreage"
                  value={acreage}
                  onChange={handleAcreageChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="text"
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
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadProperty;
