import { useState,useEffect } from "react";


const MakeUpApp = () =>{
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const fetchMakeUpApi = async () =>{
    try{
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const makeupData = await response.json();
      console.log(makeupData)
      setProducts(makeupData);

      const allBrands = makeupData.map((product)=> product.brand);
      const validBrands = allBrands.filter(Boolean);
      const uniqueBrands = [...new Set(validBrands)];
      setBrand(uniqueBrands);

    }catch(error){
      console.error("Error fetching makeup products:" , error)
    }
  };

  useEffect(()=>{
    setTimeout(() => {
      fetchMakeUpApi()
    }, 1000);
  },[]);

  const filteredProducts = selectedBrand
  ? products.filter((product) => product.brand === selectedBrand)
  : products;


  return(
    <div>
      <h1 className="bg-red-400 text-3xl">Makeup Products Showcase</h1>
      <label htmlFor="brand-select" className="text-green-600">Filter By Brand: </label>
      <select className="border-yellow-300"
        id="brand-select"
        value={selectedBrand}
        onChange ={(e) => setSelectedBrand(e.target.value)}
      >
        <option className="bg-yellow-300">All brands</option>
        {brand.map((brand) => (
          <option key={brand} value={brand}> {brand} </option>
        ))}
      </select>

      <button onClick={fetchMakeUpApi} className="border-r-8 border-green-800"> Choose Products</button>
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
  )
}

export default MakeUpApp;