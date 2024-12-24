import React from "react";
import { motion } from "framer-motion";
import bannerData from "../../assets/Lottie/bannerData.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <div className="container mx-auto relative w-full py-8 md:py-12 flex items-start justify-center md:justify-start h-[650px] md:h-[450px] top-10">
      {/* Lottie as background */}
      <div className="bg-green-900">
        <motion.div
          animate={{ y: [20, 50, 20], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-56 md:top-5 md:left-1/2 w-11/12 mx-auto md:w-2/4 h-full z-0"
        >
          <Lottie className="w-full" animationData={bannerData} />
        </motion.div>
      </div>

      <div className=" md:top-10">
      <div className=" z-10 flex md:items-start  flex-col h-full text-center md:text-start text-black max-w-xl md:py-12 ">
        <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-center md:text-start">
          Welcome to <br />
          Our Blog!
        </h1>
        <p className="text-xl mb-6 text-text md:text-start">
          Explore insightful articles, expert tips, in-depth guides, and the
          latest trends in technology, lifestyle, and more.
        </p>
      </div>
      </div>
    </div>
  );
};

export default Banner;
