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
      <div className="flex w-full  gap-2 lg:w-3/5 xl:h-[621px] h-[460px]   ">
        {/* Image Side Pane */}
        <div className="flex h-full  flex-col items-center gap-4 w-1/5 ">
          <div className="h-4/5 overflow-auto w-16">
            {images?.map((el, index) => (
            <div key={index} className="aspect-w-9 mt-2 mb-2 aspect-h-16  bg-red-500 flex items-center justify-center">
            <img
              src={el?.node?.src}
              className="cursor-pointer w-full h-full object-cover border-2"
              alt={`Image ${index + 1}`}
              onClick={() => scrollToImage(index)}
              onLoad={() => console.log("Image loaded")}
            />
          </div>
          
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
        <div className="xl:w-[625px] xl:h-[641px] w-full sm:w-[641px] h-[460px]  overflow-hidden" ref={containerRef}>
          {images?.map((el, index) => (
            <img
              key={index}
              src={el?.node?.src}
              className=" h-full w-full object-cover mr-auto ml-auto"
              alt={`Image ${index + 1}`}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    );
  }
  