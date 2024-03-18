# @fecapark-stack/react

React utilities for fast coding.

## React

### IconWrapper

Use for centerize icon.  
Recommend [`react-icons`](https://www.npmjs.com/package/react-icons) for here.

#### Usage - Basic

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper>
  <svg>...</svg>
</IconWrapper>;
```

#### Usage - Styling

- Use `style` props.

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper style={{ width: 100, height: 100, borderRadius: "50%" }}>
  <svg>...</svg>
</IconWrapper>;
```

- In `Tailwind`,

```tsx
import { IconWrapper } from "@fecapark-stack/react";

<IconWrapper className="w-12 h-12 rounded-lg">
  <svg>...</svg>
</IconWrapper>;
```
