import { useState } from "react";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent) => {
    setValue(e.target.value);
  };
  return [value, onChange] as [string, typeof onChange];
};

export default useInput;
