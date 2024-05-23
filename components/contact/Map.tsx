"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

const Map = () => {
  return (
    <div>
      <h4 className="text-accent-light-green">Where We Are</h4>
      <DynamicMap />
    </div>
  );
};

export default Map;
