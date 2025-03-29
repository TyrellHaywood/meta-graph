import React from "react";
import dynamic from "next/dynamic";

// Import the graph component with no SSR since it uses browser APIs
const SoundGraph = dynamic(() => import("../components/SoundGraph"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <SoundGraph />
    </div>
  );
};

export default Home;
