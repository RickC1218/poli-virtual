import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons/icons';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='static'>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-transparent rounded-xl flex flex-col-reverse">
          {children}
          <button
            className="text-[--light] focus:outline-none flex flex-col justify-items-center p-3 items-end hover:text-[--principal-red]"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={icons.faCircleXmark} className={`text-3xl`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
