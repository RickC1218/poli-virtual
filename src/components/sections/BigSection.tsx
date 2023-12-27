import { ReactNode } from 'react';

import BigBannerCards from '../banners/BigBannerCards';

interface BigSectionProps {
  title: ReactNode;
  description: string;
}

const BigSection: React.FC<BigSectionProps> = ({ title, description }) => {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-center`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">{title}</h1>
        <p className='text-center lg:text-start'>{description}</p>
        <BigBannerCards 
          category={title as string}
        />
      </div>
    </div>
  );
};

export default BigSection;