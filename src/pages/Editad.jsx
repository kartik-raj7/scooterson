import React from 'react'
import AdForm from '../components/adform/adForm'
import { useLocation } from 'react-router-dom';
import Transition from '../utils/ui/Transition';

const Editad = () => {
    const { state } = useLocation();
  return (
    <>
    <Transition>
    <AdForm data={state} type={'edit'}/>
    </Transition>
    </>
  )
}

export default Editad