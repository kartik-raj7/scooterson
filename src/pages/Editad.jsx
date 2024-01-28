import React from 'react'
import AdForm from '../components/adform/adForm'
import { useLocation } from 'react-router-dom';

const Editad = () => {
    const { state } = useLocation();
  return (
    <>
    <AdForm data={state} type={'edit'}/>
    </>
  )
}

export default Editad