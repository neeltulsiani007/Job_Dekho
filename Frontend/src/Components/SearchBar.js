import React, { useState } from "react";
import BookData from "../Data.json";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";


function SearchBar({ placeholder, data }){
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleFilter = async(event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
   
    console.log("here")
    console.log(searchWord)
    const response = await axiosPrivate.post('/getinternsbystring',
    {search:searchWord},
    {
   
        withCredentials:true
    });
    console.log(response.data.recordset)

    var newFilter = response.data.recordset
   
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search ">
      <div className="searchInputs flex w-48 border-2 ">
        <input
        className="w-40 border-none"
          type="text" 
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon  ">
          {filteredData.length === 0 ? (
            <SearchIcon
            className=""
            />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult w-48 bg-zinc-50 ">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem  " href={value.link} target="_blank">
                <p class="w-48 border-[1px] text-lg font-sans hover:bg-zinc-200 border-zinc-100">{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;