import { Link } from "react-router-dom";
export default function DetailSection({ product }) {
    return (
      <>
        <div className="flex flex-col gap-2 font-bold">
          <div>
            <Link>Home</Link> &gt;&nbsp;
            <Link>Collection</Link> &gt;&nbsp;
            <Link>{product.title}</Link>
          </div>
          <h2 className="font-bold text-3xl">{product?.title}</h2>
          {product?.price ? (
            <h3 className="tracking-widest text-xl">
              {product?.price?.currencyCode + " " + product?.price?.amount}
            </h3>
          ) : (
            <h3 className="tracking-widest text-xl">
              {product?.priceRange?.minVariantPrice?.currencyCode +
                " " +
                product?.priceRange?.minVariantPrice?.amount}
            </h3>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">Description</h2>
          <div
            className="tracking-tighter"
            dangerouslySetInnerHTML={{
              __html: product?.descriptionHtml
  
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
  