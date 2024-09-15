import { useState, useEffect, useRef } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { toast } from "sonner";
import ColorSection from "./ColorSection";
import SizeSelector from "./SizeSelector";
import { useDispatch } from "react-redux";
import { setCurrentVariant, setOutOfStock } from "../../store";

// Helper function to get available options for variants in stock
function getMatchingOptions(
  availableOptions,
  variantsInStock,
  matchToOption,
  matchToOptionValue
) {
  const remainingOptions = availableOptions.filter(
    (option) => option !== matchToOption
  ); // Exclude matched option
  const matchingVariants = variantsInStock.filter(
    (variant) =>
      variant.node.selectedOptions.find(
        (option) => option.name === matchToOption
      )?.value === matchToOptionValue
  );

  const optionValues = {}; // e.g., { Color: ["red", "blue"], Size: ["M", "L"] }

  remainingOptions.forEach((option) => {
    const values = matchingVariants.map(
      (variant) =>
        variant.node.selectedOptions.find((opt) => opt.name === option)?.value
    );
    optionValues[option] = [...new Set(values.filter(Boolean))]; // Ensure unique and truthy values
  });

  console.log("Getting all choices for the option ", matchToOption, " for the value", matchToOptionValue, " here it is: ", optionValues );

  return optionValues;
}

export default function VariantsController({ options, variants, colorsArray, scrollToImageBySrc }) {
  const [optionsList, setOptionsList] = useState([]);
  const [variantsInStock, setVariantsInStock] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionsChoiceList, setOptionsChoiceList] = useState({});
  const [defaultColor, setDefaultColor] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.error(options);
    let choicesList = {};
    let optionsList = [];
    options.forEach(option=>{
        choicesList[option.name] = option.values;
        optionsList.push(option.name);
    })

    console.log(choicesList);

    setOptionsChoiceList(choicesList);
    setOptionsList(optionsList)



    const inStockVariants = variants.edges.filter(
    (variant) => parseInt(variant.node.quantityAvailable) > 0
    );

    setVariantsInStock(inStockVariants);
    

    // Select lowest priced variant as default
    if (inStockVariants.length > 0) {
        dispatch(setOutOfStock(false))
        const lowestVariant = inStockVariants.reduce((prev, cur) =>
        +cur.node.price.amount < +prev.node.price.amount ? cur : prev
        );

        dispatch(setCurrentVariant(lowestVariant))

        const defaultSelectedOptions = {};
        lowestVariant.node?.selectedOptions.forEach((option) => {
        defaultSelectedOptions[option.name] = option.value;
        });

        scrollToImageBySrc(lowestVariant.node.image.src)

        setSelectedOptions(defaultSelectedOptions);
    }else{
        dispatch(setOutOfStock(true));
    }
        

  }, [options, variants])

//   useEffect(() => {
//     if (options && variants) {
//       // Extract option names
//       const optionsList = options.map((option) => option.name || "");
//       const inStockVariants = variants.edges.filter(
//         (variant) => parseInt(variant.node.quantityAvailable) > 0
//       );

//       setVariantsInStock(inStockVariants);
//       setOptionsList(optionsList);

//       // Select lowest priced variant as default
//       if (inStockVariants.length > 0) {
//         const lowestVariant = inStockVariants.reduce((prev, cur) =>
//           +cur.node.price.amount < +prev.node.price.amount ? cur : prev
//         );

//         const defaultSelectedOptions = {};
//         lowestVariant.node?.selectedOptions.forEach((option) => {
//           defaultSelectedOptions[option.name] = option.value;
//         });

//         setSelectedOptions(defaultSelectedOptions);

//         // Handle first option
//         const [firstOptionName, firstOptionValue] = Object.entries(
//           defaultSelectedOptions
//         )[0];

//         if (firstOptionName && firstOptionValue) {
//           const matchToOptionValues =
//             options.find((option) => option.name === firstOptionName)?.values ||
//             [];
//           const remainingOptions = getMatchingOptions(
//             optionsList,
//             inStockVariants,
//             firstOptionName,
//             firstOptionValue
//           );

//           // Preserve initial option and values
//           remainingOptions[firstOptionName] = matchToOptionValues;
//           console.error("logging remaining options: ", remainingOptions);
//           setOptionsChoiceList(remainingOptions);
//         }
//       } else {
//         alert("This product is currently out of stock!");
//       }
//     }
//   }, [options, variants]);

  // Handle option change
  const handleOptionChange = (name, value) => {
    // const remainingOptions = getMatchingOptions(
    //   optionsList,
    //   variantsInStock,
    //   name,
    //   value
    // );
    // const optionValues = options.find((option) => option.name === name).values;

    // const updatedChoiceList = { ...remainingOptions, [name]: optionValues };
    // setOptionsChoiceList(updatedChoiceList);

    let updatedSelectedOptions = { ...selectedOptions };

    for (const key in selectedOptions) {
      if (name === key) {
        updatedSelectedOptions[name] = value;
      }
    }

    

    const hasNullProperty = Object.values(updatedSelectedOptions).some(
      (value) => value === null
    );
    
    if (!hasNullProperty) {
      const matchedNode = variantsInStock.find((item) => {
        const selectedOptions = item.node.selectedOptions;
        console.log(updatedSelectedOptions);
        return selectedOptions.every(
          (option) => updatedSelectedOptions[option.name] === option.value
        );
      });

    console.log(variantsInStock);

      if(!matchedNode)
      {
        toast.info("This combination  is not available");
        updatedSelectedOptions = {...selectedOptions};

      }else{
        console.log("Node Found", matchedNode)
        scrollToImageBySrc(matchedNode.node.image.src)
        dispatch(setCurrentVariant(matchedNode));

        console.log();
      }
    }

    setSelectedOptions(updatedSelectedOptions);


  };

  return (
    <>
      {optionsList.map((option) =>
        option === "Color" ? (
          <ColorSection
            key={option}
            availableChoices={optionsChoiceList[option] || []}
            defaultColor={selectedOptions[option]}
            colors={colorsArray}
            selectColor={handleOptionChange}
          />
        ) : option === "Size" ? (
          <SizeSelector
            key={option}
            selectSize={handleOptionChange}
            defaultSize={selectedOptions[option]}
            sizes={optionsChoiceList[option] || []}
          />
        ) : (
          <VariantFilter
            key={option}
            name={option}
            list={optionsChoiceList[option] || []}
            selectedOption={selectedOptions[option]}
            onOptionChange={handleOptionChange}
          />
        )
      )}
    </>
  );
}

function VariantFilter({ name, list, selectedOption, onOptionChange }) {
  const optionListRef = useRef(null);

  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="font-bold">Select {name}</h3>
      <select
        onChange={(e) => onOptionChange(name, e.target.value)}
        name={name}
        ref={optionListRef}
        value={selectedOption || ""}
        className="w-full p-2 bg-transparent border-1 border-dashed border-black px-2 dark:border-white dark:text-white dark:bg-black"
      >
        <option value="" disabled>
          Select {name}
        </option>
        {list.map((value) => (
          <option className="dark:bg-black" key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
