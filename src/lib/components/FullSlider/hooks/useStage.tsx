import { useEffect, useState } from "react";

export default function useStage() {
  const [sw, setSW] = useState(0);
  const [sh, setSH] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setSW(document.body.clientWidth);
      setSH(document.body.clientHeight);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { stageWidth: sw, stageHeight: sh };
}
