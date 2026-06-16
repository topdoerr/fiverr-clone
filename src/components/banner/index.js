"use client";
import React from "react";
import { useTypewriter } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "building mobil app",
      "building web app",
      "logo design",
      "AI services and more...",
    ],
    loop: true,
  });
  return (
    <div className="flex justify-center bg-forest text-cream h-[600px]">
      <div className="flex items-center w-[1400px]">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-5xl leading-tight">
            Find the perfect{" "}
            <span className="italic font-light text-olive">freelance</span>{" "}
            talent for your business
          </h1>
          <p className="text-lg font-light text-cream/80 -mt-2">
            We Keep it Human.
          </p>
          <div className="bg-white rounded flex items-center justify-between overflow-hidden">
            <div className="flex gap-[10px] w-full pr-2">
              <img
                src="/assets/search.png"
                alt="search"
                className="w-5 h-5 my-2 mx-4"
              />
              <input
                type="search"
                className="border-none outline-none text-black placeholder:text-gray-600 w-full"
                placeholder={`Try "${text}"`}
              />
            </div>
            <button className="w-32 h-12 bg-cobalt text-white self-end cursor-pointer hover:bg-cobalt/90 transition">
              Search
            </button>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="w-max">Popular:</span>
            <button className="banner-button">Web Design</button>
            <button className="banner-button">WordPress</button>
            <button className="banner-button">Logo Design</button>
            <button className="banner-button">AI Services</button>
          </div>
        </div>
        <div className="h-full">
          <img
            src="/assets/man.png"
            alt="Man"
            className="h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
