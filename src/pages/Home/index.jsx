import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Home/SearchBar";
import Filter from "../../components/Home/Filter";
import List from "../../components/Home/List";
import EmptyView from "../../components/common/EmptyView"
import "./style.css";
import { dataList } from "../../constants";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState(null);
  const [resultFound, setResultFound] = useState(null);
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

  useEffect(() => {
    //filters
    const applyFilters = () => {
      let updatedList = dataList;

      //rating filter
      if (selectedRating) {
        updatedList = updatedList.filter(
          (item) => parseInt(item.rating) === parseInt(selectedRating)
        );
      }

      //category filter
      if (selectedCategory) {
        updatedList = updatedList.filter(
          (item) => item.category === selectedCategory
        );
      }

      //cuisine filter
      const cuisinesChecked = cuisines
        .filter((item) => item.checked)
        .map((item) => item.label.toLowerCase());

      if (cuisinesChecked.length) {
        updatedList = updatedList.filter((item) =>
          cuisinesChecked.includes(item.cuisine)
        );
      }

      //price filter
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];
      updatedList = updatedList.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );

      //search filter
      if (inputSearch) {
        updatedList = updatedList.filter(
          (item) =>
            item.title
              .toLowerCase()
              .search(inputSearch.toLowerCase().trim()) !== -1
        );
      }

      setList(updatedList);

      !updatedList.length ? setResultFound(false) : setResultFound(true);
    };

    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, selectedPrice, inputSearch]);

  return (
    <div className="home">
      <SearchBar
        value={inputSearch}
        changeInput={(e) => setInputSearch(e.target.value)}
      />
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
          {/* list and empty view component */}
          {/* <List list={list} /> */}
          {resultFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
