import { useRef, useState, type ComponentType, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  Play,
  Image as ImageIcon,
  Layers3,
  Crosshair,
  RefreshCw,
  BarChart3,
  ShieldCheck,
  Activity,
  Split,
} from "lucide-react";

type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

type DetailSection = {
  id: string;
  title: string;
  shortTitle: string;
  score: number;
  projected: number;
  weight: number;
  color: string;
  light: string;
  summary: string;
  details?: string[];
};

type BreakdownItem = { name: string; score: number; uplift: number };

type SignalCardData = {
  title: string;
  metric: string;
  insight: string;
  tone: string;
  bg: string;
  icon: IconType;
};

type CreativeAd = {
  id: string;
  title: string;
  format: string;
  result: "Worked" | "Mixed" | "Did not work";
  score: number;
  metric: string;
  insight: string;
};

type RadarDatum = {
  id: string;
  subject: string;
  title: string;
  current: number;
  projected: number;
  color: string;
  light: string;
};

type PanelConfig = {
  badge: string;
  leadTitle: string;
  leadSubtitle: string;
  leadCards?: SignalCardData[];
  creativeAds?: CreativeAd[];
  breakdown?: BreakdownItem[];
  breakdownTitle?: string;
  breakdownSubtitle?: string;
  insights?: string[];
  insightTitle?: string;
  insightSubtitle?: string;
  insightIcon?: IconType;
};

