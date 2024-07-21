import React from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";

const Card = ({ icon: Icon, styles, text, value, description }) => {
  return (
    <div className="card bg-white w-64 px-2 h-52 rounded-2xl p-1">
      <div
      className="card-icon m-4">
        <Icon className={styles}/>
      </div>
      <div
       className="card-content gap-2 flex flex-col m-5">
      <div>{text}</div>
        <div
        className="card-value">{value}</div>
        <div 
        className="card-description text-primaryColor">
          <FaArrowTrendUp className='text-sm'/>
          <span className='text-xs ml-1'>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
