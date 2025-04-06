"use client";

import React from "react";
import dynamic from "next/dynamic";

// Import the graph component with no SSR since it uses browser APIs
const MetaGraph = dynamic(() => import("../components/MetaGraph"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <MetaGraph />
    </div>
  );
};

export default Home;