const sections: DetailSection[] = [
  {
    id: "impact",
    title: "Impact",
    shortTitle: "Impact",
    score: 68,
    projected: 83,
    weight: 0.25,
    color: "#e11d48",
    light: "#ffe4e6",
    summary:
      "Measures impacted users generated from past Meta activity, and the uplift CF products can unlock.",
  },
  {
    id: "targeting",
    title: "Targeting Strategy",
    shortTitle: "Targeting",
    score: 61,
    projected: 78,
    weight: 0.15,
    color: "#0ea5e9",
    light: "#e0f2fe",
    summary:
      "Evaluates how well targeting strategy supports contextual scale, prospecting quality, retargeting depth, and first-party audience design.",
    details: [
      "Over-reliance on narrow audience targeting",
      "Over-fragmented audience strategy",
      "Audience overlap between ad sets",
      "Missing exclusion logic across audiences",
      "Weak or inconsistent use of broad targeting",
      "Poor Lookalike Audience strategy",
      "Weak custom audience strategy",
      "Retargeting strategy lacks depth or recency logic",
      "Prospecting strategy relies too heavily on outdated interest logic",
      "No clear relationship between audience type and funnel stage",
      "Limited use of first-party data",
      "No value-based audience strategy where relevant",
      "Inconsistent audience testing framework",
      "Weak acquisition vs existing-customer separation",
      "Retargeting pool quality is weak",
      "Audience size is mismatched to budget or objective",
      "Customer journey coverage is incomplete",
    ],
  },
  {
    id: "structure",
    title: "Campaign / Ad Set Structure",
    shortTitle: "Structure",
    score: 57,
    projected: 74,
    weight: 0.15,
    color: "#6366f1",
    light: "#e0e7ff",
    summary:
      "Measures structural efficiency, learning stability, budget concentration, and unnecessary segmentation.",
    details: [
      "Too many campaigns doing the same job",
      "Campaign objective misalignment",
      "Over-segmentation at campaign level",
      "Under-segmentation where control is needed",
      "Too many ad sets per campaign",
      "Ad sets with budgets too low for their setup",
      "Inconsistent use of CBO vs ABO",
      "Testing structure mixed with scaling structure",
      "Legacy or redundant ad sets still active",
      "Funnel stages not structurally separated",
      "Placement/device segmentation without evidence",
      "Ad set segmentation based on too many variables at once",
      "Advantage+ usage",
    ],
  },
  {
    id: "creative",
    title: "Creative Strategies",
    shortTitle: "Creative",
    score: 64,
    projected: 81,
    weight: 0.15,
    color: "#8b5cf6",
    light: "#f3e8ff",
    summary:
      "Evaluates creative diversity, fatigue, placement fit, format mix, and winner/loser rotation discipline.",
    details: [
      "Limited creative mix",
      "Insufficient creative variation",
      "Weak format strategy (image, video, collection, carousel)",
      "Static vs video balance",
      "Weak hook strategy",
      "Messaging angles are too narrow",
      "Copy and text strategy is underdeveloped",
      "Creative strategy is too asset-led, not concept-led",
      "Little alignment between creative and funnel stage",
      "Weak refresh cadence",
      "Low creative testing discipline",
      "Little use of social proof / credibility assets",
      "Brand and performance messaging are not balanced well",
      "No clear creative winners identified or scaled",
      "Best-performing ads are concentrated too narrowly",
      "CTA strategy is repetitive or weak",
      "Creative built for one product, offer, or audience only",
      "Advantage+ usage",
    ],
  },
  {
    id: "optimization",
    title: "Optimization Strategies",
    shortTitle: "Optimization",
    score: 59,
    projected: 77,
    weight: 0.15,
    color: "#f59e0b",
    light: "#fef3c7",
    summary:
      "Assesses bid strategy fit, pacing, budget changes, placement logic, and rule-based optimization discipline.",
    details: [
      "Optimization event is too low in the funnel for available volume",
      "Optimization event is too high in the funnel",
      "Optimization event selection is inconsistent across similar campaigns",
      "No clear optimisation pathway or maturity model",
      "Too many ad sets/campaigns for the available signal",
      "Learning phase issues are persistent",
      "Too many changes made too often - reset learning",
      "Bid strategy is misaligned with account conditions",
      "Cost cap or bid cap targets do not reflect reality",
      "Budget strategy does not support optimization",
      "Attribution thinking is weak or inconsistent",
      "Placements are constrained in a way that hurts optimization",
      "No value-based optimization logic where relevant",
      "Weak scaling logic",
      "No clear optimization hierarchy",
      "Limited buyer involvement / weak hands-on optimization",
      "Optimization decisions appear reactive rather than strategic",
      "Structural optimisation is not ongoing",
    ],
  },
  {
    id: "measurement",
    title: "Measurement",
    shortTitle: "Measurement",
    score: 54,
    projected: 79,
    weight: 0.15,
    color: "#10b981",
    light: "#d1fae5",
    summary:
      "Covers pixel health, CAPI, event structure, optimization-event readiness, and signal completeness.",
    details: [
      "Pixel implementation appears incomplete or inconsistent",
      "Pixel health appears weak",
      "Key conversion events are missing",
      "Event setup is too shallow or too generic",
      "Events may be firing inaccurately",
      "Event prioritization is weak or unclear",
      "Custom conversions are missing or underused",
      "Custom conversions exist, but the logic is weak",
      "CAPI is missing or not fully implemented",
      "CAPI is implemented, but deduplication may be weak",
      "Event Match Quality is weak",
      "Value parameters are missing or unreliable",
      "Limited lead-quality or revenue-quality measurement",
      "Funnel visibility is incomplete",
      "Domain / web environment complexity is not fully covered",
      "Offline or CRM feedback loop is missing",
      "Audience-building measurement is weak",
      "Reporting logic is too dependent on Meta-only data",
    ],
  },
];

const actionData = [
  { name: "Measurement", value: 25 },
  { name: "Structure", value: 19 },
  { name: "Optimization", value: 18 },
  { name: "Targeting", value: 17 },
  { name: "Creative", value: 12 },
  { name: "Impact", value: 9 },
];

const barFillColors = ["#10b981", "#6366f1", "#f59e0b", "#0ea5e9", "#8b5cf6", "#e11d48"];

const creativeAds: CreativeAd[] = [
  {
    id: "ad-1",
    title: "UGC Reel - product demo",
    format: "Video / Reels",
    result: "Worked",
    score: 84,
    metric: "1.9x CTR vs avg",
    insight:
      "Fast product demonstration, native framing, and direct value hook drove stronger thumb-stop and lower CPA.",
  },
  {
    id: "ad-2",
    title: "Founder story cutdown",
    format: "Video / Stories",
    result: "Worked",
    score: 79,
    metric: "+24% CVR",
    insight:
      "Credibility-led narrative and proof points connected well with mid-funnel retargeting audiences.",
  },
  {
    id: "ad-3",
    title: "Studio static product tile",
    format: "Static / Feed",
    result: "Did not work",
    score: 46,
    metric: "-31% CTR",
    insight:
      "Too polished and product-led; weak hook and low contextual relevance compared with looser creator formats.",
  },
  {
    id: "ad-4",
    title: "Offer carousel",
    format: "Carousel / Feed",
    result: "Mixed",
    score: 58,
    metric: "+8% ATC",
    insight:
      "Useful for browsing behavior but lacked a strong first-card hook and clear hierarchy across frames.",
  },
];

