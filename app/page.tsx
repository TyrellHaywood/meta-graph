"use client";

import React from "react";
import dynamic from "next/dynamic";

// Import the graph component with no SSR since it uses browser APIs
const MetaGraph = dynamic(() => import("../components/MetaGraph"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="w-auto mx-auto bg-[#1E1E1E] text-[#FFFDFC]">
      <MetaGraph />
    </div>
  );
};

export default Home;
