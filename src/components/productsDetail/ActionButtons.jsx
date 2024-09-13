import { MdBookmarkBorder } from "react-icons/md";

export default function ActionButtons() {
    return (
      <div className="md:relative fixed bottom-0 right-0 left-0 bg-[#ffff] md:bg-transparent p-2 md:p-0 flex gap-2 justify-center md:justify-start border-2 md:border-none shadow-lg md:!shadow-none">
        <button className="px-4 py-2 bg-[#1F4A40] text-white border-2 shadow-lg">
          Add to Cart
        </button>
        <button className="px-4 py-2 border-2 shadow-lg">Buy Now</button>
        <button className="px-2 py-2 border-2 shadow-lg">
          <MdBookmarkBorder size={24} />
        </button>
      </div>
    );
  }