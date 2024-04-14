"use client";

import { useState } from "react";
import Image from "next/image";

type PropTypes = {
  slides: Slide[];
  className?: string;
};

type Slide = {
  image: string;
  title: string;
  description: string;
};

const Carousel = ({ slides, className }: PropTypes) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderedSlides = slides.map((slide, i) => (
    <li
      key={slide.title}
      className="absolute left-0 top-0 flex flex-col items-center transition-transform text-center"
      style={{ transform: `translateX(${100 * (i - currentSlide)}%)` }}
    >
      <Image className="mb-8" src={slide.image} alt="" />
      <h1 className="text-2xl font-semibold text-neutrals-50 mb-4">
        {slide.title}
      </h1>
      <p className="text-base text-neutrals-100 text-center mb-4">
        {slide.description}
      </p>
    </li>
  ));

  return (
    <div
      style={{ maxHeight: "30rem" }}
      className={`w-full h-full flex flex-col${
        className ? ` ${className}` : ""
      }`}
    >
      <ul className="basis-3/4 relative overflow-hidden">{renderedSlides}</ul>

      <div className="flex justify-center -mt-8 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${
              currentSlide === index
                ? "w-8 h-3 rounded-full bg-blue-300 mx-2"
                : "w-3 h-3 rounded-full border border-blue-300 mx-2"
            } cursor-pointer`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
