import React from "react";

const TopSection = () => {
  return (
    <div className="bg-gray-100 dark:!bg-black w-full font-antikor ">
      <div className="flex flex-col lg:items-center lg:justify-center pt-32 lg:pt-64">
        <div className="flex container px-4 pt-10 lg:py-10 justify-start">
          <h1 className="ml-2 lg:ml-5 xl:ml-40 2xl:ml-72 text-2xl sm:text-4xl lg:text-6xl font-medium text-gray-800 dark:!text-white">
            ABOUT
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row pl-8 lg:pr-24">
          <img src="about/nara.svg" className="hidden lg:block" />
          <img src="about/logo.svg" className="lg:hidden pr-8" alt="logo" />
          <p className="hidden lg:flex ml-7 text-lg tracking-tight text-black dark:!text-white font-semibold items-end ">
            NEW AGE <br /> REAL <br /> ATTIRE
          </p>
          <p className="lg:hidden mt-4 ml-0 sm:text-4xl text-lg tracking-tight text-black dark:!text-white font-medium">
            NEW AGE REAL ATTIRE
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="max-w-screen-xl w-full ">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-20 dark:!text-white px-4  items-center ">
            <div className="w-full h-full sm:h-[50vh] xl:h-[90vh] md:ml-4 xl:ml-40">
              <video
                src="/about/divein.mp4"
                autoPlay
                loop
                muted
                className="bloc w-full h-full object-cover object-top"
              />
            </div>
            <div className="md:ml-10 xl:pl-28">
              <p className="font-medium text-3xl md:text-4xl tracking-tight mb-4">
                Who We Are
              </p>
              <p className="mb-16 lg:mb-8  text-[16px] md:text-[18px] tracking-tight font-normal ">
                Welcome to NARA—where we’re reimagining Indian heritage for the
                modern world. Our designs fuse timeless fabrics with edgy
                styles, creating fashion that’s as daring as it is affordable.
                Dive in, stand out, and join us on a journey to revolutionize
                your wardrobe!
              </p>
            </div>
            <div className="hidden lg:block lg:pr-3 xl:pr-5">
              <p className="font-medium text-4xl mb-4 lg:mb-[18px] text-right tracking-tight">
                Our Secret Sauce
              </p>
              <p className="mb-8 font-normal text-[16px] lg:text-[18px] text-right pl-0 xl:pl-32 ">
                Local fabrics and a commitment to affordability that's so
                serious, it's almost like we're your budgeting experts! We're
                all about local love, using pure cotton and heritage fabrics
                from all over the country, that hugs you right. But that’s not
                all, we aim to present timeless pieces that you will never get
                bored of.
              </p>
            </div>
            <div className="w-full lg:pr-3 lg:h-[60vh] xl:h-[80vh] h-[80vh]">
              <video
                src="/about/fabric.mp4"
                autoPlay
                loop
                muted
                className="bloc w-full h-full object-cover"
              />
            </div>
            <div className="lg:hidden pr-5">
              <p className="font-medium text-3xl mb-4 lg:mb-[18px] tracking-tight">
                Our Secret Sauce
              </p>
              <p className="mb-8 font-normal text-[16px] md:text-[18px] pl-0 lg:pl-14 tracking-tight ">
                Local fabrics and a commitment to affordability that's so
                serious, it's almost like we're your budgeting experts! We're
                all about local love, using pure cotton and heritage fabrics
                from all over the country, that hugs you right. But that’s not
                all, we aim to present timeless pieces that you will never get
                bored of.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default TopSection;
