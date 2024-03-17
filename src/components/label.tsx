import { IconType } from "react-icons";

type LabelProps = {
  text: string;
  icon?: IconType;
};

const Label = ({ text, icon: Icon }: LabelProps) => {
  return (
    <div className="flex flex-row gap-x-1 items-center mb-2 text-sm mt-6">
      <span>{text}</span>
      {Icon && <Icon />}
    </div>
  );
};

export default Label;
