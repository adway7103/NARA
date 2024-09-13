import { Suspense } from "react";
import Loading from "./Loading";
export default function LazyComponent ({ component }) {
    return(
        <Suspense fallback={<Loading />}>
        {component}
      </Suspense>
    )
};