import { FC, useEffect, useState } from "react";
import { classNames } from "../../../utils/classNames/classNames";
import Button, { ThemeButton } from "../../../components/button/button";

interface TempErrorButtonProps{
  className?:string
}


const TempErrorButton: FC<TempErrorButtonProps> = ({className}:TempErrorButtonProps) => {
  const [error, setError] = useState<boolean>(false)

  const throwError = () => setError(true)
  
  useEffect(() => {
    if(error)
        throw new Error()
  },[error])

  return (
    <Button 
      onClick={throwError}
      className={classNames("", {}, [className || ""])}
    >
      throw Error
    </Button>
  );
};

export default TempErrorButton;