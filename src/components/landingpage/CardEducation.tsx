import { FC } from 'react';

interface CardEducationProps {
  title?: string;
  description?: string;
}

const CardEducation: FC<CardEducationProps> = ({ 
  title = "Education", 
  description = "Exposing your inventory to incidents is a thing of the past." 
}) => {
  return (
    <div className="relative bg-[#50488A] rounded-3xl lg:rounded-[3vw] border-2 border-white flex flex-col items-center justify-center text-center p-8 w-full min-h-[220px] lg:w-[20vw] lg:h-[26vw] lg:p-[2.5vw] shadow-lg">
    
      {/* White circle at top */}
      <div className="absolute -top-5 lg:-top-[2.5vw] left-1/2 transform -translate-x-1/2 z-10 w-14 h-14 lg:w-[4vw] lg:h-[4vw] bg-white rounded-3xl shadow-xl"></div>
      
      {/* Green badge */}
      <div className="absolute bg-[#2EFFA3] rounded-full left-1/2 transform -translate-x-1/2 top-5 lg:top-[1vw] w-20 h-6 lg:w-[5vw] lg:h-[1.5vw]"></div>

      <h3 className="text-white font-bold mb-4 lg:mb-[2vw] text-lg lg:text-[1.5vw] mt-8">
        {title}
      </h3>
      <p className="text-white text-base lg:text-[1.2vw] leading-relaxed px-4 lg:px-[2vw]">
        {description}
      </p>
    </div>
  );
};

export default CardEducation;
