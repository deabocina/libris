import { useInView } from "react-intersection-observer";

export const useCustomInView = (threshold: number) => {
  return useInView({
    triggerOnce: true,
    threshold,
  });
};
