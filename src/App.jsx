import { useState } from "react";

// ── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f7f4",
  surface: "#ffffff",
  border: "#e5e2dc",
  yay: "#16a34a",
  yayBg: "#f0fdf4",
  yayBorder: "#bbf7d0",
  committee: "#d97706",
  committeeBg: "#fffbeb",
  committeeBorder: "#fde68a",
  nay: "#dc2626",
  nayBg: "#fef2f2",
  nayBorder: "#fecaca",
  palisades: "#2563eb",
  muted: "#6b7280",
  faint: "#9ca3af",
};

const T = {
  heading: "#111827",
  body: "#374151",
  sub: "#6b7280",
  faint: "#9ca3af",
};

// ── COUNCIL DATA ─────────────────────────────────────────────────────────────
const MEMBERS = [
  {
    id: "d1", district: 1, name: "Eunisses Hernandez",
    neighborhoods: "Lincoln Heights · Boyle Heights · Echo Park · Koreatown",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Progressive climate advocate — among the strongest voices on environmental justice in the council. Distant from Palisades but supportive of climate resilience tools in principle. Likely to come around if general fund concerns are addressed.",
    concern: "City budget deficit; wants equity lens on who benefits.",
    x: 310, y: 165,
  },
  {
    id: "d2", district: 2, name: "Adrin Nazarian",
    neighborhoods: "North Hollywood · Studio City · Van Nuys · Valley Village · Toluca Lake",
    vote: "yay",
    voteLabel: "✓ YAY — For Study",
    lean: "yay",
    leanLabel: "YAY (on record)",
    reason: "Chairs the Environment & Energy Committee — institutionally aligned with climate tools. Former State Assembly member who understands TIF mechanics. Voted with Park on the Dec 9 study motion.",
    concern: "None on record for this vote.",
    x: 290, y: 95,
  },
  {
    id: "d3", district: 3, name: "Bob Blumenfield",
    neighborhoods: "Canoga Park · Reseda · Tarzana · Winnetka · Woodland Hills",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "uncertain",
    leanLabel: "Uncertain",
    reason: "Council President Pro Tempore. West Valley district is fire-adjacent (Woolsey fire history) so he understands the risk. Moderate, pragmatic. Likely deferred to Yaroslavsky's fiscal caution rather than opposing the DRD outright.",
    concern: "General fund impact; wants full committee process.",
    x: 155, y: 110,
  },
  {
    id: "d4", district: 4, name: "Nithya Raman",
    neighborhoods: "Hollywood · Los Feliz · Silver Lake · Sherman Oaks · Studio City",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Now running for Mayor — highest-profile progressive on the council. Strong climate credentials (Asst. President Pro Tem). Entering a mayoral race where wildfire recovery is a defining issue. Her position will likely evolve toward supporting.",
    concern: "Running for mayor — careful about fiscal optics.",
    x: 295, y: 148,
  },
  {
    id: "d5", district: 5, name: "Katy Yaroslavsky",
    neighborhoods: "Bel Air · Beverly Crest · Century City · Cheviot Hills · Beverlywood",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Budget & Finance Committee Chair. The loudest skeptic on Dec 9 — explicitly raised the $1B city deficit and warned TIF diverts property tax from the general fund. Has been 'yelling' about fiscal risk for months. Would need strong budget-neutral safeguards to flip.",
    concern: "City faces $1B deficit; TIF locks up general fund revenue for decades.",
    x: 205, y: 170,
  },
  {
    id: "d6", district: 6, name: "Imelda Padilla",
    neighborhoods: "Van Nuys · Arleta · Lake Balboa · Panorama City · North Hills",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "uncertain",
    leanLabel: "Uncertain",
    reason: "Central Valley district with no direct wildfire stake in the Palisades recovery. Likely to follow fiscal leadership. However, Van Nuys is fire-adjacent in future risk scenarios — could be persuaded by citywide climate framing.",
    concern: "Less constituency pressure; budget concerns likely dominate.",
    x: 255, y: 90,
  },
  {
    id: "d7", district: 7, name: "Monica Rodriguez",
    neighborhoods: "Pacoima · Lake View Terrace · Sunland-Tujunga · Mission Hills · Sylmar",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Represents communities with high wildfire exposure in the northern Valley. Sunland-Tujunga is one of LA's most fire-prone areas. Could be won over by framing the DRD as a citywide disaster preparedness tool, not just a Palisades benefit.",
    concern: "Wants expanded district coverage; skeptical of Palisades-first framing.",
    x: 290, y: 55,
  },
  {
    id: "d8", district: 8, name: "Marqueece Harris-Dawson",
    neighborhoods: "Baldwin Hills · Crenshaw · Leimert Park · Jefferson Park · West Adams",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Council President — institutionally cautious. South LA district has no wildfire stake. Would be skeptical of dedicating general fund property tax to a wealthy westside neighborhood. Equity concerns likely to dominate unless district-neutral framing is used.",
    concern: "Equity: why should South LA general fund revenue benefit Palisades?",
    x: 240, y: 215,
  },
  {
    id: "d9", district: 9, name: "Curren D. Price Jr.",
    neighborhoods: "South Central · Watts · Exposition Park · Vermont Square",
    vote: "yay",
    voteLabel: "✓ YAY — For Study",
    lean: "yay",
    leanLabel: "YAY (on record)",
    reason: "Voted with Park on Dec 9 despite representing a South LA district with no direct wildfire stake. Likely motivated by the tool's potential application for climate resilience citywide, and possibly inter-council logrolling dynamics.",
    concern: "None demonstrated on this vote.",
    x: 270, y: 238,
  },
  {
    id: "d10", district: 10, name: "Heather Hutt",
    neighborhoods: "Mid-City · Koreatown · West Adams · Olympic Park · South Robertson",
    vote: "yay",
    voteLabel: "✓ YAY — For Study",
    lean: "yay",
    leanLabel: "YAY (on record)",
    reason: "District borders CD11 (Palisades area) and includes communities exposed to climate and fire risk. Adjacent constituency interest. Voted with Park on Dec 9.",
    concern: "None demonstrated on this vote.",
    x: 225, y: 188,
  },
  {
    id: "d11", district: 11, name: "Traci Park",
    neighborhoods: "Pacific Palisades · Venice · Mar Vista · Del Rey · Playa Vista · LAX area",
    vote: "yay",
    voteLabel: "✓ YAY — For Study",
    lean: "yay",
    leanLabel: "YAY — Motion Author",
    reason: "The lead sponsor and most vocal advocate. Represents Pacific Palisades directly. Has chaired the Ad Hoc Committee on LA Recovery since January 2025. Introduced the DRD study motion on Jan 15, the week the fire broke out. Personally invested in this tool as the primary recovery financing mechanism for her district.",
    concern: "None — she is the champion of this effort.",
    x: 165, y: 185,
  },
  {
    id: "d12", district: 12, name: "John Lee",
    neighborhoods: "Chatsworth · Granada Hills · Porter Ranch · Northridge · Reseda · West Hills",
    vote: "yay",
    voteLabel: "✓ YAY — For Study",
    lean: "yay",
    leanLabel: "YAY (on record)",
    reason: "NW Valley district is highly fire-exposed — among the highest risk areas in LA. Chatsworth and Porter Ranch are in fire corridors. Strong constituency reason to support climate resilience financing tools. One of only two non-Westside members to vote with Park.",
    concern: "None demonstrated — fire risk is a live issue in his district.",
    x: 155, y: 60,
  },
  {
    id: "d13", district: 13, name: "Hugo Soto-Martinez",
    neighborhoods: "Silver Lake · Echo Park · Elysian Valley · Atwater Village · East Hollywood",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "The council's most progressive member on housing and climate. Strong climate justice platform. Likely voted to delay for procedural/equity reasons rather than opposition. Would likely support a well-structured DRD with citywide scope.",
    concern: "Wants affordable housing protections built in; concerned about gentrification accelerating.",
    x: 318, y: 158,
  },
  {
    id: "d14", district: 14, name: "Kevin De León",
    neighborhoods: "Downtown · Boyle Heights · Eagle Rock · El Sereno · Highland Park · Garvanza",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "uncertain",
    leanLabel: "Uncertain",
    reason: "Politically weakened following the 2022 racism scandal; refused to resign and lost significant influence. His vote is hard to predict. Was a prominent climate legislator in Sacramento (authored SB 350, SB 1). May support for legacy reasons but carries less sway with colleagues.",
    concern: "Politically isolated; unpredictable vote.",
    x: 330, y: 188,
  },
  {
    id: "d15", district: 15, name: "Tim McCosker",
    neighborhoods: "San Pedro · Wilmington · Harbor City · Harbor Gateway · Watts",
    vote: "committee",
    voteLabel: "→ Sent to Committee",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Harbor district — geographically, economically and politically far from Pacific Palisades. No wildfire stake. Would be skeptical of diverting citywide property tax revenue. Port and industrial concerns dominate district priorities.",
    concern: "No constituency interest in Palisades recovery; fiscal concerns.",
    x: 295, y: 278,
  },
];

