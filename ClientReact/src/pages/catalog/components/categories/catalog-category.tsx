import { FC, useRef, useState } from "react";
import "./catalog-categories.css"
import { CategoryButton } from "./categoryButton/category-button";


interface CategoryProps {
  section: string
  categories: string[],
  fetchCategory: (categorySection: string, category: string) => void,
  activeCategories: string[]
}
 
export const CatalogCategory: FC<CategoryProps> = ({section, categories, activeCategories, fetchCategory}: CategoryProps) => {
  const [isAccordionOpen, setAccordionOpen] = useState<boolean>(false);
  const ref = useRef<HTMLUListElement>(null);  

  // function isCategories(obj: any): obj is Categories {  //так проверяется на тип интерфейс
  //   return "genres" in obj && "platforms" in obj
  // }

  function handleCategoryOuter(category: string){  
    fetchCategory(section ,category)
  }

  return ( 
  <div >    
    <button onClick={() => setAccordionOpen(!isAccordionOpen)} className="catalog-categories-section">{section}&nbsp;<i className="arrow-cat"></i></button>
    <ul 
      className="accordion-items"
      style={isAccordionOpen ? {height: ref?.current?.scrollHeight} : {height:"0px"}}
      ref={ref}>
      {
        categories.map(category =>           
            <li key={category}>
              <CategoryButton 
                section={section}
                handleCategoryOuter={handleCategoryOuter}
              >
                  {category}
              </CategoryButton>              
            </li>          
          )
      }
    </ul>
  </div> 
  );
}