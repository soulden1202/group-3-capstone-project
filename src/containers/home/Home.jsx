import React from "react";
import { useState } from "react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //const filteredPosts = filterPosts(countries, searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(countries);

    console.log(countries.filter((entry) => entry.name === searchQuery));
  };

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
      <div className="flex h-full w-full ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="header-search">
            <span className="visually-hidden">Search here</span>
          </label>
          <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search houses"
            name="s"
          />
          <button type="submit">Search</button>
        </form>

        {/* <div>
              <Home searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}/>
              <ul>
                  {countries.map((post) => (
                      <li key={post.id}>{post.name}</li>
                  ))}
              </ul>
          </div> */}
      </div>
    </div>
    //temp data below to test out the search bar
  );
};

export default Home;
