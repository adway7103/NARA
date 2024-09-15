import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarRelative from "../components/Navbar/NavbarRelative";
import { getProductById } from "../apis/Products";
import Loading from "../components/utils/Loading";
import ImageGallery from "../components/productsDetail/ImageGallery";
import DetailSection from "../components/productsDetail/DetailSection";
import SizeSelector from "../components/productsDetail/SizeSelector";
import ActionButtons from "../components/productsDetail/ActionButtons";
import ColorSection from "../components/productsDetail/ColorSection";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import VariantsController from "../components/productsDetail/VariantsController";

export default function ProductsDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [sizes, setSizes] = useState({
    sizesAvailable: false,
    availableSizes: [],
    disabledSizes: [],
    defaultSize: 0,
  });
  const [defaultSize, setDefaultSize] = useState(null);
  const [defaultColor, setDefaultColor] = useState(null);
  const [availableColors, setAvailableColors] = useState(null);

  const [modelInfo, setModelInfo] = useState([]);
  const params = useParams();
  const imageRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProductInfo = async (productId) => {
    try {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
      updateSizes(fetchedProduct);
      updateDefaultColorAndSize(fetchedProduct);
      updateColors(fetchedProduct);
      updateModelInfo(fetchedProduct);
    } catch (error) {
      console.error("Error fetching product info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSizes = (product) => {
    if (product.sizesAvailable) {
      const { availableSizes, disabledSizes, defaultSize } = product;
      setSizes({
        sizesAvailable: true,
        availableSizes,
        disabledSizes,
        defaultSize,
      });
    } else {
      setSizes({ sizesAvailable: false });
    }
  };

  const updateDefaultColorAndSize = (product) => {
    if (product.defaultColor) setDefaultColor(product.defaultColor);
    if (product.defaultSize) setDefaultSize(product.defaultSize);
  };

  const updateColors = (product) => {
    const colorOption = product?.options?.find((el) => el.name === "Color");
    const colors = colorOption?.values.map((el) => el.toLowerCase()) || [];
    console.log(colors);
    setAvailableColors(colors);
  };

  const updateModelInfo = (product) => {
    const modelOption = product.options.find((el) => el.name === "model");
    setModelInfo(modelOption?.values || []);
  };
 

  // Throttle function
  function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }
  
  const scrollToImage = useCallback(
    throttle((index) => {
      const imageElement = imageRefs.current[index];
      if (imageElement) {
        const container = imageRefs.current[0]?.parentElement;
        const offsetTop = imageElement?.offsetTop - container?.offsetTop;
        container?.scrollTo({ top: offsetTop, behavior: "smooth" });
        setCurrentIndex(index);
      }
    }, 300), // Throttling to every 300ms
    []
  );

  const scrollToImageBySrc = useCallback(
    throttle((imageSrc) => {
      
      // Find the index of the image element by its src
      const imageElementIndex = imageRefs.current.findIndex(
        (img) => img?.src === imageSrc
      );
  
      if (imageElementIndex !== -1) {
        const imageElement = imageRefs.current[imageElementIndex];
        if (imageElement) {
          const container = imageRefs.current[0]?.parentElement;
          const offsetTop = imageElement?.offsetTop - container?.offsetTop;
          container?.scrollTo({ top: offsetTop, behavior: "smooth" });
          setCurrentIndex(imageElementIndex);
        }
      } else {
        console.warn(`Image with src ${imageSrc} not found.`);
      }
    }, 300), // Throttling to every 300ms
    []
  );
  
  
  const handleUp = () => {
    if (currentIndex > 0) {
      scrollToImage(currentIndex - 1);
    }
  };
  
  const handleDown = () => {
    if (currentIndex < imageRefs.current.length - 1) {
      scrollToImage(currentIndex + 1);
    }
  };
  

  useEffect(() => {
    fetchProductInfo(params.id);
  }, [params.id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex flex-col bg-[#F7F7F7] dark:bg-black dark:text-[#ffff]  font-antikor">
          <NavbarRelative />

          <div className="  flex flex-col gap-4 items-center justify-center xl:items-start xl:flex-row xl:!p-12 p-2 ">
            <ImageGallery
              images={product?.images?.edges}
              currentIndex={currentIndex}
              handleUp={handleUp}
              handleDown={handleDown}
              scrollToImage={scrollToImage}
              imageRefs={imageRefs}
            />
            <div className="xl:w-2/5 md:w-3/4 flex flex-col gap-8 p-4 h-full overflow-auto mb-12 !px-12">
              <DetailSection title={product.title} descriptionHtml={product.descriptionHtml} />

              {/* Color Section */}
              

              <VariantsController scrollToImageBySrc={scrollToImageBySrc} colorsArray={product.colorsArray} options={product.options} variants={product.variants}  />
                
             
              <ActionButtons />

              <img src="/dividers/star_divider.svg" alt="" />  
              {/* Fabric Name Section */}
              <div className="bg-[#D8E3B11C] border-2 border-[#D8E3B1] p-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <img src="/test/star.svg" alt="" />
                  <h2 className="font-bold text-2xl">Fabric Name</h2>
                  <img src="/test/star.svg" alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt doloribus eaque dicta sit architecto cum hic eum
                  dolore
                  <br />
                  explicabo possimus, enim quae nobis nemo soluta qui officia
                  aliquam alias! Quam!
                </p>
              </div>
              {/* Fabric Name section ends here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}