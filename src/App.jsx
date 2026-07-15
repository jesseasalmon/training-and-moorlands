import { useState, useEffect } from "react";
import { HERO_IMAGE } from "./heroImage.js";

// ─── THEME ───────────────────────────────────────────────────────────────────
function makeTheme(dark) {
  return {
    dark,
    bg:          dark ? "#0b0d10" : "#f5f4f0",
    surface:     dark ? "#111318" : "#ffffff",
    border:      dark ? "#1e2128" : "#e0ddd8",
    text:        dark ? "#dde4ee" : "#1a1c20",
    textSub:     dark ? "#a0aabb" : "#555e6e",
    textMid:     dark ? "#778"    : "#7a8090",
    textDim:     dark ? "#556"    : "#9aa0aa",
    textFaint:   dark ? "#445"    : "#b0b8c4",
    textVeryDim: dark ? "#334"    : "#c8cdd4",
    muted:       dark ? "#252830" : "#e8e5df",
    mutedAlt:    dark ? "#1a1d24" : "#edeae4",
    card:        dark ? "#0f1115" : "#f9f8f6",
    cardAlt:     dark ? "#151820" : "#f2f0ec",
    input:       dark ? "#1a1d24" : "#f0ede8",
    inputBorder: dark ? "#2a2d34" : "#d0cdc8",
    accent: { teal:"#5bb8a0", amber:"#c4873a", purple:"#a07cc4", blue:"#5a8fd0", rose:"#c47ca0" },
    phase: {
      menstrual:  { color:"#c47ca0", bg: dark ? "#1e1118" : "#fdf0f5", label:"Menstrual",  days:"Days 1–7",   theme:"Release · Intuition · Renewal",      energy:"Lowest physical · Highest intuitive" },
      follicular: { color:"#5a8fd0", bg: dark ? "#111828" : "#f0f4fc", label:"Follicular", days:"Days 6–13",  theme:"Curiosity · Ideas · Expansion",       energy:"Rising · Curious · Flexible" },
      ovulatory:  { color:"#4aa890", bg: dark ? "#111e1b" : "#f0faf7", label:"Ovulatory",  days:"Days 14–16", theme:"Expression · Leadership · Connection", energy:"Highest outward" },
      luteal:     { color:"#c4873a", bg: dark ? "#1e1810" : "#fdf6ee", label:"Luteal",     days:"Days 17–28", theme:"Structure · Refinement · Completion",  energy:"Steady → Declining" },
    },
    training: {
      pool:"#4aaa92", "pool-deep":"#2d7a8a", "pool-apnea":"#1a6c7e",
      strength:"#c4873a", "apnea-strength":"#a06030",
      cardio:"#9c7ac4", hiit:"#7a4aa0",
      dry:"#5a8fd0", rest: dark ? "#252830" : "#d8d4ce", shabbat: dark ? "#1a1a1e" : "#e8e5df",
      admin: dark ? "#666" : "#8a8890", grocery:"#5b8a5b", life:"#8a7a5b",
    },
  };
}

// keep C as a legacy alias — gets reassigned at render time via T
let C = makeTheme(true);

// ─── CYCLE PHASE DATA ────────────────────────────────────────────────────────
function makeCyclePhases(T) { return {
  menstrual: {
    ...T.phase.menstrual,
    brain: "Inward · Reflective · Pattern-seeing · Deep",
    nsNeeds: "Safety + quiet",
    strengths: ["Pattern recognition", "Truth-telling", "Evaluation", "Emotional clarity", "Root-cause insight"],
    body: ["Estrogen & progesterone lowest", "Uterine lining sheds", "Inflammatory mediators rise temporarily", "Nervous system more sensitive"],
    workFocus: ["Review what worked / didn't", "Audit projects + systems", "Financial review", "Client pattern analysis", "Strategy reflection", "Simplify workflows"],
    avoid: "Launches, high-stakes calls, heavy output, big meetings",
    movement: ["Gentle yoga", "Walking", "Stretching", "Breathwork", "Mobility"],
    trainingNote: "Reduce intensity. Breathwork + gentle movement. Honour your limits.",
    foods: ["Iron-rich foods (red meat, lentils, spinach)", "Mineral broths", "Warm cooked meals", "Root vegetables", "Dark chocolate (magnesium)", "Vitamin C foods"],
    herbs: ["Ginger — cramps & inflammation", "Turmeric — anti-inflammatory", "Nettle — mineral support", "Raspberry leaf — uterine support", "Cinnamon — circulation"],
    creative: ["Journaling", "Idea downloading", "Vision mapping", "Theme finding", "Story mining", "Mind maps"],
    home: ["Simplify spaces", "Reduce noise & clutter", "Deep conversations", "Emotional honesty", "Slow parenting presence"],
  },
  follicular: {
    ...T.phase.follicular,
    brain: "Learning · Idea generation · Curious · Open",
    nsNeeds: "Movement + novelty",
    strengths: ["Learning speed", "Idea generation", "Openness", "Experimentation", "Skill acquisition"],
    body: ["Estrogen rising", "Dopamine sensitivity increases", "Learning & creativity improve", "Motivation & openness increase", "Cognitive flexibility high"],
    workFocus: ["Start new projects", "Outline programs", "Draft frameworks", "Research deeply", "System building", "Curriculum design", "Offer structuring"],
    avoid: "Nothing — best time to start and experiment",
    movement: ["Strength training", "Dance", "Faster walks", "Skill learning", "Moderate cardio"],
    trainingNote: "Energy rising — push harder in pool and gym. Good for learning new technique.",
    foods: ["Fresh greens", "Sprouts", "Eggs", "Fermented foods", "Lean proteins", "Citrus", "Seeds"],
    herbs: ["Maca — energy support", "Green tea — cognition", "Rhodiola — resilience", "Dandelion — liver support"],
    creative: ["Brainstorming", "Writing drafts", "Storyboarding", "Creative exploration", "Naming ideas", "Visual concepting"],
    home: ["Start small projects", "Rearrange spaces", "Plan family rhythms", "Try new recipes", "Initiate plans with partner/friends"],
  },
  ovulatory: {
    ...T.phase.ovulatory,
    brain: "Verbal · Social · Persuasive",
    nsNeeds: "Expression + connection",
    strengths: ["Communication", "Confidence", "Persuasion", "Presence", "Social intuition"],
    body: ["Estrogen peaks", "Small testosterone rise", "Verbal fluency increases", "Confidence & sociability increase", "Pain tolerance higher", "Charisma peaks"],
    workFocus: ["Client calls", "Sales & enrollment", "Filming", "Live workshops", "Interviews", "Networking", "Teaching"],
    avoid: "Nothing — peak performance window",
    movement: ["Higher intensity workouts", "Dance", "Group classes", "Athletic training"],
    trainingNote: "Peak window — best time for deep pool sessions, PR attempts, high-effort apnea work.",
    foods: ["Fibre-rich vegetables", "Antioxidant fruits", "Fish", "Zinc foods (seeds, shellfish)", "High hydration"],
    herbs: ["Shatavari — female hormone support", "Hibiscus — circulation", "Rose — mood & heart support"],
    creative: ["On-camera content", "Teaching", "Storytelling", "Collaboration", "Performance"],
    home: ["Host gatherings", "Family meetings", "Important conversations", "Conflict repair talks", "Appreciation & affirmation"],
  },
  luteal: {
    ...T.phase.luteal,
    brain: "Critical thinking · Detail detection",
    nsNeeds: "Order + boundaries",
    strengths: ["Editing", "Error detection", "Refinement", "Boundary setting", "Quality control", "Practical execution"],
    body: ["Progesterone rises", "Body temperature rises", "Calorie needs increase", "Detail detection increases", "Error spotting strong", "Late phase: mood sensitivity rises"],
    workFocus: ["Early: project execution, editing, system refinement, client follow-ups", "Late: admin, inbox clearing, scheduling, light organisation, wrap-ups"],
    avoid: "Late luteal: new launches, high-stakes creative decisions",
    movement: ["Strength with lower volume", "Pilates", "Walking", "Yoga", "Nervous system regulation"],
    trainingNote: "Early luteal: train well. Late luteal: drop intensity. Prioritise breathwork + nervous system.",
    foods: ["Complex carbs", "Oats", "Sweet potatoes", "Chickpeas", "Turkey", "Magnesium foods", "B-vitamins"],
    herbs: ["Vitex — cycle support", "Chamomile — calming", "Lemon balm — mood", "Ashwagandha — stress support"],
    creative: ["Editing", "Tightening", "Structuring", "Packaging ideas", "Final drafts"],
    home: ["Meal prep", "Calendar planning", "Budget review", "Systems reset", "Boundary conversations", "Expectation clarifying"],
  },
}; }

// ─── 2026 MOON CALENDAR ──────────────────────────────────────────────────────
const MOONS_2026 = [
  { date: "2026-05-31", type: "full",  name: "Blue Moon",        theme: "Refinement · Alignment · Release what misaligns" },
  { date: "2026-06-14", type: "new",   name: "New Strawberry Moon", theme: "Prepare to receive · Open to harvest" },
  { date: "2026-06-29", type: "full",  name: "Strawberry Moon",  theme: "Harvest · Satisfaction · Receiving rewards" },
  { date: "2026-07-14", type: "new",   name: "New Buck Moon",    theme: "Set intentions for power · Courage · Growth" },
  { date: "2026-07-29", type: "full",  name: "Buck Moon",        theme: "Strength · Courage · Stepping into power" },
  { date: "2026-08-12", type: "new",   name: "New Sturgeon Moon",theme: "Plant abundance · Strengthen resource systems" },
  { date: "2026-08-28", type: "full",  name: "Sturgeon Moon",    theme: "Abundance · Resource awareness · Resilience" },
];

const FULL_MOON_RITUAL = [
  "Review metrics + client outcomes",
  "List what worked / what drained you",
  "Write what you are stopping",
  "Burn or tear 'stop doing' list",
  "Name 3 real wins",
];

const NEW_MOON_RITUAL = [
  "Sit with notebook + candle",
  "Review last cycle lessons",
  "Choose 1–3 priorities only",
  "Write commitments as actions, not wishes",
  "Choose one courage move",
  "Schedule first step immediately",
];

// ─── PROGRAMME DATA ──────────────────────────────────────────────────────────
// ─── STATIC ACCENT & TRAINING COLOURS (same in both themes) ─────────────────
const ACCENT = { teal:"#5bb8a0", amber:"#c4873a", purple:"#a07cc4", blue:"#5a8fd0", rose:"#c47ca0" };
const TRAINING_C = {
  pool:"#4aaa92", "pool-deep":"#2d7a8a", "pool-apnea":"#1a6c7e",
  strength:"#c4873a", "apnea-strength":"#a06030",
  cardio:"#9c7ac4", hiit:"#7a4aa0",
  dry:"#5a8fd0", rest:"#888", shabbat:"#aaa",
  admin:"#888", grocery:"#5b8a5b", life:"#8a7a5b",
};

const PHASE_META = {
  pre:    { label:"Pre Phase",  dates:"May 15–31",  color:ACCENT.teal,   focus:"Baseline · Medical clearance · 4 Section Breathing" },
  phase1: { label:"Phase 1",    dates:"Jun 1–30",   color:ACCENT.blue,   focus:"Cardiovascular base · First breath holds Weeks 5–6" },
  phase2: { label:"Phase 2",    dates:"Jul 1–31",   color:ACCENT.amber,  focus:"Strength (Wks 7–8) → Apnea strength (Wks 9–10)" },
  phase3: { label:"Phase 3",    dates:"Aug 1–31",   color:ACCENT.purple, focus:"70% apnea · 30% apnea strength · Taper Wk 14 · Attempt" },
};

