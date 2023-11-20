import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons/icons';

interface BannerThemeCardProps {
  title: string;
  duration: number;
}

const BannerSubThemeCard: React.FC<BannerThemeCardProps> = ({ title, duration }) => {
  return (
    <div className="flex justify-between items-center bg-[--white] rounded-[24px] p-3 ml-10 my-1 border border-[--light-gray]">
      <div className='w-[50px] h-[50px] rounded-xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50'>
        <FontAwesomeIcon icon={icons.faTv} className="p-2 text-[--white]" />
      </div>
      <div className='text-start w-[80%] mx-2'>
        <p className="text-base font-bold">{title}</p>
      </div>
      <div>
        <p className="text-base font-bold">{duration} minutos</p>
      </div>
    </div>
  );
};

export default BannerSubThemeCard;