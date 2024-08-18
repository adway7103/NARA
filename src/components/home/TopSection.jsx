import React from "react";
import topVideo from "../../assets/home/backgroundVideo.mp4";
import CarouselImage from "../../assets/home/carouselImage.jpeg";
const TopSection = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner h-screen">
        <div className="carousel-item active relative w-full h-full">
          <video
            autoPlay
            loop
            muted
            src={topVideo}
            className="d-block w-full h-full object-cover"
            alt="slide1"
          />
        </div>
        <div className="carousel-item relative w-full h-full">
          <img
            src={CarouselImage}
            className="d-block w-full h-full object-cover"
            alt="slide1"
          />
        </div>
        <div className="absolute bottom-28 left-12 text-left text-white">
          <h5 className="text-sm">Featured collection, 2024</h5>
          <h2 className="text-4xl font-bold py-4">मेल</h2>
          <a
            href="#"
            className="inline-block bg-transparent border border-white text-[#D8E3B1] py-2 px-4"
          >
            View collection
          </a>
          <div className="absolute flex justify-between w-full px-12 mt-4">
            <button
              className="carousel-control-prev bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon inline-block bg-no-repeat"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon inline-block bg-no-repeat"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
