import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes';
import NotFoundPage from './pages/Errorpage';
import { Spin } from 'antd';
import Dashboard from './pages/Dashboard';

const AppRouter = () => {
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('user') != null);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };
  return (
    <Router>
      <Suspense fallback={<div className='loaderstyle'><Spin size="large" /></div>}>
        <Routes>
          {routes.map(({ path, component: Component, exact, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                // <Component roles={roles} />
                ((path === '/login' || path === '/signup')) ? (
                  !isLoggedIn?<Component roles={roles} logIn={logIn}/>:<Navigate to='/dashboard'/>
                ) : (
                  <Component roles={roles} logOut={logOut}/>
                )
              }
              />
            ))}
           {/* <Route path='/dashboard' element={(localStorage.getItem('user') != null && !Object.keys(localStorage.getItem('user'))?.length==0) ?<Dashboard />:<Navigate to='/login'/>} /> */}
          <Route path='*' component={<NotFoundPage/>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
