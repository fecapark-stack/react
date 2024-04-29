import { useCallback, useMemo, useRef, useState } from "react";
import { useCalcSliderSizes } from "./useCalcSliderSizes";
import { sigmoid } from "../utils/math";

interface UseSliderPhysicsParams {
  itemAmount: number;
  cols: number;
  maxContainerWidth: number;
}

interface InteractionStateType {
  selectedIndex: number;
  isDragging: boolean;
}

export const useSliderPhysics = ({
  itemAmount,
  cols,
  maxContainerWidth,
}: UseSliderPhysicsParams) => {
  const parameterRef = useRef({
    x: 0,
    downX: 0,
  });
  const [interactionState, setInteractionState] =
    useState<InteractionStateType>({
      selectedIndex: 0,
      isDragging: false,
    });

  const calcSizes = useCalcSliderSizes({ itemAmount, cols, maxContainerWidth });

  const moveBoundaries = useMemo(() => {
    const { itemContainerWidth, rowWidth, itemGap } = calcSizes();
    const RANGE =
      Math.floor(itemAmount / cols) + (itemAmount % cols === 0 ? -1 : 0) - 1;

    const res = [0];
    for (let i = 0; i < RANGE; i++) {
      res.push(res[res.length - 1] + rowWidth + itemGap);
    }
    res.push(itemContainerWidth - rowWidth);

    return res;
  }, [calcSizes, cols, itemAmount]);

  const calcMoveX = useCallback(
    (ex: number) => {
      const { rowWidth } = calcSizes();

      const MOVEABLE_SIZE = rowWidth * 1.5;
      const STICKY = 0.002;

      const dX = ex - parameterRef.current.downX;
      const offset = -MOVEABLE_SIZE / 2;
      const res = sigmoid(dX * STICKY) * MOVEABLE_SIZE + offset;

      return res;
    },
    [calcSizes]
  );

  const getDragResult = useCallback(
    (ex: number) => {
      const moveX = calcMoveX(ex);
      const resX = parameterRef.current.x + moveX;
      const MIN = moveBoundaries[0];
      const MAX = moveBoundaries[moveBoundaries.length - 1];
      const SPRING = 30;
      const DRAG_LEFT = moveX > 0;
      const MOVED_IDX = DRAG_LEFT
        ? interactionState.selectedIndex - 1
        : interactionState.selectedIndex + 1;

      if (resX >= MIN) {
        return {
          x: MIN,
          idx: 0,
        };
      }

      if (resX <= -MAX) {
        return {
          x: -MAX,
          idx: moveBoundaries.length - 1,
        };
      }

      if (Math.abs(moveX) < SPRING) {
        return {
          x: -moveBoundaries[interactionState.selectedIndex],
          idx: interactionState.selectedIndex,
        };
      }

      return {
        x: -moveBoundaries[MOVED_IDX],
        idx: MOVED_IDX,
      };
    },
    [calcMoveX, moveBoundaries, interactionState]
  );

  return {
    parameterRef,
    interactionState,
    setInteractionState,
    calcMoveX,
    getDragResult,
  };
};
