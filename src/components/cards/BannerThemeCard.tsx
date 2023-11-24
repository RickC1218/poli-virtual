import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons/icons';

interface BannerThemeCardProps {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
}

const BannerThemeCard: React.FC<BannerThemeCardProps> = ({ title, description, cuantity, duration }) => {
  return (
    <div className="flex justify-between items-center bg-[--white] rounded-[32px] p-4 border-2 border-[--medium-gray]">
      <div className='w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50'>
        <FontAwesomeIcon icon={icons.faChevronRight} className="p-2 text-[--white] w-[36px]" />
      </div>
      <div className='text-start w-[80%] mx-2'>
        <p className="text-base line-clamp-2">
          <span className='font-bold'>{title}:</span> {description}</p>
      </div>
      <div>
        <p className="text-base font-bold">{cuantity} clases - {duration} minutos</p>
      </div>
    </div>
  );
};

export default BannerThemeCard;