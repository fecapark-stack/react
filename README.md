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
