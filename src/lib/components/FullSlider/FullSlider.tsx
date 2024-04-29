import { useEffect, useMemo, useRef, useState } from "react";
import { useCalcSliderSizes } from "./hooks/useCalcSliderSizes";
import { useSliderPhysics } from "./hooks/useSliderPhysics";
import useStage from "./hooks/useStage";

interface SliderStyleProps {
  inActiveOpacity: number;
  gap: number;
  maxContainerWidth: number;
}

interface SliderProps {
  items: JSX.Element[];
  cols: number;
  style?: SliderStyleProps;
}

let isResizedOnce = false;

const ITEM_CONTAINER_TRANSITION_STYLE =
  "transform 0.3s cubic-bezier(0.2, 0, 0, 1)";

export default function Slider({
  items,
  cols,
  style = { inActiveOpacity: 0.5, gap: 48, maxContainerWidth: Infinity },
}: SliderProps) {
  const { stageWidth } = useStage();
  const calcSliderSizes = useCalcSliderSizes({
    itemAmount: items.length,
    cols,
    maxContainerWidth: style.maxContainerWidth,
  });
  const {
    parameterRef,
    interactionState,
    setInteractionState,
    calcMoveX,
    getDragResult,
  } = useSliderPhysics({
    itemAmount: items.length,
    cols,
    maxContainerWidth: style.maxContainerWidth,
  });

  const [isItemSetted, setIsItemSetted] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const itemContainerRef = useRef<HTMLDivElement>(null);

  const sliderItems = useMemo(() => {
    return items.map((item, i) => {
      const si = interactionState.selectedIndex;
      const isSelected = si * cols <= i && i < (si + 1) * cols;

      return (
        <div
          style={{
            width: itemWidth,
            opacity: isSelected ? 1 : style.inActiveOpacity,
            transition: "opacity 0.25s cubic-bezier(0.2, 0, 0, 1)",
            userSelect: "none",
          }}
          key={i}
        >
          {item}
        </div>
      );
    });
  }, [itemWidth, items, cols, interactionState, style.inActiveOpacity]);

  const onDragDown = (e: React.PointerEvent) => {
    if (!itemContainerRef.current) return;

    itemContainerRef.current.style.transition = "none";

    parameterRef.current.downX = e.clientX;
    setInteractionState((prev) => ({ ...prev, isDragging: true }));
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!itemContainerRef.current) return;
    if (!interactionState.isDragging) return;

    const resX = parameterRef.current.x + calcMoveX(e.clientX);
    itemContainerRef.current.style.transform = `translate3d(${resX}px, 0, 0)`;
  };

  useEffect(() => {
    if (!itemContainerRef.current) return undefined;
    if (!interactionState.isDragging) return undefined;

    const itemContainerRefValue = itemContainerRef.current;

    const onDragEnd = (e: PointerEvent) => {
      const { x: resX, idx: resultIndex } = getDragResult(e.clientX);

      itemContainerRefValue.style.transition = ITEM_CONTAINER_TRANSITION_STYLE;
      requestAnimationFrame(() => {
        itemContainerRefValue.style.transform = `translate3d(${resX}px, 0, 0)`;
      });

      parameterRef.current.x = resX;
      setInteractionState(() => ({
        isDragging: false,
        selectedIndex: resultIndex,
      }));
    };

    window.addEventListener("pointerup", onDragEnd);
    window.addEventListener("pointerleave", onDragEnd);

    return () => {
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointerleave", onDragEnd);
    };
  }, [getDragResult, parameterRef, interactionState, setInteractionState]);

  useEffect(() => {
    if (!itemContainerRef.current) return undefined;
    if (!sliderRef.current) return undefined;

    const itemContainerRefValue = itemContainerRef.current;
    const sliderRefValue = sliderRef.current;

    const onResize = () => {
      const { itemWidth, itemContainerWidth, rowWidth } = calcSliderSizes();
      const leftOffset = (stageWidth - rowWidth) / 2;

      requestAnimationFrame(() => {
        sliderRefValue.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
        itemContainerRefValue.style.width = `${itemContainerWidth}px`;
        itemContainerRefValue.style.transform = `translate3d(0, 0, 0)`;

        requestAnimationFrame(() => {
          setIsItemSetted(true);
        });
      });

      setItemWidth(itemWidth);

      if (isResizedOnce) {
        parameterRef.current.x = 0;
        setInteractionState((prev) => ({ ...prev, selectedIndex: 0 }));
      }

      isResizedOnce = true;
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [stageWidth, parameterRef, calcSliderSizes, setInteractionState]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div ref={sliderRef} style={{ userSelect: "none" }}>
        <div
          ref={dragRef}
          style={{ width: "100%", touchAction: "pan-y" }}
          onPointerDown={onDragDown}
          onPointerMove={onDragMove}
        >
          <div
            ref={itemContainerRef}
            style={{
              display: "flex",
              gap: `${style.gap}px`,
              transition: ITEM_CONTAINER_TRANSITION_STYLE,
              opacity: isItemSetted ? "" : 0,
            }}
          >
            {sliderItems}
          </div>
        </div>
      </div>
    </div>
  );
}
