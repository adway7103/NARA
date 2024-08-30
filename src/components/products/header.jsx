import { IoFilter } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";

const ProductHeader = () => {
  return (
    <div className="flex items-center justify-between flex-wrap md:flex-nowrap py-3 px-4 lg:px-12">
        <div className="items-center gap-1 text-[#1F4A40] font-semibold hidden md:flex">
            <IoFilter />
            Filter
        </div>
        <div className="flex px-2 border-2 gap-2 w-full max-w-sm mb-2 md:mb-0 border-[#ede9dd]">
            <div className="flex items-center text-xl text-gray-500">
                <IoSearch />
            </div>
            <input className="outline-none py-2 w-full text-sm" placeholder="Search..."/>
        </div>
        <div className="flex md:hidden items-center gap-1 text-[#1F4A40] font-semibold">
            <IoFilter />
            Filter
        </div>
        <div className="flex items-center gap-1 font-semibold text-[#1F4A40]">
            <BiSortAlt2 />
            Sort by
        </div>
    </div>
  )
}

export default ProductHeader