const breakdowns: Record<string, BreakdownItem[]> = {
  targeting: [
    { name: "Broad", score: 72, uplift: 8 },
    { name: "Lookalike", score: 56, uplift: 14 },
    { name: "Custom", score: 51, uplift: 16 },
    { name: "Retargeting", score: 63, uplift: 11 },
    { name: "Contextual", score: 78, uplift: 7 },
  ],
  structure: [
    { name: "Campaign duplication", score: 42, uplift: 18 },
    { name: "Ad set density", score: 55, uplift: 14 },
    { name: "Budget sufficiency", score: 61, uplift: 10 },
    { name: "CBO / ABO fit", score: 58, uplift: 12 },
    { name: "Scaling separation", score: 49, uplift: 15 },
  ],
  creative: [
    { name: "Video", score: 78, uplift: 9 },
    { name: "Static", score: 49, uplift: 14 },
    { name: "Carousel", score: 58, uplift: 11 },
    { name: "Collection", score: 44, uplift: 16 },
    { name: "UGC-style", score: 73, uplift: 7 },
  ],
  optimization: [
    { name: "Event fit", score: 48, uplift: 17 },
    { name: "Learning stability", score: 44, uplift: 19 },
    { name: "Bid strategy", score: 59, uplift: 11 },
    { name: "Scaling logic", score: 54, uplift: 14 },
    { name: "Placement freedom", score: 63, uplift: 9 },
  ],
  measurement: [
    { name: "Pixel health", score: 57, uplift: 12 },
    { name: "CAPI", score: 41, uplift: 22 },
    { name: "Event depth", score: 46, uplift: 18 },
    { name: "Match quality", score: 52, uplift: 13 },
    { name: "Revenue feedback", score: 39, uplift: 21 },
  ],
};

