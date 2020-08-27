import React, { useState, useEffect } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import StatBox from "./StatBox";
import HighestStatBox from "./HighestStatBox";
import Map from "./Map";
import Table from "./Table";
import Graph from "./Graph";
import "./styles/App.scss";
import worldwideIcon from "./img/worldwide.png";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  // Array of countries
  const [countries, setCountries] = useState([]);

  // Selected country
  const [country, setCountry] = useState("worldwide");

  // Info for chosen country
  const [countryInfo, setCountryInfo] = useState({});

  // Country with most cases
  const [mostCases, setMostCases] = useState({});

  // Country with most recovered
  const [mostRecovered, setMostRecovered] = useState({});

  // Country with highest cases
  const [mostDeaths, setMostDeaths] = useState({});

  // Date for table
  const [tableData, setTableData] = useState([]);

  // Initial center for map
  const [mapCenter, setMapCenter] = useState({ lat: 24.7839, lng: -10.5734 });

  // Initial zoom for map
  const [mapZoom, setMapZoom] = useState(2);

  const [mapCountries, setMapCountries] = useState([]);

  // Set worldwide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // Get country with most cases
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries?sort=cases")
      .then((response) => response.json())
      .then((data) => {
        setMostCases(data[0]);
      });
  }, []);

  // Get country with most recovered
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries?sort=recovered")
      .then((response) => response.json())
      .then((data) => {
        setMostRecovered(data[0]);
      });
  }, []);

  // Get country with most deaths
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries?sort=deaths")
      .then((response) => response.json())
      .then((data) => {
        setMostDeaths(data[0]);
      });
  }, []);

  // Populate dropdown menu
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountries();
  }, []);

  // Change country displayed in dropdown
  const changeCountry = async (e) => {
    const selectedCountry = e.target.value;

    // Get data for selected country
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(selectedCountry);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(2);
      });
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <div className="logo">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="470.41"
            height="441.09"
            viewBox="0 0 470.41 441.09"
          >
            <path
              class="cls-1"
              d="M230.74,520a31,31,0,0,0,19-1.41c6.51-2.58,8.51-7.76,4.84-14.2-1.92-2.83-3.84-5.66-6.09-7s-2.73-3-2.05-6.07c3.65-8.84,6.49-17.85,9.34-26.86.51-2.29,1.48-2.88,4.72-2.16,12.94,2.86,26.06,5,38.87,4.59,6.81-.1,6.81-.1,8.69,6.74.77,4.19.9,7.43-4,10.36-7.83,4.7-6.12,12.3,1.8,14.86,12.61,4.4,24,2.9,34.73-3.55,7-4.88,6.93-12.13-1.8-14.86-5.49-2-7.41-4.86-7.2-9.63.17-.77-.47-1.71-.3-2.48-.3-2.47-.13-3.24,3.44-4.05A144.23,144.23,0,0,0,366.26,456c2.76-1,3.57-.82,5.49,2,4.31,7.37,9.59,14.17,13.9,21.55,2.73,3,3,5.49-.25,8.78a10.77,10.77,0,0,0-2.63,4.24c-5.78,10.77,0,19.27,12.62,19.66l1.3.29c18.93-1.69,33.48-10.24,44.44-25.45A26.3,26.3,0,0,0,446,476.44c1.24-5.61-1.26-9.53-6.54-12.37a23.86,23.86,0,0,0-15-.81c-3.57.89-5-.26-6.08-3A206.31,206.31,0,0,0,404.15,438a2.42,2.42,0,0,1,.54-3.43,165.15,165.15,0,0,0,22.84-19.31c2-1.25,2.94-1.87,4.37-.71a98.31,98.31,0,0,0,11.45,9.25c2.23,1.34,3.66,2.49,2.95,5.7-.53,2.4-.08,4.18-.61,6.58-.71,3.21,2,6.32,5.19,7a13.26,13.26,0,0,0,7.77-.8c9.28-3.82,15.07-10.94,19.61-20A27.14,27.14,0,0,0,480.75,411c-.73-4.36-3.41-7.48-8.59-6.95a33.38,33.38,0,0,0-8.12,2.41c-1,.62-2.77,1.06-3.4.09l-12.87-10.42c-1.43-1.15-2.06-2.13-.72-4.36a208.38,208.38,0,0,0,24.55-57.58c.81.18,2.59-.26,5,.27,5,.27,8,1.78,9.39,7.12,2.43,8.1,10.47,9.88,15.46,2.58,7.3-10.14,10-22.16,5.84-34-3.86-9.25-11.27-10.05-17.06-2.93-3.66,5.07-7.05,5.16-11.88,4.09l-3.21-.71-.81-.18c.44-5.78,1.06-12.37,1.49-18.15.17-8.37-.83-15.31-1-22.08a.8.8,0,0,0,1-.62c8.92-2.22,17-4.63,25.17-7,3.57-.89,7-1,8.67,2.76.45,1.78,1.88,2.94,3.31,4.09,9,8.73,18.94,5.88,23.21-5.78l-2.43,11c3.9-17.61-1.14-33.19-12.35-47.72A45.41,45.41,0,0,0,512,219.2c-5.32-2.78-9.87-1.38-13.32,2.68s-4.46,8.65-4.67,13.42c.13,3.24-1.82,4.42-4.42,4.64-8.94,2-17.07,4.26-26,6.3-.3-2.48-1.58-4.37-2.05-6.08C457.52,224,447,210.41,436.21,197.59c-1.28-1.89-1.11-2.65.68-3.06a96.77,96.77,0,0,0,10.93-7.22c2.13-1.94,3.74-1.58,6-.28,1.45,1.13,3.88,1.66,6.3,2.2,4.86,1.08,9.75-1.86,10-6.63a13.94,13.94,0,0,0-.43-5.72A41.46,41.46,0,0,0,451.4,152a30.61,30.61,0,0,0-7.75-3.33c-4.85-1.07-8,1.45-9,6.05-.68,3.06-.38,5.54.56,9,.3,2.48.13,3.24-3.62,4.82a34.32,34.32,0,0,0-10.93,7.22c-2.3,2.71-3.91,2.35-5.36,1.22a185,185,0,0,0-45.28-29.3c-2.26-1.3-2.26-1.3-.6-4.95A57.32,57.32,0,0,0,377,120.21c.68-3.06,1.66-3.65,4.25-3.88,4.22.13,8.6-.5,11.71-3,4.72-2.17,6.08-8.29,3.69-12.84a5.6,5.6,0,0,0-2.05-6.07c-9.16-8.46-20.15-12.5-31.64-14.24-5.84-.49-11.67-1-17.37,1.78-6.17,1-8.51,7.76-5.48,13.25,1.92,2.83,3.84,5.66,6.74,7.91,2.25,1.31,1.91,2.84.43,5.72a46.64,46.64,0,0,0-7,20.14c-1,4.59-2.16,6-5.23,4.46a181.72,181.72,0,0,0-41.47-4.36c-2.59.23-3.23-.71-3.36-4a42.5,42.5,0,0,0-1.2-9.9c-1.11-2.66-.94-3.42,1-4.6l2.94-1.76c2.93-1.76,5.23-4.46,5.27-8.47-.77-4.19-3.84-5.67-6.9-7.15-12.78-3.63-24-2.9-34.91,4.32-7,4.87-5.95,11.54,2,14.09,6.31,2.2,8.06,5.8,7.85,10.58a10.72,10.72,0,0,0,.6,5c.3,2.48.13,3.24-2.47,3.47-9.74,1.86-19.49,3.72-28.77,7.29-1.95,1.17-3.4.05-3.87-1.67-3-5.49-6.87-11.15-10.7-16.82-3.2-4.73-5.76-8.51-.53-13a2.35,2.35,0,0,1,1.15-1.35c3.31-7.3-.52-13-9-13.23-11.84-.21-21.45,4.89-29.79,11.88a25.69,25.69,0,0,0-7.39,10.41c-2,5.18.39,9.73,6.05,11a31.13,31.13,0,0,0,9.24.44c1.79-.41,2.59-.23,3.87,1.66,3.67,6.43,8.15,13,12.62,19.66,1.28,1.89,1.11,2.66-.84,3.83-9.62,5.1-18.77,11.91-27.91,18.72-5.23,4.47-5.23,4.47-10.22.15-.81-.18-.64-.94-1.45-1.12a26.56,26.56,0,0,1-7.24-5.62c-1.28-1.89.85-3.83,1.19-5.36,1.05-8.6-4.1-12.16-12.4-9.17-1,.58-1.79.4-2.76,1-7.83,4.69-14.21,10.51-16.89,18.76-1.65,3.65-2.67,8.24.7,12.2,4.17,4.14,8.89,2,12.81-.38,2-1.17,2.77-1,4.68,1.84,2.73,3,4.82,5.09,8.69,6.75,2.26,1.3,2.09,2.07.94,3.42-8,9.46-13.64,19.47-19.42,30.24-7.92-2.56-16-4.35-24.74-7.09-4.05-.89-6.3-2.19-6.26-6.2.33-1.53-.94-3.42-1.41-5.13-3.29-12-13.81-14.31-23.13-6.73h0c-13.09,13.17-17.46,29.07-15.36,46.4C67,247.59,68,251,70.68,254c3.19,4.73,8,5.8,13.41,4.58a20.48,20.48,0,0,0,11.27-8.75c1.49-2.88,3.92-2.35,6.34-1.81,7.92,2.56,15.2,4.17,23.13,6.73l-.34,1.53c-3.86,13.6-4.49,27.92-4.14,41.66.3,2.47-.5,2.29-3.91,2.34A52.77,52.77,0,0,0,105.88,302c-2.59.23-3.4,0-4.68-1.84a12.87,12.87,0,0,0-5.45-6c-4.52-2.61-8.43-.26-11.07,4a22.07,22.07,0,0,0-1.9,12.43c.73,8.2,1.33,13.15,6.62,19.94,4.47,6.62,11.45,5.75,14-1.72,2.16-5.95,5.74-6.77,10.76-6.46,1.79-.41,3.41,0,5.19-.45,3.07,1.48,4.69,1.84,5,4.31a195.94,195.94,0,0,0,8.16,28.32c1.11,2.65.94,3.42-1.83,4.41-9.45,4.34-18.72,7.91-27.36,12.42-3.74,1.58-5.53,2-9.07-1.2a26,26,0,0,0-16.14-7.59c-3.41,0-4.55,1.4-6.85,4.1-3.27,3.29-5.14,11.72-4.71,17.44,1,10.67,1.8,14.85,6.75,23.18a38.65,38.65,0,0,0,6.39,9.45c5.29,6.79,10.74,12.82,19.47,15.55,7.92,2.56,14.43,0,16.94-7.49,1.83-4.42,2-9.19,1.43-14.15-.3-2.47.85-3.82,3.62-4.82a154.83,154.83,0,0,0,29.31-13.59c2.94-1.76,4.39-.64,5.67,1.25,3.83,5.67,8.65,10.76,14.1,16.78,2.09,2.07,5,4.32,5.46,6,.3,2.48-3.45,4.06-4.76,6.18-2.47,3.47-4.94,6.94-11.07,4l-3.23-.71c-6.81.1-9.28,3.57-8,9.46,2.65,11,17.6,24,28.46,24.78,7.45.85,11.87-3.8,9.18-10.82-2.85-6.25-.56-9,2.89-13,1-.58,2.29-2.7,3.27-3.29a3.09,3.09,0,0,1,4.39-.63c8.69,6.74,18.69,11.37,27.89,15.81,2.26,1.31,2.09,2.07,1.75,3.6-3.82,9.6-6.66,18.61-9.68,28.38-.34,1.54-1.31,2.12-3.1,2.53a22.61,22.61,0,0,0-12.51,2.85c-4.9,2.94-6.72,7.35-4.5,12.66,1.74,3.6,3.83,5.67,6.56,8.69C211.66,514.17,221,517.86,230.74,520Z"
              transform="translate(-65.74 -79.77)"
            />
          </svg>
          <h1>
            <span>Covid</span>Tracker
          </h1>
        </div>

        {/* Dropdown */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={changeCountry} value={country}>
            <MenuItem value="worldwide">
              Worldwide{" "}
              <img className="worldwide__icon" src={worldwideIcon} alt="" />
            </MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>
                {country.name}
                <img className="country__flag" src={country.flag} alt="" />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__inner">
        <div className="app__left">
          {/* StatBoxes */}
          <div className="app__stats">
            <StatBox
              title="Active Cases"
              figures={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <StatBox
              title="Recovered"
              figures={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <StatBox
              title="Deaths"
              figures={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </div>

          {/* Map */}
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />

          {/* HighestStatBoxes */}
          {/*<div className="highest__stats">
            <HighestStatBox
              title="Country With Highest Comfirmed Cases"
              country={mostCases.country}
              total={mostCases.cases}
            />
            <HighestStatBox
              title="Country With Highest Recovered Cases"
              country={mostRecovered.country}
              total={mostRecovered.recovered}
            />
            <HighestStatBox
              title="Country With Highest Death Cases"
              country={mostDeaths.country}
              total={mostDeaths.deaths}
            />
          </div>*/}
        </div>

        <div className="app__right">
          <Card>
            <CardContent>
              {/* Table */}
              <h3>Live Cases By Country</h3>
              <Table countries={tableData} />
              {/* Graph */}
              <h3 id="graphHeading">Worldwide New Cases</h3>
              <Graph />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
