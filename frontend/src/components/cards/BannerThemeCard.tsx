'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import icons from '../icons/icons';
import BannerSubThemeCard from './BannerSubThemeCard';

export interface BannerThemeCardProps {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  onEdit: () => void;
}

const BannerThemeCard: React.FC<BannerThemeCardProps> = ({ title, description, cuantity, duration, onEdit }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="flex items-center bg-[--white] rounded-[32px] p-4 my-1 border-2 border-[--medium-gray]">
        <button onClick={handleExpand}>
          <div className='w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50'>
            <FontAwesomeIcon icon={icons.faChevronRight} className={`text-[--white] transform ${expanded ? 'rotate-90' : 'rotate-0'}`} />
          </div>
        </button>
        <div onClick={onEdit} className='text-start grow justify-self-start mx-2 cursor-pointer'>
          <p className="text-base line-clamp-2">
            <span className='font-bold'>{title}:</span> {description}</p>
        </div>
        <div className='pr-16'>
          <p className="text-base font-bold">{cuantity} clases - {duration} minutos</p>
        </div>
      </div>
      {expanded && (
        <div className="w-full mb-4">
          <BannerSubThemeCard title="Subtema 1" duration={60} parentId={title} />
          <BannerSubThemeCard title="Subtema 2" duration={45} parentId={title}/>
          <BannerSubThemeCard title="Subtema 3" duration={30} parentId={title}/>
        </div>
      )}
    </>
  );
};

export default BannerThemeCard;