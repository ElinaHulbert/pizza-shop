import React from "react";
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';


type CategoriesProps = {
  categoryId: number | string; 
  onChangeCategory: (i: number) => void;
}

const categories = [
  "All",
  "With meat",
  "Vegan",
  "Grilled",
  "Spicy",
  "Closed",
];

export const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {
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

