import React, { useMemo, useState } from "react";

function Card(props) {
  return <div {...props} />;
}

function CardHeader(props) {
  return <div {...props} />;
}

function CardTitle(props) {
  return <h3 {...props} />;
}

function CardContent(props) {
  return <div {...props} />;
}

function Badge({ variant: _variant, ...props }) {
  return <span {...props} />;
}

const sections = [
  { id: "impact", title: "Impact", shortTitle: "Impact", score: 68, projected: 83, weight: 0.25, color: "#e11d48", light: "#ffe4e6", summary: "Measures impacted users generated from past Meta activity, and the uplift CF products can unlock." },
  { id: "targeting", title: "Targeting Strategy", shortTitle: "Targeting", score: 61, projected: 78, weight: 0.15, color: "#0ea5e9", light: "#e0f2fe", summary: "Evaluates how well targeting strategy supports contextual scale, prospecting quality, retargeting depth, and first-party audience design.", details: ["Over-reliance on narrow audience targeting", "Over-fragmented audience strategy", "Audience overlap between ad sets", "Missing exclusion logic across audiences", "Weak or inconsistent use of broad targeting", "Poor Lookalike Audience strategy", "Weak custom audience strategy", "Retargeting strategy lacks depth or recency logic", "Prospecting strategy relies too heavily on outdated interest logic", "No clear relationship between audience type and funnel stage", "Limited use of first-party data", "No value-based audience strategy where relevant", "Inconsistent audience testing framework", "Weak acquisition vs existing-customer separation", "Retargeting pool quality is weak", "Audience size is mismatched to budget or objective", "Customer journey coverage is incomplete"] },
  { id: "structure", title: "Campaign / Ad Set Structure", shortTitle: "Structure", score: 57, projected: 74, weight: 0.15, color: "#6366f1", light: "#e0e7ff", summary: "Measures structural efficiency, learning stability, budget concentration, and unnecessary segmentation.", details: ["Too many campaigns doing the same job", "Campaign objective misalignment", "Over-segmentation at campaign level", "Under-segmentation where control is needed", "Too many ad sets per campaign", "Ad sets with budgets too low for their setup", "Inconsistent use of CBO vs ABO", "Testing structure mixed with scaling structure", "Legacy or redundant ad sets still active", "Funnel stages not structurally separated", "Placement/device segmentation without evidence", "Ad set segmentation based on too many variables at once", "Advantage+ usage"] },
  { id: "creative", title: "Creative Strategies", shortTitle: "Creative", score: 64, projected: 81, weight: 0.15, color: "#8b5cf6", light: "#f3e8ff", summary: "Evaluates creative diversity, fatigue, placement fit, format mix, and winner/loser rotation discipline.", details: ["Limited creative mix", "Insufficient creative variation", "Weak format strategy (image, video, collection, carousel)", "Static vs video balance", "Weak hook strategy", "Messaging angles are too narrow", "Copy and text strategy is underdeveloped", "Creative strategy is too asset-led, not concept-led", "Little alignment between creative and funnel stage", "Weak refresh cadence", "Low creative testing discipline", "Little use of social proof / credibility assets", "Brand and performance messaging are not balanced well", "No clear creative winners identified or scaled", "Best-performing ads are concentrated too narrowly", "CTA strategy is repetitive or weak", "Creative built for one product, offer, or audience only", "Advantage+ usage"] },
  { id: "optimization", title: "Optimization Strategies", shortTitle: "Optimization", score: 59, projected: 77, weight: 0.15, color: "#f59e0b", light: "#fef3c7", summary: "Assesses bid strategy fit, pacing, budget changes, placement logic, and rule-based optimization discipline.", details: ["Optimization event is too low in the funnel for available volume", "Optimization event is too high in the funnel", "Optimization event selection is inconsistent across similar campaigns", "No clear optimisation pathway or maturity model", "Too many ad sets/campaigns for the available signal", "Learning phase issues are persistent", "Too many changes made too often - reset learning", "Bid strategy is misaligned with account conditions", "Cost cap or bid cap targets do not reflect reality", "Budget strategy does not support optimization", "Attribution thinking is weak or inconsistent", "Placements are constrained in a way that hurts optimization", "No value-based optimization logic where relevant", "Weak scaling logic", "No clear optimization hierarchy", "Limited buyer involvement / weak hands-on optimization", "Optimization decisions appear reactive rather than strategic", "Structural optimisation is not ongoing"] },
  { id: "measurement", title: "Measurement", shortTitle: "Measurement", score: 54, projected: 79, weight: 0.15, color: "#10b981", light: "#d1fae5", summary: "Covers pixel health, CAPI, event structure, optimization-event readiness, and signal completeness.", details: ["Pixel implementation appears incomplete or inconsistent", "Pixel health appears weak", "Key conversion events are missing", "Event setup is too shallow or too generic", "Events may be firing inaccurately", "Event prioritization is weak or unclear", "Custom conversions are missing or underused", "Custom conversions exist, but the logic is weak", "CAPI is missing or not fully implemented", "CAPI is implemented, but deduplication may be weak", "Event Match Quality is weak", "Value parameters are missing or unreliable", "Limited lead-quality or revenue-quality measurement", "Funnel visibility is incomplete", "Domain / web environment complexity is not fully covered", "Offline or CRM feedback loop is missing", "Audience-building measurement is weak", "Reporting logic is too dependent on Meta-only data"] },
];

