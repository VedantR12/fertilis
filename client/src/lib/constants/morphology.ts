export const FRUCTOSE = [
    "Present",
    "Absent",
] as const;

export const AGGREGATION_AGGLUTINATION = [
    "None",
    "+",
    "++",
    "+++",
] as const;

export const MORPHOLOGY_REFERENCE = {
    normal_forms: "≥ 4%",
    live_sperm: "≥ 58%",
    dead_sperm: "≤ 42%",
    fructose: "Present",
    aggregation_agglutination: "None",
} as const;