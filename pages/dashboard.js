
import React from 'react';
import Cookies from 'cookies'
import Router from "next/router"
import Sidebar from '@/components/Sidebar';
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
          return {
            props: { currentUsername: tokenUsername},
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
  
  export default function Home({ currentUsername }) {
    

    return (
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col my-8 text-left mx-4">
          <h1 className="text-3xl font-bold mb-8">Welcome to Guarding List App!</h1>
          <div className="flex items-center mb-4">
            <p className="text-lg">1. Go to <strong>People</strong> to set up the people for the list, and choose the list order.</p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg">2. Navigate to <strong>Stations</strong> to set up the stations.</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg">3. Go to <strong>Generate list</strong> to create the guarding list.</p>
            <p className="mx-2 text-base"> You can choose between 2 list types:</p>
            <p className="mx-3 text-base"> # A list with start time and end time, and each person will get an equal shift time.</p>
            <p className="mx-3 text-base"> # A list with fixed shift time, and amount of shifts to generate.</p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg">4. A list is generated in a special form specifically for WhatsApp so your team doesn't need to download any app. It is <strong>Directly</strong> at everyones phones!</p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg">5. <strong>Share</strong> or <strong>Copy</strong> the list directly to WhatsApp!</p>
          </div>
        </div>
      </div>
    )
  }
