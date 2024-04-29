# @fecapark-stack/react

React utilities for fast coding.

## Install & Import

```
npm install @fecapark-stack/react
```

```
yarn add @fecapark-stack/react
```

then,

```tsx
import { ... } from "@fecapark-stack/react";
```

<br />

## IconWrapper

Use for **centerize icon.**  
Recommend [`react-icons`](https://www.npmjs.com/package/react-icons) for here.

### Usage

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper>
  <svg>...</svg>
</IconWrapper>;
```

- For styling, use `style` props.

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper style={{ width: 100, height: 100, borderRadius: "50%" }}>
  <svg>...</svg>
</IconWrapper>;
```

- Or in `Tailwind`,

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper className="w-12 h-12 rounded-lg">
  <svg>...</svg>
</IconWrapper>;
```

<br />

## FullSlider

Use for slide items.  
This slider's width size is browser's screen width(default, can customize max width).

### demo

![fullslider](https://github.com/fecapark/blog/assets/101973955/35d5c7fa-fa1c-4e98-a2ef-8b46d38209c8)

### Usage

```tsx
import { FullSlider } from "@fecapark-stack/react";

const items = [
  <div>1</div>,
  <div>2</div>,
  <div>3</div>,
  <div>4</div>,
  <div>5</div>,
];

<FullSlider items={items} cols={3} />;
```

- For styling, use `style` props.

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<FullSlider
  items={items}
  cols={3}
  style={{
    inActiveOpacity: 0.5,
    gap: 24,
    maxContainerWidth: 1200,
  }}
/>;
```

- `style` props (all props are optional)

| name              | description                                 | type            | default value |
| ----------------- | ------------------------------------------- | --------------- | ------------- |
| inActiveOpacity   | Opacity value of not focused items.         | `number`        | `0.5`         |
| gap               | Gap size between slider items.              | `number(pixel)` | `48(px)`      |
| maxContainerWidth | Max slider view width about window resizing | `number(pixel)` | `Infinity`    |
