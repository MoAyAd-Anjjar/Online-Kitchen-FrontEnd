import React, { useState } from "react";
import "./Forum.css";
import { ImImage } from "react-icons/im";
import Category from "../../Common/Category";
import useFood from "../../Hooks/FoodHook";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export interface IFoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rate?: number;
  quantity: number;
}

const Forum = () => {
  const [, setImage] = useState<string | null>(null);
  const [previmg, setprevimg] = useState<string | null>(null);
  const [SelectedCategory, setSelectedCategory] = useState<string>("");
  const { CreateFood } = useFood();
  const [foodData, setFoodData] = useState<IFoodItem>({
    id: Date.now(),
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    rate: 0,
    quantity: 1,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
    const file = event.target.files?.[0];

    console.log(foodData);
    if (!foodData.name.trim()) {
      toast.info("Please fill the filed first.", { position: "top-center" });
      setprevimg("")
   

        return;
    }
   
    if (!file) return;

    const formData = new FormData();
    const FoodName = foodData.name; // Assuming foodData is already populated

    formData.append("FoodName", FoodName);
    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response:AxiosResponse = await axios.post(
        `${baseUrl}/Food/upload`,
        formData,
        config
      );

      if (response.data.imageUrl) {
        // Create and set preview image
        const imageURL = URL.createObjectURL(file);
        setprevimg(imageURL);

        // Store the image URL from response
        setImage(response.data.imageUrl);
        setFoodData((prev) => ({ ...prev, image: response.data.imageUrl }));

        // Optional: Revoke the object URL when no longer needed
        // You might want to do this in a cleanup function or when component unmounts
        // URL.revokeObjectURL(imageURL);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // More specific error handling could go here
      if (axios.isAxiosError(error)) {
        console.error("Server responded with:", error.response?.data);
      }
    }
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setFoodData((prev) => ({ ...prev, category: newCategory }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFoodData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prevent submission if any field is empty
    if (
      !foodData.name ||
      !foodData.price ||
      !foodData.category ||
      !foodData.description ||
      !foodData.image
    ) {
      toast.info("Please fill in all fields before submitting.", {
        position: "top-center",
      });
      return;
    }
    // handleImageUpload()
    await CreateFood(foodData);
    
  };

  return (
    <div className="forum-container">
      <h1>🍽️ Food Forum</h1>
      <form
        className="forum-form"
        onSubmit={handleSubmit}
        encType={"multipart/form-data"}
      >
        <label htmlFor="img-food" className="image-upload">
          {previmg ? (
            <img src={previmg} alt="Food Preview" className="preview-image" />
          ) : (
            <div>
              <ImImage color="gray" size={100} />
              <span>Upload Food Image</span>
            </div>
          )}
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
          value={SelectedCategory}
          onChange={handleSelectionChange}
          required
        >
          <option value="" disabled>
            Select a Category
          </option>
          {Category.filter((category) => category !== "None").map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>

        <textarea
          maxLength={150}
          name="description"
          placeholder="Describe the dish..."
          value={foodData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="submit-button">
          Post Food
        </button>
      </form>
    </div>
  );
};

export default Forum;
