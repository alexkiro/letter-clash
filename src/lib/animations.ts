function animate(thing: Element | null | string, colorName: string, keyframes: any[], animationOptions: any) {
  let el = null;
  if (typeof thing === "string") {
    el = document.querySelector(thing);
  } else {
    el = thing as Element;
  }

  if (!el) return;
  const color = `var(--${colorName})`;
  const borderColor = color;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.animate(
    keyframes.map((keyframe) => {
      return {
        borderColor,
        color,
        ...keyframe,
      };
    }),
    animationOptions,
  );
}

export function animateShake(thing: Element | string, colorName: string, options?: any) {
  animate(
    thing,
    colorName,
    [
      { offset: 0, transform: "translate(0px)" },
      { offset: 0.25, transform: "translate(5px)" },
      { offset: 0.5, transform: "translate(-5px)" },
      { offset: 0.75, transform: "translate(5px)" },
      { offset: 1, transform: "translate(0px)" },
    ],
    {
      duration: 150,
      iterations: 2,
      ...options,
    },
  );
}

export function animateWiggle(thing: Element | string, colorName: string, options?: any) {
  animate(
    thing,
    colorName,
    [
      { offset: 0, transform: "rotate(0deg)" },
      { offset: 0.25, transform: "rotate(5deg) scale(1.1)" },
      { offset: 0.5, transform: "rotate(0deg) scale(1.1)" },
      { offset: 0.75, transform: "rotate(-5deg) scale(1.1)" },
      { offset: 1, transform: "rotate(0deg)" },
    ],
    {
      duration: 250,
      iterations: 2,
      ...options,
    },
  );
}
