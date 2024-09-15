import { useEffect, useRef, useCallback, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { addItemToCart, getItemsInCart, updateLineItem } from "../apis/Cart";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CartItem({
  src,
  title,
  quantity,
  size,
  pricePerItem,
  cartLineId,
  productId,
  setItemsQuantity,
  fetchAllItems,
}) {
  const [productQuantity, setProductQuantity] = useState();
  const [quantityUpdating, setQuantityUpdating] = useState(false);
  const [productIsUpdating, setProductIsUpdating] = useState(false);

  const cartId = useSelector((state) => state.cart?.id);
  
  useEffect(() => {
    if (quantity) {
      setProductQuantity(quantity);
    }
  }, [quantity]);

  const increaseTheProductQuantity = async (cartId, variantId) => {
    try {
      setQuantityUpdating(true);
      const response = await addItemToCart(cartId, variantId);
      const updatedQuantity =
        response?.data?.cartLinesAdd?.cart?.lines?.edges?.[0]?.node?.quantity;
      if (updatedQuantity === productQuantity)
        toast.info(
          "Only that much stock is available for the selected variant for now"
        );
      else setProductQuantity(updatedQuantity);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
        // proceed to delete the cartId from localstorage and redux
      }
    } finally {
      setQuantityUpdating(false);
    }
  };

  const updateCartItem = async (cartId, cartLineId, quantity) => {
    try {
      setQuantityUpdating(true);
      const response = await updateLineItem(cartId, cartLineId, quantity);
      const updatedQuantity =
        response?.data?.cartLinesUpdate?.cart?.lines?.edges?.[0]?.node?.quantity;
      setProductQuantity(updatedQuantity);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
        // proceed to delete the cartId from localstorage and redux
      }
    } finally {
      setQuantityUpdating(false);
    }
  };

  const updateCartLine = () => {
    if (productId && cartId) {
      increaseTheProductQuantity(cartId, productId);
    }
  };

  const decreaseQuantityHandler = () => {
    if (cartId && cartLineId) {
      updateCartItem(cartId, cartLineId, productQuantity - 1);
    }
  };

  const removeProductFromCarthandler = async () => {
    if (cartId && cartLineId) {
      try {
        setProductIsUpdating(true);
        await updateCartItem(cartId, cartLineId, 0);
        fetchAllItems(cartId);
      } catch (err) {
        console.error(err);
      } finally {
        setProductIsUpdating(false);
      }
      // have to make a better function
    }
  };

  return (
    <>
      <div className="flex gap-2 z-100 sm:h-32 h-24 pb-2 border-b-2   ">
        {productIsUpdating ? (
          <Skeleton
            variant="rectangular"
            className=" w-full h-auto p-3 dark:bg-white"
          />
        ) : (
          <>
            <div className="flex w-1/3  ">
              <img src={src} alt="Frock" className="object-cover w-full h-full" />
            </div>

            <div className="flex sm:gap-4 sm:gap-2 items-start w-2/3 ">
              <div className="flex flex-col justify-between h-full sm:gap-2   sm:text-base text-sm w-5/6 ">
                <div className="flex flex-col gap-2 ">
                  <h1 className="font-bold w-full overflow-hidden text-ellipsis line-clamp-2">
                    {title}
                  </h1>

                  <p className="text-xs sm:text-base">
                    {pricePerItem?.currencyCode}{" "}
                    <strong className="font-black">
                      {(pricePerItem?.amount * 1.0 * productQuantity).toFixed(2)}
                    </strong>{" "}
                    | Size: <strong className="font-bold">{size}</strong>
                  </p>
                </div>
                {quantityUpdating ? (
                  <Skeleton
                    variant="rectangular"
                    className=" w-full h-auto p-3 dark:bg-white"
                  />
                ) : (
                  <div className="text-xs sm:text-base">
                    <button
                      className="px-2 bg-[#F7F7F7] border-1"
                      onClick={updateCartLine}
                    >
                      +
                    </button>{" "}
                    {productQuantity}{" "}
                    <button
                      className="px-2 bg-[#F7F7F7] border-1"
                      onClick={decreaseQuantityHandler}
                    >
                      &mdash;{" "}
                    </button>
                  </div>
                )}
              </div>
              {/* delete button */}
              <button className="w-1/6" onClick={removeProductFromCarthandler}>
                <img src="/icons/deleteIcon.svg" alt="" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const useDebounce = (fn, delay) => {
  const timerRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default function Cart({ toggleCartOpen }) {
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const [checkoutURL, setCheckoutUrl] = useState(null);
  const [products, setProducts] = useState(null);
  const cartRef = useRef(null);
  const cartId = useSelector((state) => state.cart?.id);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const checkOutHandler = () => {
    if (!checkoutURL) return alert("Checkout Url does not exist");
    window.open(checkoutURL);
  };

  const fetchAllItems = async (cartId) => {
    try {
      const response = await getItemsInCart(cartId);
      const itemsQuantity = response?.totalQuantity;
      setItemsQuantity(itemsQuantity);
      setCheckoutUrl(response?.checkoutUrl);
      const products = response?.lines?.edges;
      setProducts(products);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
        // proceed to delete the cartId from localstorage and redux
      }
    }
  };

  const continueShoppingHandler = () => {
    navigate("/products");
  };

  useEffect(() => {
    if (cartId) {
      fetchAllItems(cartId);
    }
  }, [cartId]);

  return (
    <>
      <div
        ref={cartRef}
        className="border-2 fixed z-[10000]  top-0 bottom-0 right-0  bg-white w-[100vw] sm:w-[500px] "
      >
        <div className=" flex items-center justify-between border-b-2 p-4">
          <h1 className="text-2xl font-black ">MY CART</h1>
          <button
            className="border-2 px-2 shadow-lg"
            onClick={() => toggleCartOpen()}
          >
            &times;
          </button>
        </div>
      <div className="flex flex-col  h-full pb-4">
        <div className="flex flex-col gap-4 h-5/6 p-4">
          <h2 className="font-black ">Added Products ({itemsQuantity}) </h2>
          {/* cartItems */}
          <div className="flex flex-col gap-2  overflow-auto">
            {products?.map((el) => (
              <CartItem
                setItemsQuantity={setItemsQuantity}
                key={el?.node?.id}
                cartLineId={el?.node?.id}
                src={el?.node?.merchandise?.image?.src}
                quantity={el?.node?.quantity}
                title={el?.node?.merchandise?.product?.title}
                pricePerItem={el?.node?.merchandise?.price}
                productId={el?.node?.merchandise?.id}
                fetchAllItems={fetchAllItems}
                size={
                  el?.node?.merchandise?.selectedOptions?.find(
                    (el) => el?.name === "Size"
                  )?.value
                }
              />
            ))}
          </div>
        </div>
        <div className="flex justify-around font-outfit ">
            <button onClick={continueShoppingHandler} className="text-[#1F4A40] border-1 border-[#1F4A40] px-2 py-1 flex items-center gap-2">
              <HiArrowNarrowLeft /> Continue Shopping
            </button>
            <button onClick={checkOutHandler} className=" bg-[#1F4A40] px-2 py-1 text-[#ffff]">
              Continue to Checkout
            </button>
          </div>
      </div>
      </div>
    </>
  );
}

