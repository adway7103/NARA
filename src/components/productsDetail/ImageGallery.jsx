import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useRef } from "react";

export default function ImageGallery({
    images,
    currentIndex,
    handleUp,
    handleDown,
    scrollToImage,
    imageRefs,
  }) {
    const containerRef = useRef(null);
  
    return (
      <div className="flex w-full lg:w-3/5 h-[70vh] lg:h-[80vh]">
        {/* Image Side Pane */}
        <div className="flex flex-col items-center gap-2 w-1/5 ">
          <div className="h-4/5 overflow-auto p-2">
            {images?.map((el, index) => (
              <img
                key={index}
                src={el?.node?.src}
                className="cursor-pointer w-[68px] h-[102px] border-2"
                alt={`Image ${index + 1}`}
                onClick={() => scrollToImage(index)}
                onLoad={() => console.log("Image loaded")}
              />
            ))}
          </div>
          <div className="flex flex-col h-fit gap-2 h-1/5">
            <button
              onClick={handleUp}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold border-2"
            >
              <FaChevronUp />
            </button>
            <button
              onClick={handleDown}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold border-2"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden" ref={containerRef}>
          {images?.map((el, index) => (
            <img
              key={index}
              src={el?.node?.src}
              className=" h-full mr-auto ml-auto"
              alt={`Image ${index + 1}`}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    );
  }
  