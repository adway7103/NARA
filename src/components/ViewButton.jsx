import { FaPlus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ViewButton({productId}){
    // const addToCartHandler = () => {
    //     if (!currentVariant || productOutOfStock) {
    //       console.log("variant is non existant at this point!");
    //       return;
    //     }
    
    //     if (cartId) {
    //       const variantId = currentVariant.node.id;
    //       addAnotherItemToTheCart(cartId, variantId);
    //     } else {
    //       const variantId = currentVariant.node.id;
    //       createCartWithOneitem(variantId);
    //     }
    //   };
    return(
        <Link to={`/product/${productId}`}
       
        className={`  disabled:bg-gray-400 px-4 py-2  rounded-xl border-2  flex items-center justify-center gap-2`}
      >
        
         <FaEye />   <pan>View Product</pan>
        
      
      </Link>
    )
}