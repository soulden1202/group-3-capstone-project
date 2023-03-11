import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(countries);
    setSubmitted(true);

    console.log(countries.filter((entry) => entry.name === searchQuery));
  };
  useEffect(() => {
    document.title = "Home - Livin it";
  }, []);

  //temp data below to test out the search bar
  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];

  return (
    <div className="fixed w-full h-full ">
      <div className=" bg-cover bg-homepageBg h-full w-full ">
        <div className="flex h-screen justify-center items-center">
          <div className="text-gray-800 text-center border border-gray-500 rounded-lg px-4 py-2 m-2">
            {submitted ? (
              <div>Your Searching result!</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  value={searchQuery}
                  onInput={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  id="header-search"
                  placeholder="Enter an address, neighborhood, city, or ZIP code"
                  name="s"
                />
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search
                </button>
              </form>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Home;
