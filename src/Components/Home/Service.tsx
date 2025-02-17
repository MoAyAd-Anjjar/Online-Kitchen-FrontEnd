

// Service data for a restaurant
const services = [
  {
    name: 'Food Delivery',
    image: 'https://cdn-icons-png.flaticon.com/512/3027/3027212.png',
    description: 'Get your favorite dishes delivered right to your door.'
  },
  {
    name: 'Catering Services',
    image: 'https://cdn-icons-png.flaticon.com/512/3566/3566341.png',
    description: 'We cater to events, making sure your guests enjoy every bite.'
  },
  {
    name: 'Dine-in Experience',
    image: 'https://cdn-icons-png.flaticon.com/512/3047/3047713.png',
    description: 'Enjoy a delightful meal in a warm and welcoming atmosphere.'
  }
];

const Service = () => {
  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <div className="card-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image } alt={service.name} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
