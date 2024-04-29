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

`component`

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

`component`

Use for slide items.  
This slider's width size is browser's screen width(default, can customize max width).

### demo

![fullslider](https://github.com/fecapark/metaball-interaction/assets/101973955/950032a1-8d86-48f1-ae81-73cd10ef46ac)

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

<br />

## useFunnel

`hooks`

Use for optimize sequential form contents.

Simple implementation of `@toss/slash/useFunnel`.

- references below
- [docs](https://www.slash.page/libraries/react/use-funnel/readme.i18n/)
- [github](https://github.com/toss/slash/blob/main/packages/react/use-funnel/src/useFunnel.tsx)

### Usage

```tsx
import { useFunnel } from "@fecapark-stack/react";

type FunnelStepsType = "Content1" | "Content2" | "Content3";

function Component() {
  const [Funnel, setStep] = useFunnel<FunnelStepsType>("Content1"); // initial step

  return (
    <Funnel>
      <Funnel.Step name="Content1">
        <AnyContent1 onSubmit={() => setStep("Content2")} />
      </Funnel.Step>

      <Funnel.Step name="Content2">
        <AnyContent2 onSubmit={() => setStep("Content3")} />
      </Funnel.Step>

      <Funnel.Step name="Content3">
        <AnyContent3 />
      </Funnel.Step>
    </Funnel>
  );
}
```
