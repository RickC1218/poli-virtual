import { ReactNode } from 'react';

import BannerCards from './BannerCards';

interface SectionProps {
  title: ReactNode;
  description: string;
  enrolled: 'none' | 'enrolled';
  sectionType: 'courses' | 'instructors';
  addStyle?: string;
}

const Section: React.FC<SectionProps> = ({ title, description, enrolled, sectionType, addStyle }) => {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between ${addStyle}`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">{title}</h1>
        <p className='text-center lg:text-start'>{description}</p>
        <BannerCards 
          enrolled={enrolled}
          type={sectionType}
        />
      </div>
    </div>
  );
};

export default Section;