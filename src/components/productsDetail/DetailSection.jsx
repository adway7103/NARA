import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import classes from "./DetailSection.module.css"
import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
export default function DetailSection({ title, descriptionHtml }) {
  const query = useQuery();
  const [cameFrom, setCameFrom] = useState({page: '', link: ''});
  const theme = useSelector(state=>state.app.theme);
  const currentVariant = useSelector(
    (state) => state.activeProduct.currentVariant
  );
  const productOutOfStock = useSelector(
    (state) => state.activeProduct.outOfStock
  );

  useEffect(()=>{
    const camefrompage = query.get("camefrompage");
    if(camefrompage === "collection"){
      const collectionId = query.get("id");
      const title = query.get("title")
      setCameFrom({page:title, link: `/collection?id=${collectionId}`});
    }else{
      setCameFrom({page: camefrompage, link: `/${camefrompage}`})
    };
  }, [])

  return (
    <>
      <div className="flex flex-col xl:!gap-3 gap-1 ">
        <div className="hidden xl:flex gap-4 font-outfit">
          <Link className="underline flex items-center gap-3 ">
            Home <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link to={cameFrom.link} className="underline flex items-center gap-3 ">
            {cameFrom.page} <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link className="text-[#656565]">{title?.slice(0, 20)}...</Link>
        </div>
        <h2 className="font-black xl:text-2xl text-xl"> {title}</h2>{" "}
        {/*{product?.title}*/}
        <h3 className="tracking-tight font-semibold text-xl">
          {productOutOfStock ? (
            <span className="p-2 rounded-full text-white bg-red-500">out of stock</span>
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

      {/* Description HTML section */}

      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Description </h2>
        <div
          className={`prose ${theme==="dark"  && classes["text-white-recursive"]}  text-sm`}
          dangerouslySetInnerHTML={{
            __html: descriptionHtml
          }}></div>
      </div>


    </>
  );
}
