import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <Image
      src="/spinner.png"
      width={50}
      height={50}
      alt="Spinner"
      className="animate-spin"
    />
  );
};

export default Spinner;
