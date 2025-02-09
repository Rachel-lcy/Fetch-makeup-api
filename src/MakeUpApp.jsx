import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MakeUpApp = () => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();

 const fetchMakeUpApi = async () => {
    try {
      const response = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json"
      );
      const makeupData = await response.json();
      setProducts(makeupData);

      const allBrands = makeupData.map((product) => product.brand);
      const validBrands = allBrands.filter(Boolean);
      const uniqueBrands = [...new Set(validBrands)];
      setBrand(uniqueBrands);
    } catch (error) {
      console.error("Error fetching makeup products:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchMakeUpApi();
    }, 1000);
  }, []);

  const handleButtonClick = () => {
    if (products.length > 0 && brand.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("brand", JSON.stringify(brand));
    } else {
      console.error("Products or brand data is empty. Cannot store in localStorage.");
    }
    navigate("/new-page", { state: { products, brand } });
  };

  return (
    <div>
      <h1>Makeup Products Showcase</h1>
      <label htmlFor="brand-select">Filter By Brand: </label>
      <select
        id="brand-select"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option>All brands</option>
        {brand.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <button onClick={handleButtonClick}>Choose Products</button>
    </div>
  );
};

export default MakeUpApp;
