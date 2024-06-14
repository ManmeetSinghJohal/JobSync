import Image from "next/image";
import loadingSVG from "@/public/images/loading.svg";

const LoadingSpinner = () => {
  return (
    <div>
      <Image src={loadingSVG} alt="loading" width={500} height={500} />
    </div>
  );
};

export default LoadingSpinner;
