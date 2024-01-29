import { useState } from 'react'
import './App.css'
import AppRouter from './Approuter'
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <>
     <Provider store={store}>
     <AppRouter/>
     </Provider>
    </>
  )
}

export default App
