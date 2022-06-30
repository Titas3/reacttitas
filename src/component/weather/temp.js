// https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=63699b6405ece30d636453a599bba7fe

import React, { useEffect, useState } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
    const [searchValue,setSearchValue]=useState("kolkata");
    const [tempInfo, setTempInfo]= useState({})
    const getWeatherInfo = async() =>{
        try {
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=63699b6405ece30d636453a599bba7fe`;
       const res=await fetch(url);
       const data =await res.json();
       console.log(data);
       const {temp,humidity,pressure}= data.main;
       const { main: weathermood} = data.weather[0];
       const {name} = data;
       const {speed} = data.wind;
       const { country, sunset } = data.sys;

       const myNewweatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
       }
       setTempInfo(myNewweatherInfo);
       console.log(temp);

        } catch (error) {
            console.log(error)
            
        }

    };
    useEffect(()=>{
        getWeatherInfo();
    },[]);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
                     className="searchTerm"
                     value={searchValue}
                     onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      {/* Our temp card */}
     <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
