import icons from './icons/icons';
import Button from './buttons/Buttons';
import Image from 'next/image';
import Link from 'next/link';

import { ReactNode } from 'react';

interface BannerProps {
  title: ReactNode;
  description: string;
  button: boolean;
  image: boolean;
  addStyle?: string;
}

const Banner: React.FC<BannerProps> = ({ title, description, button, image, addStyle }) => {
  const color = "red";
  const size = "big";

  const registerLink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };

  const beinstructor = {
    href: "/common/be-instructor",
    name: "Sé instructor",
    label: "Sé instructor",
  };

  return (
    <div className={`flex flex-between ${addStyle} ${addStyle ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full h-full lg:h-[700px] flex-col lg:flex-row justify-between`}>
      <div className='w-full lg:w-[50%] p-6 md:p-20 self-center'>
        <h1 className="text-[32px] xl:text-[38px] pb-4 text-center lg:text-start">{title}</h1>
        <p className='text-center lg:text-start'>{description}</p>
        {button && !addStyle &&(
          <div className="visible pt-5 lg:pt-10 flex justify-center lg:justify-start">
            <Link
              key={registerLink.name}
              href={registerLink.href}
              className="block mx-2 md:flex-none"
            >
              <Button
                text={registerLink.name}
                icon={icons.faRightToBracket}
                type={size}
                color={color}
              />
            </Link>
          </div>
        )}
        {button && addStyle && (
          <div className="visible pt-5 lg:pt-10 flex justify-center lg:justify-start">
            <Link
              key={beinstructor.name}
              href={beinstructor.href}
              className="block mx-2 md:flex-none"
            >
              <Button
                text={beinstructor.name}
                icon={icons.faBolt}
                type={size}
                color='blue'
              />
            </Link>
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