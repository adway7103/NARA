import React from "react";

const FabricStorySection = () => {
  return (
    <div className="flex items-center justify-center py-12 lg:py-40 bg-[#EEEBE6] dark:!bg-black">
      <div className="max-w-screen-2xl w-full ">
        <section className="lg:grid md:grid-cols-9 ">
          {/* Text Section */}
          <div className="lg:col-span-6 dark:!text-white">
            <h2 className="hidden lg:block text-4xl font-medium tracking-widest leading-relaxed pr-52 pl-36">
              Our Fabrics Have Their Own Story To Tell
            </h2>
            <h2 className="lg:hidden text-3xl sm:text-5xl sm:leading-relaxed sm:px-8 font-medium leading-normal pl-6">
              Our Fabrics Have Their Own Story To Tell
            </h2>
            <p className="text-sm sm:text-lg pl-6 pr-2 pt-2 pb-4 lg:mt-4 lg:pb-0 sm:px-8 sm:py-4 font-normal lg:pl-36">
              At NARA, our fabrics are more than just material—they're a
              tapestry of stories and traditions that celebrate the versatility
              of cotton. Embodying it in an array of skirts and tops to the
              world’s most comfortable heritage pants, the unique patterns of
              these textiles tell the timeless saga of Indian art and folklore.
              Both our collections blend traditional techniques and weave them
              with modern silhouettes. Each piece is a tribute to the artistry
              and history of our fabrics, creating a wardrobe that's as
              meaningful as it is stylish.
            </p>
            <div className="lg:relative lg:mt-10">
              <video
                src="/home/designs/d5.mp4"
                autoPlay
                loop
                muted
                className="bloc col-span-4 lg:h-[400px] lg:w-3/4 lg:left-[300px] object-cover lg:absolute "
              />
              <img
                src="/home/spotlight/s1.png"
                alt="Fabric story 3"
                className="hidden col-span-1 lg:block left-0 h-[320px] lg:pl-40 lg:h-[300px] lg:top-[450px] object-center object-cover"
              />
            </div>
          </div>
          <div className="col-span-3">
            <video
              src="/home/spotlight/s4.mp4"
              autoPlay
              loop
              muted
              className="bloc lg:col-span-2 lg:row-span-7 lg:w-[400px] lg:h-[500px] h-1/2 object-cover p-4 lg:ml-20"
            />
            <img
              src="/about/fabric/a1.png"
              alt="Fabric story 4"
              className="bloc lg:col-span-2 row-span-2 sm:h-[400px] lg:h-[260px] lg:w-[400px] lg:py-8 lg:pl-40  sm:pl-40 pl-20 object-cover"
            />
          </div>
          <div className="lg:col-span-8 lg:grid lg:grid-cols-8 lg:mt-20 lg:pl-28 ">
            <img
              src="/about/fabric/a2.png"
              alt="Fabric story 6"
              className="bloc lg:col-span-2 w-full h-full lg:h-4/5 object-cover mr-10 p-3 lg:p-0 lg:mr-0"
            />
            <img
              src="/about/fabric/a3.png"
              alt="Fabric story 6"
              className="bloc row-col-2 lg:col-span-2 w-full object-cover lg:mx-10"
            />
            <img
              src="/about/fabric/a4.png"
              alt="Fabric story 7"
              className="bloc lg:col-span-4 w-full h-full lg:h-4/5 p-3 lg:p-0 lg:ml-32 object-cover"
            />
          </div>
          <div className="lg:col-span-9 lg:grid lg:grid-cols-9 mt-2 lg:mt-0 gap-10 px-10 lg:px-10">
            <img
              src="/about/fabric/a5.png"
              alt="Fabric story 8"
              className="bloc lg:col-span-6 row-span-5 w-full h-full object-cover"
            />
            <img
              src="/about/fabric/a6.png"
              alt="Fabric story 9"
              className="bloc lg:col-span-3 w-full h-full object-cover mt-10 lg:mt-20 "
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FabricStorySection;
