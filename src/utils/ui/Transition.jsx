import React from 'react'
import {motion} from 'framer-motion'
const Transition = ({children}) => {
  return (
    <motion.main 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.75,ease:"easeOut"}}
    >
    {children}
    </motion.main>
  )
}

export default Transition