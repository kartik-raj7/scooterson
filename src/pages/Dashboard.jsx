// DashboardWrapper.js
import React, { useEffect, useState } from 'react';
import Clientdashboard from '../components/dashboards/Clientdashboard';
import Advertiserdashboard from '../components/dashboards/Advertiserdashboard';
import Contentcreatordashboard from '../components/dashboards/Contentcreatordashboard';
import Navbar from '../components/common/Navbar';
import { apiRouter } from '../services/ApiRouter';
import { axiosGet } from '../services/Api/axios';
import Transition from '../utils/ui/Transition';

const Dashboard = ({logOut}) => {
  const [userType, setUserType] = useState(null);
  const [userprofile,setUserProfile] = useState();
  const getUserprofile = async () => {
    const getMediaUrl = apiRouter.USER_PROFILE;
    try {
      const myContentresponse = await axiosGet(
        getMediaUrl,
        {},
        'application/json',
      );
      if (myContentresponse.status) {
        console.log(myContentresponse)
        setUserProfile(myContentresponse.user);
      } else {
        //clear local storage and logout
      }
    } catch (error) {
       ///clear local storage and logout
    }
  };
  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserType(userData.type);
    }
    getUserprofile();
  }, []);

  // Render the appropriate dashboard based on user type
  const renderDashboard = () => {
    let type = userType?.toLowerCase();
    switch (type) {
      case 'client':
        return <Clientdashboard/>
      case 'advertiser':
        return <Advertiserdashboard />;
      case 'content creator':
        return <Contentcreatordashboard />;
      default:
        return <></>;
    }
  };

  return <>
  <Transition>
  <Navbar user={userprofile} logOut={logOut}/>
  {renderDashboard()}
  </Transition>
  </>;
};

export default Dashboard;
