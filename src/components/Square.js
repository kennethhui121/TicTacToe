import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => (
  <motion.button 
    className="square" 
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {value}
  </motion.button>
);

export default Square;
