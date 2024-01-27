// DashboardWrapper.js
import React, { useEffect, useState } from 'react';
import Clientdashboard from '../components/dashboards/Clientdashboard';
import Advertiserdashboard from '../components/dashboards/Advertiserdashboard';
import Contentcreatordashboard from '../components/dashboards/Contentcreatordashboard';
import Navbar from '../components/common/Navbar';

const Dashboard = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Retrieve user type from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserType(userData.type);
    }
  }, []);

  // Render the appropriate dashboard based on user type
  const renderDashboard = () => {
    switch (userType) {
      case 'Client':
        return <Clientdashboard/>
      case 'Advertiser':
        return <Advertiserdashboard />;
      case 'Content Creator':
        return <Contentcreatordashboard />;
      default:
        return <></>;
    }
  };

  return <>
  <Navbar/>
  {renderDashboard()}</>;
};

export default Dashboard;
