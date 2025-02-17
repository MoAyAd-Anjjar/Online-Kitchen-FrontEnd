import React, {useState } from 'react';
import "./Forum.css";
import { ImImage } from 'react-icons/im';
import Category from '../../Common/Category';

interface FoodItem {
    id: number;
    name: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

const Forum = () => {
    const [image, setImage] = useState<string | null>(null);
    const [SelectedCategory, setSelectedCategory] = useState<string>("")
    const [foodData, setFoodData] = useState<FoodItem>({
        id: Date.now(),
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setFoodData(prev => ({ ...prev, image: imageURL }));
        }
    };
    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        setFoodData(prev => ({ ...prev, category: newCategory }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFoodData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Food Submitted:", foodData);
        alert("Food item submitted successfully!");
    };

    return (
        <div className="forum-container">
            <h1>🍽️ Food Forum</h1>
            <form className="forum-form" onSubmit={handleSubmit}>
                <label htmlFor="img-food" className="image-upload">
                    {image ? <img src={image} alt="Food Preview" className="preview-image" /> :
                        <div>
                            <ImImage color="gray" size={100} />
                            <span>Upload Food Image</span>
                        </div>
                    }


                </label>
                <input
                    id="img-food"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                />



                <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={foodData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={foodData.price}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={SelectedCategory}  // Controlled value
                    onChange={handleSelectionChange}  // Handle change
                >
                    <option value="" disabled>Select a Category</option>
                    {Category.filter(category => category !== "None").map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <textarea
                    name="description"
                    placeholder="Describe the dish..."
                    value={foodData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit" className="submit-button">Post Food</button>
            </form>
        </div>
    );
};

export default Forum;
