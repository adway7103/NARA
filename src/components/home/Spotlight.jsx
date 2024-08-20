import React from "react";

const Spotlight = () => {
  const products = [
    {
      imgSrc: "/home/spotlight/s1.png",
      description: "Raglan mili panelled dress",
      price: "INR 4,500.50",
      label: "Best seller",
      bought: "1250 people bought it",
    },
    {
      imgSrc: "/home/spotlight/s2.mp4",
      description: "Raglan mili panelled dress",
      price: "INR 4,500.50",
      label: "Best seller",
      bought: "12.5k people bought it",
    },
    {
      imgSrc: "/home/spotlight/s3.png",
      description: "Raglan mili panelled dress",
      price: "INR 4,500.50",
      label: "",
      bought: "",
    },
    {
      imgSrc: "/home/spotlight/s4.mp4",
      description: "Raglan mili panelled dress",
      price: "INR 4,500.50",
      label: "",
      bought: "",
    },
  ];

  return (
    <div className="bg-white py-20 md:pt-20">
      <div className="max-w-full mx-auto">
        <div className="text-left px-16">
          <h2 className="text-xl md:text-3xl font-semibold text-black italic tracking-widest uppercase">
            In the spotlight
          </h2>
          <p className="mt-1 text-xs md:text-sm leading-8 font-sm tracking-tight text-black sm:text-lg">
            Look what people loved the most this season
          </p>
          <button className="mt-4 bg-transparent hover:bg-gray-700 text-[#1F4A40] font-semibold py-2 px-4 border border-[#B5B5B5] ">
            View all
          </button>
        </div>
        <div className="mt-12 grid gap-3 grid-cols-4">
          {products.map((product, index) => (
            <div key={index} className="group relative">
              <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-3/4 md:h-80 h-64">
                {product.imgSrc.endsWith(".mp4") ? (
                  <video
                    src={product.imgSrc}
                    alt={product.description}
                    className="w-full h-full object-center object-cover"
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <img
                    src={product.imgSrc}
                    alt={product.description}
                    className="w-full h-full object-center object-cover"
                  />
                )}
              </div>
              <div className="mt-4 text-center">
                {product.bought && (
                  <div className="absolute inset-x-0 top-0 text-gray-900 bg-white opacity-90 text-[3px] sm:text-[10px] lg:text-xs px-2 py-1 m-2 rounded-full">
                    {product.bought}{" "}
                    <span className="font-bold">{product.label}</span>
                  </div>
                )}
                <h3 className="text-[8px] md:text-lg text-black font-medium">
                  {product.description}
                </h3>
                <p className="mt-1 text-[6px] md:text-sm font-light text-black">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
