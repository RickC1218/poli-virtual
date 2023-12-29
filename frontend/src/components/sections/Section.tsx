import { ReactNode } from 'react';

import BannerCards from '../banners/BannerCards';

interface SectionProps {
  title: ReactNode;
  description: string;
  enrolled: 'none' | 'enrolled';
  sectionType: 'courses' | 'instructors';
  addStyle?: string;
  subtype?: 'featured' | 'daily' | 'your-learning';
}

const Section: React.FC<SectionProps> = ({ title, description, enrolled, sectionType, addStyle, subtype }) => {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between ${addStyle}`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">{title}</h1>
        <p className='text-center lg:text-start'>{description}</p>
        <BannerCards 
          state={enrolled}
          type={sectionType}
          subtype={subtype}
        />
      </div>
    </div>
  );
};

export default Section;