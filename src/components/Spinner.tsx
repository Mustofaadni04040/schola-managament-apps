import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <Image
        src="/spinner.png"
        width={50}
        height={50}
        alt="Spinner"
        className="animate-spin"
      />
    </div>
  );
};

export default Spinner;