const actionData = [
  { name: "Measurement", value: 25 },
  { name: "Structure", value: 19 },
  { name: "Optimization", value: 18 },
  { name: "Targeting", value: 17 },
  { name: "Creative", value: 12 },
  { name: "Impact", value: 9 },
];

const creativeAds = [
  { id: "ad-1", title: "UGC Reel - product demo", format: "Video / Reels", result: "Worked", score: 84, metric: "1.9x CTR vs avg", insight: "Fast product demonstration, native framing, and direct value hook drove stronger thumb-stop and lower CPA." },
  { id: "ad-2", title: "Founder story cutdown", format: "Video / Stories", result: "Worked", score: 79, metric: "+24% CVR", insight: "Credibility-led narrative and proof points connected well with mid-funnel retargeting audiences." },
  { id: "ad-3", title: "Studio static product tile", format: "Static / Feed", result: "Did not work", score: 46, metric: "-31% CTR", insight: "Too polished and product-led; weak hook and low contextual relevance compared with looser creator formats." },
  { id: "ad-4", title: "Offer carousel", format: "Carousel / Feed", result: "Mixed", score: 58, metric: "+8% ATC", insight: "Useful for browsing behavior but lacked a strong first-card hook and clear hierarchy across frames." },
];

const breakdowns = {
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

const panelConfigs = {
  targeting: {
    badge: "Contextual opportunity",
    leadTitle: "Targeting strategy story",
    leadSubtitle: "Frame where the account is too narrow, too fragmented, and where contextual targeting can lift impact.",
    leadCards: [
      { title: "Current targeting bias", metric: "Interest-led / narrow audience heavy", insight: "The account relies too much on narrow interest and layered audience logic, which limits scale and increases overlap across active ad sets.", tone: "#ef4444", bg: "#fef2f2", icon: "◎" },
      { title: "Recommended direction", metric: "Contextual + broad + cleaner exclusions", insight: "Use contextual targeting as the primary performance unlock, supported by broader prospecting, cleaner exclusions, and stronger first-party audience structure.", tone: "#0ea5e9", bg: "#e0f2fe", icon: "🎯" },
    ],
    insightTitle: "What is driving weakness",
    insightSubtitle: "The audit should surface the most important targeting issues in a way that ties directly to CF value.",
    insights: [
      "Contextual targeting is the clearest lever for increasing impact without adding more audience fragmentation.",
      "Broad and contextual audiences appear more scalable than narrow interest stacks at the current spend level.",
      "Retargeting lacks enough recency segmentation and exclusion logic to protect efficiency as budget scales.",
      "First-party and value-based audience logic is underdeveloped relative to the account's maturity needs.",
    ],
    insightIcon: "📈",
    breakdownTitle: "Audience type breakdown",
    breakdownSubtitle: "Current effectiveness by audience type with projected upside shown as the lighter extension.",
    breakdown: breakdowns.targeting,
  },
  structure: {
    badge: "Structural redesign",
    leadTitle: "Structure simplification",
    leadSubtitle: "Show why the current account shape is inefficient and what the cleaner operating model should look like.",
    leadCards: [
      { title: "Current structure issue", metric: "18 active ad sets across overlapping goals", insight: "Too many entities are trying to do the same job, which weakens signal concentration and slows learning.", tone: "#6366f1", bg: "#eef2ff", icon: "📚" },
      { title: "Recommended simplification", metric: "6-8 higher-volume ad sets", insight: "Move testing into clearer lanes, separate scaling from experimentation, and consolidate low-budget duplication.", tone: "#10b981", bg: "#ecfdf5", icon: "✂️" },
    ],
    breakdownTitle: "Structure health breakdown",
    breakdownSubtitle: "Where the account loses efficiency today and where simplification would unlock the biggest gains.",
    breakdown: breakdowns.structure,
  },
  creative: {
    badge: "4 mock ad reads",
    leadTitle: "Best performing ads",
    leadSubtitle: "Show the creative story, what worked, and what did not work in a more presentation-ready way.",
    creativeAds,
    insightTitle: "What is driving performance",
    insightSubtitle: "Use this space to explain what is actually working in the creative system.",
    insights: [
      "UGC-style video is outperforming static creative on thumb-stop and CTR.",
      "Hooks that land value in the first 2 seconds are the strongest driver of lift.",
      "Credibility assets and proof-led messaging outperform polished product-only visuals.",
      "Static feed creative is underperforming due to weak concept variation and repetitive CTA structure.",
    ],
    insightIcon: "⚡",
    breakdownTitle: "Creative format breakdown",
    breakdownSubtitle: "Current score by format with modeled upside shown as a lighter extension.",
    breakdown: breakdowns.creative,
  },
  optimization: {
    badge: "Optimization read",
    leadTitle: "Optimization maturity read",
    leadSubtitle: "Highlight where optimization behavior is preventing the account from stabilizing and scaling.",
    insightTitle: "Optimization maturity read",
    insightSubtitle: "Highlight where optimization behavior is preventing the account from stabilizing and scaling.",
    insights: [
      "Learning is being reset too often by frequent budget and structural changes.",
      "Optimization events are not always aligned to the deepest stable signal available in the account.",
      "Bid and budget logic appears reactive rather than laddered through a clear maturity path.",
      "Placement constraints are reducing optimization flexibility where the data does not justify heavy restriction.",
    ],
    insightIcon: "🔄",
    breakdownTitle: "Optimization breakdown",
    breakdownSubtitle: "Current optimization readiness by lever, with projected headroom if the operating model is improved.",
    breakdown: breakdowns.optimization,
  },
  measurement: {
    badge: "Signal resilience",
    leadTitle: "Measurement readiness",
    leadSubtitle: "Present the measurement stack as a health check, not just a list of missing items.",
    leadCards: [
      { title: "Signal coverage", metric: "LPV, Lead, ATC present / Purchase inconsistent", insight: "Core event coverage exists, but lower-funnel signal depth is incomplete for stronger optimization and reporting confidence.", tone: "#10b981", bg: "#ecfdf5", icon: "📊" },
      { title: "Implementation risk", metric: "CAPI partial / deduplication weak", insight: "Measurement resilience improves meaningfully once server-side coverage and stronger deduplication logic are in place.", tone: "#f59e0b", bg: "#fffbeb", icon: "🛡" },
    ],
    breakdownTitle: "Measurement breakdown",
    breakdownSubtitle: "Current implementation health and projected upside once signal coverage and quality are improved.",
    breakdown: breakdowns.measurement,
  },
};

const fixes = [
  { title: "Strengthen measurement stack", text: "Complete Pixel + CAPI coverage, validate event hierarchy, and align optimization events to the deepest stable signal.", icon: "⚠️" },
  { title: "Reduce structural fragmentation", text: "Consolidate overlapping ad sets and remove low-volume segmentation that suppresses learning efficiency.", icon: "🎯" },
  { title: "Open up optimization guardrails", text: "Use smoother budget and bid changes, and expand Advantage+ placements unless the data clearly supports restrictions.", icon: "✨" },
];

function validateSections(items) {
  return items.every((item) => typeof item.id === "string" && typeof item.title === "string" && typeof item.score === "number" && typeof item.projected === "number" && typeof item.weight === "number");
}

function MetricTile({ label, value }) {
  return <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"><div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</div><div className="mt-2 text-2xl font-semibold text-zinc-900">{value}</div></div>;
}

function SignalCard({ title, metric, insight, tone, bg, icon }) {
  return <div className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-zinc-900">{title}</p><p className="mt-1 text-sm" style={{ color: tone }}>{metric}</p></div><div className="rounded-2xl p-2 text-xl leading-none" style={{ backgroundColor: bg, color: tone }} aria-hidden>{icon}</div></div><p className="mt-4 text-sm leading-6 text-zinc-600">{insight}</p></div>;
}

function BreakdownBars({ items, color, light, title, subtitle }) {
  return <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><span className="text-base" style={{ color }} aria-hidden>📊</span><p className="text-sm font-medium text-zinc-900">{title}</p></div><p className="mt-1 text-sm text-zinc-500">{subtitle}</p><div className="mt-5 space-y-4">{items.map((item) => <div key={item.name}><div className="mb-2 flex items-center justify-between text-sm"><span className="text-zinc-600">{item.name}</span><span className="font-medium text-zinc-900">{item.score} <span className="text-zinc-400">→</span> {item.score + item.uplift}</span></div><div className="relative h-3 overflow-hidden rounded-full bg-zinc-100"><div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${item.score}%`, backgroundColor: color }} /><div className="absolute inset-y-0 rounded-full" style={{ left: `${item.score}%`, width: `${item.uplift}%`, backgroundColor: light }} /></div></div>)}</div></div>;
}

function InsightList({ title, subtitle, points, icon, color }) {
  return <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><span className="text-base leading-none" style={{ color }} aria-hidden>{icon}</span><p className="text-sm font-medium text-zinc-900">{title}</p></div><p className="mt-1 text-sm text-zinc-500">{subtitle}</p><div className="mt-4 grid gap-3">{points.map((point) => <div key={point} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">{point}</div>)}</div></div>;
}

function CreativeAdCard({ ad }) {
  const tone = ad.result === "Worked" ? "#10b981" : ad.result === "Mixed" ? "#f59e0b" : "#ef4444";
  const bg = ad.result === "Worked" ? "#ecfdf5" : ad.result === "Mixed" ? "#fffbeb" : "#fef2f2";
  return <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm"><div className="relative h-40 overflow-hidden border-b border-zinc-100 bg-zinc-100"><div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-200" /><div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">{ad.format}</div><div className="absolute inset-0 flex items-center justify-center">{ad.format.toLowerCase().includes("video") ? <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-2xl shadow-lg" aria-hidden>▶️</div> : <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-2xl shadow-lg" aria-hidden>🖼</div>}</div></div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-zinc-900">{ad.title}</p><p className="mt-1 text-sm text-zinc-500">{ad.metric}</p></div><div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: bg, color: tone }}>{ad.result}</div></div><p className="mt-3 text-sm leading-6 text-zinc-600">{ad.insight}</p><div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3"><span className="text-sm text-zinc-500">Creative quality score</span><span className="font-semibold" style={{ color: tone }}>{ad.score}/100</span></div></div></div>;
}

function ScoreCard({ item, active, onClick }) {
  const delta = item.projected - item.score;
  return <button type="button" onClick={onClick} className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border p-4 text-left shadow-sm transition-all hover:-translate-y-1 active:scale-[0.995] ${active ? "bg-white shadow-lg" : "border-zinc-200 bg-white/90 hover:border-zinc-300"}`} style={active ? { borderColor: item.color, boxShadow: `0 12px 34px ${item.color}1f` } : undefined}><div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full blur-2xl transition-opacity" style={{ backgroundColor: `${item.color}18`, opacity: active ? 1 : 0.35 }} /><div className="relative flex items-start justify-between gap-3"><div><p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.title}</p><div className="mt-2 flex items-end gap-2"><span className="text-3xl font-semibold text-zinc-900">{item.score}</span><span className="pb-1 text-sm text-zinc-500">/ 100</span></div></div><Badge className={`rounded-full border-0 px-3 py-1 ${active ? "text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"}`} style={active ? { backgroundColor: item.color } : undefined}>+{delta}</Badge></div><p className="relative mt-4 text-sm leading-6 text-zinc-600">{item.summary}</p><div className="relative mt-auto pt-5"><div className="mb-2 flex items-center justify-between text-sm"><span className="text-zinc-500">Projected opportunity</span><span className="font-medium" style={{ color: active ? item.color : "#18181b" }}>{item.projected}/100</span></div><div className="group/progress relative"><div className="relative h-3 overflow-hidden rounded-full bg-zinc-100"><div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${item.score}%`, backgroundColor: active ? item.color : "#d4d4d8" }} /><div className="absolute inset-y-0 rounded-full opacity-95" style={{ left: `${item.score}%`, width: `${Math.max(item.projected - item.score, 0)}%`, backgroundColor: active ? item.light : "#e9d5ff" }} /></div><div className="pointer-events-none absolute -top-14 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg group-hover/progress:block"><div className="font-medium text-zinc-900">{item.score} current <span className="text-zinc-400">→</span> {item.projected} projected</div><div className="mt-0.5" style={{ color: item.color }}>+{delta} potential uplift</div></div></div></div></button>;
}

function ImpactHero({ item, overallScore, projectedOverall }) {
  const delta = item.projected - item.score;
  return <Card className="rounded-[32px] border-zinc-200 shadow-sm"><CardContent className="p-7"><div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between"><div className="max-w-3xl"><div className="flex items-center gap-3"><Badge className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100">Impact score</Badge><Badge variant="outline" className="rounded-full">Primary value driver</Badge></div><h2 className="mt-4 text-4xl font-semibold tracking-tight">Highlight the impact Channel Factory can create</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">This lead module brings the proprietary impact score above the rest of the audit so it becomes the headline story: current impact from historical Meta activity, projected impact with Channel Factory products, and the account score that supports that uplift.</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><MetricTile label="Current impact" value={item.score} /><MetricTile label="Projected impact" value={item.projected} /><div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm"><div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Impact delta</div><div className="mt-2 text-2xl font-semibold text-emerald-600">+{delta}</div><div className="mt-1 text-sm text-zinc-500">Modeled uplift opportunity</div></div></div></div><div className="grid w-full gap-4 sm:grid-cols-3 xl:max-w-xl"><MetricTile label="Overall score" value={overallScore} /><MetricTile label="Projected score" value={projectedOverall} /><div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"><div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Headroom</div><div className="mt-2 text-2xl font-semibold text-zinc-900">+{projectedOverall - overallScore}</div></div></div></div></CardContent></Card>;
}

function DefaultExpandedPanel({ section }) {
  return <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5"><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-medium text-zinc-900">What we would assess in this area</p><p className="mt-1 text-sm text-zinc-500">These are the diagnostic themes the audit can expand on when this score is selected.</p></div><Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>{section.details?.length || 0} diagnostic checks</Badge></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{(section.details || []).map((d) => <div key={d} className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 shadow-sm">{d}</div>)}</div></div>;
}

function SectionExpandedPanel({ section }) {
  const cfg = panelConfigs[section.id];
  if (!cfg) return <DefaultExpandedPanel section={section} />;
  const leadBlock = cfg.creativeAds ? <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5"><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-medium text-zinc-900">{cfg.leadTitle}</p><p className="mt-1 text-sm text-zinc-500">{cfg.leadSubtitle}</p></div><Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>{cfg.badge}</Badge></div><div className="grid gap-4 md:grid-cols-2">{cfg.creativeAds.map((ad) => <CreativeAdCard key={ad.id} ad={ad} />)}</div></div> : cfg.leadCards ? <div className="rounded-[28px] border border-zinc-100 bg-zinc-50/70 p-5"><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-medium text-zinc-900">{cfg.leadTitle}</p><p className="mt-1 text-sm text-zinc-500">{cfg.leadSubtitle}</p></div><Badge className="rounded-full border-0 text-white" style={{ backgroundColor: section.color }}>{cfg.badge}</Badge></div><div className="grid gap-4 md:grid-cols-2">{cfg.leadCards.map((card) => <SignalCard key={card.title} {...card} />)}</div></div> : cfg.insights && cfg.insightIcon ? <InsightList title={cfg.insightTitle || cfg.leadTitle} subtitle={cfg.insightSubtitle || cfg.leadSubtitle} points={cfg.insights} icon={cfg.insightIcon} color={section.color} /> : null;
  const breakdownBlock = cfg.breakdown && cfg.breakdownTitle && cfg.breakdownSubtitle ? <BreakdownBars items={cfg.breakdown} color={section.color} light={section.light} title={cfg.breakdownTitle} subtitle={cfg.breakdownSubtitle} /> : null;
  return <div className="space-y-5"><div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">{leadBlock}{breakdownBlock}</div>{cfg.insights && cfg.insightIcon && (cfg.leadCards || cfg.creativeAds) ? <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]"><InsightList title={cfg.insightTitle || "Insights"} subtitle={cfg.insightSubtitle || ""} points={cfg.insights} icon={cfg.insightIcon} color={section.color} /><DefaultExpandedPanel section={section} /></div> : <DefaultExpandedPanel section={section} />}</div>;
}

function RadarRollup({ sections, hovered, setHovered }) {
  return <Card className="overflow-hidden rounded-[28px] border-zinc-200 shadow-sm"><CardHeader className="pb-2"><div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><CardTitle className="text-xl">How the overall score rolls up</CardTitle><p className="mt-1 text-sm text-zinc-500">Hover a row to explore each scoring dimension and compare current performance with Channel Factory upside.</p></div><div className="flex flex-wrap gap-2 text-xs"><div className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-600">Solid bar = current</div><div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-zinc-600">Light segment = uplift</div></div></div></CardHeader><CardContent><div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><div className="relative max-h-[420px] space-y-2 overflow-y-auto rounded-[32px] border border-zinc-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,1),_rgba(244,244,245,0.9)_45%,_rgba(255,255,255,1)_100%)] p-4 sm:p-6"><div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ backgroundColor: `${hovered.color}18` }} />{sections.map((s) => <button key={s.id} type="button" onMouseEnter={() => setHovered(s.id)} onFocus={() => setHovered(s.id)} className={`relative w-full rounded-2xl border px-4 py-3 text-left transition-colors ${hovered.id === s.id ? "border-zinc-300 bg-white shadow-sm" : "border-transparent bg-white/60 hover:bg-white/90"}`}><div className="flex items-center justify-between gap-2 text-sm"><span className="font-medium text-zinc-900">{s.shortTitle}</span><span className="shrink-0 text-zinc-500">{s.score} <span className="text-zinc-400">→</span> {s.projected}</span></div><div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-100"><div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${s.score}%`, backgroundColor: s.color }} /><div className="absolute inset-y-0 rounded-full opacity-90" style={{ left: `${s.score}%`, width: `${Math.max(s.projected - s.score, 0)}%`, backgroundColor: s.light }} /></div></button>)}</div><div className="flex flex-col justify-between gap-4 rounded-[32px] border border-zinc-100 bg-white p-5 shadow-sm"><div><div className="flex items-center gap-3"><div className="h-3 w-3 rounded-full" style={{ backgroundColor: hovered.color }} /><p className="text-sm font-medium text-zinc-500">Focused dimension</p></div><h3 className="mt-3 text-2xl font-semibold text-zinc-900">{hovered.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{hovered.summary}</p></div><div className="grid gap-3"><MetricTile label="Current score" value={hovered.score} /><MetricTile label="Projected score" value={hovered.projected} /><div className="rounded-3xl p-4" style={{ backgroundColor: hovered.light }}><div className="text-xs uppercase tracking-[0.16em]" style={{ color: hovered.color }}>Potential uplift</div><div className="mt-2 text-3xl font-semibold" style={{ color: hovered.color }}>+{hovered.projected - hovered.score}</div></div></div></div></div></CardContent></Card>;
}

const pillarBarColors = ["#10b981", "#6366f1", "#f59e0b", "#0ea5e9", "#8b5cf6", "#e11d48"];

function PillarOpportunityBars({ rows }) {
  const maxVal = Math.max(...rows.map((r) => r.value), 1);
  return <div className="flex h-72 flex-col justify-center space-y-3 pr-1">{rows.map((entry, i) => <div key={entry.name}><div className="mb-1 flex items-center justify-between text-sm"><span className="text-zinc-700">{entry.name}</span><span className="font-medium tabular-nums text-zinc-900">{entry.value}</span></div><div className="h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full transition-[width]" style={{ width: `${(entry.value / maxVal) * 100}%`, backgroundColor: pillarBarColors[i % pillarBarColors.length] }} /></div></div>)}</div>;
}

function App() {
  const [selected, setSelected] = useState("targeting");
  const [hoveredAxis, setHoveredAxis] = useState("impact");
  const valid = validateSections(sections);
  const safeSections = valid ? sections : [];
  const impact = safeSections.find((s) => s.id === "impact") || sections[0];
  const secondary = safeSections.filter((s) => s.id !== "impact");
  const selectedSection = secondary.find((s) => s.id === selected) || secondary[0] || impact;
  const hovered = safeSections.find((s) => s.id === hoveredAxis) || impact;
  const overallScore = useMemo(() => Math.round(safeSections.reduce((a, s) => a + s.score * s.weight, 0)), [safeSections]);
  const projectedOverall = useMemo(() => Math.round(safeSections.reduce((a, s) => a + s.projected * s.weight, 0)), [safeSections]);
  const biggestGap = [...safeSections].sort((a, b) => b.projected - b.score - (a.projected - a.score))[0];

  if (!valid) {
    return <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6 text-zinc-900"><Card className="w-full max-w-xl rounded-[28px] border-zinc-200 shadow-sm"><CardContent className="p-8"><h1 className="text-2xl font-semibold">Unable to render audit mock</h1><p className="mt-3 text-sm leading-6 text-zinc-600">The section configuration is incomplete. Check the score data structure and try again.</p></CardContent></Card></div>;
  }

  return <div className="min-h-screen bg-zinc-50 p-6 text-zinc-900"><div className="mx-auto max-w-7xl space-y-6"><div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex items-center gap-3"><Badge className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100">Meta Performance Audit</Badge><Badge variant="outline" className="rounded-full">Interactive mock</Badge></div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Channel Factory Meta Audit Scorecard</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">A client-facing mock that rolls up the supporting account diagnostics into an overall score while placing Impact front and center as the lead story.</p></div><div className="rounded-3xl border border-zinc-200 px-4 py-3 text-sm text-zinc-600">Top gap: <span className="font-medium text-zinc-900">{biggestGap?.title || "N/A"}</span></div></div></div><ImpactHero item={impact} overallScore={overallScore} projectedOverall={projectedOverall} /><div className="space-y-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 auto-rows-fr">{secondary.map((item) => <div key={item.id} className="h-full min-h-[265px]"><ScoreCard item={item} active={selected === item.id} onClick={() => setSelected(item.id)} /></div>)}</div><div key={selectedSection.id}><Card className="overflow-hidden rounded-[28px] border-zinc-200 shadow-sm"><CardHeader className="pb-3"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><div className="flex items-center gap-3"><div className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedSection.color }} /><p className="text-sm font-medium text-zinc-500">Selected audit area</p></div><CardTitle className="mt-3 text-xl">{selectedSection.title}</CardTitle><p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{selectedSection.summary}</p></div><div className="grid grid-cols-3 gap-3 lg:min-w-[340px]"><MetricTile label="Current" value={selectedSection.score} /><MetricTile label="Projected" value={selectedSection.projected} /><div className="rounded-3xl p-4 shadow-sm" style={{ backgroundColor: selectedSection.light }}><div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: selectedSection.color }}>Uplift</div><div className="mt-2 text-2xl font-semibold" style={{ color: selectedSection.color }}>+{selectedSection.projected - selectedSection.score}</div><div className="mt-2 h-1.5 rounded-full" style={{ backgroundColor: selectedSection.color }} /></div></div></div></CardHeader><CardContent><SectionExpandedPanel section={selectedSection} /></CardContent></Card></div><RadarRollup sections={safeSections} hovered={hovered} setHovered={setHoveredAxis} /><div className="grid gap-6 lg:grid-cols-2"><Card className="rounded-[28px] border-zinc-200 shadow-sm h-full"><CardHeader><CardTitle className="text-xl">What we would fix first</CardTitle><p className="mt-1 text-sm text-zinc-500">Prioritized actions ranked by score impact and implementation feasibility.</p></CardHeader><CardContent className="space-y-3">{fixes.map((item) => <div key={item.title} className="rounded-2xl border border-zinc-200 p-4"><div className="flex items-start gap-3"><div className="rounded-2xl bg-zinc-100 p-2 text-xl leading-none" aria-hidden>{item.icon}</div><div><p className="font-medium text-zinc-900">{item.title}</p><p className="mt-1 text-sm leading-6 text-zinc-600">{item.text}</p></div></div></div>)}</CardContent></Card><Card className="rounded-[28px] border-zinc-200 shadow-sm h-full"><CardHeader><CardTitle className="text-xl">Improvement opportunity by pillar</CardTitle><p className="mt-1 text-sm text-zinc-500">Largest score delta identifies where the audit should focus first.</p></CardHeader><CardContent className="h-72"><PillarOpportunityBars rows={actionData} /></CardContent></Card></div></div></div></div>;
}
