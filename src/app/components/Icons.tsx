const p = {
  width: 14, height: 14, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

export const Clock = () => (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Flame = () => (<svg {...p}><path d="M12 2c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-.5-5 1-8Z" /></svg>);
export const Star = () => (<svg {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" /></svg>);
export const Check = () => (<svg {...p}><path d="m5 12 5 5 9-10" /></svg>);
export const X = () => (<svg {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Chevron = () => (<svg {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const Plus = () => (<svg {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const Bookmark = () => (<svg {...p}><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>);