const VOTE_COUNTS = {
  yay: MEMBERS.filter(m => m.vote === "yay").length,
  committee: MEMBERS.filter(m => m.vote === "committee").length,
};

function VoteBadge({ vote, lean }) {
  const map = {
    yay: { bg: C.yayBg, border: C.yayBorder, color: C.yay, label: "YAY" },
    "lean-yay": { bg: C.yayBg, border: C.yayBorder, color: C.yay, label: "Lean YAY" },
    committee: { bg: C.committeeBg, border: C.committeeBorder, color: C.committee, label: "→ Committee" },
    uncertain: { bg: "#f3f4f6", border: "#d1d5db", color: T.sub, label: "Uncertain" },
    "lean-nay": { bg: C.nayBg, border: C.nayBorder, color: C.nay, label: "Lean NAY" },
  };
  const key = vote === "yay" ? "yay" : lean;
  const s = map[key] || map["uncertain"];
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 10.5,
      fontWeight: 700,
      background: s.bg,
      border: `1px solid ${s.border}`,
      color: s.color,
      letterSpacing: 0.3,
    }}>{s.label}</span>
  );
}

// ── SCHEMATIC MAP ─────────────────────────────────────────────────────────────
function DistrictMap({ selected, onSelect }) {
  const [hov, setHov] = useState(null);

  const getColor = (m) => {
    if (m.vote === "yay") return C.yay;
    if (m.lean === "lean-yay") return "#65a30d";
    if (m.lean === "lean-nay") return C.nay;
    return C.committee;
  };

  const getBg = (m) => {
    if (m.vote === "yay") return C.yayBg;
    if (m.lean === "lean-yay") return "#f7fee7";
    if (m.lean === "lean-nay") return C.nayBg;
    return C.committeeBg;
  };

  const active = hov || selected;

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 440 310" style={{ width: "100%", maxWidth: 520, display: "block" }}>
        {/* Background */}
        <rect x="0" y="0" width="440" height="310" rx="12" fill={C.bg} />

        {/* LA outline - simplified schematic */}
        <path d="M 60 30 L 380 30 L 380 100 L 360 115 L 360 210 L 330 280 L 280 295 L 150 295 L 120 270 L 80 240 L 60 200 L 40 170 L 50 100 Z"
          fill="none" stroke={C.border} strokeWidth="1.5" />



        {/* Ocean label */}
        <text x="55" y="230" fontSize="7" fill={T.faint} fontFamily="Georgia, serif" fontStyle="italic">Pacific</text>
        <text x="52" y="240" fontSize="7" fill={T.faint} fontFamily="Georgia, serif" fontStyle="italic">Ocean</text>

        {/* Palisades callout */}
        <circle cx="135" cy="182" r="28" fill="none" stroke={C.palisades} strokeWidth="1" strokeDasharray="3,2" />
        <text x="90" y="238" fontSize="7" fill={C.palisades} fontFamily="Georgia, serif">Pacific Palisades</text>
        <line x1="112" y1="210" x2="127" y2="205" stroke={C.palisades} strokeWidth="0.8" />

        {/* District bubbles */}
        {MEMBERS.map(m => {
          const isActive = active === m.id;
          const col = getColor(m);
          const bg = getBg(m);
          const r = isActive ? 19 : 16;
          return (
            <g key={m.id}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(m.id === selected ? null : m.id)}
              onMouseEnter={() => setHov(m.id)}
              onMouseLeave={() => setHov(null)}
            >
              <circle cx={m.x} cy={m.y} r={r + 3} fill="white" opacity="0.6" />
              <circle
                cx={m.x} cy={m.y} r={r}
                fill={isActive ? col : bg}
                stroke={col}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text x={m.x} y={m.y + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize={isActive ? 10 : 9}
                fontWeight="700"
                fill={isActive ? "white" : col}
                fontFamily="Georgia, serif"
              >
                {m.district}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(16, 256)">
          <rect x="0" y="0" width="110" height="48" rx="6" fill="white" stroke={C.border} strokeWidth="1" />
          {[
            { col: C.yay, label: "YAY / Lean YAY" },
            { col: C.committee, label: "Uncertain / → Cmte" },
            { col: C.nay, label: "Lean NAY" },
          ].map((l, i) => (
            <g key={l.label} transform={`translate(8, ${10 + i * 13})`}>
              <circle cx="5" cy="5" r="4" fill={l.col} />
              <text x="13" y="9" fontSize="7" fill={T.sub} fontFamily="Georgia, serif">{l.label}</text>
            </g>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {active && (() => {
        const m = MEMBERS.find(x => x.id === active);
        if (!m) return null;
        return (
          <div style={{
            marginTop: 8,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${getColor(m)}`,
            borderRadius: 8,
            padding: "10px 14px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.heading }}>CD{m.district} — {m.name}</span>
              <VoteBadge vote={m.vote} lean={m.lean} />
            </div>
            <div style={{ fontSize: 11, color: T.sub }}>{m.neighborhoods}</div>
          </div>
        );
      })()}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);
  const [openCards, setOpenCards] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = MEMBERS.filter(m => {
    if (filter === "yay") return m.vote === "yay" || m.lean === "lean-yay";
    if (filter === "nay") return m.lean === "lean-nay";
    if (filter === "uncertain") return m.lean === "uncertain";
    if (filter === "committee") return m.vote === "committee";
    return true;
  });

  const leanYay = MEMBERS.filter(m => m.vote === "yay" || m.lean === "lean-yay").length;
  const leanYayOnly = MEMBERS.filter(m => m.vote !== "yay" && m.lean === "lean-yay").length;
  const leanNay = MEMBERS.filter(m => m.lean === "lean-nay").length;
  const uncertain = MEMBERS.filter(m => m.lean === "uncertain" || (m.vote === "committee" && m.lean === "committee")).length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: T.body, fontFamily: "Georgia, serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .mobile-header { display: flex !important; }
          .sidebar { position: fixed !important; top: 0; left: 0; height: 100vh !important; z-index: 150; transform: translateX(-100%); transition: transform 0.25s ease; box-shadow: 2px 0 16px rgba(0,0,0,0.12); }
          .sidebar-open { transform: translateX(0) !important; }
          .mobile-main { padding-top: 60px !important; padding-left: 18px !important; padding-right: 18px !important; }
        }
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
        }
        .card-hover:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
      `}</style>

      {/* MOBILE HEADER */}
      <div className="mobile-header" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "12px 16px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.heading }}>LA Council Vote Tracker</div>
        <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 11px", cursor: "pointer", fontSize: 15, color: T.sub }}>
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 149 }} />}

      {/* SIDEBAR */}
      <aside className={"sidebar" + (sidebarOpen ? " sidebar-open" : "")} style={{ width: 210, flexShrink: 0, background: "#fff", borderRight: `1px solid ${C.border}`, position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px 14px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 5 }}>City of Los Angeles</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.heading, lineHeight: 1.3 }}>Council Vote Tracker</div>
          <div style={{ fontSize: 10.5, color: T.sub, marginTop: 3 }}>Palisades DRD Study Motion</div>
          <div style={{ fontSize: 10, color: T.faint, marginTop: 2 }}>Dec 9, 2025 · 10–5</div>
        </div>

        {/* Nav sections */}
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Sections</div>
          {[
            { id: "scoreboard", label: "Vote Result" },
            { id: "map", label: "District Map" },
            { id: "members", label: "Council Members" },
            { id: "feasibility", label: "$300K Study Status" },
            { id: "analysis", label: "Path to 8 Votes" },
            { id: "rebuilding", label: "Rebuilding Progress" },
            { id: "comparison", label: "CRD vs DRD" },
            { id: "sources", label: "Sources" },
          ].map(s => (
            <button key={s.id} onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setSidebarOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "5px 10px", marginBottom: 2, borderRadius: 6, border: "none", background: "transparent", color: T.sub, cursor: "pointer", fontSize: 11.5, fontFamily: "Georgia, serif" }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Members by Vote</div>
          {[
            { key: "all", label: "All 15 Members" },
            { key: "yay", label: "YAY / Lean YAY" },
            { key: "committee", label: "Sent to Committee" },
            { key: "uncertain", label: "Uncertain" },
            { key: "nay", label: "Lean NAY" },
          ].map(f => (
            <button key={f.key} onClick={() => { setFilter(f.key); document.getElementById("members")?.scrollIntoView({ behavior: "smooth", block: "start" }); setSidebarOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "5px 10px", marginBottom: 2, borderRadius: 6, border: "none",
              background: filter === f.key ? "#eff6ff" : "transparent",
              color: filter === f.key ? C.palisades : T.sub,
              fontWeight: filter === f.key ? 700 : 400,
              cursor: "pointer", fontSize: 11.5, fontFamily: "Georgia, serif",
            }}>{f.label}</button>
          ))}
        </div>

        <div style={{ padding: "12px 16px", flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Districts</div>
          {MEMBERS.map(m => {
            const col = m.vote === "yay" ? C.yay : m.lean === "lean-nay" ? C.nay : m.lean === "lean-yay" ? "#65a30d" : C.committee;
            return (
              <button key={m.id} onClick={() => { setSelected(m.id === selected ? null : m.id); setSidebarOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "5px 8px", borderRadius: 6, border: "none", background: selected === m.id ? "#f0f9ff" : "transparent", cursor: "pointer", marginBottom: 1 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: col, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: "white" }}>{m.district}</span>
                </div>
                <span style={{ fontSize: 11, color: selected === m.id ? C.palisades : T.sub, fontWeight: selected === m.id ? 600 : 400 }}>{m.name.split(" ").slice(-1)[0]}</span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 9.5, color: T.faint, lineHeight: 1.5 }}>
          Based on Dec 9, 2025 vote + public statements. Lean assessments are analytical, not official positions.
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        <div className="mobile-main" style={{ padding: "44px 44px 100px", maxWidth: 880 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Los Angeles City Council · 2025–2026</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: T.heading, margin: "0 0 10px", lineHeight: 1.25 }}>
              Palisades Disaster Recovery District
            </h1>
            <p style={{ fontSize: 14, color: T.sub, margin: "0 0 10px", lineHeight: 1.7, maxWidth: 620 }}>
              Traci Park (CD11) introduced a motion on <strong>January 15, 2025</strong> (<a href="https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&amp;cfnumber=25-0006-S38" target="_blank" rel="noopener noreferrer" style={{ color: C.palisades, textDecoration: "underline" }}>CF 25-0006-S38 ↗</a>) — the week of the fire — asking the city's Economic &amp; Workforce Development Department (EWDD) to study the feasibility of forming a <strong>Climate Resilience District (CRD)</strong> for the Palisades burn area.
            </p>
            <p style={{ fontSize: 14, color: T.sub, margin: "0 0 10px", lineHeight: 1.7, maxWidth: 620 }}>
              By December 9, EWDD had completed a study recommending a $300K boundary and feasibility analysis. Park pivoted on the floor to a <strong>substitute motion for a Disaster Recovery District (DRD) under SB 782</strong> — a faster, fire-specific tool — and proposed funding it from the Economic Development Trust Fund. She had also separately secured SCAG funding so the study would have no general fund impact.
            </p>
            <p style={{ fontSize: 14, color: T.sub, margin: 0, lineHeight: 1.7, maxWidth: 620 }}>
              The council voted <strong>10–5</strong> to refer the entire matter back to the Budget &amp; Finance and Economic Development committees — not a vote on the DRD itself, but on whether to even study it. Budget &amp; Finance Chair Yaroslavsky argued the city first needed a citywide analysis of how TIF districts affect the general fund. That broader analysis also remains unfinished. <strong>8 votes needed to move forward.</strong>
            </p>
          </div>

          {/* VOTE SCOREBOARD */}
          <div id="scoreboard" style={{ marginBottom: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div style={{ background: C.yayBg, border: `1px solid ${C.yayBorder}`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.yay }}>{VOTE_COUNTS.yay}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.heading, marginTop: 2 }}>Voted YAY</div>
                <div style={{ fontSize: 10.5, color: T.sub, marginTop: 2 }}>For the study — Dec 9, 2025</div>
              </div>
              <div style={{ background: C.committeeBg, border: `1px solid ${C.committeeBorder}`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.committee }}>{VOTE_COUNTS.committee}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.heading, marginTop: 2 }}>Sent to Committee</div>
                <div style={{ fontSize: 10.5, color: T.sub, marginTop: 2 }}>Delayed — not a hard NAY</div>
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 13, color: "#1e3a8a" }}>
                <strong>Result on feasibility study vote: 10–5</strong> against fast-tracking
              </div>
              <div style={{ fontSize: 12, color: "#3b82f6" }}>
                Needs <strong>8 of 15</strong> votes to pass · {8 - VOTE_COUNTS.yay} more YAY needed
              </div>
            </div>
          </div>

          {/* VOTE BAR */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Projected Outcome</div>
            <div style={{ height: 32, borderRadius: 8, overflow: "hidden", display: "flex", border: `1px solid ${C.border}` }}>
              <div style={{ width: `${(VOTE_COUNTS.yay / 15) * 100}%`, background: C.yay, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{VOTE_COUNTS.yay} YAY</span>
              </div>
              <div style={{ width: `${(leanYayOnly / 15) * 100}%`, background: "#65a30d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{leanYayOnly} Lean YAY</span>
              </div>
              <div style={{ width: `${(uncertain / 15) * 100}%`, background: C.committeeBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: C.committee }}>{uncertain} Uncertain</span>
              </div>
              <div style={{ width: `${(leanNay / 15) * 100}%`, background: "#f87171", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{leanNay} Lean NAY</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
              <span style={{ fontSize: 10, color: T.faint }}>Needs 8 to pass ▸</span>
            </div>
          </div>

          {/* MAP + KEY */}
          <div id="map" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>District Map</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 16px" }}>15 Council Districts — Schematic</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              <DistrictMap selected={selected} onSelect={setSelected} />
              <div>
                <div style={{ fontSize: 11, color: T.sub, marginBottom: 12, lineHeight: 1.6 }}>
                  Click a district on the map or a card below to highlight. Pacific Palisades (dashed circle) sits in <strong>CD11 — Traci Park</strong>.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { col: C.yay, label: "YAY", desc: "Voted for study on Dec 9" },
                    { col: "#65a30d", label: "Lean YAY", desc: "Likely to support if brought back" },
                    { col: C.committee, label: "→ Committee", desc: "Sent to committee — uncertain" },
                    { col: C.nay, label: "Lean NAY", desc: "Fiscal/equity concerns likely to hold" },
                  ].map(l => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.col, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: T.heading, width: 80 }}>{l.label}</span>
                      <span style={{ fontSize: 11, color: T.sub }}>{l.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COUNCIL CARDS */}
          <div id="members" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>All Members</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: 0 }}>Council Member Analysis</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, color: T.faint }}>Showing {filtered.length} of {MEMBERS.length}</span>
                {filter !== "all" && (
                  <button onClick={() => setFilter("all")} style={{ fontSize: 11, color: C.palisades, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 12 }}>
              {filtered.map(m => {
                const col = m.vote === "yay" ? C.yay : m.lean === "lean-nay" ? C.nay : m.lean === "lean-yay" ? "#65a30d" : C.committee;
                const isSelected = openCards.has(m.id);
                return (
                  <div
                    key={m.id}
                    className="card-hover"
                    onClick={() => { setOpenCards(prev => { const s = new Set(prev); if(s.has(m.id)) { s.delete(m.id); } else { s.add(m.id); } return s; }); }}
                    style={{
                      background: C.surface,
                      border: `1px solid ${isSelected ? col : C.border}`,
                      borderLeft: `4px solid ${col}`,
                      borderRadius: 10,
                      padding: "14px 16px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isSelected ? `0 0 0 2px ${col}30` : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: col, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{m.district}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.heading }}>{m.name}</div>
                          <div style={{ fontSize: 10.5, color: T.faint }}>CD{m.district}</div>
                        </div>
                      </div>
                      <VoteBadge vote={m.vote} lean={m.lean} />
                    </div>

                    <div style={{ fontSize: 11, color: T.sub, marginBottom: isSelected ? 10 : 0, lineHeight: 1.5 }}>
                      {m.neighborhoods}
                    </div>

                    {isSelected && (
                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: col, marginBottom: 6 }}>{m.voteLabel}</div>
                        <div style={{ fontSize: 12, color: T.body, lineHeight: 1.65, marginBottom: 8 }}>{m.reason}</div>
                        {m.concern && m.concern !== "None on record for this vote." && m.concern !== "None demonstrated on this vote." && m.concern !== "None — she is the champion of this effort." && (
                          <div style={{ background: C.committeeBg, border: `1px solid ${C.committeeBorder}`, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: T.sub }}>
                            <span style={{ fontWeight: 600, color: C.committee }}>Key concern: </span>{m.concern}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── $300K FEASIBILITY STUDY STATUS ── */}
          <div id="feasibility" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Current Status</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 16px" }}>The $300K Feasibility Study — Where Things Stand</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { date: "Jan 15, 2025", label: "Motion introduced", cfLink: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38", detail: "Traci Park introduces motion asking EWDD to study feasibility of a Climate Resilience District for the Palisades burn area — the week the fire broke out.", done: true },
                { date: "Jun 2025", label: "EWDD report completed", detail: "EWDD concludes the idea deserves further study. Recommends $300K for a full feasibility and boundary analysis. Notes CRDs are slow (18–36 months to form) and not useful for short-term disaster recovery.", done: true },
                { date: "Mid-2025", label: "Budget & Finance: \"note and file\"", detail: "The $300K request is shelved — money wasn't in the budget. Committee says the city needs a citywide fiscal analysis of TIF district impacts before approving any individual study.", done: true },
                { date: "Dec 9, 2025", label: "Full Council vote — 10–5 to refer back", detail: "Park pivots: substitute motion to pursue a DRD (SB 782) instead of CRD, funded from the Economic Development Trust Fund. She separately secured SCAG funding so there'd be no budget impact. Council still votes 10–5 to send everything back to Budget & Finance and Economic Development committees.", done: true },
                { date: "Now — Feb 2026", label: "Stuck in committee", detail: "Pending in two committees: Budget & Finance (Yaroslavsky chair) and Economic Development. No hearing scheduled. The citywide TIF fiscal impact report Yaroslavsky demanded also hasn't been completed. No public timeline for resolution.", done: false },
              ].map((step, i, arr) => (
                <div key={step.date} style={{ display: "flex", gap: 14, paddingBottom: i < arr.length - 1 ? 18 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: step.done ? C.yay : C.committee }} />
                    {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: step.done ? C.yay : C.committee, letterSpacing: 0.5 }}>{step.date}</span>
                      {step.cfLink
                        ? <a href={step.cfLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: T.heading, textDecoration: "underline" }}>{step.label} ↗</a>
                        : <span style={{ fontSize: 12, fontWeight: 700, color: T.heading }}>{step.label}</span>
                      }
                    </div>
                    <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.65 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, background: C.committeeBg, border: `1px solid ${C.committeeBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
              <strong style={{ color: C.committee }}>Bottom line:</strong> Park's office did the work — secured funding, got EWDD's sign-off — but the Council majority wants a citywide TIF fiscal analysis first. That analysis also hasn't been completed. The study remains stuck with no public timeline.
            </div>
          </div>

          {/* ANALYSIS */}
          <div id="analysis" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Path to 8 Votes</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 14px" }}>What Needs to Change</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  title: "The 3 Likely Flips",
                  color: C.yay,
                  items: [
                    "D7 Rodriguez — Frame as citywide wildfire preparedness, not just Palisades",
                    "D13 Soto-Martinez — Add affordable housing anti-displacement protections",
                    "D1 Hernandez — Environmental justice framing; emphasize climate adaptation citywide",
                  ]
                },
                {
                  title: "The Hard Nos",
                  color: C.nay,
                  items: [
                    "D5 Yaroslavsky — Would need budget-neutral TIF structure or separate funding source",
                    "D8 Harris-Dawson — Needs direct South LA benefit or equity offsets",
                    "D15 McCosker — Geographic and political distance; lowest likelihood",
                  ]
                }
              ].map(sec => (
                <div key={sec.title}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: sec.color, marginBottom: 8 }}>{sec.title}</div>
                  {sec.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: sec.color, flexShrink: 0, marginTop: 6 }} />
                      <div style={{ fontSize: 12, color: T.body, lineHeight: 1.6 }}>{item}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>


          {/* ── REBUILDING STATUS ── */}
          <div id="rebuilding" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Recovery Snapshot</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 14px" }}>Palisades Rebuilding Progress</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
              {[
                { value: "3,170+", label: "Permits Issued", sub: "as of early Feb 2026" },
                { value: "390+", label: "Homes Under Construction", sub: "active builds" },
                { value: "31 days", label: "Avg. County Review", sub: "business days" },
              ].map(s => (
                <div key={s.label} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: T.heading }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.sub, marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: T.faint, marginTop: 1 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: "⚡", title: "EO8 Fast-Track Permitting", text: "Mayor Bass's Emergency Order 8 exempts eligible by-right rebuilds from standard planning reviews and in many cases CEQA / Coastal Act review." },
                { icon: "🏗️", title: "AECOM Master Plan", text: "Global firm AECOM tapped to develop a master plan for utilities and infrastructure — undergrounding power lines, hardening hydrants and water systems." },
                { icon: "🪪", title: "Permit Center (Marquez Ave)", text: "Dedicated Palisades Inspections and Permitting Support Center opened to provide direct logistical support to residents." },
                { icon: "⚠️", title: "Cost & Insurance Hurdles", text: "Only ~13% of heavily impacted homes started construction by Jan 2026. High rebuilding costs and insurance gaps remain the primary bottleneck." },
              ].map(item => (
                <div key={item.title} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.heading, marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>{item.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: "#1e40af", lineHeight: 1.6 }}>
              <strong>Timeline:</strong> Full community recovery is projected on a <strong>5–10 year horizon</strong>, particularly for major infrastructure overhauls. Some homes are already being rebuilt but the pace depends heavily on insurance resolution and financing tools like the DRD.
            </div>
          </div>

          {/* ── CRD vs DRD DECISION ── */}
          <div id="comparison" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Strategic Decision</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 6px" }}>CRD or DRD — Which Path?</h2>
            <p style={{ fontSize: 12.5, color: T.sub, margin: "0 0 16px", lineHeight: 1.6 }}>Both tools are available. The choice affects speed, revenue scope, and political feasibility.</p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: C.bg, borderBottom: `2px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "9px 12px", color: T.faint, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", width: "28%" }}>Factor</th>
                    <th style={{ textAlign: "left", padding: "9px 12px", color: "#047857", fontSize: 13, fontWeight: 700, width: "36%" }}>CRD (SB 852)</th>
                    <th style={{ textAlign: "left", padding: "9px 12px", color: "#b91c1c", fontSize: 13, fontWeight: 700, width: "36%" }}>DRD (SB 782)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Formation speed", crd: "△ 18–36 months typical", drd: "✓ Expedited — weeks to months" },
                    { label: "Trigger required", crd: "None — any climate purpose", drd: "Governor disaster declaration ✓ (already issued)" },
                    { label: "Protest thresholds", crd: "Standard protest rules apply", drd: "✓ Removed (no 25/50% rule)" },
                    { label: "Revenue use", crd: "Broader climate resilience projects", drd: "△ Restricted to disaster recovery purposes" },
                    { label: "Housing eligibility", crd: "△ If climate-relevant project", drd: "✓ Any disaster-damaged housing" },
                    { label: "GO bonds", crd: "✓ Available (voter approval)", drd: "✓ Available (voter approval)" },
                    { label: "Special taxes", crd: "✓ Available (voter approval)", drd: "✓ Available (voter approval)" },
                    { label: "Council politics", crd: "△ Yaroslavsky wants broader city analysis first", drd: "✓ Easier — Park's Dec 9 motion was already for DRD" },
                    { label: "Best for...", crd: "Long-term citywide climate resilience", drd: "Immediate Palisades infrastructure rebuild" },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "9px 12px", color: T.sub, fontSize: 11, fontWeight: 600 }}>{row.label}</td>
                      <td style={{ padding: "9px 12px", color: T.body, lineHeight: 1.5 }}>{row.crd}</td>
                      <td style={{ padding: "9px 12px", color: T.body, lineHeight: 1.5 }}>{row.drd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 14, background: C.yayBg, border: `1px solid ${C.yayBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: "#15803d", lineHeight: 1.6 }}>
              <strong>Bottom line:</strong> Given the Governor's declaration is already in place and speed matters for Palisades recovery, <strong>DRD is the faster and more politically viable path</strong> right now. A CRD is not simply a "later addition" — both districts cannot capture the same property tax increment at the same time over the same boundary. In practice, the city would need to choose one or sequence them carefully: dissolve or wind down the DRD before a CRD could claim the same increment, or define non-overlapping boundaries and revenue streams.
            </div>
          </div>

          {/* ── SOURCES ── */}
          <div id="sources" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Sources &amp; Further Reading</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  href: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38",
                  title: "City Clerk Council File 25-0006-S38",
                  sub: "LA City Clerk · Park's original motion — Climate Resilience District / Pacific Palisades · Mover: Park, Second: Nazarian",
                  accent: C.yay,
                },
                {
                  href: "https://www.dailynews.com/2025/12/09/l-a-city-council-splits-on-study-for-palisades-climate-resilience-district/",
                  title: "LA City Council splits on study for Palisades climate resilience district",
                  sub: "Los Angeles Daily News · December 9, 2025 · Council vote 10–5",
                  accent: C.palisades,
                },
                {
                  href: "https://marvistavoice.org/city-council-pumps-the-brakes-on-palisades-climate-resilience-district-study/",
                  title: "City Council Pumps the Brakes on Palisades Climate Resilience District Study",
                  sub: "Mar Vista Voice · December 12, 2025 · Yaroslavsky's objections in detail",
                  accent: C.palisades,
                },
                {
                  href: "https://cd11.lacity.gov/palisades-recovery-updates",
                  title: "Palisades Recovery Updates — Council District 11",
                  sub: "Council District 11 (Traci Park) · Ongoing recovery updates, Park's office",
                  accent: C.committee,
                },
                {
                  href: "https://palisades-tif-districts.vercel.app/",
                  title: "California TIF Districts: RDA → IFD → EIFD → CRD → DRD",
                  sub: "Reference app · Detailed breakdown of all California TIF district types, formation process, eligible spending, and CRD vs DRD comparison",
                  accent: "#047857",
                },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${s.accent}`, borderRadius: 8, padding: "12px 16px", textDecoration: "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.heading }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>{s.sub}</div>
                  </div>
                  <span style={{ fontSize: 14, color: s.accent, flexShrink: 0, marginLeft: 12 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, fontSize: 11, color: T.faint, lineHeight: 1.7 }}>
            <div style={{ marginBottom: 6, color: T.sub, fontWeight: 600 }}>Last updated: February 20, 2026</div>
            <div style={{ background: "#fffbeb", border: `1px solid ${C.committeeBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 11, color: T.sub }}>
              <strong>Disclaimer:</strong> The December 9, 2025 vote was on a motion to refer a $300K feasibility study to committee — not on the DRD itself. "Lean" positions are analytical assessments based on public statements, district interests, and voting history. They are not official positions. Verify all details before relying on this for planning or advocacy purposes.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
