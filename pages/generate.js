import { useState } from "react"
import Sidebar from "../components/Sidebar";
import FixedTimeList from "@/components/FixedTimeList"
import StartEndTimeList from "@/components/StartEndTimeList"
import ListSelector from "@/components/ListSelector"
import Cookies from 'cookies'
import Router from "next/router"
const Name = require('../models/Name');
const Station = require('../models/Station')
const jwt = require('jsonwebtoken');

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
      return { props: { names: [], stations: [] } };
    } else {
      const decodedToken = verifyToken(tokenCookie);
      if (decodedToken) { // Token is valid 
        const tokenUsername = decodedToken.username
        const names = await Name.findOne({ username: tokenUsername })
        let namesArray = [], stationsArray = [];
        if (names) {
          const namesObject = names.toObject();
          namesArray = namesObject.names
        }
        const stations = await Station.findOne({ username: tokenUsername })
        if (stations) {
          const stationsObject = stations.toObject();
          stationsArray = stationsObject.stations
        }
        return {
          props: { currentUsername: tokenUsername, serverNames: namesArray, serverStations: stationsArray },
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

export default function Generate({ currentUsername, serverNames, serverStations }) {
      
    const [nameIndex, setNameIndex] = useState(0)
    const [isFixedTime, setIsFixedTime] = useState(false)
    const [isStartEndTime, setIsStartEndTime] = useState(false)

  return (
    <div className="flex flex-row">
        <Sidebar />
        <div className="flex justify-center flex-grow">
            {!isFixedTime && !isStartEndTime && <ListSelector setIsFixedTimeList={setIsFixedTime} setIsStartEndList={setIsStartEndTime} />}
            {isFixedTime && <FixedTimeList names={serverNames} stations={serverStations} nameIndex={nameIndex} setNameIndex={setNameIndex} setIsFixedTimeList={setIsFixedTime}/>}
            {isStartEndTime && <StartEndTimeList names={serverNames} stations={serverStations} nameIndex={nameIndex} setNameIndex={setNameIndex} setIsStartEndList={setIsStartEndTime}/>}
        </div>
    </div>
  );
};

