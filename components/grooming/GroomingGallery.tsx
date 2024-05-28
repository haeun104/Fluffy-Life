import brush from "@/public/images/grooming-brush.png";
import bath from "@/public/images/grooming-bath.png";
import haircut from "@/public/images/grooming-haircut.png";
import Image from "next/image";

const GroomingGallery = () => {
  return (
    <>
      <h3 className="text-accent-light-green font-bold mt-10">Gallery</h3>
      <div className="flex flex-col sm:flex-row">
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <Image src={bath} alt="grooming bath" />
        </div>
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <Image src={haircut} alt="grooming haircut" />
        </div>
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <Image src={brush} alt="grooming brush" />
        </div>
      </div>
    </>
  );
};

export default GroomingGallery;
