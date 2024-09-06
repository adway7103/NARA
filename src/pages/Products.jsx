import { useState, useEffect } from "react";
import { fetchProducts } from "../apis/getAllProducts";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../components/products/categories";
import ProductHeader from "../components/products/header";
import ProductItem from "../components/products/product-item";

const Products = () => {
  const colors = ["black", "brown", "beige", "gray"];
  const [activeProductColor, setActiveProductColor] = useState();
  const [products, setProducts] = useState([]);
  const [copiedProducts, setCopiedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setCopiedProducts(productsData); // Initialize copied products
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <div className="bg-[#F7F7F7] pb-4 mt-20">
          <ProductHeader products={products} setProducts={setProducts} copyProducts={copiedProducts} /> 
          <Categories />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-x-16 p-4 place-items-center">
          {products.map((product, index) => (
            <ProductItem 
              key={product.id}
              img={product.images.edges[0].node.src}
              colors={colors} 
              setActiveProductColor={setActiveProductColor}
              price={product.priceRange.minVariantPrice.amount}
              name={product.title}
              discount={""}
              message={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
