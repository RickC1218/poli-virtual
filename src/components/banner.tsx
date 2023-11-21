import icons from './icons/icons';
import Button from './buttons/buttons';
import Image from 'next/image';

import { ReactNode } from 'react';

interface BannerProps {
  title: ReactNode;
  description: string;
  button: boolean;
  image: boolean;
  addStyle?: string;
}

const Banner: React.FC<BannerProps> = ({ title, description, button, image, addStyle }) => {
  const text = "Registrarse";
  const color = "red";
  const size = "big";

  return (
    <div className={`flex flex-between ${addStyle} ${addStyle ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full h-full lg:h-[700px] flex-col lg:flex-row justify-between`}>
      <div className='w-full lg:w-[50%] p-6 md:p-20 self-center'>
        <h1 className="text-[32px] xl:text-[38px] pb-4 text-center lg:text-start">{title}</h1>
        <p>{description}</p>
        {button && (
          <div className="visible pt-5 lg:pt-10 flex justify-center lg:justify-start">
            <Button
              text={text}
              icon={icons.faRightToBracket}
              color={color}
              type={size}
            />
          </div>
        )}      
        </div>
      {image && (
        <div className="visible justify-self-end self-center pb-20 px-20 lg:p-0">
          <Image
            src="/image.jpg"
            alt="Picture of the author"
            width={750}
            height={535}
            className={`rounded-3xl lg:rounded-none ${addStyle ? 'lg:rounded-r-3xl' : 'lg:rounded-l-3xl'}`}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;