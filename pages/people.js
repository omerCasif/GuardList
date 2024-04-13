import Sidebar from "../components/Sidebar";
import NamesList from "@/components/NamesList"
import { useState } from "react"
import Cookies from 'cookies'
import Router from "next/router"
const Name = require('../models/Name');
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
      return { props: { names: [] } };
    } else {
      const decodedToken = verifyToken(tokenCookie);
      if (decodedToken) { // Token is valid 
        const tokenUsername = decodedToken.username
        const names = await Name.findOne({ username: tokenUsername })
        let namesArray = []
        if (names) {
          const namesObject = names.toObject();
          namesArray = namesObject.names
        }
        return {
          props: { currentUsername: tokenUsername, serverNames: namesArray },
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

export default function People_Page({ currentUsername, serverNames }) {
    
    const [names, setNames] = useState(serverNames)  
    const [nameIndex, setNameIndex] = useState(0)

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex justify-center flex-grow">
        <NamesList 
          currentUsername={currentUsername} 
          names={names} 
          setNames={setNames} 
          nameIndex={nameIndex} 
          setNameIndex={setNameIndex} /> 
      </div>    
    </div>
  );
};

