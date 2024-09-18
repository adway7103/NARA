import { useState, useEffect } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter, IoSearch } from "react-icons/io5";
import {
  kidProfuctFilter,
  menProfuctFilter,
  womenProfuctFilter,
} from "../../constants";
import ProductsSearch from "./products-search";

const sortByItems = {
  PriceAsc: false,
  PriceDsc: false,
  // RatingAsc: false,
  // RatingDsc: false
};

const sortItems = {
  PriceDsc: "Price: high to low",
  PriceAsc: "Price: low to high",
  // RatingAsc: "rating: low to high",
  // RatingDsc: "rating: high to low"
};

const ProductHeader = ({ products, setProducts, copyProducts }) => {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [activeMenProducts, setActiveMenProducts] = useState(menProfuctFilter);
  const [activeWomenProducts, setActiveWomenProducts] =
    useState(womenProfuctFilter);
  const [activeKidsProducts, setActiveKidsProducts] =
    useState(kidProfuctFilter);
  const [activeFilterType, setActiveFilterType] = useState({
    women: true,
    men: false,
    kid: false,
  });
  const [sortBy, setSortBy] = useState(sortByItems);
  const [activeSortBy, setActiveSortBy] = useState("");

  const handleSort = (key) => {
    if (activeSortBy === key) {
      setProducts(copyProducts);
      setActiveSortBy("");
      setSort(false);
    } else {
      setActiveSortBy(key);
      setSortBy((prev) => ({ ...prev, [key]: !prev[key] }));

      const sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);

        // Sort logic for ascending and descending order
        if (key === "PriceAsc") {
          return priceA - priceB;
        } else if (key === "PriceDsc") {
          return priceB - priceA;
        }

        return 0;
      });

      setProducts(sortedProducts);
    }
  };

  const handleActiveFilter = (filter) => {
    const newFilterType = {
      women: filter === "women",
      men: filter === "men",
      kid: filter === "kid",
    };
    setActiveFilterType(newFilterType);
  };

  const handleActiveProductFilter = (product) => {
    if (activeFilterType.women) {
      setActiveWomenProducts((prev) => ({
        ...prev,
        [product]: !prev[product],
      }));
    } else if (activeFilterType.men) {
      setActiveMenProducts((prev) => ({
        ...prev,
        [product]: !prev[product],
      }));
    } else if (activeFilterType.kid) {
      setActiveKidsProducts((prev) => ({
        ...prev,
        [product]: !prev[product],
      }));
    }
  };

  const renderProducts = () => {
    let productFilter;
    if (activeFilterType.women) {
      productFilter = womenProfuctFilter;
    } else if (activeFilterType.men) {
      productFilter = menProfuctFilter;
    } else if (activeFilterType.kid) {
      productFilter = kidProfuctFilter;
    }

    return Object.keys(productFilter).map((key, index) => {
      const isActive =
        (activeFilterType.women && activeWomenProducts[key]) ||
        (activeFilterType.men && activeMenProducts[key]) ||
        (activeFilterType.kid && activeKidsProducts[key]);

      return (
        <div
          key={index}
          className={`product-item font-mono flex items-center justify-between py-2 cursor-pointer px-2 rounded-md transition-colors duration-300 ${
            isActive ? "bg-[#67eacb]" : "hover:bg-[#67eacb]"
          }`}
          onClick={() => handleActiveProductFilter(key)}
        >
          <div>{key}</div>
          <div>
            {activeFilterType.women
              ? activeWomenProducts[key]
                ? "-"
                : "+"
              : activeFilterType.men
              ? activeMenProducts[key]
                ? "-"
                : "+"
              : activeKidsProducts[key]
              ? "-"
              : "+"}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex items-center justify-between flex-wrap md:flex-nowrap py-3 px-4 lg:px-12">
      <div className="relative ">
        {/* <div
          className="items-center gap-1 text-[#1F4A40] font-semibold flex cursor-pointer"
          onClick={() => setFilter(!filter)}
        >
          <IoFilter />
          Filter
        </div> */}
        {filter && (
          <div className="absolute bg-white p-4 shadow-xl top-full rounded-md  border">
            <h1 className="font-semibold">Filter</h1>
            <div className="py-6 flex items-center gap-6 w-screen max-w-[200px] md:max-w-xs">
              <div
                className={`pb-2 cursor-pointer ${
                  activeFilterType.women &&
                  "font-semibold text-[#1F4A40] border-b-4 border-[#1F4A40]"
                }`}
                onClick={() => handleActiveFilter("women")}
              >
                Women
              </div>
              <div
                className={`pb-2 cursor-pointer ${
                  activeFilterType.men &&
                  "font-semibold text-[#1F4A40] border-b-4 border-[#1F4A40]"
                }`}
                onClick={() => handleActiveFilter("men")}
              >
                Men
              </div>
              <div
                className={`pb-2 cursor-pointer ${
                  activeFilterType.kid &&
                  "font-semibold text-[#1F4A40] border-b-4 border-[#1F4A40]"
                }`}
                onClick={() => handleActiveFilter("kid")}
              >
                Kids
              </div>
            </div>
            <div className="space-y-1">{renderProducts()}</div>
          </div>
        )}
      </div>
      {/* Product search component reused at the bottom for mobile view. make sure to apply function call there as well for mobile view */}
      <ProductsSearch
        products={products}
        originalProducts={copyProducts}
        className="hidden md:flex md:max-w-sm"
      />
      <div className="relative z-50">
        {/* <div
          className="items-center gap-1 text-[#1F4A40] font-semibold flex cursor-pointer"
          onClick={() => setSort(!sort)}
        >
          <BiSortAlt2 />
          Sort by
        </div> */}
        {sort && (
          <div className="absolute bg-white py-2 px-2 text-center border shadow-xl top-full translate-y-2 rounded-md right-0 cursor-pointer space-y-1 w-[180px] text-sm">
            {Object.entries(sortItems).map(([key, value]) => (
              <div
                key={key}
                className={`px-2 py-1 rounded-md cursor-pointer ${
                  activeSortBy === key ? "bg-[#67eacb]" : "hover:bg-[#67eacb]"
                }`}
                onClick={() => handleSort(key)}
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Product serach component */}
      <ProductsSearch
        products={products}
        originalProducts={copyProducts}
        className="md:hidden flex max-w-full"
      />
    </div>
  );
};

export default ProductHeader;
