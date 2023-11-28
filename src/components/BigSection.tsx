import { ReactNode } from 'react';

import BigBannerCards from './BigBannerCards';

interface BigSectionProps {
  title: ReactNode;
  description: string;
  enrolled: 'none' | 'enrolled' | 'completed' | 'in-progress';
  sectionType: 'courses' | 'instructors';
}

const BigSection: React.FC<BigSectionProps> = ({ title, description, enrolled, sectionType }) => {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-center`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">{title}</h1>
        <p className='text-center lg:text-start'>{description}</p>
        <BigBannerCards 
          enrolled={enrolled}
          type={sectionType}
        />
      </div>
    </div>
  );
};

export default BigSection;