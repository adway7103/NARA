import { formatToINR } from "../global/convert-to-inr";
import { IoMdAdd } from "react-icons/io";
import { FaC, FaRegBookmark } from "react-icons/fa6";
import { FaBookmark, FaCheck } from "react-icons/fa6";
import { useState } from "react";

const ProductItem = ({ colors, setActiveProductColor, name, discount, message, price, img  }) => {
    const [bookmark, setBookmark] = useState(false)
    const [addToCart, setAddToCart] = useState(false)

    const handleBookmark = ()  => {
        setBookmark(!bookmark);
    }

    const handleAddtocard = () => {
        setAddToCart(!addToCart)
    }

    return (
      <div className="font-sans max-w-sm">
        <div className="w-full md:h-[400px] h-[477px] lg:h-[477px] relative">
          <img 
            src={img}
            alt="product-model" 
            className=" w-full h-full object-contain"
          />
          <div className="absolute w-full bottom-0">
            <div className="flex gap-2.5 p-3">
              {discount && (
                <div className="bg-white text-black font-medium px-2 cursor-default">{discount}% off</div>
              )}
              {message && (
                <div className="bg-white text-black font-medium px-2 cursor-default">{message}</div>
              )} 
            </div>
          </div>
        </div>
        <div className="py-2">
          <h1 className="font-semibold py-2">{name}</h1>
          <div className="flex justify-between items-center">
            <div className="font-mono text-base">INR {formatToINR(price)}</div>
            <div className="flex items-center gap-2">
              {colors.map((color, index) => (
                <ProductColor 
                  key={index} 
                  color={color} 
                  active={false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between lg:px-4 py-2">
            <div className="font-medium flex gap-1 items-center cursor-pointer" onClick={handleAddtocard}>
                {addToCart ? (
                    <>
                    <FaCheck />
                    Added to cart
                    </>
                ) : (
                    <>
                    <IoMdAdd />
                    Add to cart
                    </>
                )}
            </div>
            <div className="font-medium flex gap-1 items-center cursor-pointer" onClick={handleBookmark}>
                {bookmark ? (
                    <FaBookmark />
                ) : (
                    <FaRegBookmark />
                )}
                Wishlist
            </div>
        </div>
      </div>
    );
  }
  
  export default ProductItem;
  
  function ProductColor({ color, active }) {
    return (
      <div 
        className={`w-6 aspect-square rounded-full grid place-items-center cursor-pointer ${active ? "border-2 border-gray-400" : "border-none"}`}
        >
        <div className="w-4 aspect-square rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  }
  