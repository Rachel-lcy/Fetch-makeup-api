
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NewPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedBrand = JSON.parse(localStorage.getItem("brand")) || [];
  
    console.log("location.state:", location.state);
    console.log("storedProducts:", storedProducts);
    console.log("storedBrand:", storedBrand);
  
    if (storedProducts.length === 0 || !storedBrand) {
      console.log("LocalStorage is empty, fetching data again.");
    } else {
      setProducts(location.state?.products || storedProducts);
      setBrand(location.state?.brand || storedBrand);
    }
  }, [location.state]);

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;


  return (
    <div>
      <h1>Filtered Makeup Products</h1>
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

      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img src={product.image_link} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>💰{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewPage;
