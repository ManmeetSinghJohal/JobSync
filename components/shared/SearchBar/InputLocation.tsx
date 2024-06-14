import { Input } from "@/components/ui/input";

interface InputLocationProps {
  placeholder: string;
  value: string;
  extraClasses?: string;
  setValue: (value: string) => void;
  getPlacePredictions: (value: any) => void;
  setIsActive: (value: boolean) => void;
}
const InputLocation = ({
  placeholder,
  value,
  setValue,
  getPlacePredictions,
  extraClasses,
  setIsActive,
}: InputLocationProps) => {
  return (
    <Input
      className={`truncate rounded-none border-none px-0 text-sm font-bold leading-normal text-neutral-400 shadow-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-darkBg-3 dark:text-natural-6 ${extraClasses}`}
      placeholder={placeholder}
      value={value}
      onChange={(evt) => {
        getPlacePredictions({ input: evt.target.value });
        setValue(evt.target.value);
        setIsActive(true);
      }}
    />
  );
};

export default InputLocation;
