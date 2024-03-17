import { Button } from "@nextui-org/react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import Label from "./label";

type CounterProps = {
  label: string;
  labelDescription?: string;
  count: number;
  setCount: (value: number) => void;
};

const Counter = ({ label, count, setCount }: CounterProps) => {
  return (
    <div className="flex flex-col">
      <Label text={label} />
      <div className="flex flex-row items-center gap-x-1">
        <Button
          isIconOnly
          className="bg-red-600"
          size="sm"
          onClick={() => {
            if (count === 0) return;
            setCount(count - 1);
          }}
        >
          <RiSubtractFill size={16} />
        </Button>
        <span className="text-lg min-w-8 text-center">{count}</span>
        <Button
          isIconOnly
          className="bg-green-600"
          size="sm"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <RiAddFill size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
