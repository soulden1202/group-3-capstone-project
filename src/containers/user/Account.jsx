import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeName } from "../login/userSlice";
import { Oval } from "react-loader-spinner";
import {
  logout,
  logInWithEmailAndPassword,
} from "../../firebase/firebaseClient";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isChanging, setisChanging] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [dataReturned, setdataReturned] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [resMessage, setresMessage] = useState("");

  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPaswword, setRepeatNewPaswword] = useState("");
  const [error, seterror] = useState("");
  const [inputValid, setinputValid] = useState(false);

  const url =
    "https://studentrentapi20230411081843.azurewebsites.net/api/Auth/InforChange";

  const handleBlur = () => {
    if (repeatNewPaswword !== newPassword) {
      seterror("Password Doesn't Match");
      setinputValid(false);
    } else if (newPassword.length === 0 || repeatNewPaswword.length === 0) {
      seterror("Please enter a new password");
      setinputValid(false);
    } else {
      seterror("");
      setinputValid(true);
    }
  };
  const handleUpdateInfor = async () => {
    if (newPassword === repeatNewPaswword && newPassword.length > 0) {
      setIsloading(true);
      setdataReturned(false);
      setresMessage("");
      await axios({
        method: "post",
        url: url,
        headers: {},
        data: {
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      })
        .then((res) => {
          setIsloading(false);
          setdataReturned(true);
          if (res.status === 200) {
            setisSuccess(true);
            setcurrentPassword("");
            setNewPassword("");
            setRepeatNewPaswword("");
            setresMessage("Infor Updated Successfully!");
            dispatch(
              changeName({
                firstName: firstName,
                lastName: lastName,
              })
            );
            logout();
            logInWithEmailAndPassword(user.email, newPassword);
          }
        })
        .catch((err) => {
          setIsloading(false);
          setdataReturned(true);
          setisSuccess(false);
          console.log(err.response.data);
          if (err.response.data) setresMessage(err.response.data);
        });
    } else {
      handleBlur();
    }
  };

  return (
    <div className="z-0 fixed w-full h-full">
      <div className="flex items-center justify-center">
        {isChanging ? (
          <>
            <div className="flex flex-col">
              <div className="my-5 text-center font-bold text-lg">
                Update Your Information
              </div>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[150%] max-w-[150%]">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firtName"
                  >
                    First Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firtName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="currentPassword"
                  >
                    Current Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="currentPassword"
                    type="password"
                    placeholder=""
                    value={currentPassword}
                    onChange={(e) => setcurrentPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="newPassword"
                  >
                    New Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="newPassword"
                    type="password"
                    placeholder=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="repeatnewpassword"
                  >
                    Repeat New Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="repeatnewpassword"
                    type="password"
                    placeholder=""
                    value={repeatNewPaswword}
                    onChange={(e) => setRepeatNewPaswword(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {!inputValid && <span className="text-red-500">{error}</span>}
                </div>

                <div className="flex justify-center">
                  {isloading ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-row w-full mb-4 gap-5 justify-end">
                        <button
                          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => {
                            setisChanging(false);
                            setNewPassword("");
                            setRepeatNewPaswword("");
                            setcurrentPassword("");
                            setdataReturned(false);
                            setresMessage("");
                            setisSuccess(false);
                            setIsloading(false);
                            seterror("");
                            setinputValid(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className={` ${
                            inputValid
                              ? "bg-blue-500 hover:bg-blue-700"
                              : "bg-gray-500"
                          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                          type="button"
                          onClick={handleUpdateInfor}
                          disabled={!inputValid}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
              {dataReturned && (
                <div className="justify-end">
                  {isSuccess ? (
                    <span className="text-green-500">{resMessage}</span>
                  ) : (
                    <span className="text-red-500">{resMessage}</span>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-[10%]">
              <div className="font-bold text-center text-lg">
                Your Account Information
              </div>
              <div>
                <div>
                  <span className="font-bold">Email:</span>{" "}
                  <span>{user.email}</span>
                </div>
                <div>
                  <span className="font-bold">First Name:</span>{" "}
                  {user.firstName}
                </div>
                <div>
                  <span className="font-bold">LastName:</span> {user.lastName}
                </div>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setisChanging(true)}
              >
                Update Information
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
