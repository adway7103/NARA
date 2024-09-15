import { HiOutlineArrowRight } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function ColorSection({
  colors,
  defaultColor,
  availableChoices,
  selectColor
}) {
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
  
    setAvailableColors(
      colors.filter((el) => availableChoices.includes(el.name))
    );
  }, [availableChoices, colors]);

  return (
    <div className="flex flex-col gap-4 tracking-tighter">
      <h2 className="font-bold text-lg">
        Select Color | <span className="underline"> Color Guide</span>{" "}
        <HiOutlineArrowRight className="inline" />
      </h2>

      <div className="relative flex gap-2 flex-wrap">
        {availableColors.map((el, index) => (
          <SingleColorItem
            key={el.name}
            name={el.name}
            value={el.value}
            image={el.image}
            defaultColor={defaultColor}
            selectColor = {selectColor}
          />
        ))}
      </div>
    </div>
  );
}

function SingleColorItem({ name, value, image, defaultColor, selectColor }) {
  const clickHandler = () => {
    selectColor("Color", name);
  };

  return (
    <div
      className={`w-12 h-12 relative p-1 rounded-full  ${
        defaultColor === name
          ? "border-3 border-indigo-500 shadow-lg " // Enhanced border and shadow for default color
          : "" // Default styling for others
      }`}
      style={{ backgroundColor: "white" }}
    >
      <button
        title={`${name}`}
        className="relative w-full h-full rounded-full "
        style={{
          backgroundColor: value || "white",
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={clickHandler}
      >
        {/* Content if needed */}
      </button>
    </div>
  );
}
