

const popularFoods = [
  {
    name: 'Pizza',
    image: 'https://wallpapers.com/images/featured/4k-food-y48pwsir6u6w5iws.jpg',
    description: 'Delicious cheesy pizza with fresh toppings.'
  },
  {
    name: 'Sushi',
    image: 'https://wallpapers.com/images/featured/4k-food-y48pwsir6u6w5iws.jpg',
    description: 'Fresh and healthy sushi rolls with wasabi.'
  },
  {
    name: 'Burger',
    image: 'https://wallpapers.com/images/featured/4k-food-y48pwsir6u6w5iws.jpg',
    description: 'Juicy burger with crispy fries on the side.'
  },
  {
    name: 'Pasta',
    image: 'https://wallpapers.com/images/featured/4k-food-y48pwsir6u6w5iws.jpg',
    description: 'Italian-style pasta with rich creamy sauce.'
  }
];

const Middle = () => {
  return (
    
    <div className="Popular-Container">
     <h2>
       Our Popular Foods 
        </h2>  
        <div className='Card-Container'>
            {popularFoods.map((food, index) => (
              <div key={index} className="Popular-Food">
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
                <p>{food.description}</p>
              </div>
            ))}
        </div>
    </div>
  );
};

export default Middle;
