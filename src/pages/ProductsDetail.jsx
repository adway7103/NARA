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
  

  const scrollToImage = useCallback((index) => {
    const imageElement = imageRefs.current[index];
    if (imageElement) {
      const container = imageRefs.current[0]?.parentElement;
      const offsetTop = imageElement?.offsetTop - container?.offsetTop;
      container?.scrollTo({ top: offsetTop, behavior: "smooth" });
      setCurrentIndex(index);
    }
  }, []);

  const handleUp = () => currentIndex > 0 && scrollToImage(currentIndex - 1);
  const handleDown = () =>
    currentIndex < imageRefs.current.length - 1 &&
    scrollToImage(currentIndex + 1);

  useEffect(() => {
    fetchProductInfo(params.id);
  }, [params.id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="xl:h-screen overflow-hidden flex flex-col bg-[#F7F7F7] dark:bg-black dark:text-[#ffff]">
          <NavbarRelative />

          <div className="xl:h-screen overflow-hidden flex flex-col items-center justify-center xl:items-start xl:flex-row xl:gap-12 gap-8 xl:p-12 p-2">
            <ImageGallery
              images={product?.images?.edges}
              currentIndex={currentIndex}
              handleUp={handleUp}
              handleDown={handleDown}
              scrollToImage={scrollToImage}
              imageRefs={imageRefs}
            />
            <div className="xl:w-2/5 md:w-3/4 flex flex-col gap-8 p-4 h-full overflow-auto mb-12">
              <DetailSection product={product} />

              <SizeSelector model={modelInfo} defaultColor={defaultColor} setDefaultSize={setDefaultSize} sizes={sizes} />

              {/* Color Section */}
              {availableColors && <ColorSection
                colors={availableColors}
                defaultColor={defaultColor}
                defaultSize = {defaultSize}
                setDefaultColor = {setDefaultColor}
              /> }

              <ActionButtons />


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
