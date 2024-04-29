import { useCallback } from "react";
import { getRemSize } from "../utils/style";
import useStage from "./useStage";

interface UseSliderSizesProps {
  itemAmount: number;
  cols: number;
  maxContainerWidth: number;
}

export const useCalcSliderSizes = ({
  itemAmount,
  cols,
  maxContainerWidth,
}: UseSliderSizesProps) => {
  const { stageWidth } = useStage();

  const calcSizes = useCallback(() => {
    const PADDING = getRemSize() * 2.5;
    const GAP = getRemSize() * 4;
    const gapSum = GAP * (cols - 1);

    const itemWidth =
      (Math.min(maxContainerWidth, stageWidth) -
        PADDING * 2 -
        GAP * (cols + 1)) /
      cols;
    const itemContainerWidth = itemWidth * itemAmount + GAP * (itemAmount - 1);
    const rowWidth = itemWidth * cols + gapSum;

    return {
      itemWidth,
      itemContainerWidth,
      rowWidth,
      itemGap: GAP,
    };
  }, [stageWidth, cols, itemAmount, maxContainerWidth]);

  return calcSizes;
};
