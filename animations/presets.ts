// Shared motion language. Change values here to retune the whole site.
export const duration = {
  fast: 0.2, // hover, micro-interactions
  base: 0.5, // standard reveals
  slow: 0.9, // large elements
  hero: 1.2, // opening sequence
} as const;

export const ease = {
  out: "power3.out", // default: quick start, soft landing
  inOut: "power3.inOut", // transitions between states
  expo: "expo.out", // dramatic reveals
} as const;

export const stagger = {
  text: 0.08, // lines/words
  list: 0.06, // rows and cards
} as const;

// Travel distance in px for reveal offsets
export const distance = { sm: 16, md: 32, lg: 64 } as const;
