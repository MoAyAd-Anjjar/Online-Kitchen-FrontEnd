import { useEffect, useState } from "react";
import "./Menu.css";
import FoodCategory from "../../Common/Category";
import { IFoodItem } from "../Forum/Forum";
import PropagateLoader from "react-spinners/PropagateLoader";
import useFood from "../../Hooks/FoodHook";
import { useCartContext } from "../../Provider/CartProvider";


const Menu = () => {
  const [search, setSearch] = useState<string>("");
  const [foodMenu, setFoodMenu] = useState<IFoodItem[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [Loading, setLoading] = useState<Boolean>(true);
  const [categorySelection, setCategorySelection] = useState<string[]>([]); // Fixed state name to categorySelection
  const [maxPrice, setMaxPrice] = useState<number>(999);
  const [filteredMenu, setFilteredMenu] = useState<IFoodItem[]>([]); // New state for filtered menu
  const { GetFoods } = useFood();
  const { addToCart } = useCartContext();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const getData = await GetFoods();
      setFoodMenu(getData);
      setFilteredMenu(getData);
      if (getData) setLoading(false);

      // Initialize filtered menu with all items initially
    };
    fetchData();
  }, []);

  // Handle category selection, add/remove from the selection array
  const handleCategorySelection = (foodType: string) => {
    setCategorySelection((prevSelection) => {
      if (prevSelection.includes(foodType)) {
        return prevSelection.filter((category) => category !== foodType); // Remove category if already selected
      } else {
        return [...prevSelection, foodType]; // Add category if not selected
      }
    });
  };

  // Perform filtering when the search button is clicked
  const handleSearch = () => {
    const filtered = foodMenu.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPrice = food.price >= minPrice && food.price <= maxPrice;
      const matchesCategory = categorySelection.length
        ? categorySelection.includes(food.category) // Filter by category if any are selected
        : true;

      return matchesSearch && matchesPrice && matchesCategory;
    });
    setFilteredMenu(filtered); // Update filtered menu
  };

  const handleCart = async (FoodInfo: IFoodItem) => {
    addToCart([FoodInfo]);
    
  };
  return (
    <div className="menu-container">
      <h1>Food Menu</h1>
      <div className="Search-Section">
        <div>
          <input
            type="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Explore What you like"
          />
          <span id="text-menu"> From: </span>
          <input
            type="number"
            min={0}
            max={999}
            placeholder="25$"
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
          />
          <span id="text-menu"> To: </span>
          <input
            type="number"
            min={0}
            max={999}
            placeholder="100$"
            onChange={(e) => setMaxPrice(Number(e.target.value) || 999)}
          />
          &nbsp;
          <button
            className="Search-Button"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="Category-Container">
          {FoodCategory.map((fd, index) => (
            <span
              key={index}
              onClick={() => handleCategorySelection(fd)}
              className={`${
                categorySelection.includes(fd)
                  ? "Category-style"
                  : "Category-style-not"
              }`}
            >
              {fd}
            </span>
          ))}
        </div>
      </div>

      <div className="food-table">
        {!Loading ? (
          filteredMenu.length > 0 ? (
            <div className="menu-grid">
              {filteredMenu.map((food) => (
                <div key={food.id} className="food-card">
                  <img src={food.image} alt={food.name} />
                  <h3>{food.name}</h3>
                  <p className="category">{food.category}</p>
                  <p className="description">{food.description}</p>
                  <p className="price">${food.price.toFixed(2)}</p>
                  <button
                    className="Cart-Button"
                    type="button"
                    onClick={() => handleCart(food)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span>No Food at the table</span>
          )
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
