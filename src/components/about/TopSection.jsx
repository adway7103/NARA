import React from "react";

const TopSection = () => {
  return (
    <div className=" bg-gray-100  ">
      <div className="flex flex-col items-center justify-center pt-64">
        <div className="flex container mx-auto px-4 py-10 items-center justify-start">
          <h1 className="ml-80 text-7xl font-lg text-gray-800">ABOUT</h1>
        </div>
        <div className="flex">
          <img src="about/nara.png" />
          <p className="flex ml-7 text-lg tracking-widest text-black font-semibold items-end ">
            NEW AGE <br /> REAL <br /> ATTIRE
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center pt-20 mb-6 ">
        <div className="max-w-screen-xl w-full">
          <section className="pl-52 mb-10 flex flex-col md:flex-row items-center rounded-lg ">
            <div className="w-[681px]  h-[auto] max-h-[500px] object-fill">
              <video
                src="/about/divein.mp4"
                autoPlay
                loop
                muted
                className="min-w-full mb-8 md:mb-0"
              />
            </div>

            <div className="md:ml-20 md:text-left">
              <p className="font-semibold  text-4xl mb-8">Who We Are</p>
              <p className="mb-8 mr-5 ">
                Welcome to NARA—where we’re reimagining Indian heritage for the
                modern world. Our designs fuse timeless fabrics with edgy
                styles, creating fashion that’s as daring as it is affordable.
                Dive in, stand out, and join us on a journey to revolutionize
                your wardrobe!
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="flex items-center justify-center pt-20 mb-6 ">
        <div className="max-w-screen-xl w-full">
          <section className="pl-52 mb-10 flex flex-col md:flex-row items-center rounded-lg ">
            <div className=" md:text-left">
              <p className="font-semibold text-4xl mb-8">Our secret sauce</p>
              <p className="mb-8 mr-5 ">
                Local fabrics and a commitment to affordability that's so
                serious, it's almost like we're your budgeting experts! We're
                all about local love, using pure cotton and heritage fabrics
                from all over the country, that hugs you right. But that’s not
                all, we aim to present timeless pieces that you will never get
                bored of.
              </p>
            </div>
            <video
              src="/about/fabric.mp4"
              autoPlay
              loop
              muted
              className="w-[100%] h-[auto] max-h-[500px] mb-8 md:mb-0"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
