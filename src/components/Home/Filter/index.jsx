import React from "react";
import FilterListToggle from "../../common/FilterListToggle";
import { categoryList, ratingList } from "../../../constants";
import "./styles.css";
import CheckboxProton from "../../common/CheckboxProton";
import SliderProton from "../../common/SliderProton";
const Filter = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectRating,
  cuisines,
  changeChecked,
  selectedPrice,
  changedPrice

}) => {
  return (
    <div>
      <h1>Filter</h1>
      <div className="input-group">
        <p className="label">Category</p>
        <div className="filter_toggle">
          <FilterListToggle
            options={categoryList}
            value={selectedCategory}
            selectToggle={selectCategory}
          />
        </div>
      </div>

      <div className="input-group">
        <p className="label">Cuisines</p>
        <div className="filter_toggle-check">
          {cuisines &&
            cuisines.map((cuisine) => (
              <CheckboxProton
                key={cuisine.id}
                cuisine={cuisine}
                changeChecked={changeChecked}
              />
            ))}
        </div>
      </div>

      <div className="input-group">
        <p className="label">Price Range</p>
        <div className="filter_toggle-slider">
         <SliderProton
         value={selectedPrice}
         changePrice={changedPrice}
         />
        </div>
      </div>

      <div className="input-group">
        <p className="label">Star Rating</p>
        <div className="filter_toggle">
          <FilterListToggle
            options={ratingList}
            value={selectedRating}
            selectToggle={selectRating}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
