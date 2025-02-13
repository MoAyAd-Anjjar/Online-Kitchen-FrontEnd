import  { useState } from "react";
import "./Menu.css";
import FoodCategory from "../../Common/Category"

const foodList = [
  {
    id: 1,
    name: "Cheese Pizza",
    price: 8.99,
    category: "Pizza",
    description: "A classic cheese pizza with a crispy crust and rich tomato sauce.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 2,
    name: "Beef Burger",
    price: 6.99,
    category: "Burgers",
    description: "Juicy beef patty with lettuce, tomato, and our signature sauce.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 3,
    name: "Grilled Chicken",
    price: 10.99,
    category: "Main Course",
    description: "Perfectly grilled chicken served with steamed vegetables.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 4.99,
    category: "Desserts",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    price: 4.99,
    category: "Desserts",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 6,
    name: "Cheese Pizza",
    price: 8.99,
    category: "Pizza",
    description: "A classic cheese pizza with a crispy crust and rich tomato sauce.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 7,
    name: "Beef Burger",
    price: 6.99,
    category: "Burgers",
    description: "Juicy beef patty with lettuce, tomato, and our signature sauce.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 8,
    name: "Grilled Chicken",
    price: 10.99,
    category: "Main Course",
    description: "Perfectly grilled chicken served with steamed vegetables.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 9,
    name: "Chocolate Cake",
    price: 4.99,
    category: "Desserts",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
  {
    id: 10,
    name: "Chocolate Cake",
    price: 4.99,
    category: "Desserts",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    img: "https://images7.alphacoders.com/596/596343.jpg",
  },
];

const Menu = () => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (food: any) => {
    setCart([...cart, food]);
    alert(`${food.name} added to cart!`);
  };

  return (
    <div className="menu-container">
      <h1 >Food Menu</h1>
      <div className="Search-Section">
        
        <div>
        <input type="search"  placeholder="Explore What you like"  />
        <span id="text-menu"> From : </span>
        <input type="number" min={0} max={999} placeholder="25$"/>
        <span id="text-menu"> To: </span>
        <input type="number" min={0} max={999} placeholder="100$"/>
        &nbsp;
        <button className="Search-Button" type="button">Search</button>
        </div>

      <div className="Category-Container">{FoodCategory.map((fd,index)=><span  className="Category-style"
      key={index}>{fd}</span>)}</div>
      </div>

      <div className="menu-grid">
        {foodList.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.img} alt={food.name} />
            <h3>{food.name}</h3>
            <p className="category">{food.category}</p>
            <p className="description">{food.description}</p>
            <p className="price">${food.price.toFixed(2)}</p>
            <button className="Cart-Button"
            type="button"
            onClick={() => addToCart(food)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
