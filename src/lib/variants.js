export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const slideIn = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 14, transition: { duration: 0.2 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.96 },
};

export const collapseVariant = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  show: { opacity: 1, height: "auto", overflow: "hidden", transition: { duration: 0.35 } },
  exit: { opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.25 } },
};