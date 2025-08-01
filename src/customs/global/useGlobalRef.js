import { useRef } from "react";

// This hook returns the same global refs every time
let preAdditionalRef;
let preProductItemsRef;
let preTaxDiscountRef;

export const useGlobalRefs = () => {
  // Initialize once per app lifetime
  if (!preAdditionalRef) preAdditionalRef = { current: [] };
  if (!preProductItemsRef) preProductItemsRef = { current: [] };
  if (!preTaxDiscountRef) preTaxDiscountRef = { current: [] };

  // Return them as refs
  return { preAdditionalRef, preProductItemsRef, preTaxDiscountRef };
};