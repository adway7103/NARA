import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
export default function DetailSection({ title, descriptionHtml }) {
  const currentVariant = useSelector(
    (state) => state.activeProduct.currentVariant
  );
  const productOutOfStock = useSelector(
    (state) => state.activeProduct.outOfStock
  );
  return (
    <>
      <div className="flex flex-col xl:!gap-3 gap-1 ">
        <div className="hidden xl:flex gap-4 font-outfit">
          <Link className="underline flex items-center gap-3 ">
            Home <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link className="underline flex items-center gap-3 ">
            Circa2950 <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link className="text-[#656565]">{title.slice(0, 20)}...</Link>
        </div>
        <h2 className="font-black xl:text-2xl text-xl"> {title}</h2>{" "}
        {/*{product?.title}*/}
        <h3 className="tracking-tight font-semibold text-xl">
          {productOutOfStock ? (
            <span className="p-2 rounded-full text-white">out of stock</span>
          ) : currentVariant ? (
            currentVariant?.node.price.currencyCode +
            " " +
            parseFloat(currentVariant?.node.price.amount).toFixed(2)
          ) : (
            <Skeleton
              variant="rectangular"
              className="w-full h-auto p-2 dark:bg-white"
            />
          )}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Description</h2>
        <div
          className="tracking-tighter"
          dangerouslySetInnerHTML={{
            __html: descriptionHtml

              ?.replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4">')
              ?.replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4">')
              ?.replace(
                /<table>/g,
                '<table class=" p-2 table-auto w-full border-collapse border border-gray-300 mb-4">'
              )
              ?.replace(
                /<th>/g,
                '<th class="border-2 border-gray-300 px-4 py-2 bg-gray-100 text-left">'
              )
              ?.replace(
                /<td>/g,
                '<td class="border-2 border-gray-300 px-4 py-2">'
              )
              ?.replace(/<tr>/g, '<tr class="border border-gray-300">'),
          }}
        ></div>
      </div>
    </>
  );
}
