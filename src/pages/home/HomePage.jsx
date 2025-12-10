import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductGrid } from "./productsGrid";
import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeData = async function () {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" href="images/icons/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
