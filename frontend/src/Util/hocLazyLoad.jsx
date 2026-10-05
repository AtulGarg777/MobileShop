import { lazy, Suspense } from "react";

export default function hocLazyLoad(WrappedComponent) {
    return function LazyComponent() {
        let LazyData = lazy(WrappedComponent);
        return (
            <Suspense fallback={<div>loading data...</div>}>
                <LazyData />
            </Suspense>
        )
    }
}