const panelConfigs: Record<string, PanelConfig> = {
  targeting: {
    badge: "Contextual opportunity",
    leadTitle: "Targeting strategy story",
    leadSubtitle:
      "Frame where the account is too narrow, too fragmented, and where contextual targeting can lift impact.",
    leadCards: [
      {
        title: "Current targeting bias",
        metric: "Interest-led / narrow audience heavy",
        insight:
          "The account relies too much on narrow interest and layered audience logic, which limits scale and increases overlap across active ad sets.",
        tone: "#ef4444",
        bg: "#fef2f2",
        icon: Crosshair,
      },
      {
        title: "Recommended direction",
        metric: "Contextual + broad + cleaner exclusions",
        insight:
          "Use contextual targeting as the primary performance unlock, supported by broader prospecting, cleaner exclusions, and stronger first-party audience structure.",
        tone: "#0ea5e9",
        bg: "#e0f2fe",
        icon: Target,
      },
    ],
    insightTitle: "What is driving weakness",
    insightSubtitle:
      "The audit should surface the most important targeting issues in a way that ties directly to CF value.",
    insights: [
      "Contextual targeting is the clearest lever for increasing impact without adding more audience fragmentation.",
      "Broad and contextual audiences appear more scalable than narrow interest stacks at the current spend level.",
      "Retargeting lacks enough recency segmentation and exclusion logic to protect efficiency as budget scales.",
      "First-party and value-based audience logic is underdeveloped relative to the account's maturity needs.",
    ],
    insightIcon: TrendingUp,
    breakdownTitle: "Audience type breakdown",
    breakdownSubtitle:
      "Current effectiveness by audience type with projected upside shown as the lighter extension.",
    breakdown: breakdowns.targeting,
  },
  structure: {
    badge: "Structural redesign",
    leadTitle: "Structure simplification",
    leadSubtitle:
      "Show why the current account shape is inefficient and what the cleaner operating model should look like.",
    leadCards: [
      {
        title: "Current structure issue",
        metric: "18 active ad sets across overlapping goals",
        insight:
          "Too many entities are trying to do the same job, which weakens signal concentration and slows learning.",
        tone: "#6366f1",
        bg: "#eef2ff",
        icon: Layers3,
      },
      {
        title: "Recommended simplification",
        metric: "6-8 higher-volume ad sets",
        insight:
          "Move testing into clearer lanes, separate scaling from experimentation, and consolidate low-budget duplication.",
        tone: "#10b981",
        bg: "#ecfdf5",
        icon: Split,
      },
    ],
    breakdownTitle: "Structure health breakdown",
    breakdownSubtitle:
      "Where the account loses efficiency today and where simplification would unlock the biggest gains.",
    breakdown: breakdowns.structure,
  },
  creative: {
    badge: "4 mock ad reads",
    leadTitle: "Best performing ads",
    leadSubtitle:
      "Show the creative story, what worked, and what did not work in a more presentation-ready way.",
    creativeAds,
    insightTitle: "What is driving performance",
    insightSubtitle: "Use this space to explain what is actually working in the creative system.",
    insights: [
      "UGC-style video is outperforming static creative on thumb-stop and CTR.",
      "Hooks that land value in the first 2 seconds are the strongest driver of lift.",
      "Credibility assets and proof-led messaging outperform polished product-only visuals.",
      "Static feed creative is underperforming due to weak concept variation and repetitive CTA structure.",
    ],
    insightIcon: Zap,
    breakdownTitle: "Creative format breakdown",
    breakdownSubtitle: "Current score by format with modeled upside shown as a lighter extension.",
    breakdown: breakdowns.creative,
  },
  optimization: {
    badge: "Optimization read",
    leadTitle: "Optimization maturity read",
    leadSubtitle:
      "Highlight where optimization behavior is preventing the account from stabilizing and scaling.",
    insightTitle: "Optimization maturity read",
    insightSubtitle:
      "Highlight where optimization behavior is preventing the account from stabilizing and scaling.",
    insights: [
      "Learning is being reset too often by frequent budget and structural changes.",
      "Optimization events are not always aligned to the deepest stable signal available in the account.",
      "Bid and budget logic appears reactive rather than laddered through a clear maturity path.",
      "Placement constraints are reducing optimization flexibility where the data does not justify heavy restriction.",
    ],
    insightIcon: RefreshCw,
    breakdownTitle: "Optimization breakdown",
    breakdownSubtitle:
      "Current optimization readiness by lever, with projected headroom if the operating model is improved.",
    breakdown: breakdowns.optimization,
  },
  measurement: {
    badge: "Signal resilience",
    leadTitle: "Measurement readiness",
    leadSubtitle: "Present the measurement stack as a health check, not just a list of missing items.",
    leadCards: [
      {
        title: "Signal coverage",
        metric: "LPV, Lead, ATC present / Purchase inconsistent",
        insight:
          "Core event coverage exists, but lower-funnel signal depth is incomplete for stronger optimization and reporting confidence.",
        tone: "#10b981",
        bg: "#ecfdf5",
        icon: Activity,
      },
      {
        title: "Implementation risk",
        metric: "CAPI partial / deduplication weak",
        insight:
          "Measurement resilience improves meaningfully once server-side coverage and stronger deduplication logic are in place.",
        tone: "#f59e0b",
        bg: "#fffbeb",
        icon: ShieldCheck,
      },
    ],
    breakdownTitle: "Measurement breakdown",
    breakdownSubtitle:
      "Current implementation health and projected upside once signal coverage and quality are improved.",
    breakdown: breakdowns.measurement,
  },
};

const fixes: { title: string; text: string; icon: IconType }[] = [
  {
    title: "Strengthen measurement stack",
    text: "Complete Pixel + CAPI coverage, validate event hierarchy, and align optimization events to the deepest stable signal.",
    icon: AlertTriangle,
  },
  {
    title: "Reduce structural fragmentation",
    text: "Consolidate overlapping ad sets and remove low-volume segmentation that suppresses learning efficiency.",
    icon: Target,
  },
  {
    title: "Open up optimization guardrails",
    text: "Use smoother budget and bid changes, and expand Advantage+ placements unless the data clearly supports restrictions.",
    icon: Sparkles,
  },
];

function validateSections(items: DetailSection[]) {
  return items.every(
    (item) =>
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.score === "number" &&
      typeof item.projected === "number" &&
      typeof item.weight === "number"
  );
}

function MetricTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function SignalCard({ title, metric, insight, tone, bg, icon: Icon }: SignalCardData) {
  return (
    <div className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-zinc-900">{title}</p>
          <p className="mt-1 text-sm" style={{ color: tone }}>
            {metric}
          </p>
        </div>
        <div className="rounded-2xl p-2" style={{ backgroundColor: bg }}>
          <Icon className="h-5 w-5" style={{ color: tone }} />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-600">{insight}</p>
    </div>
  );
}

function BreakdownBars({
  items,
  color,
  light,
  title,
  subtitle,
}: {
  items: BreakdownItem[];
  color: string;
  light: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4" style={{ color }} />
        <p className="text-sm font-medium text-zinc-900">{title}</p>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-600">{item.name}</span>
              <span className="font-medium text-zinc-900">
                {item.score} <span className="text-zinc-400">→</span> {item.score + item.uplift}
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${item.score}%`, backgroundColor: color }}
              />
              <div
                className="absolute inset-y-0 rounded-full"
                style={{
                  left: `${item.score}%`,
                  width: `${item.uplift}%`,
                  backgroundColor: light,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightList({
  title,
  subtitle,
  points,
  icon: Icon,
  color,
}: {
  title: string;
  subtitle: string;
  points: string[];
  icon: IconType;
  color: string;
}) {
  return (
    <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color }} />
        <p className="text-sm font-medium text-zinc-900">{title}</p>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      <div className="mt-4 grid gap-3">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700"
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeAdCard({ ad }: { ad: CreativeAd }) {
  const tone = ad.result === "Worked" ? "#10b981" : ad.result === "Mixed" ? "#f59e0b" : "#ef4444";
  const bg = ad.result === "Worked" ? "#ecfdf5" : ad.result === "Mixed" ? "#fffbeb" : "#fef2f2";
  return (
    <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-40 overflow-hidden border-b border-zinc-100 bg-zinc-100">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-200" />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
          {ad.format}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {ad.format.toLowerCase().includes("video") ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-lg">
              <Play className="h-6 w-6 text-zinc-800" />
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-lg">
              <ImageIcon className="h-6 w-6 text-zinc-800" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-zinc-900">{ad.title}</p>
            <p className="mt-1 text-sm text-zinc-500">{ad.metric}</p>
          </div>
          <div
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: bg, color: tone }}
          >
            {ad.result}
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{ad.insight}</p>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-sm text-zinc-500">Creative quality score</span>
          <span className="font-semibold" style={{ color: tone }}>
            {ad.score}/100
          </span>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  item,
  active,
  onClick,
}: {
  item: DetailSection;
  active: boolean;
  onClick: () => void;
}) {
  const delta = item.projected - item.score;
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border p-4 text-left shadow-sm transition-all ${
        active ? "bg-white shadow-lg" : "border-zinc-200 bg-white/90 hover:border-zinc-300"
      }`}
      style={active ? { borderColor: item.color, boxShadow: `0 12px 34px ${item.color}1f` } : undefined}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full blur-2xl transition-opacity"
        style={{ backgroundColor: `${item.color}18`, opacity: active ? 1 : 0.35 }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.title}</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-semibold text-zinc-900">{item.score}</span>
            <span className="pb-1 text-sm text-zinc-500">/ 100</span>
          </div>
        </div>
        <Badge
          className={`rounded-full border-0 px-3 py-1 ${
            active ? "text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
          }`}
          style={active ? { backgroundColor: item.color } : undefined}
        >
          +{delta}
        </Badge>
      </div>
      <p className="relative mt-4 text-sm leading-6 text-zinc-600">{item.summary}</p>
      <div className="relative mt-auto pt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Projected opportunity</span>
          <span className="font-medium" style={{ color: active ? item.color : "#18181b" }}>
            {item.projected}/100
          </span>
        </div>
        <div className="group/progress relative">
          <div className="relative h-3 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${item.score}%`,
                backgroundColor: active ? item.color : "#d4d4d8",
              }}
            />
            <div
              className="absolute inset-y-0 rounded-full opacity-95"
              style={{
                left: `${item.score}%`,
                width: `${Math.max(item.projected - item.score, 0)}%`,
                backgroundColor: active ? item.light : "#e9d5ff",
              }}
            />
          </div>
          <div className="pointer-events-none absolute -top-14 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg group-hover/progress:block">
            <div className="font-medium text-zinc-900">
              {item.score} current <span className="text-zinc-400">→</span> {item.projected} projected
            </div>
            <div className="mt-0.5" style={{ color: item.color }}>
              +{delta} potential uplift
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ImpactHero({
  item,
}: {
  item: DetailSection;
}) {
  const delta = item.projected - item.score;
  const pillarBreakdown = sections
    .filter((section) => section.id !== item.id)
    .map((section) => ({
      id: section.id,
      title: section.shortTitle,
      uplift: section.projected - section.score,
      color: section.color,
    }));

  return (
    <Card className="rounded-[32px] border-zinc-200 shadow-sm">
      <CardContent className="p-7">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Badge className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100">Impact score</Badge>
            <Badge variant="outline" className="rounded-full">
              Primary value driver
            </Badge>
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Highlight the impact Channel Factory can create
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            This lead module brings the proprietary impact score above the rest of the audit so it becomes the
            headline story: current impact from historical Meta activity, projected impact with Channel Factory
            products, and the account score that supports that uplift.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="Current impact" value={item.score} />
            <MetricTile label="Projected impact" value={item.projected} />
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Impact delta</div>
              <div className="mt-2 text-2xl font-semibold text-emerald-600">+{delta}</div>
              <div className="mt-1 text-sm text-zinc-500">Modeled uplift opportunity</div>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Projected improvement mix
              </div>
              <div className="mt-3 space-y-2">
                {pillarBreakdown.map((pillar) => (
                  <div key={pillar.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: pillar.color }}
                        aria-hidden
                      />
                      <span className="text-zinc-600">{pillar.title}</span>
                    </div>
                    <span className="font-medium text-zinc-900">+{pillar.uplift}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: RadarDatum }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="min-w-[220px] rounded-3xl border border-zinc-200/80 bg-white/95 px-4 py-3 text-sm shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="font-medium text-zinc-900">{d.title}</div>
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-50 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Current</div>
          <div className="mt-1 text-lg font-semibold text-zinc-900">{d.current}</div>
        </div>
        <div className="rounded-2xl bg-zinc-50 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Projected</div>
          <div className="mt-1 text-lg font-semibold text-zinc-900">{d.projected}</div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl px-3 py-2" style={{ backgroundColor: d.light }}>
        <div className="text-[11px] uppercase tracking-[0.14em]" style={{ color: d.color }}>
          Potential uplift
        </div>
        <div className="mt-1 text-lg font-semibold" style={{ color: d.color }}>
          +{d.projected - d.current}
        </div>
      </div>
    </div>
  );
}

function getAssessmentResult(detail: string) {
  const passSignals = [/strong/i, /clear/i, /effective/i, /healthy/i, /complete/i, /balanced/i];
  return passSignals.some((pattern) => pattern.test(detail)) ? "pass" : "fail";
}

function DefaultExpandedPanel({ section }: { section: DetailSection }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-900">What we would assess in this area</p>
          <p className="mt-1 text-sm text-zinc-500">
            These are the diagnostic themes the audit can expand on when this score is selected.
          </p>
        </div>
        <Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>
          {section.details?.length || 0} diagnostic checks
        </Badge>
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left text-sm text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50"
      >
        <span>{isExpanded ? "Hide assessment criteria" : "Show assessment criteria"}</span>
        <span className="font-medium text-zinc-900">{isExpanded ? "Collapse" : "Expand"}</span>
      </button>
      {isExpanded ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(section.details || []).map((detail) => {
            const isPass = getAssessmentResult(detail) === "pass";

            return (
              <div
                key={detail}
                className={`rounded-2xl border p-4 text-sm leading-6 shadow-sm ${
                  isPass
                    ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                    : "border-rose-200 bg-rose-50/70 text-rose-950"
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                      isPass ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isPass ? "Pass" : "Fail"}
                  </span>
                </div>
                <p>{detail}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function SectionExpandedPanel({ section }: { section: DetailSection }) {
  const cfg = panelConfigs[section.id];
  if (!cfg) return <DefaultExpandedPanel section={section} />;
  const leadBlock = cfg.creativeAds ? (
    <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-900">{cfg.leadTitle}</p>
          <p className="mt-1 text-sm text-zinc-500">{cfg.leadSubtitle}</p>
        </div>
        <Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>
          {cfg.badge}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cfg.creativeAds.map((ad) => (
          <CreativeAdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  ) : cfg.leadCards ? (
    <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-900">{cfg.leadTitle}</p>
          <p className="mt-1 text-sm text-zinc-500">{cfg.leadSubtitle}</p>
        </div>
        <Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>
          {cfg.badge}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cfg.leadCards.map((card) => (
          <SignalCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  ) : cfg.insights && cfg.insightIcon ? (
    <InsightList
      title={cfg.insightTitle || cfg.leadTitle}
      subtitle={cfg.insightSubtitle || cfg.leadSubtitle}
      points={cfg.insights}
      icon={cfg.insightIcon}
      color={section.color}
    />
  ) : null;
  const breakdownBlock =
    cfg.breakdown && cfg.breakdownTitle && cfg.breakdownSubtitle ? (
      <BreakdownBars
        items={cfg.breakdown}
        color={section.color}
        light={section.light}
        title={cfg.breakdownTitle}
        subtitle={cfg.breakdownSubtitle}
      />
    ) : null;
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {leadBlock}
        {breakdownBlock}
      </div>
      {cfg.insights && cfg.insightIcon && (cfg.leadCards || cfg.creativeAds) ? (
        <div className="space-y-4">
          <InsightList
            title={cfg.insightTitle || "Insights"}
            subtitle={cfg.insightSubtitle || ""}
            points={cfg.insights}
            icon={cfg.insightIcon}
            color={section.color}
          />
          <DefaultExpandedPanel section={section} />
        </div>
      ) : (
        <DefaultExpandedPanel section={section} />
      )}
    </div>
  );
}

type RadarMouseState = { activeLabel?: string };

function RadarRollup({
  sections: sectionList,
  hovered,
  setHovered,
  onSelect,
}: {
  sections: DetailSection[];
  hovered: DetailSection;
  setHovered: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const data: RadarDatum[] = sectionList.map((s) => ({
    id: s.id,
    subject: s.shortTitle,
    title: s.title,
    current: s.score,
    projected: s.projected,
    color: s.color,
    light: s.light,
  }));
  return (
    <Card className="overflow-hidden rounded-[28px] border-zinc-200 shadow-sm">
      <CardHeader className="px-6 pb-2 pt-5 sm:px-7 sm:pt-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CardTitle className="text-xl">How the overall score rolls up</CardTitle>
            <p className="mt-1 text-sm text-zinc-500">
              Hover the shape to explore each scoring dimension and compare current performance with Channel Factory
              upside.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-600">
              Current account shape
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-zinc-600">
              Projected opportunity envelope
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-zinc-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,1),_rgba(244,244,245,0.9)_45%,_rgba(255,255,255,1)_100%)] p-4 sm:p-8">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${hovered.color}20` }}
            />
            <div className="relative mx-auto h-[420px] max-w-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={data}
                  outerRadius="72%"
                  onMouseMove={(state: RadarMouseState) => {
                    const match = sectionList.find((s) => s.shortTitle === state?.activeLabel);
                    if (match) setHovered(match.id);
                  }}
                  onMouseLeave={() => setHovered("impact")}
                  onClick={(state: RadarMouseState) => {
                    const match = sectionList.find((s) => s.shortTitle === state?.activeLabel);
                    if (match) onSelect(match.id);
                  }}
                >
                  <defs>
                    <linearGradient id="projectedFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#dbeafe" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#e2e8f0" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="currentFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={hovered.color} stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#111827" stopOpacity={0.18} />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="#d4d4d8" radialLines />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#71717a" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip content={<RadarTooltip />} />
                  <Radar
                    name="Projected"
                    dataKey="projected"
                    stroke="#cbd5e1"
                    fill="url(#projectedFill)"
                    fillOpacity={0.75}
                    strokeWidth={1.5}
                  />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke={hovered.color}
                    fill="url(#currentFill)"
                    fillOpacity={0.95}
                    strokeWidth={2.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-[32px] border border-zinc-100 bg-white p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: hovered.color }} />
                <p className="text-sm font-medium text-zinc-500">Hovered dimension</p>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-900">{hovered.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{hovered.summary}</p>
            </div>
            <div className="grid gap-3">
              <MetricTile label="Current score" value={hovered.score} />
              <MetricTile label="Projected score" value={hovered.projected} />
              <div className="rounded-3xl p-4" style={{ backgroundColor: hovered.light }}>
                <div className="text-xs uppercase tracking-[0.16em]" style={{ color: hovered.color }}>
                  Potential uplift
                </div>
                <div className="mt-2 text-3xl font-semibold" style={{ color: hovered.color }}>
                  +{hovered.projected - hovered.score}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelect(hovered.id)}
                className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-100"
              >
                {hovered.id === "impact" ? "Return to the Impact lead section" : `Jump to ${hovered.title} details`}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [selected, setSelected] = useState("targeting");
  const [hoveredAxis, setHoveredAxis] = useState("impact");
  const detailSectionRef = useRef<HTMLDivElement | null>(null);
  const valid = validateSections(sections);
  const safeSections = valid ? sections : [];
  const impact = safeSections.find((s) => s.id === "impact") || sections[0];
  const secondary = safeSections.filter((s) => s.id !== "impact");
  const selectedSection = secondary.find((s) => s.id === selected) || secondary[0] || impact;
  const hovered = safeSections.find((s) => s.id === hoveredAxis) || impact;
  const biggestGap = [...safeSections].sort(
    (a, b) => b.projected - b.score - (a.projected - a.score)
  )[0];

  const handleRadarSelect = (id: string) => {
    setHoveredAxis(id);

    if (id === "impact") {
      document.getElementById("impact-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSelected(id);
    requestAnimationFrame(() => {
      detailSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (!valid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6 text-zinc-900">
        <Card className="w-full max-w-xl rounded-[28px] border-zinc-200 shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold">Unable to render audit mock</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              The section configuration is incomplete. Check the score data structure and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100">
                  Meta Performance Audit
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Interactive mock
                </Badge>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">Channel Factory Meta Audit Scorecard</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                A client-facing mock that rolls up the supporting account diagnostics into an overall score while
                placing Impact front and center as the lead story.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200 px-4 py-3 text-sm text-zinc-600">
              Top gap: <span className="font-medium text-zinc-900">{biggestGap?.title || "N/A"}</span>
            </div>
          </div>
        </div>
        <div id="impact-hero">
          <ImpactHero item={impact} />
        </div>
        <div className="space-y-6">
          <RadarRollup
            sections={safeSections}
            hovered={hovered}
            setHovered={setHoveredAxis}
            onSelect={handleRadarSelect}
          />
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-5">
            {secondary.map((item) => (
              <div key={item.id} className="h-full min-h-[265px]">
                <ScoreCard item={item} active={selected === item.id} onClick={() => setSelected(item.id)} />
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSection.id}
              ref={detailSectionRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <Card className="overflow-hidden rounded-[28px] border-zinc-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedSection.color }} />
                        <p className="text-sm font-medium text-zinc-500">Selected audit area</p>
                      </div>
                      <CardTitle className="mt-3 text-xl">{selectedSection.title}</CardTitle>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{selectedSection.summary}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 lg:min-w-[340px]">
                      <MetricTile label="Current" value={selectedSection.score} />
                      <MetricTile label="Projected" value={selectedSection.projected} />
                      <div
                        className="rounded-3xl p-4 shadow-sm"
                        style={{ backgroundColor: selectedSection.light }}
                      >
                        <div
                          className="text-[11px] uppercase tracking-[0.16em]"
                          style={{ color: selectedSection.color }}
                        >
                          Uplift
                        </div>
                        <div
                          className="mt-2 text-2xl font-semibold"
                          style={{ color: selectedSection.color }}
                        >
                          +{selectedSection.projected - selectedSection.score}
                        </div>
                        <div
                          className="mt-2 h-1.5 rounded-full"
                          style={{ backgroundColor: selectedSection.color }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <SectionExpandedPanel section={selectedSection} />
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="h-full rounded-[28px] border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">What we would fix first</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  Prioritized actions ranked by score impact and implementation feasibility.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {fixes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-zinc-200 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-zinc-100 p-2">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-zinc-600">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="h-full rounded-[28px] border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Improvement opportunity by pillar</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  Largest score delta identifies where the audit should focus first.
                </p>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={actionData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis type="number" tick={{ fill: "#71717a", fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={85} tick={{ fill: "#71717a", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                      {actionData.map((entry, i) => (
                        <Cell key={entry.name} fill={barFillColors[i % barFillColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
