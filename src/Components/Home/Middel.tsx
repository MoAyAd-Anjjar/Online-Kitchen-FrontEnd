

const popularFoods = [
  {
    name: 'Pizza',
    image: 'https://source.unsplash.com/200x200/?pizza',
    description: 'Delicious cheesy pizza with fresh toppings.'
  },
  {
    name: 'Sushi',
    image: 'https://source.unsplash.com/200x200/?sushi',
    description: 'Fresh and healthy sushi rolls with wasabi.'
  },
  {
    name: 'Burger',
    image: 'https://source.unsplash.com/200x200/?burger',
    description: 'Juicy burger with crispy fries on the side.'
  },
  {
    name: 'Pasta',
    image: 'https://source.unsplash.com/200x200/?pasta',
    description: 'Italian-style pasta with rich creamy sauce.'
  }
];

const Middel = () => {
  return (
    
    <div className="Popular-Container">
     <h2>
        Popular Foods 
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

export default Middel;
