export const projectMotion = {
  duration: {
    fast: 0.16,
    base: 0.24,
    slow: 0.34,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    soft: [0.25, 0.46, 0.45, 0.94] as const,
  },
  transitions: {
    overlayFade: {
      duration: 0.16,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
    drawer: {
      type: "spring" as const,
      damping: 28,
      stiffness: 230,
      mass: 0.8,
    },
    sectionIn: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1] as const,
    },
    tabSwitch: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};
