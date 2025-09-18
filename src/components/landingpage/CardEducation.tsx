import React from 'react';

interface CardEducationProps {
  title?: string;
  description?: string;
}

const CardEducation: React.FC<CardEducationProps> = ({ 
  title = "Education", 
  description = "Exposing your inventory to incidents is a thing of the past." 
}) => {
  return (
    <div className="relative bg-[#50488A] rounded-[4rem] border border-white flex flex-col items-center justify-center text-center p-10 w-96 h-[35rem]">
    
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 w-20 h-20 bg-white rounded-3xl shadow-xl"></div>
      <div className="absolute bg-[#2EFFA3] rounded-full left-1/2 transform -translate-x-1/2 top-4 w-30 h-10"></div>
      
      <h3 className="text-white font-bold mb-8 text-4xl">
        {title}
      </h3>
      <p className="text-white leading-relaxed px-8 text-2xl">
        {description}
      </p>
    </div>
  );
};

export default CardEducation;
