import React, { useState } from "react";
import "./Search.css";
import IndividualChat from "../Features/IndividualChat";
import SearchResult from "./SearchResult";
const Search = ({ fetchUsersData,fetchFreindsData }) => {
  const [searchInput, setSearchInput] = useState();
  const [foundUser, setFoundUser] = useState("No results");


  const serachThePerson = (e) => {
    setSearchInput(e.target.value);
    console.log("the length", e.target.value.length);
    setFoundUser(() => {
      return fetchUsersData
        .filter((userF) => {
          return (
            userF.username.slice(0, e.target.value.length) === e.target.value
          );
        })
        .map((found) => {
          console.log(found.username);
          return <SearchResult person={found} fetchFreindsData={fetchFreindsData}/>;
        });
    });
  };
  return (
    <div className="post">
      <div className="search-parent">
        <input
          type="text"
          value={searchInput}
          className="search-bar"
          placeholder="Search..."
          onChange={serachThePerson}
        />
        {foundUser}
      </div>
    </div>
  );
};

export default Search;
