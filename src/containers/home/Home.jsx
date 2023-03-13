import React from "react";
import { useEffect } from "react";
import "./Home.css";


const Home = () => {
  useEffect(() => {
    document.title = "Home - Livin it";
  }, []);

    const titleStyles = {
        fontSize: "40px",
    };

    const parStyle = {
        fontSize: "20px",
    };


  return (
    <div className="fixed w-full h-full ">
      <div className=" bg-cover bg-homepageBg h-full w-full ">
          <div className="information flex justify-center items-center">
              <h1 style={titleStyles}>Let's find your dream house</h1>
          </div>
          <div className="par flex justify-center items-center">
              <p style={parStyle}>At Livin it we don't just show you houses we make your dream come true</p>
          </div>
          <div className="p-3 flex justify-center items-center">
              <form action={"/property"}>
                  <button className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"><strong>Find your home today</strong></button>
              </form>
          </div>
        </div>
    </div>
        );
};
export default Home;
