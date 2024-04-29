import React from "react";
import ReactDOM from "react-dom/client";
import { IconWrapper, FullSlider } from "./lib";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <FullSlider
        cols={3}
        items={[
          <div>1</div>,
          <div>2</div>,
          <div>3</div>,
          <div>4</div>,
          <div>5</div>,
        ]}
      />
      <IconWrapper
        style={{
          width: 100,
          height: 100,
          backgroundColor: "lightgray",
          fontSize: 48,
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </IconWrapper>
    </>
  </React.StrictMode>
);
