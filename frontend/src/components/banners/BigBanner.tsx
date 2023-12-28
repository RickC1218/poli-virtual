import icons from '../icons/icons';
import Button from '../buttons/Button';
import Image from 'next/image';
import Link from 'next/link';

import { ReactNode } from 'react';

interface BigBannerProps {
  title: ReactNode;
  description: string;
  button: boolean;
  image: boolean;
  textButton?: string;
}

const BigBanner: React.FC<BigBannerProps> = ({ title, description, button, image, textButton }) => {
  const color = "red";
  const size = "big";

  const registerLink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };
  const contactLink = {
    href: "/common/contact",
    name: "Contacto",
    label: "Contáctanos",
  };

  return (
    <div className={`flex flex-col w-full ${image ? 'h-full xs:h-[1127px]' : 'h-full xs:h-[440px]' } px-6 py-12 xs:p-20 justify-items-center items-center`}>
      <h1 className="text-[38px] lg:text-[80px] pb-4 text-center">{title}</h1>
      <p className='lg:w-[65%] pb-[30px] text-center lg:text-start'>{description}</p>
      {image && (
        <div className="visible self-center">
          <Image
            src="/image.jpg"
            alt="Picture of the author"
            width={900}
            height={600}
            className={'rounded-3xl'}
          />
        </div>
      )}
      {button && (
        <div className="visible pt-5 lg:pt-10">
          <Link
              key={textButton ? contactLink.name : registerLink.name}
              href={textButton ? contactLink.href : registerLink.href}
              className="block mx-2 md:flex-none"
            >
              <Button
                text={textButton ? contactLink.label : registerLink.label}
                icon={textButton ? icons.faEnvelope : icons.faRightToBracket}
                color={color}
                type={size}
              />
            </Link>
        </div>
      )}
    </div>
  );
};

export default BigBanner;