import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../components/products/categories";
import ProductHeader from "../components/products/header";
import ProductItem from "../components/products/product-item";
import { productData } from "../constants";

const Products = () => {
  const colors = ["black", "brown", "beige", "gray"];
  const [activeProductColor, setActiveProductColor] = useState()

  return (
    <div>
        <Navbar />
        <div className="mt-16">
            <div className="bg-[#F7F7F7] pb-4 mt-20">
                <ProductHeader /> 
                <Categories />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-x-16 p-4 place-items-center">
                {productData.map((product, index) => (
                    <ProductItem 
                        key={index}
                        colors={colors} 
                        setActiveProductColor={setActiveProductColor}
                        price={1500.00}
                        name={"Raglan mili panelled dress"}
                        discount={"20"}
                        message={"New arrivals"}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Products