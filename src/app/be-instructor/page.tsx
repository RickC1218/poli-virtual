import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../components/icons/icons";

export default function Page() {
  const iconKeys = Object.keys(icons);

  return (
    <div>
      <h1>be-instructor</h1>
      <br />
      <div className="grid grid-cols-10 gap-4">
        {iconKeys.map((iconName) => (
          <div key={iconName}>
            <FontAwesomeIcon icon={icons[iconName as keyof typeof icons]} className="w-[21px] text-[--principal-blue]" />
          </div>
        ))}
      </div>
    </div>
  );
}