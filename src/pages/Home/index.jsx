import React, { useState } from "react";
import SearchBar from "../../components/Home/SearchBar";
import Filter from "../../components/Home/Filter";
import List from "../../components/Home/List";
import "./style.css";
import { dataList } from "../../constants";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [list, setList] = useState(dataList);
  const [cuisines, setCuisines] = useState([
    {
      id: 1,
      checked: false,
      label: "American",
    },
    {
      id: 2,
      checked: false,
      label: "Chinese",
    },
    {
      id: 3,
      checked: false,
      label: "Western",
    },
  ]);

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const cuisineStateList = cuisines;
    const changeCheckedCuisines = cuisineStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  return (
    <div className="home">
      <SearchBar />
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <Filter
            selectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            selectedPrice={selectedPrice}
            changedPrice={handleChangePrice}
          />
        </div>
        <div className="home_list-wrap">
          <List list={list} />
        </div>
      </div>
    </div>
  );
};

export default Home;