const TYPE_COLOR = {
  pool:TRAINING_C.pool, "pool-apnea":TRAINING_C["pool-apnea"], "pool-deep":TRAINING_C["pool-deep"],
  strength:TRAINING_C.strength, "apnea-strength":TRAINING_C["apnea-strength"],
  cardio:TRAINING_C.cardio, hiit:TRAINING_C.hiit,
  dry:TRAINING_C.dry, rest:TRAINING_C.rest, shabbat:TRAINING_C.shabbat,
  admin:TRAINING_C.admin, grocery:TRAINING_C.grocery, life:TRAINING_C.life,
};

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const WEEKS = {
  pre: [
    { week:1, sessions:{
      Mon:{type:"dry",     label:"Baseline",           tasks:["4 Section Breathing 10 rounds","3 × max Dry Static Apnea — record all times","Log resting morning heart rate"], note:"Starting baseline. Be honest with your times."},
      Tue:{type:"cardio",  label:"Cardio Intro",       tasks:["Easy walk or light jog 20–25 min"]},
      Wed:{type:"admin",   label:"Admin",              tasks:["Obtain physician medical clearance","Sign and return waiver"], note:"No in-water training until complete."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest"]},
      Fri:{type:"cardio",  label:"Cardio",             tasks:["Easy walk or jog 25–30 min — conversational pace"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop for the week","Meal prep (batch cook)","200m easy warm-up swim — no breath holds, just settle in","Weekly reflection — what do I need this week?"], note:"Sunday anchor: groceries → meal prep → pool → reflect."},
    }},
    { week:2, sessions:{
      Mon:{type:"dry",     label:"4SB + Dry Static",   tasks:["4 Section Breathing 10 rounds","3 × max Dry Static Apnea — full recovery between each","Log resting morning heart rate"], note:"Compare times to Week 1."},
      Tue:{type:"cardio",  label:"Cardio",             tasks:["Light jog or stationary bike 25–30 min","60–65% max heart rate"]},
      Wed:{type:"pool",    label:"Pool Easy",          tasks:["200m warm-up","300m easy freestyle","200m cool down = 700m total"], note:"Relaxed breathing. No breath holds."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest"]},
      Fri:{type:"cardio",  label:"Cardio",             tasks:["Jog or brisk walk 30 min — 65% max HR"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop","Meal prep","200m warm-up + 500m freestyle breathing every 8m + 200m cool down = 900m total","Weekly reflection + schedule next week"], note:"Note how breathing feels across 500m."},
    }},
  ],
  phase1: [
    { week:3, sessions:{
      Mon:{type:"cardio",  label:"Cardio",             tasks:["Jog or treadmill 30 min at 60–65% max HR","Log resting morning heart rate"]},
      Tue:{type:"dry",     label:"4SB + Dry Static",   tasks:["4 Section Breathing 10 rounds","3 × max Dry Static Apnea — full recovery","Log every time"]},
      Wed:{type:"pool",    label:"Pool Cardio",        tasks:["200m warm-up","500m freestyle every 6 strokes","200m cool down = 900m total"]},
      Thu:{type:"rest",    label:"Active Recovery",    tasks:["Easy walk 20–30 min"]},
      Fri:{type:"cardio",  label:"Cardio",             tasks:["Stationary bike or jog 35 min — 65% max HR — steady state only"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop + meal prep","300m warm-up + 800m freestyle breathing every 8m + 200m cool down = 1300m total","Log 1000m time","Weekly reflection + bill check"], note:"Log your 1000m time."},
    }},
    { week:4, sessions:{
      Mon:{type:"cardio",  label:"Cardio",             tasks:["Jog or treadmill 35 min at 65–70% max HR","Log resting morning heart rate"]},
      Tue:{type:"dry",     label:"4SB + Dry Static",   tasks:["4 Section Breathing 10 rounds","3 × max Dry Static Apnea","Log all times"], note:"Compare to Week 3."},
      Wed:{type:"pool",    label:"Pool Cardio",        tasks:["200m warm-up","800m freestyle every 8m","200m cool down = 1200m total"], note:"Consistent pace throughout."},
      Thu:{type:"rest",    label:"Active Recovery",    tasks:["Easy walk 25 min"]},
      Fri:{type:"cardio",  label:"Cardio",             tasks:["Elliptical or bike 40 min at 65–70% max HR"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop + meal prep","300m warm-up + 1000m freestyle every 8m + 200m cool down = 1500m total","Time 1000m — compare to Week 3","Weekly reflection"], note:"Time your 1000m."},
    }},
    { week:5, sessions:{
      Mon:{type:"hiit",    label:"Cardio + Anaerobic", tasks:["20 min jog","4 × 2 min at 80–85% max HR","~35 min total"], note:"First anaerobic effort."},
      Tue:{type:"dry",     label:"Dry Static Intro",   tasks:["4 Section Breathing 10 rounds","Practise NPSA exhale+hold pattern on land","3 × 1:00 min Dry Static — 2 min rest between"], note:"Do not push past comfort."},
      Wed:{type:"pool-apnea",label:"Pool + Apnea",    tasks:["300m warm-up","6 × (25m surface + 25m breath hold underwater)","200m cool down = 900m total"], note:"⚠️ First underwater reps. Buddy required."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest"]},
      Fri:{type:"hiit",    label:"Cardio Intervals",   tasks:["4 × 4 min at 80% max HR with 90 sec rest","~35 min"], note:"Lactic acid threshold work."},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop + meal prep","500m warm-up + 8 × (50m breaststroke + 25m breath hold) + 300m cool down = 1300m total","Weekly reflection + schedule","Bill check"], note:"Apnea in mild fatigue."},
    }},
    { week:6, sessions:{
      Mon:{type:"hiit",    label:"HIIT Cardio",        tasks:["5 × 3 min at 85% max HR — 90 sec rest","~35 min"], note:"Phase 1 peak cardio effort."},
      Tue:{type:"dry",     label:"Dry Static",         tasks:["3 × 1:30 min Dry Static Apnea — 2:30 rest","Log every hold time"]},
      Wed:{type:"pool-apnea",label:"Pool + Apnea",    tasks:["500m warm-up","10 × (25m surface + 25m breath hold)","300m cool down = 1500m total"], note:"Log Surface Interval each rep."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest"]},
      Fri:{type:"hiit",    label:"HIIT Cardio",        tasks:["6 × 2 min at 85% max HR — 60 sec rest","~30 min"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Peak Pool",tasks:["Grocery shop + meal prep","500m warm-up + 1000m freestyle every 8m + 6 × 25m underwater + 300m cool down = 2000m total","Weekly reflection — Phase 1 complete"], note:"Longest session of Phase 1."},
    }},
  ],
  phase2: [
    { week:7, sessions:{
      Mon:{type:"strength",label:"Strength Upper",     tasks:["Lat Pull Down 3×12","Chest Press 3×12","Seated Row 3×12","Chest Flies 3×12","Camp: morning check-ins","Dinner check-in 6pm"], note:"60–70% effort. Form before weight."},
      Tue:{type:"pool",    label:"Pool Easy",          tasks:["800m easy freestyle + 200m cool down = 1000m total","Camp check-ins + dinner check-in"], note:"Active recovery."},
      Wed:{type:"strength",label:"Strength Lower",     tasks:["Leg Press 3×12","Leg Curl 3×12","Leg Extension 3×12","Squats 3×10","Camp check-ins + dinner check-in"], note:"Slow controlled movement."},
      Thu:{type:"dry",     label:"Dry Static",         tasks:["3 × 2:00 min Dry Static — 3 min rest","Log all times","Camp check-ins + dinner check-in"], note:"Phase 2 benchmark."},
      Fri:{type:"strength",label:"Strength Core/Arms", tasks:["Shoulder Press 3×12","Bicep Curl 3×12","Tricep Extension 3×12","Ab Leg Raises 3×15","Lower Back Extensions 3×15 ← always after abs","Shabbat prep + camp check-in"], note:"Lower back non-negotiable after abs."},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️","Camp on-call only"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop + meal prep","500m warm-up + 6 × 50m breath hold + 300m cool down = 1300m total","Weekly reflection","Camp check-ins + dinner check-in"], note:"Log Surface Interval each rep."},
    }},
    { week:8, sessions:{
      Mon:{type:"strength",label:"Strength Upper ↑",   tasks:["Same as Week 7 — 5–10% more weight on all lifts","Camp check-ins + dinner check-in"], note:"Progressive overload begins."},
      Tue:{type:"pool",    label:"Pool Cardio",        tasks:["1000m freestyle breathing every 8m","Camp check-ins + dinner check-in"]},
      Wed:{type:"strength",label:"Strength Lower ↑",   tasks:["Same as Week 7 — 5–10% more weight","Camp check-ins + dinner check-in"]},
      Thu:{type:"dry",     label:"Dry Static",         tasks:["3 × 2:30 min Dry Static — 3 min rest","Camp check-ins + dinner check-in"]},
      Fri:{type:"strength",label:"Strength Core ↑",    tasks:["Same + Calf Raises 3×15 + Ab Wheel Rollout 3×10 (sub: planks)","Lower Back Extensions always follow abs","Shabbat prep + camp check-in"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Pool",     tasks:["Grocery shop + meal prep","500m warm-up + 8 × 50m underwater + 300m cool down = 1500m total","Weekly reflection","Camp check-ins + dinner check-in"]},
    }},
    { week:9, sessions:{
      Mon:{type:"apnea-strength",label:"Apnea Strength Upper",tasks:["Lat Pull Down, Chest Press, Seated Row, Flies","ONE SET breath hold → next set normal breathing (alternate)","Camp check-ins + dinner check-in"], note:"⚠️ Lactic acid + rising CO2. This is the point."},
      Tue:{type:"pool-apnea",label:"Pool CO2 Tolerance",tasks:["400m warm-up","8 × 50m underwater — 90 sec Surface Interval","300m cool down = 1200m total","Camp check-ins + dinner check-in"], note:"Short SI = elevated CO2 at start of each rep. Intentional."},
      Wed:{type:"apnea-strength",label:"Apnea Strength Lower",tasks:["Squats, Leg Press, Leg Curl — alternate breath hold / normal","Camp check-ins + dinner check-in"], note:"Legs under lactic acid + rising CO2 = diving conditions."},
      Thu:{type:"dry",     label:"Dry Static — Contractions",tasks:["4 × 2:30 min Dry Static — 3 min rest","Log contractions — aim for minimum 8 per hold","Camp check-ins + dinner check-in"], note:"Contraction = involuntary diaphragm movement. CO2 is rising."},
      Fri:{type:"apnea-strength",label:"Apnea Strength Full",tasks:["Shoulder Press, Bicep Curl, Tricep Extension","Ab Leg Raises + Lower Back Extensions","Alternate breath hold and normal sets","Shabbat prep + camp check-in"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Peak Pool",tasks:["Grocery shop + meal prep","500m warm-up + 10 × 50m underwater — 90 sec SI + 300m cool down = 1600m total","Weekly reflection","Camp check-ins + dinner check-in"], note:"Main apnea volume of the week."},
    }},
    { week:10, sessions:{
      Mon:{type:"apnea-strength",label:"Apnea Strength Upper ↑",tasks:["10% heavier — breath hold on all primary sets","Camp check-ins + dinner check-in"], note:"High CO2 + significant load."},
      Tue:{type:"pool-apnea",label:"Pool CO2 — Shorter Rest",tasks:["300m warm-up","10 × 50m underwater — 75 sec SI","300m cool down = 1200m total","Camp check-ins + dinner check-in"], note:"Shorter SI pushes CO2 further."},
      Wed:{type:"apnea-strength",label:"Apnea Strength Lower ↑",tasks:["10% heavier — breath hold all primary sets","Camp check-ins + dinner check-in"]},
      Thu:{type:"dry",     label:"Dry Static — Contractions",tasks:["4 × 3:00 min Dry Static — 3 min rest","Minimum 8 contractions per hold","Camp check-ins + dinner check-in"], note:"Push past your previous PR."},
      Fri:{type:"apnea-strength",label:"Apnea Strength Full ↑",tasks:["Full circuit — increased load — breath hold throughout","Lower Back Extensions after all ab work","Shabbat prep + camp check-in"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Peak Pool",tasks:["Grocery shop + meal prep","500m warm-up + 12 × 50m underwater — 90 sec SI + 300m cool down = 1800m total","Weekly reflection + bill check","Camp check-ins + dinner check-in"], note:"Highest apnea volume to date."},
    }},
  ],
  phase3: [
    { week:11, sessions:{
      Mon:{type:"dry",     label:"Dry CO2 Table",      tasks:["4 × 3:00 min Dry Static — 3:00 rest","Log pulse before + after every hold","Note contractions","Camp check-ins + dinner check-in"]},
      Tue:{type:"pool-apnea",label:"Pool Apnea Intervals",tasks:["500m warm-up","12 × 25m underwater — 60 sec SI","300m cool down = 1500m total","Camp check-ins + dinner check-in"], note:"High frequency short distance. CO2 focus."},
      Wed:{type:"apnea-strength",label:"Apnea Strength (30%)",tasks:["Upper body full circuit — all sets with breath hold","Camp check-ins + dinner check-in"], note:"Maintaining Phase 2 adaptations."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest","Camp check-ins + dinner check-in"]},
      Fri:{type:"pool-apnea",label:"Pool O2 Table",    tasks:["500m warm-up","6 × 50m — SI decreasing: 2:30 / 2:00 / 1:45 / 1:30 / 1:15 / 1:00","300m cool down = 1300m total","Shabbat prep + camp check-in"], note:"Each rep starts with less O2 than the last."},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Distance Pool",tasks:["Grocery shop + meal prep","500m warm-up + 4 × 75m underwater + 500m cool down = 1800m total","Weekly reflection","Camp check-ins + dinner check-in"], note:"Discipline-specific. Tailored to your depth goal."},
    }},
    { week:12, sessions:{
      Mon:{type:"dry",     label:"Dry CO2 Table",      tasks:["6 × 2:30 min Dry Static — 2:30 rest","Equal work:rest — do not cheat rest times","Camp check-ins + dinner check-in"]},
      Tue:{type:"pool-apnea",label:"Pool High Freq Apnea",tasks:["500m warm-up","15 × 25m underwater — 45 sec SI","300m cool down = 1700m total","Camp check-ins + dinner check-in"]},
      Wed:{type:"apnea-strength",label:"Apnea Strength (30%)",tasks:["Lower body full circuit — breath hold all sets","Camp check-ins + dinner check-in"], note:"Legs under CO2 stress."},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest","Camp check-ins + dinner check-in"]},
      Fri:{type:"pool-apnea",label:"Pool Mixed Apnea", tasks:["300m warm-up","4 × 50m + 4 × 75m underwater","300m cool down = 1800m total","Shabbat prep + camp check-in"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Peak Pool",tasks:["Grocery shop + meal prep","500m warm-up + 6 × 50m + 2 × 100m underwater + 300m cool down = 2000m total","Weekly reflection + bill check","Camp check-ins + dinner check-in"], note:"Highest apnea volume of programme."},
    }},
    { week:13, sessions:{
      Mon:{type:"dry",     label:"Dry Mixed Tables",   tasks:["O2 table: 4 × 3:30 min hold — rest decreasing: 4:00/3:00/2:30/2:00","Camp check-ins + dinner check-in"], note:"Hypoxic stress focus."},
      Tue:{type:"pool-apnea",label:"Pool Fins Apnea",  tasks:["500m warm-up","8 × 50m with bi-fins or monofin underwater","300m cool down = 1600m total","Camp check-ins + dinner check-in"], note:"Power + breath hold. Discipline specific."},
      Wed:{type:"apnea-strength",label:"Apnea Strength Heavy",tasks:["Full body circuit — heavy loads — breath hold throughout","Lower Back Extensions follow all ab work","Camp check-ins + dinner check-in"]},
      Thu:{type:"rest",    label:"Rest",               tasks:["Full rest","Camp check-ins + dinner check-in"]},
      Fri:{type:"pool-apnea",label:"Pool Race Simulation",tasks:["400m warm-up","8 × 50m max effort — 2 min SI","400m cool down = 1800m total","Shabbat prep + camp check-in"], note:"Replicates your actual attempt demands."},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Grocery + Peak Pool",tasks:["Grocery shop + meal prep","500m warm-up + 10 × 50m + 2 × 75m underwater + 400m cool down = 2300m total","Weekly reflection","Camp check-ins + dinner check-in"]},
    }},
    { week:14, sessions:{
      Mon:{type:"dry",     label:"Dry Static — Taper", tasks:["3 × 3:00 min Dry Static — 3:00 rest","Camp check-ins + dinner check-in"], note:"Taper begins. Stay sharp. Reduce volume."},
      Tue:{type:"pool",    label:"Pool Technique",     tasks:["600m easy warm-up","4 × 25m technique-focused underwater","200m cool down = 1000m total","Camp check-ins + dinner check-in"], note:"Quality over quantity."},
      Wed:{type:"rest",    label:"Rest",               tasks:["Full rest","Trust the 14 weeks behind you","Camp check-ins + dinner check-in"]},
      Thu:{type:"pool-apnea",label:"Pool Final Sharpener",tasks:["300m warm-up","4 × 25m at 90% effort underwater","200m cool down = 700m total","Camp check-ins + dinner check-in"], note:"Short, sharp, confident."},
      Fri:{type:"rest",    label:"Rest + Visualisation",tasks:["Full rest","Mental rehearsal of your 45m attempt","Shabbat prep + camp check-in"]},
      Sat:{type:"shabbat", label:"Shabbat",            tasks:["Rest — Shabbat 🕯️"]},
      Sun:{type:"grocery", label:"Optional + Attempt", tasks:["400m easy swim","2 × 25m relaxed underwater","Grocery shop for celebration meal 🎉","Weekly reflection — programme complete","Camp check-ins + dinner check-in"], note:"Enjoy the water. 45m attempt this week."},
    }},
  ],
};

function getTc(type) { return TYPE_COLOR[type] || "#666"; }

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function todayPhase() {
  const d = new Date();
  if (d < new Date("2026-06-01")) return "pre";
  if (d < new Date("2026-07-01")) return "phase1";
  if (d < new Date("2026-08-01")) return "phase2";
  return "phase3";
}

function todayDayName() {
  return DAYS[((new Date().getDay() + 6) % 7)];
}

function getUpcomingMoons(n = 3) {
  const today = new Date();
  return MOONS_2026.filter(m => new Date(m.date) >= today).slice(0, n);
}

function formatMoonDate(ds) {
  return new Date(ds).toLocaleDateString("en-GB", { day:"numeric", month:"short" });
}

// ─── INPUT STYLES ─────────────────────────────────────────────────────────────
// These are functions of T so they update when the theme changes
function getInputStyle(T) { return { background:T.input, border:`1px solid ${T.inputBorder}`, borderRadius:5, padding:"7px 10px", color:T.text, fontSize:12, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }; }
function getLabelStyle(T) { return { fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textMid, marginBottom:4, display:"block" }; }
const btnStyle = (color) => ({ padding:"7px 16px", background:color, border:"none", borderRadius:5, color:"#fff", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600 });

// ─── WORKOUT EDITOR COMPONENT ────────────────────────────────────────────────
const EXERCISE_TYPES = [
  { key:"strength", label:"Strength / Gym", fields:["sets","reps","weight"] },
  { key:"swim",     label:"Swim / Pool",    fields:["distance","time","intervals"] },
  { key:"cardio",   label:"Cardio",         fields:["duration","distance","avgHR"] },
  { key:"apnea",    label:"Apnea / Static", fields:["holdTime","surfaceInterval","contractions"] },
  { key:"breath",   label:"Breathwork",     fields:["duration","rounds"] },
  { key:"other",    label:"Other",          fields:["duration"] },
];

const DIFFICULTY_LABELS = ["1","2","3","4","5","6","7","8","9","10"];

function emptyExercise() {
  return { id: Date.now() + Math.random(), name:"", type:"strength", sets:"", reps:"", weight:"", distance:"", time:"", intervals:"", avgHR:"", holdTime:"", surfaceInterval:"", contractions:"", duration:"", rounds:"", notes:"" };
}

function WorkoutEditor({ dk, sessionLabel, sessionType, existingTasks, workoutData, onSave, onClose, tc, T }) {
  const [hrBefore, setHrBefore] = useState(workoutData?.hrBefore || "");
  const [hrAfter,  setHrAfter]  = useState(workoutData?.hrAfter  || "");
  const [difficulty, setDifficulty] = useState(workoutData?.difficulty || "");
  const [sessionNotes, setSessionNotes] = useState(workoutData?.sessionNotes || "");
  const [exercises, setExercises] = useState(workoutData?.exercises?.length > 0
    ? workoutData.exercises
    : existingTasks.map(t => ({ ...emptyExercise(), id: Date.now() + Math.random(), name: t, type: guessType(sessionType) }))
  );
  const [customName, setCustomName] = useState("");

  function guessType(st) {
    if (["pool","pool-apnea","pool-deep"].includes(st)) return "swim";
    if (["dry"].includes(st)) return "apnea";
    if (["cardio","hiit"].includes(st)) return "cardio";
    if (["strength","apnea-strength"].includes(st)) return "strength";
    return "other";
  }

  function updateEx(id, field, val) {
    setExercises(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  }

  function addExercise() {
    setExercises(prev => [...prev, { ...emptyExercise(), id: Date.now(), name: customName, type: guessType(sessionType) }]);
    setCustomName("");
  }

  function removeExercise(id) {
    setExercises(prev => prev.filter(e => e.id !== id));
  }

  function moveEx(id, dir) {
    setExercises(prev => {
      const i = prev.findIndex(e => e.id === id);
      if (i < 0) return prev;
      const next = [...prev];
      const swap = i + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[i], next[swap]] = [next[swap], next[i]];
      return next;
    });
  }

  function handleSave() {
    onSave(dk, { hrBefore, hrAfter, difficulty, sessionNotes, exercises });
    onClose();
  }

  const iS = { background:T.input, border:`1px solid ${T.inputBorder}`, borderRadius:4, padding:"5px 8px", color:T.text, fontSize:12, fontFamily:"inherit", boxSizing:"border-box" };

  return (
    <div style={{ background:T.card, border:`1px solid ${tc}55`, borderRadius:9, padding:16, marginTop:10 }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div>
          <span style={{ fontSize:13, color:tc }}>{sessionLabel}</span>
          <span style={{ fontSize:11, color:T.textMid, marginLeft:8 }}>workout log</span>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", color:T.textFaint, cursor:"pointer", fontSize:16, fontFamily:"inherit" }}>✕</button>
      </div>

      {/* Session HR + difficulty */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
        <div>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:4 }}>HR Before</div>
          <input value={hrBefore} onChange={e=>setHrBefore(e.target.value)} placeholder="bpm" style={{ ...iS, width:"100%" }} />
        </div>
        <div>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:4 }}>HR After</div>
          <input value={hrAfter} onChange={e=>setHrAfter(e.target.value)} placeholder="bpm" style={{ ...iS, width:"100%" }} />
        </div>
        <div>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:4 }}>Difficulty 1–10</div>
          <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
            {DIFFICULTY_LABELS.map(d => (
              <button key={d} onClick={() => setDifficulty(difficulty===d?"":d)} style={{
                width:24, height:24, borderRadius:4, border:`1px solid ${difficulty===d ? tc : T.inputBorder}`,
                background: difficulty===d ? tc+"33" : "transparent",
                color: difficulty===d ? tc : "#556", cursor:"pointer", fontSize:11, fontFamily:"inherit", padding:0,
              }}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:8 }}>Exercises</div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
        {exercises.map((ex, idx) => {
          const exType = EXERCISE_TYPES.find(t => t.key === ex.type) || EXERCISE_TYPES[0];
          return (
            <div key={ex.id} style={{ background:T.cardAlt, border:`1px solid ${T.border}`, borderRadius:7, padding:12 }}>
              {/* Exercise name + type row */}
              <div style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
                <div style={{ display:"flex", gap:4 }}>
                  <button onClick={() => moveEx(ex.id, -1)} disabled={idx===0} style={{ background:"none", border:`1px solid ${T.inputBorder}`, borderRadius:3, padding:"2px 6px", color:T.textFaint, cursor:idx===0?"default":"pointer", fontSize:10, fontFamily:"inherit" }}>↑</button>
                  <button onClick={() => moveEx(ex.id, 1)} disabled={idx===exercises.length-1} style={{ background:"none", border:`1px solid ${T.inputBorder}`, borderRadius:3, padding:"2px 6px", color:T.textFaint, cursor:idx===exercises.length-1?"default":"pointer", fontSize:10, fontFamily:"inherit" }}>↓</button>
                </div>
                <input value={ex.name} onChange={e=>updateEx(ex.id,"name",e.target.value)} placeholder="Exercise name"
                  style={{ ...iS, flex:1 }} />
                <select value={ex.type} onChange={e=>updateEx(ex.id,"type",e.target.value)}
                  style={{ ...iS, background:T.input }}>
                  {EXERCISE_TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
                <button onClick={() => removeExercise(ex.id)} style={{ background:"none", border:"none", color:T.textFaint, cursor:"pointer", fontSize:14, fontFamily:"inherit", padding:"0 4px" }}>✕</button>
              </div>

              {/* Dynamic fields based on type */}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {ex.type === "strength" && (<>
                  <div style={{ minWidth:60 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Sets</div><input value={ex.sets} onChange={e=>updateEx(ex.id,"sets",e.target.value)} placeholder="3" style={{ ...iS, width:60 }} /></div>
                  <div style={{ minWidth:60 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Reps</div><input value={ex.reps} onChange={e=>updateEx(ex.id,"reps",e.target.value)} placeholder="12" style={{ ...iS, width:60 }} /></div>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Weight (kg/lb)</div><input value={ex.weight} onChange={e=>updateEx(ex.id,"weight",e.target.value)} placeholder="40kg" style={{ ...iS, width:80 }} /></div>
                </>)}
                {ex.type === "swim" && (<>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Distance</div><input value={ex.distance} onChange={e=>updateEx(ex.id,"distance",e.target.value)} placeholder="500m" style={{ ...iS, width:80 }} /></div>
                  <div style={{ minWidth:70 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Time</div><input value={ex.time} onChange={e=>updateEx(ex.id,"time",e.target.value)} placeholder="9:30" style={{ ...iS, width:70 }} /></div>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Intervals</div><input value={ex.intervals} onChange={e=>updateEx(ex.id,"intervals",e.target.value)} placeholder="8×50m" style={{ ...iS, width:80 }} /></div>
                </>)}
                {ex.type === "cardio" && (<>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Duration</div><input value={ex.duration} onChange={e=>updateEx(ex.id,"duration",e.target.value)} placeholder="30 min" style={{ ...iS, width:80 }} /></div>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Distance</div><input value={ex.distance} onChange={e=>updateEx(ex.id,"distance",e.target.value)} placeholder="4km" style={{ ...iS, width:80 }} /></div>
                  <div style={{ minWidth:70 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Avg HR</div><input value={ex.avgHR} onChange={e=>updateEx(ex.id,"avgHR",e.target.value)} placeholder="145" style={{ ...iS, width:70 }} /></div>
                </>)}
                {ex.type === "apnea" && (<>
                  <div style={{ minWidth:70 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Hold time</div><input value={ex.holdTime} onChange={e=>updateEx(ex.id,"holdTime",e.target.value)} placeholder="2:30" style={{ ...iS, width:70 }} /></div>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Surface int.</div><input value={ex.surfaceInterval} onChange={e=>updateEx(ex.id,"surfaceInterval",e.target.value)} placeholder="3:00" style={{ ...iS, width:80 }} /></div>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Contractions</div><input value={ex.contractions} onChange={e=>updateEx(ex.id,"contractions",e.target.value)} placeholder="8" style={{ ...iS, width:80 }} /></div>
                </>)}
                {ex.type === "breath" && (<>
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Duration</div><input value={ex.duration} onChange={e=>updateEx(ex.id,"duration",e.target.value)} placeholder="20 min" style={{ ...iS, width:80 }} /></div>
                  <div style={{ minWidth:60 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Rounds</div><input value={ex.rounds} onChange={e=>updateEx(ex.id,"rounds",e.target.value)} placeholder="10" style={{ ...iS, width:60 }} /></div>
                </>)}
                {ex.type === "other" && (
                  <div style={{ minWidth:80 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Duration</div><input value={ex.duration} onChange={e=>updateEx(ex.id,"duration",e.target.value)} placeholder="30 min" style={{ ...iS, width:80 }} /></div>
                )}
                <div style={{ flex:1, minWidth:120 }}><div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Notes</div><input value={ex.notes} onChange={e=>updateEx(ex.id,"notes",e.target.value)} placeholder="How it felt..." style={{ ...iS, width:"100%" }} /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add exercise */}
      <div style={{ display:"flex", gap:8, marginBottom:14, alignItems:"center" }}>
        <input value={customName} onChange={e=>setCustomName(e.target.value)}
          onKeyDown={e => e.key==="Enter" && customName && addExercise()}
          placeholder="Add exercise..."
          style={{ ...iS, flex:1 }} />
        <button onClick={() => customName && addExercise()} style={{ padding:"5px 14px", background:tc+"22", border:`1px solid ${tc}55`, borderRadius:5, color:tc, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>+ Add</button>
      </div>

      {/* Session notes */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:4 }}>Session notes</div>
        <textarea value={sessionNotes} onChange={e=>setSessionNotes(e.target.value)}
          placeholder="Overall how it went, what to adjust next time, how you felt..."
          style={{ ...iS, width:"100%", minHeight:60, resize:"vertical" }} />
      </div>

      {/* Save / Cancel */}
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={handleSave} style={{ padding:"7px 20px", background:tc, border:"none", borderRadius:5, color:T.bg, cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600 }}>Save workout</button>
        <button onClick={onClose} style={{ padding:"7px 14px", background:"transparent", border:`1px solid ${T.inputBorder}`, borderRadius:5, color:T.textDim, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── CYCLE & MOON COMPONENT ──────────────────────────────────────────────────
const FLOW_LEVELS = [
  { key:"spotting", label:"Spotting", color:"#c47ca033", dot:"·" },
  { key:"light",    label:"Light",    color:"#c47ca066", dot:"○" },
  { key:"medium",   label:"Medium",   color:"#c47ca0aa", dot:"●" },
  { key:"heavy",    label:"Heavy",    color:"#c47ca0",   dot:"◉" },
];

const ENERGY_OPTS = ["⚡ High","🔆 Good","😐 Okay","🌫 Low","🪫 Depleted"];
const MOOD_OPTS   = ["🌸 Bright","😊 Content","😶 Neutral","😔 Low","😤 Irritable","😢 Emotional","🌀 Anxious","🔥 Passionate"];
const BODY_OPTS   = ["💪 Strong","🧘 Grounded","🌊 Fluid","😴 Tired","🤕 Cramps","🫁 Bloated","🌡 Tender","✨ Clear"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function CycleAndMoon({ cyclePhase, cycleDay, updateCycle, bleedDays, toggleBleedDay,
  feelingsLog, saveFeeling, cycleStartDate, setCycleStartDate, upcomingMoons, cp, ac, T }) {
  T = T || makeTheme(true); // fallback

  const [tab, setTab] = useState("track");
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0,10));
  const [feelingDraft, setFeelingDraft] = useState({ energy:"", mood:[], body:[], notes:"", phase: cyclePhase });
  const [showFeelingForm, setShowFeelingForm] = useState(false);

  const daysInMonth = getDaysInMonth(calMonth.y, calMonth.m);
  const firstDay = new Date(calMonth.y, calMonth.m, 1).getDay(); // 0=Sun
  const calOffset = (firstDay + 6) % 7; // Mon-start offset
  const todayStr = new Date().toISOString().slice(0,10);

  function dateStr(day) {
    return `${calMonth.y}-${String(calMonth.m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  }

  function loadFeelingForDate(date) {
    const existing = feelingsLog[date];
    setFeelingDraft(existing ? { ...existing } : { energy:"", mood:[], body:[], notes:"", phase: cyclePhase });
    setShowFeelingForm(true);
  }

  function toggleArr(arr, val) {
    return arr.includes(val) ? arr.filter(x=>x!==val) : [...arr, val];
  }

  const bleedCount = Object.keys(bleedDays).length;
  const feelCount = Object.keys(feelingsLog).length;

  // Recent feelings sorted
  const recentFeelings = Object.entries(feelingsLog)
    .sort((a,b) => b[0].localeCompare(a[0]))
    .slice(0, 10);

  return (
    <div>
      {/* Sub-tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${T.border}`, marginBottom:18 }}>
        {[["track","Cycle Tracker"],["phase","Phase Guide"],["moon","Moon Calendar"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)} style={{
            padding:"6px 14px", background:"none", border:"none",
            borderBottom: tab===v ? `2px solid ${cp.color}` : "2px solid transparent",
            color: tab===v ? cp.color : "#444", cursor:"pointer", fontSize:12,
            fontFamily:"inherit", marginBottom:-1,
          }}>{l}</button>
        ))}
      </div>

      {/* ── TRACKER TAB ── */}
      {tab === "track" && (
        <div>
          {/* Phase + day editor */}
          <div style={{ background:cp.bg, border:`1px solid ${cp.color}33`, borderRadius:9, padding:14, marginBottom:16 }}>
            <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:cp.color, marginBottom:10 }}>Current Phase</div>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:12 }}>
              {Object.entries(CYCLE_PHASES).map(([k,v]) => (
                <button key={k} onClick={() => updateCycle(k, k===cyclePhase ? cycleDay : 1)} style={{
                  padding:"5px 12px", borderRadius:14, border:`1px solid ${cyclePhase===k ? v.color : T.inputBorder}`,
                  background: cyclePhase===k ? v.color+"22" : "transparent",
                  color: cyclePhase===k ? v.color : "#445", cursor:"pointer", fontSize:12, fontFamily:"inherit",
                }}>{v.label}</button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:11, color:T.textMid, minWidth:28 }}>Day</span>
              <input type="range" min={1} max={35} value={cycleDay}
                onChange={e => updateCycle(cyclePhase, Number(e.target.value))}
                style={{ flex:1, accentColor:cp.color }} />
              <span style={{ fontSize:16, color:cp.color, fontVariantNumeric:"tabular-nums", minWidth:28, textAlign:"right" }}>{cycleDay}</span>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:12, alignItems:"center" }}>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, display:"block", marginBottom:3 }}>Cycle start date</label>
                <input type="date" value={cycleStartDate} onChange={e => setCycleStartDate(e.target.value)}
                  style={{ background:T.input, border:`1px solid ${T.inputBorder}`, borderRadius:5, padding:"5px 9px", color:T.text, fontSize:12, fontFamily:"inherit" }} />
              </div>
              <div style={{ fontSize:11, color:T.textMid, fontStyle:"italic" }}>{cp.theme}</div>
            </div>
          </div>

          {/* Calendar */}
          <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:14, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <button onClick={() => setCalMonth(p => { const d = new Date(p.y, p.m-1); return {y:d.getFullYear(),m:d.getMonth()}; })}
                style={{ background:"none", border:`1px solid ${T.inputBorder}`, borderRadius:5, padding:"3px 9px", color:T.textMid, cursor:"pointer", fontFamily:"inherit" }}>←</button>
              <span style={{ fontSize:13, color:T.text }}>
                {new Date(calMonth.y, calMonth.m).toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
              </span>
              <button onClick={() => setCalMonth(p => { const d = new Date(p.y, p.m+1); return {y:d.getFullYear(),m:d.getMonth()}; })}
                style={{ background:"none", border:`1px solid ${T.inputBorder}`, borderRadius:5, padding:"3px 9px", color:T.textMid, cursor:"pointer", fontFamily:"inherit" }}>→</button>
            </div>

            {/* Day headers */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
              {["M","T","W","T","F","S","S"].map((d,i) => (
                <div key={i} style={{ textAlign:"center", fontSize:10, color:T.textFaint, padding:"2px 0" }}>{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
              {Array.from({length: calOffset}).map((_,i) => <div key={`e${i}`} />)}
              {Array.from({length: daysInMonth}).map((_,i) => {
                const day = i+1;
                const ds = dateStr(day);
                const flow = bleedDays[ds];
                const hasFeeling = !!feelingsLog[ds];
                const isToday = ds === todayStr;
                const isSelected = ds === selectedDate;
                const flowColor = flow ? FLOW_LEVELS.find(f=>f.key===flow)?.color : null;
                return (
                  <div key={day} onClick={() => setSelectedDate(ds)}
                    style={{
                      borderRadius:6, padding:"5px 2px", textAlign:"center", cursor:"pointer", position:"relative",
                      background: isSelected ? cp.color+"33" : flow ? flowColor+"22" : "transparent",
                      border: isToday ? `1px solid ${cp.color}88` : isSelected ? `1px solid ${cp.color}66` : `1px solid #1a1d24`,
                      minHeight:38,
                    }}>
                    <div style={{ fontSize:12, color: isToday ? cp.color : T.textSub, fontWeight: isToday?"600":"normal" }}>{day}</div>
                    <div style={{ fontSize:14, lineHeight:1 }}>
                      {flow ? <span style={{ color: FLOW_LEVELS.find(f=>f.key===flow)?.color }}>
                        {FLOW_LEVELS.find(f=>f.key===flow)?.dot}
                      </span> : hasFeeling ? <span style={{ fontSize:8, color:"#5bb8a0" }}>●</span> : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flow legend */}
            <div style={{ display:"flex", gap:12, marginTop:10, flexWrap:"wrap" }}>
              {FLOW_LEVELS.map(f => (
                <div key={f.key} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontSize:14, color:f.color }}>{f.dot}</span>
                  <span style={{ fontSize:10, color:T.textMid }}>{f.label}</span>
                </div>
              ))}
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:8, color:"#5bb8a0" }}>●</span>
                <span style={{ fontSize:10, color:T.textMid }}>Feeling logged</span>
              </div>
            </div>
          </div>

          {/* Selected day panel */}
          <div style={{ background:T.card, border:`1px solid ${cp.color}33`, borderRadius:9, padding:14, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, color:cp.color }}>{new Date(selectedDate+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</span>
              {selectedDate <= todayStr && <button onClick={() => loadFeelingForDate(selectedDate)}
                style={{ padding:"4px 12px", background:cp.color+"22", border:`1px solid ${cp.color}44`, borderRadius:5, color:cp.color, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>
                {feelingsLog[selectedDate] ? "Edit feelings" : "+ Log feelings"}
              </button>}
            </div>

            {/* Flow selector for selected date */}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textMid, marginBottom:8 }}>Bleed / Flow</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {FLOW_LEVELS.map(f => {
                  const active = bleedDays[selectedDate] === f.key;
                  return (
                    <button key={f.key} onClick={() => toggleBleedDay(selectedDate, f.key)}
                      style={{ padding:"5px 14px", borderRadius:14, border:`1px solid ${active ? f.color : T.inputBorder}`,
                        background: active ? f.color+"22" : "transparent",
                        color: active ? f.color : "#555", cursor:"pointer", fontSize:12, fontFamily:"inherit",
                        display:"flex", alignItems:"center", gap:6 }}>
                      <span>{f.dot}</span> {f.label}
                    </button>
                  );
                })}
                {bleedDays[selectedDate] && (
                  <button onClick={() => toggleBleedDay(selectedDate, bleedDays[selectedDate])}
                    style={{ padding:"5px 12px", borderRadius:14, border:`1px solid ${T.inputBorder}`, background:"transparent", color:T.textFaint, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Existing feeling summary */}
            {feelingsLog[selectedDate] && !showFeelingForm && (
              <div style={{ background:cp.bg, borderRadius:7, padding:"10px 12px" }}>
                <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:cp.color+"88", marginBottom:8 }}>How I felt</div>
                {feelingsLog[selectedDate].energy && <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>Energy: {feelingsLog[selectedDate].energy}</div>}
                {feelingsLog[selectedDate].mood?.length > 0 && <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>Mood: {feelingsLog[selectedDate].mood.join("  ")}</div>}
                {feelingsLog[selectedDate].body?.length > 0 && <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>Body: {feelingsLog[selectedDate].body.join("  ")}</div>}
                {feelingsLog[selectedDate].notes && <div style={{ fontSize:12, color:T.textMid, fontStyle:"italic", marginTop:6 }}>{feelingsLog[selectedDate].notes}</div>}
              </div>
            )}

            {/* Feeling form */}
            {showFeelingForm && (
              <div style={{ background:cp.bg, borderRadius:8, padding:12 }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:cp.color, marginBottom:12 }}>Log how you feel</div>

                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10, color:T.textMid, marginBottom:6 }}>Energy</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {ENERGY_OPTS.map(o => (
                      <button key={o} onClick={() => setFeelingDraft(p=>({...p, energy: p.energy===o?"":o}))}
                        style={{ padding:"4px 10px", borderRadius:12, border:`1px solid ${feelingDraft.energy===o ? cp.color : T.inputBorder}`,
                          background:feelingDraft.energy===o ? cp.color+"22":"transparent",
                          color:feelingDraft.energy===o ? cp.color:T.textDim, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>{o}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10, color:T.textMid, marginBottom:6 }}>Mood <span style={{ color:T.textVeryDim }}>(pick all that fit)</span></div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {MOOD_OPTS.map(o => {
                      const on = feelingDraft.mood?.includes(o);
                      return (
                        <button key={o} onClick={() => setFeelingDraft(p=>({...p, mood: toggleArr(p.mood||[], o)}))}
                          style={{ padding:"4px 10px", borderRadius:12, border:`1px solid ${on ? cp.color : T.inputBorder}`,
                            background:on ? cp.color+"22":"transparent",
                            color:on ? cp.color:T.textDim, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>{o}</button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10, color:T.textMid, marginBottom:6 }}>Body <span style={{ color:T.textVeryDim }}>(pick all that fit)</span></div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {BODY_OPTS.map(o => {
                      const on = feelingDraft.body?.includes(o);
                      return (
                        <button key={o} onClick={() => setFeelingDraft(p=>({...p, body: toggleArr(p.body||[], o)}))}
                          style={{ padding:"4px 10px", borderRadius:12, border:`1px solid ${on ? "#5bb8a0" : T.inputBorder}`,
                            background:on ? "#5bb8a022":"transparent",
                            color:on ? "#5bb8a0":"#556", cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>{o}</button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:10, color:T.textMid, marginBottom:4 }}>Notes — anything else worth remembering</div>
                  <textarea value={feelingDraft.notes||""} onChange={e=>setFeelingDraft(p=>({...p,notes:e.target.value}))}
                    placeholder="How training felt, symptoms, what helped, what didn't..."
                    style={{ background:T.input, border:`1px solid ${T.inputBorder}`, borderRadius:5, padding:"7px 10px", color:T.text, fontSize:12, fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"vertical", minHeight:60 }} />
                </div>

                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => { saveFeeling(selectedDate, {...feelingDraft, phase:feelingDraft.phase||cyclePhase}); setShowFeelingForm(false); }}
                    style={{ padding:"6px 16px", background:cp.color, border:"none", borderRadius:5, color:T.bg, cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600 }}>Save</button>
                  <button onClick={() => setShowFeelingForm(false)}
                    style={{ padding:"6px 14px", background:"transparent", border:`1px solid ${T.inputBorder}`, borderRadius:5, color:T.textDim, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Recent feelings log */}
          {recentFeelings.length > 0 && (
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:14 }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textFaint, marginBottom:12 }}>Recent entries</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {recentFeelings.map(([date, entry]) => {
                  const ph = CYCLE_PHASES[entry.phase];
                  const flow = bleedDays[date];
                  const flowInfo = flow ? FLOW_LEVELS.find(f=>f.key===flow) : null;
                  return (
                    <div key={date} onClick={() => { setSelectedDate(date); setCalMonth({y:parseInt(date.slice(0,4)), m:parseInt(date.slice(5,7))-1}); }}
                      style={{ background:ph ? ph.bg : T.surface, border:`1px solid ${T.border}`, borderRadius:7, padding:"10px 12px", cursor:"pointer" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                        <span style={{ fontSize:12, color:T.text }}>{new Date(date+"T12:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</span>
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          {flowInfo && <span style={{ fontSize:13, color:flowInfo.color }}>{flowInfo.dot} {flowInfo.label}</span>}
                          {ph && <span style={{ fontSize:10, padding:"1px 7px", borderRadius:10, background:ph.color+"22", color:ph.color }}>{ph.label}</span>}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                        {entry.energy && <span style={{ fontSize:11, color:T.textMid }}>{entry.energy}</span>}
                        {entry.mood?.map(m => <span key={m} style={{ fontSize:11, color:T.textDim }}>{m}</span>)}
                        {entry.body?.map(b => <span key={b} style={{ fontSize:11, color:"#567" }}>{b}</span>)}
                      </div>
                      {entry.notes && <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic", marginTop:4 }}>{entry.notes}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PHASE GUIDE TAB ── */}
      {tab === "phase" && (
        <div>
          <div style={{ background:cp.bg, border:`1px solid ${cp.color}33`, borderRadius:10, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              {Object.entries(CYCLE_PHASES).map(([k,v]) => (
                <button key={k} onClick={() => updateCycle(k, k===cyclePhase?cycleDay:1)} style={{
                  padding:"5px 12px", borderRadius:14, border:`1px solid ${cyclePhase===k ? v.color : T.inputBorder}`,
                  background: cyclePhase===k ? v.color+"22" : "transparent",
                  color: cyclePhase===k ? v.color : "#445", cursor:"pointer", fontSize:12, fontFamily:"inherit",
                }}>{v.label}</button>
              ))}
            </div>
            <div style={{ fontSize:18, color:cp.color, marginBottom:3 }}>{cp.label} · {cp.days}</div>
            <div style={{ fontSize:12, color:cp.color+"bb", fontStyle:"italic", marginBottom:8 }}>{cp.theme}</div>
            <div style={{ fontSize:11, color:T.textDim, marginBottom:2 }}>Brain state: {cp.brain}</div>
            <div style={{ fontSize:11, color:T.textDim }}>Nervous system needs: {cp.nsNeeds}</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { label:"Strengths", items:cp.strengths, color:cp.color },
              { label:"Movement", items:cp.movement, color:"#5bb8a0" },
              { label:"Work Focus", items:cp.workFocus, color:ACCENT.blue },
              { label:"Creative", items:cp.creative, color:"#a07cc4" },
              { label:"Foods", items:cp.foods, color:"#7ab87a" },
              { label:"Herbs", items:cp.herbs, color:"#5bb8a0" },
              { label:"Home & Relationship", items:cp.home, color:"#a07cc4" },
              { label:"Body changes", items:cp.body, color:cp.color },
            ].map(s => (
              <div key={s.label} style={{ background:T.card, borderRadius:7, padding:"10px 12px", border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", color:s.color, marginBottom:6 }}>{s.label}</div>
                {s.items.map((item,i) => <div key={i} style={{ fontSize:11, color:T.textMid, marginBottom:3, paddingLeft:8, borderLeft:`1px solid ${s.color}44` }}>{item}</div>)}
              </div>
            ))}
          </div>
          {cp.avoid && <div style={{ marginTop:12, fontSize:11, color:"#665", background:"#151200", borderRadius:6, padding:"8px 12px", borderLeft:`2px solid #665` }}>⚠️ Avoid: {cp.avoid}</div>}
          <div style={{ marginTop:10, fontSize:12, color:cp.color, background:cp.bg, borderRadius:6, padding:"8px 12px", fontStyle:"italic" }}>🌊 Training: {cp.trainingNote}</div>
        </div>
      )}

      {/* ── MOON TAB ── */}
      {tab === "moon" && (
        <div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {upcomingMoons.map(m => {
              const isFull = m.type === "full";
              const mc = isFull ? "#f5d070" : "#a0b8e8";
              return (
                <div key={m.date} style={{ background:T.card, border:`1px solid ${mc}33`, borderRadius:9, padding:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <span style={{ fontSize:22 }}>{isFull ? "🌕" : "🌑"}</span>
                    <div>
                      <div style={{ fontSize:14, color:mc }}>{m.name}</div>
                      <div style={{ fontSize:11, color:T.textMid }}>{formatMoonDate(m.date)} · {isFull?"Full Moon":"New Moon"}</div>
                      <div style={{ fontSize:12, color:T.textMid, fontStyle:"italic" }}>{m.theme}</div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div style={{ background:T.bg, borderRadius:6, padding:"10px 12px" }}>
                      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:mc+"99", marginBottom:6 }}>Ritual ({isFull?"20–30":"15–20"} min)</div>
                      {(isFull ? FULL_MOON_RITUAL : NEW_MOON_RITUAL).map((r,i) => <div key={i} style={{ fontSize:11, color:T.textMid, marginBottom:4 }}>· {r}</div>)}
                    </div>
                    <div style={{ background:T.bg, borderRadius:6, padding:"10px 12px" }}>
                      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:mc+"99", marginBottom:6 }}>Use for</div>
                      {(isFull
                        ? ["Evaluation + truth","Pattern recognition","Emotional clearing","Measure → extract → refine"]
                        : ["Intention setting","Programme direction","Offer clarity","Decide → define → commit"]
                      ).map((r,i) => <div key={i} style={{ fontSize:11, color:T.textMid, marginBottom:4 }}>· {r}</div>)}
                      <div style={{ marginTop:8, fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:mc+"99", marginBottom:4 }}>Movement prompt</div>
                      {(isFull
                        ? ["Shake-out movement 2–3 min","Strong walking or stair climbing","Voice release — sound, humming"]
                        : ["Slow walk outdoors at night","10 deep breaths hands on womb + heart","Gentle hip circles"]
                      ).map((r,i) => <div key={i} style={{ fontSize:11, color:T.textMid, marginBottom:4 }}>· {r}</div>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full 2026 moon list */}
          <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:14, marginTop:16 }}>
            <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textFaint, marginBottom:12 }}>All 2026 Moons — Summer</div>
            {MOONS_2026.map(m => {
              const isFull = m.type==="full";
              const mc = isFull ? "#f5d070" : "#a0b8e8";
              const isPast = new Date(m.date) < new Date();
              return (
                <div key={m.date} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"6px 0", borderBottom:`1px solid ${T.border}`, opacity:isPast?0.4:1 }}>
                  <span style={{ fontSize:14, minWidth:20 }}>{isFull?"🌕":"🌑"}</span>
                  <div style={{ flex:1 }}>
                    <span style={{ fontSize:12, color:mc }}>{m.name}</span>
                    <span style={{ fontSize:11, color:T.textMid, marginLeft:8 }}>{formatMoonDate(m.date)}</span>
                  </div>
                  <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic", maxWidth:200, textAlign:"right" }}>{m.theme}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");
  const T = makeTheme(darkMode);
  // theme set
  const CYCLE_PHASES = makeCyclePhases(T);

  const [trainingPhase, setTrainingPhase] = useState(todayPhase());
  const [weekIdx, setWeekIdx] = useState(0);
  const [view, setView] = useState("home");
  const [checked, setChecked] = useState({});
  const [dayNotes, setDayNotes] = useState({});
  const [editNote, setEditNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  // Cycle tracking
  const [cyclePhase, setCyclePhase] = useState("follicular");
  const [cycleDay, setCycleDay] = useState(8);
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [bleedDays, setBleedDays] = useState({});
  const [feelingsLog, setFeelingsLog] = useState({});
  const [workoutLog, setWorkoutLog] = useState({}); // { "phase1_w0_Tue": { hrBefore, hrAfter, difficulty, exercises:[{name,sets,reps,weight,distance,time,notes}], sessionNotes } }
  const [editWorkout, setEditWorkout] = useState(null); // dk string

  // Training log
  const [staticLog, setStaticLog] = useState([]);
  const [newStatic, setNewStatic] = useState({ date:"", rhr:"", h1:"", h2:"", h3:"", notes:"" });

  // Life admin
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ name:"", dueDay:"", amount:"" });
  const [weeklyReflection, setWeeklyReflection] = useState("");
  const [editReflection, setEditReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [mealPlan, setMealPlan] = useState({});
  const [editMeal, setEditMeal] = useState(null);
  const [mealText, setMealText] = useState("");

  const ac = PHASE_META[trainingPhase].color;
  const weeks = WEEKS[trainingPhase];
  const currentWeek = weeks[weekIdx];
  const cp = CYCLE_PHASES[cyclePhase];
  const todayDay = todayDayName();
  const inputStyle = getInputStyle(T);
  const labelStyle = getLabelStyle(T);

  // Storage — uses localStorage for standalone PWA
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rhythm_v3");
      if (raw) {
        const d = JSON.parse(raw);
        setChecked(d.checked || {});
        setDayNotes(d.dayNotes || {});
        setStaticLog(d.staticLog || []);
        setBills(d.bills || []);
        setWeeklyReflection(d.weeklyReflection || "");
        setMealPlan(d.mealPlan || {});
        setBleedDays(d.bleedDays || {});
        setFeelingsLog(d.feelingsLog || {});
        setWorkoutLog(d.workoutLog || {});
        if (d.cyclePhase) setCyclePhase(d.cyclePhase);
        if (d.cycleDay) setCycleDay(d.cycleDay);
        if (d.cycleStartDate) setCycleStartDate(d.cycleStartDate);
        if (d.darkMode !== undefined) setDarkMode(d.darkMode);
      }
    } catch {}
  }, []);

  function persist(updates) {
    try {
      const data = { checked, dayNotes, staticLog, bills, weeklyReflection, mealPlan,
        cyclePhase, cycleDay, cycleStartDate, bleedDays, feelingsLog, workoutLog, darkMode, ...updates };
      localStorage.setItem("rhythm_v3", JSON.stringify(data));
    } catch {}
  }

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    persist({ darkMode: next });
  }

  function toggleBleedDay(date, flow) {
    const current = bleedDays[date];
    const next = current === flow ? { ...bleedDays } : { ...bleedDays, [date]: flow };
    if (current === flow) delete next[date];
    setBleedDays(next);
    persist({ bleedDays: next });
  }

  function saveFeeling(date, entry) {
    const next = { ...feelingsLog, [date]: { ...entry, savedAt: Date.now() } };
    setFeelingsLog(next);
    persist({ feelingsLog: next });
  }

  function saveWorkout(dk, data) {
    const next = { ...workoutLog, [dk]: data };
    setWorkoutLog(next);
    persist({ workoutLog: next });
  }

  function toggleTask(key) {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    persist({ checked: next });
  }

  function saveNote(dk) {
    const next = { ...dayNotes, [dk]: noteText };
    setDayNotes(next);
    persist({ dayNotes: next });
    setEditNote(null);
  }

  function addBill() {
    if (!newBill.name) return;
    const next = [...bills, { ...newBill, id: Date.now() }];
    setBills(next);
    persist({ bills: next });
    setNewBill({ name:"", dueDay:"", amount:"" });
  }

  function removeBill(id) {
    const next = bills.filter(b => b.id !== id);
    setBills(next);
    persist({ bills: next });
  }

  function saveReflection() {
    setWeeklyReflection(reflectionText);
    persist({ weeklyReflection: reflectionText });
    setEditReflection(false);
  }

  function saveMeal(day) {
    const next = { ...mealPlan, [day]: mealText };
    setMealPlan(next);
    persist({ mealPlan: next });
    setEditMeal(null);
  }

  function updateCycle(ph, day) {
    setCyclePhase(ph);
    setCycleDay(day);
    persist({ cyclePhase: ph, cycleDay: day });
  }

  const weekPct = (() => {
    let tot=0, done=0;
    DAYS.forEach(d => {
      const s = currentWeek.sessions[d];
      if (!s || s.type === "shabbat") return;
      const dk = `${trainingPhase}_w${weekIdx}_${d}`;
      s.tasks.forEach((_,i) => { tot++; if (checked[`${dk}_${i}`]) done++; });
    });
    return tot===0 ? 0 : Math.round((done/tot)*100);
  })();

  const upcomingMoons = getUpcomingMoons(3);
  const mealDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const NAV = [["home","Home"],["week","Week"],["cycle","Cycle & Moon"],["life","Life Admin"],["log","Training Log"]];

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Georgia', serif", fontSize:14, transition:"background 0.2s, color 0.2s" }}>

      {/* ── HEADER ── */}
      <div style={{ background:`linear-gradient(180deg, ${T.surface} 0%, transparent 100%)`, borderBottom:`1px solid ${T.border}`, padding:"20px 18px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:14 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:ac, textTransform:"uppercase", marginBottom:3 }}>Honeysuckle Motherhood · Summer 2026</div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:400, color:T.text }}>Summer Rhythm</h1>
            <div style={{ fontSize:11, color:T.textMid, marginTop:2 }}>
              {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})} · {cp.label} phase · Day {cycleDay}
            </div>
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
            {/* Dark/light toggle */}
            <button onClick={toggleDark} title={darkMode ? "Switch to light mode" : "Switch to dark mode"} style={{
              background: T.muted, border:`1px solid ${T.border}`, borderRadius:20,
              padding:"5px 12px", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", gap:5,
            }}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            {/* Training phase selector */}
            {Object.entries(PHASE_META).map(([k,v]) => (
              <button key={k} onClick={() => { setTrainingPhase(k); setWeekIdx(0); }} style={{
                padding:"4px 11px", borderRadius:14, border:`1px solid ${trainingPhase===k ? v.color : T.border}`,
                background: trainingPhase===k ? v.color+"22" : "transparent",
                color: trainingPhase===k ? v.color : T.textFaint, cursor:"pointer", fontSize:11, fontFamily:"inherit",
              }}>{v.label}</button>
            ))}
          </div>
        </div>

        {/* Cycle phase banner */}
        <div style={{ background:cp.bg, border:`1px solid ${cp.color}33`, borderRadius:7, padding:"8px 14px", marginBottom:14, display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:cp.color, flexShrink:0 }} />
          <div style={{ flex:1 }}>
            <span style={{ fontSize:12, color:cp.color, fontWeight:600 }}>{cp.label}</span>
            <span style={{ fontSize:11, color:T.textMid, marginLeft:8 }}>{cp.days} · {cp.theme}</span>
          </div>
          <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic" }}>{cp.trainingNote}</div>
        </div>

        {/* Nav */}
        <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${T.border}` }}>
          {NAV.map(([v,l]) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding:"7px 15px", background:"none", border:"none",
              borderBottom: view===v ? `2px solid ${ac}` : "2px solid transparent",
              color: view===v ? ac : T.textFaint, cursor:"pointer", fontSize:12,
              fontFamily:"inherit", marginBottom:-1, letterSpacing:"0.04em",
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"18px 16px", maxWidth:840, margin:"0 auto" }}>

        {/* ── HOME DASHBOARD ── */}
        {view === "home" && (() => {
          const todaySession = currentWeek.sessions[todayDay];
          const todayDk = `${trainingPhase}_w${weekIdx}_${todayDay}`;
          const tc = todaySession ? getTc(todaySession.type) : ac;
          const isShabbat = todaySession?.type === "shabbat";
          const todayWod = workoutLog[todayDk];

          // Week training stats
          const trainingSessions = DAYS.filter(d => {
            const s = currentWeek.sessions[d];
            return s && !["shabbat","rest","admin"].includes(s.type);
          });
          const completedSessions = trainingSessions.filter(d => {
            const dk = `${trainingPhase}_w${weekIdx}_${d}`;
            const s = currentWeek.sessions[d];
            return s?.tasks.some((_,i) => checked[`${dk}_${i}`]);
          });

          // Pool sessions this week
          const poolDays = trainingSessions.filter(d => currentWeek.sessions[d]?.type?.includes("pool"));
          const poolDone = poolDays.filter(d => {
            const dk = `${trainingPhase}_w${weekIdx}_${d}`;
            return currentWeek.sessions[d]?.tasks.some((_,i) => checked[`${dk}_${i}`]);
          });

          // Strength sessions
          const strengthDays = trainingSessions.filter(d => currentWeek.sessions[d]?.type?.includes("strength"));
          const strengthDone = strengthDays.filter(d => {
            const dk = `${trainingPhase}_w${weekIdx}_${d}`;
            return currentWeek.sessions[d]?.tasks.some((_,i) => checked[`${dk}_${i}`]);
          });

          // Dry static / breathwork
          const dryDays = trainingSessions.filter(d => currentWeek.sessions[d]?.type === "dry");
          const dryDone = dryDays.filter(d => {
            const dk = `${trainingPhase}_w${weekIdx}_${d}`;
            return currentWeek.sessions[d]?.tasks.some((_,i) => checked[`${dk}_${i}`]);
          });

          // Next moon
          const nextMoon = upcomingMoons[0];
          const daysToMoon = nextMoon ? Math.ceil((new Date(nextMoon.date) - new Date()) / (1000*60*60*24)) : null;

          // Today's meal
          const todayMeal = mealPlan[todayDay];

          // Latest static log entry
          const lastStatic = staticLog[0];

          // Progress ring helper
          function Ring({ pct, color, size=56, stroke=4, children }) {
            const r = (size - stroke*2) / 2;
            const circ = 2 * Math.PI * r;
            const dash = (pct/100) * circ;
            return (
              <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
                <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
                  <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
                  <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                    style={{ transition:"stroke-dasharray 0.6s ease" }} />
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {children}
                </div>
              </div>
            );
          }

          return (
            <div>
              {/* Hero image */}
              <div style={{
                position:"relative", borderRadius:12, overflow:"hidden",
                marginBottom:20, height:200,
                background:"#0d1820",
              }}>
                <img
                  src={HERO_IMAGE}
                  alt="Freediver ascending through light"
                  style={{
                    width:"100%", height:"100%", objectFit:"cover",
                    objectPosition:"center 30%",
                    display:"block",
                  }}
                />
                {/* Gradient overlay so text reads cleanly */}
                <div style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)",
                }} />
                {/* Text overlay */}
                <div style={{ position:"absolute", bottom:16, left:16, right:16 }}>
                  <div style={{ fontSize:10, letterSpacing:"0.18em", color:"rgba(255,255,255,0.6)", textTransform:"uppercase", marginBottom:3 }}>
                    {new Date().toLocaleDateString("en-GB",{weekday:"long", day:"numeric", month:"long"})}
                  </div>
                  <div style={{ fontSize:20, color:"#fff", fontWeight:400, marginBottom:2 }}>
                    {new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening"} 🌿
                  </div>
                  <div style={{ fontSize:12, color:cp.color, fontStyle:"italic" }}>
                    {cp.label} phase · Day {cycleDay} · {cp.theme}
                  </div>
                </div>
              </div>

              {/* TODAY CARD */}
              <div style={{ background: isShabbat ? T.surface : T.card, border:`1px solid ${tc}55`, borderLeft:`3px solid ${tc}`, borderRadius:10, padding:16, marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.14em", color:T.textFaint, marginBottom:3 }}>Today</div>
                    <div style={{ fontSize:16, color:tc }}>{todaySession?.label || "Rest"}</div>
                  </div>
                  {todaySession && !isShabbat && (
                    <button onClick={() => setView("week")} style={{ fontSize:11, color:T.textFaint, background:"none", border:`1px solid ${T.muted}`, borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"inherit" }}>
                      Full day →
                    </button>
                  )}
                </div>

                {isShabbat ? (
                  <div style={{ fontSize:13, color:T.textFaint, fontStyle:"italic" }}>Shabbat 🕯️ — Rest, family, faith.</div>
                ) : todaySession ? (
                  <div>
                    {/* Task checklist */}
                    <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:todayWod ? 12 : 0 }}>
                      {todaySession.tasks.map((task, ti) => {
                        const key = `${todayDk}_${ti}`;
                        const done = !!checked[key];
                        return (
                          <div key={ti} onClick={() => toggleTask(key)}
                            style={{ display:"flex", alignItems:"flex-start", gap:9, cursor:"pointer", padding:"4px 7px", borderRadius:5, background:done?tc+"0d":"transparent" }}>
                            <div style={{ width:14, height:14, borderRadius:3, marginTop:3, flexShrink:0,
                              border:`1px solid ${done?tc:T.border}`, background:done?tc:"transparent",
                              display:"flex", alignItems:"center", justifyContent:"center" }}>
                              {done && <span style={{ fontSize:8, color:T.bg }}>✓</span>}
                            </div>
                            <span style={{ fontSize:13, color:done?T.textFaint:"#c0c8d8", textDecoration:done?"line-through":"none", lineHeight:1.4 }}>{task}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Workout summary if logged */}
                    {todayWod && (
                      <div style={{ marginTop:10, background:tc+"0a", borderRadius:6, padding:"8px 10px", borderTop:`1px solid ${tc}22` }}>
                        <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:tc, marginBottom:5 }}>Workout logged</div>
                        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:4 }}>
                          {todayWod.hrBefore && <span style={{ fontSize:12, color:T.textMid }}>HR before <span style={{ color:tc }}>{todayWod.hrBefore}</span></span>}
                          {todayWod.hrAfter  && <span style={{ fontSize:12, color:T.textMid }}>after <span style={{ color:tc }}>{todayWod.hrAfter}</span></span>}
                          {todayWod.difficulty && <span style={{ fontSize:12, color:T.textMid }}>difficulty <span style={{ color:tc }}>{todayWod.difficulty}/10</span></span>}
                        </div>
                        {todayWod.exercises?.filter(e=>e.name).slice(0,3).map((ex,i) => (
                          <div key={i} style={{ fontSize:11, color:T.textDim }}>
                            <span style={{ color:T.textSub }}>{ex.name}</span>
                            {ex.sets && <span> · {ex.sets}×{ex.reps}{ex.weight?` @ ${ex.weight}`:""}</span>}
                            {ex.holdTime && <span> · {ex.holdTime}{ex.contractions?` · ${ex.contractions} contractions`:""}</span>}
                            {ex.distance && <span> · {ex.distance}{ex.time?` in ${ex.time}`:""}</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cycle tip */}
                    <div style={{ fontSize:11, color:cp.color+"88", fontStyle:"italic", marginTop:10 }}>
                      {cyclePhase==="menstrual" ? "🌑 Menstrual: honour your limits today" :
                       cyclePhase==="follicular" ? "🌒 Follicular: energy rising — push a little" :
                       cyclePhase==="ovulatory"  ? "🌕 Ovulatory: peak window — go for it" :
                                                   "🌖 Luteal: steady effort, nervous system first"}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize:13, color:T.textFaint, fontStyle:"italic" }}>No session today — rest and recover.</div>
                )}
              </div>

              {/* TRAINING SUMMARY RINGS */}
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:16, marginBottom:16 }}>
                <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.14em", color:T.textFaint, marginBottom:14 }}>This week · Week {currentWeek.week}</div>
                <div style={{ display:"flex", gap:16, justifyContent:"space-around", flexWrap:"wrap" }}>
                  {[
                    { label:"Sessions", done:completedSessions.length, total:trainingSessions.length, color:ac },
                    { label:"Pool",     done:poolDone.length,           total:poolDays.length,         color:TRAINING_C.pool },
                    { label:"Strength", done:strengthDone.length,       total:strengthDays.length,     color:TRAINING_C.strength },
                    { label:"Breathwork",done:dryDone.length,           total:dryDays.length,          color:TRAINING_C.dry },
                  ].map(s => {
                    const pct = s.total===0 ? 0 : Math.round((s.done/s.total)*100);
                    return (
                      <div key={s.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                        <div style={{ position:"relative", width:56, height:56, flexShrink:0 }}>
                          <svg width={56} height={56} style={{ transform:"rotate(-90deg)" }}>
                            <circle cx={28} cy={28} r={22} fill="none" stroke={T.border} strokeWidth={4} />
                            <circle cx={28} cy={28} r={22} fill="none" stroke={s.color} strokeWidth={4}
                              strokeDasharray={`${(pct/100)*2*Math.PI*22} ${2*Math.PI*22}`}
                              strokeLinecap="round" style={{ transition:"stroke-dasharray 0.6s ease" }} />
                          </svg>
                          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontSize:13, color:s.color, fontVariantNumeric:"tabular-nums" }}>
                              {s.done}/{s.total}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize:10, color:T.textDim, textAlign:"center" }}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Week progress bar */}
                <div style={{ marginTop:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:10, color:T.textFaint }}>Week completion</span>
                    <span style={{ fontSize:10, color:ac }}>{weekPct}%</span>
                  </div>
                  <div style={{ height:3, background:T.input, borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${weekPct}%`, background:ac, transition:"width 0.6s ease" }} />
                  </div>
                </div>

                {/* Day dots */}
                <div style={{ display:"flex", gap:6, marginTop:12, justifyContent:"space-between" }}>
                  {DAYS.map(d => {
                    const s = currentWeek.sessions[d];
                    const dk = `${trainingPhase}_w${weekIdx}_${d}`;
                    const isT = d === todayDay;
                    const isRest = !s || ["shabbat","rest"].includes(s.type);
                    const hasDone = !isRest && s?.tasks.some((_,i) => checked[`${dk}_${i}`]);
                    const allTasksDone = !isRest && s?.tasks.every((_,i) => checked[`${dk}_${i}`]);
                    const dot = isRest ? T.border : getTc(s.type);
                    return (
                      <div key={d} onClick={() => { setView("week"); }} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
                        <div style={{ width:"100%", height:5, borderRadius:3,
                          background: allTasksDone ? dot : hasDone ? dot+"66" : isRest ? T.mutedAlt : T.border,
                          border: isT ? `1px solid ${ac}` : "1px solid transparent",
                        }} />
                        <span style={{ fontSize:9, color:isT?ac:"#334" }}>{d[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM ROW — phase + moon + meal */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>

                {/* Training phase */}
                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textFaint, marginBottom:8 }}>Training phase</div>
                  <div style={{ fontSize:13, color:ac, marginBottom:3 }}>{PHASE_META[trainingPhase].label}</div>
                  <div style={{ fontSize:10, color:T.textDim, marginBottom:8 }}>{PHASE_META[trainingPhase].dates}</div>
                  <div style={{ fontSize:10, color:T.textFaint, fontStyle:"italic", lineHeight:1.4 }}>{PHASE_META[trainingPhase].focus}</div>
                  {lastStatic && (
                    <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid #1e2128" }}>
                      <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.1em", color:T.textFaint, marginBottom:4 }}>Last static hold</div>
                      <div style={{ display:"flex", gap:8 }}>
                        {[lastStatic.h1, lastStatic.h2, lastStatic.h3].filter(Boolean).map((t,i) => (
                          <div key={i} style={{ textAlign:"center" }}>
                            <div style={{ fontSize:14, color:ac }}>{t}</div>
                            <div style={{ fontSize:9, color:T.textFaint }}>#{i+1}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Moon + meal */}
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {nextMoon && (
                    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:14, flex:1 }}>
                      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textFaint, marginBottom:6 }}>Next moon</div>
                      <div style={{ fontSize:16, marginBottom:2 }}>{nextMoon.type==="full"?"🌕":"🌑"}</div>
                      <div style={{ fontSize:12, color:nextMoon.type==="full"?"#f5d070":"#a0b8e8" }}>{nextMoon.name}</div>
                      <div style={{ fontSize:11, color:T.textFaint }}>{formatMoonDate(nextMoon.date)}</div>
                      {daysToMoon !== null && <div style={{ fontSize:10, color:T.textMid, marginTop:3 }}>in {daysToMoon} day{daysToMoon===1?"":"s"}</div>}
                    </div>
                  )}

                  {/* Today's meal */}
                  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:14, flex:1 }}>
                    <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textFaint, marginBottom:6 }}>Tonight's dinner</div>
                    <div style={{ fontSize:12, color:todayMeal?T.textSub:"#333", fontStyle:todayMeal?"normal":"italic" }}>
                      {todayMeal || "Not planned yet"}
                    </div>
                    {!todayMeal && <button onClick={() => setView("life")} style={{ marginTop:6, fontSize:10, color:T.textFaint, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", padding:0 }}>Plan in Life Admin →</button>}
                  </div>
                </div>
              </div>

              {/* Quick nav tiles */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                {[
                  { label:"Full Week", sub:"All 7 days", view:"week",  color:ac },
                  { label:"Cycle & Moon", sub:`${cp.label} · Day ${cycleDay}`, view:"cycle", color:cp.color },
                  { label:"Life Admin", sub:"Meals · Bills · Reflect", view:"life",  color:TRAINING_C.grocery },
                  { label:"Training Log", sub:`${staticLog.length} entries`, view:"log", color:TRAINING_C.dry },
                ].map(t => (
                  <button key={t.view} onClick={() => setView(t.view)} style={{
                    background:T.surface, border:`1px solid ${t.color}33`,
                    borderRadius:9, padding:"12px 14px", cursor:"pointer",
                    textAlign:"left", fontFamily:"inherit",
                    display:"flex", flexDirection:"column", gap:3,
                  }}>
                    <span style={{ fontSize:13, color:t.color }}>{t.label}</span>
                    <span style={{ fontSize:11, color:T.textFaint }}>{t.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── WEEK VIEW ── */}
        {view === "week" && (
          <div>
            {/* Week nav */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <button onClick={() => setWeekIdx(Math.max(0,weekIdx-1))} disabled={weekIdx===0} style={{ background:"none", border:`1px solid ${T.muted}`, borderRadius:5, padding:"3px 9px", color:weekIdx===0?T.textVeryDim:T.textMid, cursor:weekIdx===0?"default":"pointer", fontFamily:"inherit" }}>←</button>
              <div style={{ flex:1 }}>
                <span style={{ fontSize:14, color:T.text }}>Week {currentWeek.week}</span>
                <span style={{ fontSize:11, color:T.textFaint, marginLeft:8 }}>of {weeks.length} · {PHASE_META[trainingPhase].label}</span>
              </div>
              <span style={{ fontSize:12, color:ac }}>{weekPct}%</span>
              <button onClick={() => setWeekIdx(Math.min(weeks.length-1,weekIdx+1))} disabled={weekIdx===weeks.length-1} style={{ background:"none", border:`1px solid ${T.muted}`, borderRadius:5, padding:"3px 9px", color:weekIdx===weeks.length-1?T.textVeryDim:T.textMid, cursor:weekIdx===weeks.length-1?"default":"pointer", fontFamily:"inherit" }}>→</button>
            </div>
            <div style={{ height:2, background:T.input, borderRadius:2, marginBottom:16, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${weekPct}%`, background:ac, transition:"width 0.4s" }} />
            </div>

            {/* Days */}
            {DAYS.map(day => {
              const s = currentWeek.sessions[day];
              if (!s) return null;
              const dk = `${trainingPhase}_w${weekIdx}_${day}`;
              const isToday = day === todayDay;
              const tc = getTc(s.type);
              const isShabbat = s.type === "shabbat";
              const isGrocery = s.type === "grocery";
              const allDone = s.tasks.every((_,i) => checked[`${dk}_${i}`]);
              const note = dayNotes[dk] || "";

              return (
                <div key={day} style={{ marginBottom:10, border:`1px solid ${isToday ? ac+"66" : T.border}`, borderLeft:`3px solid ${isToday ? ac : tc}`, borderRadius:8, background:isToday ? T.mutedAlt : T.surface, opacity:isShabbat?0.65:1 }}>
                  <div style={{ padding:"10px 14px 6px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:isToday?ac:"#ccd4e0" }}>{day}</span>
                      {isToday && <span style={{ fontSize:9, background:ac+"33", color:ac, padding:"1px 7px", borderRadius:10, letterSpacing:"0.12em" }}>TODAY</span>}
                      {allDone && !isShabbat && <span style={{ fontSize:11, color:ac }}>✓</span>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      {isGrocery && <span style={{ fontSize:10, color:"#5b8a5b" }}>🛒 🍲 🏊</span>}
                      <span style={{ fontSize:10, padding:"2px 8px", borderRadius:10, background:tc+"22", color:tc }}>{s.label}</span>
                    </div>
                  </div>

                  <div style={{ padding:"2px 14px 12px" }}>
                    {s.tasks.map((task,ti) => {
                      const key=`${dk}_${ti}`;
                      const done=!!checked[key];
                      return (
                        <div key={ti} onClick={() => !isShabbat && toggleTask(key)} style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:isShabbat?"default":"pointer", padding:"3px 6px", borderRadius:4, background:done?tc+"0e":"transparent" }}>
                          {!isShabbat && <div style={{ width:13, height:13, borderRadius:3, marginTop:3, flexShrink:0, border:`1px solid ${done?tc:T.border}`, background:done?tc:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{done&&<span style={{ fontSize:8, color:T.bg }}>✓</span>}</div>}
                          <span style={{ fontSize:12, color:done?T.textFaint:T.textSub, textDecoration:done?"line-through":"none", lineHeight:1.5 }}>{task}</span>
                        </div>
                      );
                    })}

                    {s.note && <div style={{ fontSize:11, color:T.textMid, fontStyle:"italic", marginTop:6, padding:"3px 8px", borderLeft:`2px solid ${tc}44` }}>{s.note}</div>}

                    {/* Cycle tip for this day */}
                    {!isShabbat && (
                      <div style={{ fontSize:10, color:cp.color+"99", marginTop:6, fontStyle:"italic" }}>
                        {cyclePhase==="menstrual" ? "🌑 Menstrual: honour limits today" :
                         cyclePhase==="follicular" ? "🌒 Follicular: energy rising — push a little" :
                         cyclePhase==="ovulatory" ? "🌕 Ovulatory: peak window — go for it" :
                         "🌖 Luteal: steady effort, nervous system first"}
                      </div>
                    )}

                    {/* Workout log button + summary */}
                    {!isShabbat && (() => {
                      const wd = workoutLog[dk];
                      const isEditing = editWorkout === dk;
                      return (
                        <div style={{ marginTop:8 }}>
                          {/* Compact summary if logged */}
                          {wd && !isEditing && (
                            <div style={{ background:tc+"0d", border:`1px solid ${tc}33`, borderRadius:6, padding:"8px 10px", marginBottom:6 }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:tc }}>Workout logged</span>
                                <div style={{ display:"flex", gap:10 }}>
                                  {wd.hrBefore && <span style={{ fontSize:11, color:T.textMid }}>HR before: <span style={{ color:tc }}>{wd.hrBefore}</span></span>}
                                  {wd.hrAfter  && <span style={{ fontSize:11, color:T.textMid }}>after: <span style={{ color:tc }}>{wd.hrAfter}</span></span>}
                                  {wd.difficulty && <span style={{ fontSize:11, color:T.textMid }}>diff: <span style={{ color:tc }}>{wd.difficulty}/10</span></span>}
                                </div>
                              </div>
                              {wd.exercises?.filter(e=>e.name).map((ex,i) => (
                                <div key={i} style={{ fontSize:11, color:T.textDim, marginBottom:2 }}>
                                  <span style={{ color:T.textSub }}>{ex.name}</span>
                                  {ex.sets && <span style={{ color:T.textDim }}> · {ex.sets}×{ex.reps}{ex.weight ? ` @ ${ex.weight}` : ""}</span>}
                                  {ex.holdTime && <span style={{ color:T.textDim }}> · {ex.holdTime}{ex.contractions ? ` · ${ex.contractions} contractions` : ""}</span>}
                                  {ex.distance && <span style={{ color:T.textDim }}> · {ex.distance}{ex.time ? ` in ${ex.time}` : ""}</span>}
                                  {ex.duration && !ex.distance && <span style={{ color:T.textDim }}> · {ex.duration}</span>}
                                  {ex.notes && <span style={{ color:T.textFaint, fontStyle:"italic" }}> — {ex.notes}</span>}
                                </div>
                              ))}
                              {wd.sessionNotes && <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic", marginTop:4 }}>{wd.sessionNotes}</div>}
                            </div>
                          )}

                          {/* Editor */}
                          {isEditing && (
                            <WorkoutEditor
                              dk={dk}
                              sessionLabel={s.label}
                              sessionType={s.type}
                              existingTasks={s.tasks}
                              workoutData={workoutLog[dk]}
                              onSave={saveWorkout}
                              onClose={() => setEditWorkout(null)}
                              tc={tc}
                              T={T}
                            />
                          )}

                          {/* Toggle button */}
                          {!isEditing && (
                            <button onClick={() => setEditWorkout(isEditing ? null : dk)} style={{
                              background:"none", border:`1px solid ${tc}33`, borderRadius:5,
                              padding:"3px 10px", color:tc+"99", cursor:"pointer", fontSize:11, fontFamily:"inherit",
                            }}>
                              {wd ? "✏️ Edit workout" : "+ Log workout"}
                            </button>
                          )}
                        </div>
                      );
                    })()}

                    {/* Day note */}
                    {!isShabbat && (editNote===dk ? (
                      <div style={{ marginTop:8, display:"flex", gap:8, alignItems:"flex-end" }}>
                        <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Session notes..." style={{ ...inputStyle, resize:"vertical", minHeight:50 }} />
                        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                          <button onClick={() => saveNote(dk)} style={btnStyle(tc)}>Save</button>
                          <button onClick={() => setEditNote(null)} style={{ ...btnStyle(T.muted), color:T.textMid, background:T.muted }}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginTop:4 }}>
                        {note && <div style={{ fontSize:11, color:T.textMid, fontStyle:"italic", marginBottom:4, borderLeft:`2px solid ${ac}33`, paddingLeft:8 }}>{note}</div>}
                        <button onClick={() => { setEditNote(dk); setNoteText(note); }} style={{ background:"none", border:"none", color:T.textVeryDim, cursor:"pointer", fontSize:10, fontFamily:"inherit" }}>{note?"Edit note":"+ note"}</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CYCLE & MOON VIEW ── */}
        {view === "cycle" && (
          <CycleAndMoon
            cyclePhase={cyclePhase} cycleDay={cycleDay}
            updateCycle={updateCycle}
            bleedDays={bleedDays} toggleBleedDay={toggleBleedDay}
            feelingsLog={feelingsLog} saveFeeling={saveFeeling}
            cycleStartDate={cycleStartDate} setCycleStartDate={(d)=>{ setCycleStartDate(d); persist({cycleStartDate:d}); }}
            upcomingMoons={upcomingMoons}
            cp={cp} ac={ac} T={T}
          />
        )}

        {/* ── LIFE ADMIN VIEW ── */}
        {view === "life" && (
          <div>
            <h2 style={{ fontSize:16, fontWeight:400, margin:"0 0 16px", color:ac }}>Life Admin</h2>

            {/* Weekly reflection */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:14, marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textMid }}>Weekly Reflection · Sunday</div>
                <button onClick={() => { setEditReflection(true); setReflectionText(weeklyReflection); }} style={{ background:"none", border:"none", color:T.textFaint, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>Edit</button>
              </div>
              {editReflection ? (
                <div>
                  <textarea value={reflectionText} onChange={e=>setReflectionText(e.target.value)}
                    placeholder={"What went well?\nWhat was hard?\nWhat needs to change?\nWhat am I grateful for?\nTop 3 priorities next week"}
                    style={{ ...inputStyle, minHeight:120, resize:"vertical", marginBottom:8 }} />
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={saveReflection} style={btnStyle(ac)}>Save</button>
                    <button onClick={() => setEditReflection(false)} style={{ ...btnStyle(T.muted), color:T.textMid, background:T.muted }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize:12, color: weeklyReflection ? T.textSub : "#333", fontStyle:weeklyReflection?"normal":"italic", whiteSpace:"pre-wrap", lineHeight:1.6 }}>
                  {weeklyReflection || "No reflection yet. Add one on Sunday."}
                </div>
              )}
            </div>

            {/* Meal plan */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:14, marginBottom:16 }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textMid, marginBottom:12 }}>Meal Plan · Prep Sunday 🍲</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {mealDays.map(d => {
                  const meal = mealPlan[d] || "";
                  const isEdit = editMeal===d;
                  return (
                    <div key={d} style={{ background:T.card, borderRadius:6, padding:"8px 10px", border:`1px solid ${T.border}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:11, color:T.textMid }}>{d}</span>
                        <button onClick={() => { setEditMeal(d); setMealText(meal); }} style={{ background:"none", border:"none", color:T.textVeryDim, cursor:"pointer", fontSize:10, fontFamily:"inherit" }}>edit</button>
                      </div>
                      {isEdit ? (
                        <div>
                          <input value={mealText} onChange={e=>setMealText(e.target.value)} placeholder="Dinner plan..." style={{ ...inputStyle, marginBottom:6 }} />
                          <div style={{ display:"flex", gap:6 }}>
                            <button onClick={() => saveMeal(d)} style={{ ...btnStyle(TRAINING_C.grocery), fontSize:11, padding:"4px 10px" }}>Save</button>
                            <button onClick={() => setEditMeal(null)} style={{ background:"none", border:"none", color:T.textMid, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>✕</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize:12, color:meal?T.textSub:"#333", fontStyle:meal?"normal":"italic" }}>{meal||"—"}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bills */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:14, marginBottom:16 }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textMid, marginBottom:10 }}>Bills & Due Dates</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 30px", gap:8, marginBottom:10 }}>
                <input value={newBill.name} onChange={e=>setNewBill(p=>({...p,name:e.target.value}))} placeholder="Bill name" style={inputStyle} />
                <input value={newBill.amount} onChange={e=>setNewBill(p=>({...p,amount:e.target.value}))} placeholder="Amount" style={inputStyle} />
                <input value={newBill.dueDay} onChange={e=>setNewBill(p=>({...p,dueDay:e.target.value}))} placeholder="Day" style={inputStyle} />
                <button onClick={addBill} style={{ ...btnStyle(ac), padding:"7px 10px" }}>+</button>
              </div>
              {bills.length===0 ? (
                <div style={{ fontSize:12, color:T.textVeryDim, fontStyle:"italic" }}>No bills added yet.</div>
              ) : bills.map(b => (
                <div key={b.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <div>
                    <span style={{ fontSize:13, color:T.textSub }}>{b.name}</span>
                    {b.amount && <span style={{ fontSize:11, color:T.textMid, marginLeft:10 }}>{b.amount}</span>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {b.dueDay && <span style={{ fontSize:11, color:ACCENT.amber }}>Due: {b.dueDay}</span>}
                    <button onClick={() => removeBill(b.id)} style={{ background:"none", border:"none", color:T.textFaint, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sunday anchor reminder */}
            <div style={{ background:T.card, border:`1px solid ${TRAINING_C.grocery}44`, borderRadius:8, padding:14 }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:TRAINING_C.grocery, marginBottom:8 }}>Sunday Anchor Rhythm 🌿</div>
              {["Grocery shop for the week","Batch meal prep","Intense pool session (see training plan)","Weekly reflection — write it out","Schedule next week — fill the calendar","Bill check — what's due this week?","Set intentions for the coming week"].map((t,i) => (
                <div key={i} style={{ fontSize:12, color:T.textMid, marginBottom:5, paddingLeft:10, borderLeft:`2px solid ${TRAINING_C.grocery}44` }}>{t}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRAINING LOG VIEW ── */}
        {view === "log" && (
          <div>
            <h2 style={{ fontSize:16, fontWeight:400, margin:"0 0 4px", color:ac }}>Training Log</h2>
            <p style={{ margin:"0 0 16px", fontSize:12, color:T.textMid, fontStyle:"italic" }}>Dry Static times + resting heart rate — David Lee's core data points.</p>

            {/* Entry form */}
            <div style={{ background:T.surface, border:`1px solid ${ac}33`, borderRadius:8, padding:14, marginBottom:20 }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color:T.textMid, marginBottom:10 }}>Log a session</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <div><label style={labelStyle}>Date</label><input type="date" value={newStatic.date} onChange={e=>setNewStatic(p=>({...p,date:e.target.value}))} style={inputStyle} /></div>
                <div><label style={labelStyle}>Morning RHR (bpm)</label><input value={newStatic.rhr} onChange={e=>setNewStatic(p=>({...p,rhr:e.target.value}))} placeholder="e.g. 58" style={inputStyle} /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
                {["h1","h2","h3"].map((k,i) => (
                  <div key={k}><label style={labelStyle}>Hold #{i+1} (m:ss)</label><input value={newStatic[k]} onChange={e=>setNewStatic(p=>({...p,[k]:e.target.value}))} placeholder="e.g. 1:45" style={inputStyle} /></div>
                ))}
              </div>
              <div style={{ marginBottom:10 }}><label style={labelStyle}>Notes (cycle phase, how it felt, contractions)</label><input value={newStatic.notes} onChange={e=>setNewStatic(p=>({...p,notes:e.target.value}))} placeholder="e.g. Follicular, felt strong, 6 contractions" style={inputStyle} /></div>
              <button onClick={() => {
                if (!newStatic.date) return;
                const next = [{ ...newStatic, phase:cyclePhase, id:Date.now() }, ...staticLog].slice(0,60);
                setStaticLog(next); persist({ staticLog:next });
                setNewStatic({ date:"", rhr:"", h1:"", h2:"", h3:"", notes:"" });
              }} style={btnStyle(ac)}>Save Entry</button>
            </div>

            {/* Log */}
            {staticLog.length===0 ? (
              <div style={{ fontSize:13, color:T.textVeryDim, textAlign:"center", padding:"30px 0", fontStyle:"italic" }}>No entries yet. First Pre Phase session: log your baseline Dry Static times.</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {staticLog.map(e => {
                  const ph = CYCLE_PHASES[e.phase];
                  return (
                    <div key={e.id} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:7, padding:"12px 14px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                          <span style={{ fontSize:13, color:T.text }}>{e.date}</span>
                          {ph && <span style={{ fontSize:10, padding:"1px 8px", borderRadius:10, background:ph.color+"22", color:ph.color }}>{ph.label}</span>}
                        </div>
                        {e.rhr && <span style={{ fontSize:11, color:ac }}>RHR: {e.rhr} bpm</span>}
                      </div>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:e.notes?8:0 }}>
                        {[e.h1,e.h2,e.h3].filter(Boolean).map((t,i) => (
                          <div key={i} style={{ background:T.card, borderRadius:5, padding:"5px 12px", textAlign:"center" }}>
                            <div style={{ fontSize:9, color:T.textFaint, marginBottom:2 }}>Hold #{i+1}</div>
                            <div style={{ fontSize:16, color:ac, fontVariantNumeric:"tabular-nums" }}>{t}</div>
                          </div>
                        ))}
                      </div>
                      {e.notes && <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic" }}>{e.notes}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
