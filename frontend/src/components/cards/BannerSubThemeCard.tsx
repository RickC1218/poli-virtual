import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons/icons';

interface BannerSubThemeCardProps {
  title: string;
  duration: number;
  parentId: string;
  action: "add" | "edit" | "delete" | "read";
}

const BannerSubThemeCard: React.FC<BannerSubThemeCardProps> = ({ title, duration, parentId, action }) => {
  return (
    <div className="flex justify-between items-center bg-[--white] rounded-[24px] p-3 ml-10 my-1 border border-[--high-gray]">
      <div className='w-[50px] h-[50px] rounded-xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50'>
        <FontAwesomeIcon icon={icons.faTv} className="p-2 text-[--white]" />
      </div>
      <div className='text-start grow mx-2'>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-[--medium-gray]">{parentId}</p>
      </div>
      {action === "read" && (
        <div>
          <p className="text-base font-bold">{duration} minutos</p>
        </div>
      )}
    </div>
  );
};

export default BannerSubThemeCard;