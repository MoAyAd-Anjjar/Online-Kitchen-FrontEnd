import { useEffect, useState } from "react";
import "./Menu.css";
import FoodCategory from "../../Common/Category";
import { IFoodItem } from "../Forum/Forum";
import PropagateLoader from "react-spinners/PropagateLoader";
import useFood from "../../Hooks/FoodHook";

const Menu = () => {
  const [foodMenu, setfoodMenu] = useState<IFoodItem[]>([]);
  const { GetFoods } = useFood();
  useEffect(() => {
    const FetchData=async ()=>{
      const getData = await GetFoods();
      setfoodMenu( getData);
    }
    FetchData()
  }, []);


  return (
    <div className="menu-container">
      <h1>Food Menu</h1>
      <div className="Search-Section">
        <div>
          <input type="search" placeholder="Explore What you like" />
          <span id="text-menu"> From : </span>
          <input type="number" min={0} max={999} placeholder="25$" />
          <span id="text-menu"> To: </span>
          <input type="number" min={0} max={999} placeholder="100$" />
          &nbsp;
          <button className="Search-Button" type="button">
            Search
          </button>
        </div>

        <div className="Category-Container">
          {FoodCategory.map((fd, index) => (
            <span className="Category-style" key={index}>
              {fd}
            </span>
          ))}
        </div>
      </div>

      <div className="food-table">
        {foodMenu.length > 0 ? (
          <div className="menu-grid">
            {foodMenu.map((food) => (
              <div key={food.id} className="food-card">
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
                <p className="category">{food.category}</p>
                <p className="description">{food.description}</p>
                <p className="price">${food.price.toFixed(2)}</p>
                <button className="Cart-Button" type="button">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <PropagateLoader
            size={20}
            color="#ff9766"
            cssOverride={{
              display: "block",
              margin: "0 auto",
              marginTop: "100px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
