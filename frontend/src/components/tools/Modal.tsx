import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons/icons';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  useEffect(() => {
    if (isOpen) {
      // Evita que el scroll de fondo sea posible cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-transparent rounded-xl flex flex-col-reverse">
          {children}
          <button
            className="text-[--light] focus:outline-none flex flex-col justify-items-center p-3 items-end hover:text-[--principal-red]"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={icons.faCircleXmark} className={`text-3xl`} />
          </button>
        </div>
      </div>,
      document.body
  );
};

export default Modal;
