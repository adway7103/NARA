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
    // <div className="bg-white py-20 md:pt-20">
    //   <div className="max-w-full mx-auto">
    //     <div className="text-left px-16">
    //       <h2 className="text-xl md:text-3xl font-semibold text-black italic tracking-widest uppercase">
    //         In the spotlight
    //       </h2>
    //       <p className="mt-2 text-xs md:text-sm leading-8 font-sm tracking-widest text-black sm:text-lg">
    //         Look what people loved the most this season
    //       </p>
    //       <button className="mt-4 bg-transparent hover:bg-gray-700 text-[#1F4A40] font-semibold py-2 px-4 border border-[#B5B5B5] ">
    //         View all
    //       </button>
    //     </div>
    //     <div className="mt-12 grid gap-2 grid-cols-4 ">
    //       {products.map((product, index) => (
    //         <div key={index} className="group relative">
    //           <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-3/4 md:h-80 h-64">
    //             {product.imgSrc.endsWith(".mp4") ? (
    //               <video
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //                 autoPlay
    //                 loop
    //                 muted
    //               />
    //             ) : (
    //               <img
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //               />
    //             )}
    //           </div>
    //           <div className="mt-4 text-center">
    //             {product.bought && (
    //               <div className="absolute inset-x-0 top-0 text-gray-900 bg-white opacity-90 text-[3px] sm:text-[10px] lg:text-xs px-2 py-1 m-2 rounded-full">
    //                 {product.bought}{" "}
    //                 <span className="font-bold">{product.label}</span>
    //               </div>
    //             )}
    //             <h3 className="text-[16px] md:text-lg text-black font-medium">
    //               {product.description}
    //             </h3>
    //             <p className="mt-1 text-[8px] font-mono md:text-sm font-light text-black">
    //               {product.price}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    // <div className="bg-white py-20 md:pt-20">
    //   <div className="max-w-full mx-auto">
    //     <div className="text-left px-4 md:px-16">
    //       <h2 className="text-xl md:text-3xl font-semibold text-black italic tracking-widest uppercase">
    //         In the spotlight
    //       </h2>
    //       <p className="mt-2 text-xs md:text-sm leading-8 font-sm tracking-widest text-black sm:text-lg">
    //         Look what people loved the most this season
    //       </p>
    //       <button className="mt-3 bg-transparent hover:bg-gray-700 text-[#1F4A40] font-semibold py-2 px-4 border border-[#B5B5B5]">
    //         View all
    //       </button>
    //     </div>
    //     <div className="mt-6 md:mt-12 overflow-x-scroll testimonial-container md:flex lg:grid lg:grid-cols-4 gap-4 md:gap-2 pl-4">
    //       {products.map((product, index) => (
    //         <div key={index} className="relative">
    //           {/* <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-3/4 md:h-80 h-64 "> */}
    //           <div className="flex mb-4 justify-between aspect-w-1 aspect-h-1 overflow-hidden bg-gray-200 h-3/4 relative">
    //             {product.imgSrc.endsWith(".mp4") ? (
    //               <video
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //                 autoPlay
    //                 loop
    //                 muted
    //               />
    //             ) : (
    //               <img
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //               />
    //             )}
    //             {product.bought && (
    //               <div className="absolute bottom-0 left-0 w-full text-left bg-opacity-70 pb-3 pl-4 flex items-center">
    //                 <span className="text-xs font-bold text-black bg-white py-1 px-2 mr-2">
    //                   {product.bought}
    //                 </span>
    //                 <span className="text-xs font-bold text-black bg-white py-1 px-2">
    //                   {product.label}
    //                 </span>
    //               </div>
    //             )}
    //           </div>
    //           <div className="mt-4 text-center">
    //             <h3 className="text-lg text-black font-medium">
    //               {product.description}
    //             </h3>
    //             <p className="mt-1 text-[12px] font-mono md:text-sm font-light text-black">
    //               {product.price}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white pt-20">
      <div className="max-w-full mx-auto">
        <div className="text-left px-4 md:px-16">
          <h2 className="text-xl md:text-3xl font-semibold text-black italic tracking-widest uppercase">
            In the spotlight
          </h2>
          <p className="mt-2 text-xs md:text-sm leading-8 font-sm tracking-widest text-black sm:text-lg">
            Look what people loved the most this season
          </p>
          <button className="mt-3 bg-transparent hover:bg-gray-700 text-[#1F4A40] font-semibold py-2 px-4 border border-[#B5B5B5]">
            View all
          </button>
        </div>
        <div className="mt-6 md:mt-12 overflow-x-scroll testimonial-container">
          <div className="flex lg:grid lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-2 px-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/3 lg:w-full">
                <div className="w-full md:w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden relative h-3/4 ">
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
                  {product.bought && (
                    <div className="absolute bottom-0 left-0 w-full text-left bg-opacity-70 pb-3 sm:pl-2 pl-4 flex items-center">
                      <span className="text-xs font-bold text-black bg-white py-1 sm:px-1 px-2 sm:mr-1 mr-2">
                        {product.bought}
                      </span>
                      <span className="text-xs font-bold text-black bg-white py-1 sm:px-1 px-2">
                        {product.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg text-black font-medium">
                    {product.description}
                  </h3>
                  <p className="mt-1 text-[12px] font-mono md:text-sm font-light text-black">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    // <div className="bg-white py-20 md:pt-20">
    //   <div className="max-w-full mx-auto">
    //     <div className="text-left px-16">
    //       <h2 className="text-xl md:text-3xl font-semibold text-black italic tracking-widest uppercase">
    //         In the spotlight
    //       </h2>
    //       <p className="mt-2 text-xs md:text-sm leading-8 font-sm tracking-widest text-black sm:text-lg">
    //         Look what people loved the most this season
    //       </p>
    //       <button className="mt-4 bg-transparent hover:bg-gray-700 text-[#1F4A40] font-semibold py-2 px-4 border border-[#B5B5B5]">
    //         View all
    //       </button>
    //     </div>
    //     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-10 md:mx-20">
    //       {products.map((product, index) => (
    //         <div key={index} className="p-6 border-2 group relative">
    //           <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-3/4 md:h-80 h-64 relative">
    //             {product.imgSrc.endsWith(".mp4") ? (
    //               <video
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //                 autoPlay
    //                 loop
    //                 muted
    //               />
    //             ) : (
    //               <img
    //                 src={product.imgSrc}
    //                 alt={product.description}
    //                 className="w-full h-full object-center object-cover"
    //               />
    //             )}
    //             {product.bought && (
    //               <div className="absolute bottom-0 left-0 w-full text-left bg-opacity-70 pb-2 pl-1 md:pb-3 md:pl-4 flex items-center">
    //                 <span className="text-[4px] sm:text-[8px] lg:text-xs font-medium md:font-bold text-black bg-white py-1 px-1 md:px-2 mr-1 md:mr-2">
    //                   {product.bought}
    //                 </span>
    //                 <span className="text-[4px] sm:text-[8px] lg:text-xs font-medium md:font-bold text-black bg-white py-1 px-1 md:px-2">
    //                   {product.label}
    //                 </span>
    //               </div>
    //             )}
    //           </div>
    //           <div className="mt-4 text-center">
    //             <h3 className="text-[10px] sm:text-sm lg:text-lg text-black font-normal md:font-medium">
    //               {product.description}
    //             </h3>
    //             <p className="mt-1 text-[8px] font-mono md:text-sm font-light text-black">
    //               {product.price}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Spotlight;
