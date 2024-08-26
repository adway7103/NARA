import React from "react";
const TopSection = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col lg:items-center lg:justify-center pt-32 lg:pt-64">
        <div className="flex container mx-auto px-4 pt-10 lg:py-10 items-center justify-start">
          <h1 className="lg:ml-40 text-2xl sm:text-4xl lg:text-6xl font-medium text-gray-800">
            ABOUT
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row pl-8 lg:pr-24">
          <img src="about/nara.png" className="hidden lg:block" />
          <img src="about/logo.png" className="lg:hidden pr-8" alt="logo" />
          <p className="hidden lg:flex ml-7 text-lg tracking-widest text-black font-semibold items-end ">
            NEW AGE <br /> REAL <br /> ATTIRE
          </p>
          <p className="lg:hidden mt-4 ml-0 sm:text-4xl text-lg tracking-widest text-black font-medium">
            NEW AGE REAL ATTIRE
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="max-w-screen-xl w-full ">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12  lg:gap-y-20 px-4 lg:px-40 items-center rounded-lg ">
            <div className="w-full h-full lg:w-[80vh] md:h-[90vh] lg:ml-40">
              <video
                src="/about/divein.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className=" lg:pl-40">
              <p className="font-semibold text-[26px] md:text-4xl tracking-widest mb-4">
                Who We Are
              </p>
              <p className="mb-16 lg:mb-8 font-normal font-serif text-[16px] md:text-[18px] tracking-widest ">
                Welcome to NARA—where we’re reimagining Indian heritage for the
                modern world. Our designs fuse timeless fabrics with edgy
                styles, creating fashion that’s as daring as it is affordable.
                Dive in, stand out, and join us on a journey to revolutionize
                your wardrobe!
              </p>
            </div>
            <div className="hidden lg:block pr-5">
              <p className="font-semibold text-3xl md:text-4xl mb-4 lg:mb-[18px] text-right tracking-widest">
                Our Secret Sauce
              </p>
              <p className="mb-8 font-normal font-serif text-[16px] lg:text-[18px] text-right pl-0 lg:pl-32 ">
                Local fabrics and a commitment to affordability that's so
                serious, it's almost like we're your budgeting experts! We're
                all about local love, using pure cotton and heritage fabrics
                from all over the country, that hugs you right. But that’s not
                all, we aim to present timeless pieces that you will never get
                bored of.
              </p>
            </div>
            <div className="w-full lg:w-[80vh] h-[80vh]">
              <video
                src="/about/fabric.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:hidden pr-5">
              <p className="font-semibold text-2xl md:text-4xl mb-4 lg:mb-[18px] tracking-widest">
                Our Secret Sauce
              </p>
              <p className="mb-8 font-normal font-serif text-[16px] md:text-[18px] pl-0 lg:pl-14 tracking-widest ">
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
