import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes';
import NotFoundPage from './pages/Errorpage';
import { Spin } from 'antd';
import Dashboard from './pages/Dashboard';

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  console.log(isAuthenticated)
  return (
    <Router>
      <Suspense fallback={<div className='loaderstyle'><Spin size="large" /></div>}>
        <Routes>
          {routes.map(({ path, component: Component, exact, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                isAuthenticated && (path === '/login' || path === '/signup') ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Component roles={roles} />
                )
              }
            />
          ))}
           <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' component={<NotFoundPage/>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
