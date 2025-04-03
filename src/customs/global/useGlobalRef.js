import { useRef } from "react";

// This function ensures all refs are created when the hook is first used
export const useGlobalRefs = (() => {
    const refs = {
        preAdditionalRef: null,
        preProductItemsRef: null,
        preTaxDiscountRef: null,
    };

    return () => {
        // Initialize refs only if they are null
        refs.preAdditionalRef = refs.preAdditionalRef || useRef([]);
        refs.preProductItemsRef = refs.preProductItemsRef || useRef([]);
        refs.preTaxDiscountRef = refs.preTaxDiscountRef || useRef([]);

        return refs;
    };
})();
