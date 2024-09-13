import { HiOutlineArrowRight } from "react-icons/hi";
export default function SizeSelector({ sizes, model }) {
    if (!sizes.sizesAvailable) return;
  
    return (
      <div className="flex flex-col gap-4 tracking-tighter">
        <h2 className="font-bold text-lg">
          Select Size | <span className="underline"> Size Guide</span>{" "}
          <HiOutlineArrowRight className="inline" />
        </h2>
        {model.length > 0 && (
          <h3>
            Model is <strong> {model[0]} </strong> and is wearing size{" "}
            <strong>{model[1]}</strong>
          </h3>
        )}
        <div className="flex gap-4">
          {sizes.availableSizes?.map((size, index) => (
            <button
              key={index}
              className={`border-2 w-8 h-8 border-[#BEBCBD] ${
                size === sizes.defaultSize ? "bg-[#1F4A40] text-white" : null
              }`}
            >
              {size}
            </button>
          ))}
  
          {sizes.disabledSizes?.map((size, index) => (
            <button
              key={index}
              className={`border-2 w-8 h-8 border-[#BEBCBD] disabled:text-gray-300 `}
              disabled={true}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    );
  }