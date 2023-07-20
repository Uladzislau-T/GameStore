import { FC, useEffect, useState } from "react";
import "./category-button.css"
import { Categories } from "../../../types";


interface ButtonProps {
  handleCategoryOuter: (category: string) => void, 
  section: string,
  children: string
}
 
export const CategoryButton: FC<ButtonProps> = ({handleCategoryOuter, section, children}) => {
  const [isActive, setActive] = useState<boolean>(false);

  function calculateIfButtonColored(){
    let obj: Categories = JSON.parse(localStorage.getItem("catalog-game-filter") ?? "{}")
   
    let temp = obj[section as keyof typeof obj]
    

    for (let i = 0; i < temp.length; i++) {
      if(temp[i] === children){
        setActive(true)        

        break
      }     
    }
  }

  useEffect(() => {
    // let aa = isActiveButton2
    calculateIfButtonColored()
  },[])  
  

  function handleCategoryInner(category: string): void {
    setActive(!isActive) 

    handleCategoryOuter(category)
  }

  return ( 
    <div>
      <button 
        className={"catalog-categories-accordion-btn " } 
        style={isActive ? {backgroundColor:"rgb(77, 47, 123, 0.5)", color:"white"} : {}}
        onClick={() => (handleCategoryInner(children))}
      >
          {children}
          <i className={"fa-solid fa-check fa-sm " + (isActive ? "check-active" : "")}></i>
      </button>

    </div>
  );
}