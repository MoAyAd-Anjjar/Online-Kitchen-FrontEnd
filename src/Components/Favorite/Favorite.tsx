import { useEffect, useState } from "react";

const Favorite = () => {
  const [images, setImages] = useState<{ imageUrl: string }[]>([]);

  useEffect(() => {
    fetch("http://192.168.1.100:3030/Food/GetUploads") // Corrected API endpoint
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={img.imageUrl} alt="Uploaded" width="200" />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
