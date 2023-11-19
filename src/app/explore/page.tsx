import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../components/icons/icons";
import Button from "../../components/buttons/buttons";

export default function Page() {
  const iconKeys = Object.keys(icons);

  return (
    <div>
      <h1>explore</h1>
      <h2 className="text-[32px]">Icons</h2>
      <div className="grid grid-cols-10 gap-4">
        {iconKeys.map((iconName) => (
          <div key={iconName}>
            <FontAwesomeIcon icon={icons[iconName as keyof typeof icons]} className="w-[21px] hover:text-[--principal-red]" />
          </div>
        ))}
      </div>
      <br />
      <h2 className="text-[32px]">Buttons</h2>
      <div className="flex justify-around m-2">
        <Button text="Registrarse" icon={icons.faBook} color="red" type="small"/>
        <Button text="Iniciar sesión" icon={icons.faEnvelope} color="blue" type="small"/>
        <Button text="Contactanos" icon={icons.faUser} color="neutral" type="small" />
      </div>
      <br />
      <div className="flex justify-around">
      <Button text="Registrarse" icon={icons.faBook} color="red" type="big"/>
        <Button text="Iniciar sesión" icon={icons.faEnvelope} color="blue" type="big"/>
        <Button text="Cambiar contraseña" icon={icons.faUser} color="neutral" type="big" />
      </div>
    </div>
  );
}