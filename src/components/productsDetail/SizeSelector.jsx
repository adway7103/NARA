import { HiOutlineArrowRight } from "react-icons/hi";
export default function SizeSelector({ sizes, defaultSize, selectSize  }) {
    
  
    return (
      <div className="flex flex-col gap-4 tracking-tighter">
        <h2 className="font-bold text-lg">
          Select Size | <span className="underline"> Size Guide</span>{" "}
          <HiOutlineArrowRight className="inline" />
        </h2>
       
        <div className="flex gap-4">
          {sizes.map(size => (
            <SizeItem key={size} name={size} selectSize={selectSize} defaultSizeName={defaultSize} />
          ))}
  
          {/* {sizes.disabledSizes?.map((size, index) => (
            <button
              key={index}
              className={`border-2 w-8 h-8 border-[#BEBCBD] disabled:text-gray-300 `}
              disabled={true}
            >
              {size}
            </button>
          ))} */}
        </div>
      </div>
    );
  }

  function SizeItem({ name, defaultSizeName, selectSize }) {
    const clickHandler = () => {
      
      selectSize("Size", name)
    };
  
    return (
      <button
        onClick={clickHandler}
        className={`border-2 w-8 h-8 border-[#BEBCBD] ${
          name === defaultSizeName ? "bg-[#1F4A40] text-white" : ""
        }`}
      >
        {name}
      </button>
    );
  }
  