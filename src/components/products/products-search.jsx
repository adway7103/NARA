import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const ProductsSearch = ({ className }) => {
  const [serachInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }
  return (
     <div className={`px-2 border-2 gap-2 w-full mb-2 md:mb-0 border-[#ede9dd] ${className}`}>
        <div className="flex items-center text-xl text-gray-500">
            <IoSearch />
        </div>
        <input
        className="outline-none py-2 w-full text-sm"
        placeholder="Search..."
        onChange={handleSearchInput}
        />
    </div>
  )
}

export default ProductsSearch