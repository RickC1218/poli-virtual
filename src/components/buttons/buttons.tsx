import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  text: string;
  icon: IconProp; 
  color: 'red' | 'blue' | 'neutral';
  type: 'big' | 'small';
}

const Button: React.FC<ButtonProps> = ({ text, icon, color, type }) => {
  const getButtonStyle = () => {
    let style= '';
    const bigDimensions = 'w-[230px] h-[75px] p-2 ';
    const smallDimensions = 'w-[175px] h-[50px] p-3 ';
    switch (color) {
      case 'red':
        style += 'bg-[--principal-red] hover:shadow-lg hover:shadow-red-500/50 ';
        if (type === 'big') style += bigDimensions;
        else style += smallDimensions;
        break;
      case 'blue':
        style += 'bg-[--principal-blue] hover:shadow-lg hover:shadow-blue-500/50 ';
        if (type === 'big') style += bigDimensions;
        else style += smallDimensions;
        break;
      case 'neutral':
        style += 'bg-[--gray] hover:shadow-lg hover:shadow-gray-500/50 ';
        if (type === 'big') style += bigDimensions;
        else style += smallDimensions;
        break;
      default:
        return '';
    }
    return style;
  };

  return (
    <button className={`flex justify-around items-center text-[--white] text-base font-bold rounded-[10px] ${getButtonStyle()}`}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} className="m-2 w-[18px] text-[--white]" />}
    </button>
  );
};

export default Button;
