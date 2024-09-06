import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const ProductsSearch = () => {
  const [serachInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }
  return (
     <div className="flex px-2 border-2 gap-2 w-full max-w-sm mb-2 md:mb-0 border-[#ede9dd]">
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