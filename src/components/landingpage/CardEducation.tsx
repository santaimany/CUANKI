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
    <div className="relative bg-[#50488A] rounded-[3vw] border border-white flex flex-col items-center justify-center text-center p-[2.5vw] w-[20vw] h-[26vw] sm:w-[28vw] sm:h-[36vw] sm:p-[3.5vw] md:w-[24vw] md:h-[30vw] md:p-[3vw] lg:w-[22vw] lg:h-[28vw] lg:p-[2.8vw] xl:w-[20vw] xl:h-[26vw] xl:p-[2.5vw]">
    
      <div className="absolute -top-[2.5vw] left-1/2 transform -translate-x-1/2 z-10 w-[4vw] h-[4vw] bg-white rounded-3xl shadow-xl sm:-top-[3.5vw] sm:w-[5.5vw] sm:h-[5.5vw] md:-top-[3vw] md:w-[4.8vw] md:h-[4.8vw] lg:-top-[2.8vw] lg:w-[4.3vw] lg:h-[4.3vw] xl:-top-[2.5vw] xl:w-[4vw] xl:h-[4vw]"></div>
      <div className="absolute bg-[#2EFFA3] rounded-full left-1/2 transform -translate-x-1/2 top-[1vw] w-[5vw] h-[1.5vw] sm:top-[1.4vw] sm:w-[7vw] sm:h-[2vw] md:top-[1.2vw] md:w-[6vw] md:h-[1.8vw] lg:top-[1.1vw] lg:w-[5.5vw] lg:h-[1.6vw] xl:top-[1vw] xl:w-[5vw] xl:h-[1.5vw]"></div>

      <h3 className="text-white font-bold mb-[2vw] text-[1.5vw] sm:mb-[2.8vw] sm:text-[2.1vw] md:mb-[2.4vw] md:text-[1.8vw] lg:mb-[2.2vw] lg:text-[1.6vw] xl:mb-[2vw] xl:text-[1.5vw]">
        {title}
      </h3>
      <p className="text-white leading-relaxed px-[2vw] text-[1.2vw] sm:px-[2.8vw] sm:text-[1.7vw] md:px-[2.4vw] md:text-[1.4vw] lg:px-[2.2vw] lg:text-[1.3vw] xl:px-[2vw] xl:text-[1.2vw]">
        {description}
      </p>
    </div>
  );
};

export default CardEducation;
