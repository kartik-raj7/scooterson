import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes';
import NotFoundPage from './pages/Errorpage';
import { Spin } from 'antd';
import Navbar from './components/common/Navbar';
import { useDispatch } from 'react-redux';

const AppRouter = () => {
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('user') != null);
  const dispatch = useDispatch();
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    dispatch({ type: 'DELETE_USER'});
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
                <>
                  <Navbar logOut={logOut} />
                  {(
                    (path === '/login' || path === '/signup'||path === '/home') ? (
                      !isLoggedIn ? <Component roles={roles} logIn={logIn}/> : <Navigate to='/dashboard'/>
                    ) : (
                      isLoggedIn ? <Component roles={roles} logOut={logOut}/> : <Navigate to='/login'/>
                    )
                  )}
                </>
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
