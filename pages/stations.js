import Sidebar from "../components/Sidebar";
import { useState } from "react"
import Cookies from 'cookies'
import Router from "next/router"
const jwt = require('jsonwebtoken');
import StationsList from "@/components/StationsList"
const Station = require('../models/Station')

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, 'secret');
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const getServerSideProps = async ({ req, res }) => {
  try {
    const cookies = new Cookies(req, res);
    const tokenCookie = cookies.get('token');
    if (!tokenCookie) {
      res.statusCode = 403;
      return { props: { stations: [] }};
    } else {
      const decodedToken = verifyToken(tokenCookie);
      if (decodedToken) { // Token is valid 
        const tokenUsername = decodedToken.username    
        let stationsArray = [];
        const stations = await Station.findOne({ username: tokenUsername })
        if (stations) {
          const stationsObject = stations.toObject();
          stationsArray = stationsObject.stations
        }
        return {
          props: { currentUsername: tokenUsername, serverStations: stationsArray },
        };
      }
      else {
        Router.push('/')
      }
    }
  }
  catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        error: 'Error fetching data',
      },
    };
  }
};

export default function Stations_Page({ currentUsername, serverStations }) {
    
  const [stations, setStations] = useState(serverStations)

  return (
    <div className="flex flex-row">
        <Sidebar />
        <div className="flex justify-center flex-grow">
          <StationsList currentUsername={currentUsername} stations={stations} setStations={setStations} />
        </div>
    </div>
  );
};

