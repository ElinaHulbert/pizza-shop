import React from "react";
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';


type CategoriesProps = {
  categoryId: number; 
  onChangeCategory: (i: number) => void;
}

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {
  // useWhyDidYouUpdate("Categories", { categoryId, onChangeCategory })
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? "active" : ""}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
