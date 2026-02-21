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
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Progressive climate advocate — among the strongest voices on environmental justice on the council. Voted YES on the Dec 9 referral motion, but this does not indicate DRD opposition — she may have deferred to senior colleagues or wanted more process. Strong environmental justice orientation. Her district (Lincoln Heights, Koreatown, Echo Park) has no direct wildfire stake but stands to benefit from citywide insurance stabilization and any construction employment multiplier.",
    concern: "Voted YES on Oct 7 B&F committee motion to shelve (Receive and File) the June 2025 EWDD report — one of five unanimous committee votes. No separate public statement on DRD. Equity framing critical — the argument must speak to her constituents, not Palisades homeowners.",
    x: 288, y: 178,
  },
  {
    id: "d2", district: 2, name: "Adrin Nazarian",
    neighborhoods: "North Hollywood · Studio City · Van Nuys · Valley Village · Toluca Lake",
    vote: "proceed",
    voteLabel: "✓ NO on Referral — Voted to Proceed",
    lean: "proceed",
    leanLabel: "Voted to Proceed",
    reason: "Co-sponsored the original Park–Nazarian–Price CRD motion on January 15, 2025 — he was in from day one. Chairs the Environment & Energy Committee, giving him direct institutional jurisdiction over climate financing tools. Former State Assembly member who understands TIF mechanics. Voted NO on the Dec 9 referral, meaning he wanted to proceed without committee delay. Of the 5 who voted to proceed, his combination of co-sponsorship, committee role, and institutional knowledge makes his support the most substantive.",
    concern: "None on record. One of the clearest likely DRD supporters based on co-sponsorship and vote record.",
    x: 290, y: 95,
  },
  {
    id: "d3", district: 3, name: "Bob Blumenfield",
    neighborhoods: "Canoga Park · Reseda · Tarzana · Winnetka · Woodland Hills",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "uncertain",
    leanLabel: "Uncertain",
    reason: "Council President Pro Tempore. Co-sponsored the Yaroslavsky referral motion — his YES vote was a direct procedural act, not merely following the crowd. West Valley district has Woolsey Fire history and real wildfire exposure. Moderate and pragmatic — his co-sponsorship of the referral may reflect genuine process preference or fiscal caution rather than DRD opposition. Public DRD position unknown.",
    concern: "Co-sponsored the referral motion with Yaroslavsky. No public statement specifically opposing the DRD study.",
    x: 155, y: 110,
  },
  {
    id: "d4", district: 4, name: "Nithya Raman",
    neighborhoods: "Hollywood · Los Feliz · Silver Lake · Sherman Oaks · Studio City",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Now running for Mayor — highest-profile progressive on the council. Strong climate credentials (Asst. President Pro Tem). Voted YES on the Dec 9 referral; DRD position not publicly stated. Entering a mayoral race where wildfire recovery and climate resilience are defining issues. Her evolving mayoral platform may create incentive to support a well-framed DRD.",
    concern: "No public statement on DRD. Mayoral campaign creates both incentive (climate credentials) and risk (fiscal optics in a deficit year).",
    x: 295, y: 148,
  },
  {
    id: "d5", district: 5, name: "Katy Yaroslavsky",
    neighborhoods: "Bel Air · Beverly Crest · Century City · Cheviot Hills · Beverlywood",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Budget & Finance Committee Chair. Her trajectory is the most documented of any member: voted YES in Feb 2025 to commission the CRD study (B&F 5-0), voted YES in Oct 2025 to shelve the EWDD report after seeing the fiscal analysis, and co-authored the Dec 9 referral motion with Blumenfield. Her shift from supporter to skeptic tracks directly with the EWDD June 2025 report's fiscal findings — particularly the risk that early CRD formation could reduce general fund revenue below pre-fire levels. Her objection is fiscal and substantiated, not merely political. Of all 15 members, her DRD position is most clearly on the record.",
    concern: "Publicly stated: city $1B deficit, TIF diverts general fund revenue for decades, no citywide TIF fiscal analysis yet completed. The EWDD June 2025 report itself acknowledged this risk.",
    x: 205, y: 170,
  },
  {
    id: "d6", district: 6, name: "Imelda Padilla",
    neighborhoods: "Van Nuys · Arleta · Lake Balboa · Panorama City · North Hills",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "uncertain",
    leanLabel: "Uncertain",
    reason: "Central Valley district with no direct wildfire stake in Palisades recovery. Voted YES on the Dec 9 referral; no public statement on DRD position. Van Nuys and Panorama City are fire-adjacent in future risk scenarios. With no strong constituency pull in either direction, her vote is likely to track whoever leads the fiscal argument — which is why the analysis matters for this district too.",
    concern: "No public statement on DRD. No strong constituency pressure either way.",
    x: 255, y: 90,
  },
  {
    id: "d7", district: 7, name: "Monica Rodriguez",
    neighborhoods: "Pacoima · Lake View Terrace · Sunland-Tujunga · Mission Hills · Sylmar",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Represents communities with genuinely high wildfire exposure — Sunland-Tujunga, Sylmar, and Pacoima are among the most fire-prone areas in LA City. Voted YES on the Dec 9 referral; no public statement specifically opposing the DRD. Her district's fire exposure gives her the strongest constituency reason of any 'Voted to Refer' member to support a recovery financing tool. The DRD framed as a citywide wildfire resilience instrument — not a Palisades-exclusive benefit — is the natural pitch for her.",
    concern: "No public DRD position on record. May be skeptical if framed as a Palisades-only benefit.",
    x: 290, y: 55,
  },
  {
    id: "d8", district: 8, name: "Marqueece Harris-Dawson",
    neighborhoods: "Baldwin Hills · Crenshaw · Leimert Park · Jefferson Park · West Adams",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Council President — institutionally the most cautious vote on the council. South LA district (Baldwin Hills, Crenshaw, Leimert Park) has no direct wildfire stake. Voted YES on Dec 9 referral; no specific DRD statement on record, but his equity concerns are likely based on public role and district context: why should citywide property tax revenue benefit Palisades homeowners? Module 2's employment data (construction jobs in South/East LA) and Module 3's insurance argument (FAIR Plan crisis in South LA too) are the only angles likely to move him.",
    concern: "No specific DRD statement on record. Equity framing essential — 'Palisades recovery' alone will not move this district.",
    x: 240, y: 215,
  },
  {
    id: "d9", district: 9, name: "Curren D. Price Jr.",
    neighborhoods: "South Central · Watts · Exposition Park · Vermont Square",
    vote: "proceed",
    voteLabel: "✓ NO on Referral — Voted to Proceed",
    lean: "proceed",
    leanLabel: "Voted to Proceed",
    reason: "Co-sponsored the original Park–Nazarian–Price CRD motion on January 15, 2025, despite representing a South LA district (South Central, Watts, Exposition Park) with no direct wildfire stake. His co-sponsorship from the start — and subsequent NO vote on the Dec 9 referral — is the most symbolically significant data point for the equity argument: a South LA representative was on board before anyone made the citywide case formally. His motivation has not been publicly explained but likely reflects either support for the tool's broader climate application or inter-council relationships.",
    concern: "None on record. Co-sponsorship + proceed vote makes him one of the clearest likely DRD supporters.",
    x: 270, y: 238,
  },
  {
    id: "d10", district: 10, name: "Heather Hutt",
    neighborhoods: "Mid-City · Koreatown · West Adams · Olympic Park · South Robertson",
    vote: "proceed",
    voteLabel: "✓ NO on Referral — Voted to Proceed",
    lean: "proceed",
    leanLabel: "Voted to Proceed",
    reason: "District borders CD11 and includes communities with climate and fire exposure. Voted NO on the Dec 9 referral — likely motivated by geographic adjacency and constituency interest in recovery spillovers. One of the 5 who wanted to proceed without committee delay.",
    concern: "None on record.",
    x: 225, y: 188,
  },
  {
    id: "d11", district: 11, name: "Traci Park",
    neighborhoods: "Pacific Palisades · Venice · Mar Vista · Del Rey · Playa Vista · LAX area",
    vote: "proceed",
    voteLabel: "✓ NO on Referral — Motion Author",
    lean: "proceed",
    leanLabel: "Voted to Proceed",
    reason: "Motion author and lead advocate. Represents Pacific Palisades directly — has chaired the Ad Hoc Committee on LA Recovery since January 2025. Introduced the original CRD motion on Jan 15 (the week of the fire), then pivoted to a DRD substitute motion on Dec 9 floor. Voted NO on the Yaroslavsky-Blumenfield referral — the only CD11 member, and the member with the most direct constituency stake. She separately secured SCAG funding so the study would have zero general fund impact.",
    concern: "None — she is the champion of this effort.",
    x: 165, y: 185,
  },
  {
    id: "d12", district: 12, name: "John Lee",
    neighborhoods: "Chatsworth · Granada Hills · Porter Ranch · Northridge · Reseda · West Hills",
    vote: "proceed",
    voteLabel: "✓ NO on Referral — Voted to Proceed",
    lean: "proceed",
    leanLabel: "Voted to Proceed",
    reason: "NW Valley district is highly fire-exposed — Chatsworth, Porter Ranch, and Granada Hills are in active fire corridors. Voted NO on the Dec 9 referral, meaning he wanted to proceed without committee delay. One of only two non-Westside members (along with Price Jr.) among the 5 who voted to proceed. Strong constituency-driven motivation.",
    concern: "None on record.",
    x: 155, y: 60,
  },
  {
    id: "d13", district: 13, name: "Hugo Soto-Martinez",
    neighborhoods: "Silver Lake · Echo Park · Elysian Valley · Atwater Village · East Hollywood",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "The council's most vocal progressive on housing and climate — authored motions on tenant protections and climate resilience. Voted YES on Dec 9 referral; no public statement opposing the DRD specifically. His vote to refer may reflect procedural caution or equity concerns (gentrification risk in fire recovery zones) rather than opposition. A well-structured DRD with explicit affordable housing and climate equity language would align with his platform.",
    concern: "No public DRD position on record. Likely concerns: gentrification acceleration in fire recovery, housing affordability, who captures the benefit.",
    x: 318, y: 158,
  },
  {
    id: "d14", district: 14, name: "Ysabel Jurado",
    neighborhoods: "Downtown · Boyle Heights · Eagle Rock · El Sereno · Highland Park · Garvanza",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-yay",
    leanLabel: "Lean YAY",
    reason: "Progressive challenger who unseated Kevin De León in November 2024 with ~56% of the vote. Represents one of LA's most working-class and Latino districts. Strong environmental justice orientation — Boyle Heights has long been a frontline community on air quality and climate. Module 2's employment multiplier data (construction jobs concentrated in zip codes like hers) and Module 3's insurance equity argument are both natural fits for her constituency and political brand. First-term member still building her agenda — more likely to be persuaded by a well-framed equity + climate argument than a fiscal one.",
    concern: "Voted YES on Dec 9 referral — no public DRD position on record. As a first-term member, may have deferred to senior progressive colleagues. No specific DRD objections stated.",
    x: 330, y: 188,
  },
  {
    id: "d15", district: 15, name: "Tim McCosker",
    neighborhoods: "San Pedro · Wilmington · Harbor City · Harbor Gateway · Watts",
    vote: "refer",
    voteLabel: "YES on Referral — Position on DRD Unknown",
    lean: "lean-nay",
    leanLabel: "Lean NAY",
    reason: "Harbor district — geographically, economically, and politically the most distant from Pacific Palisades on the council. San Pedro, Wilmington, and Harbor City have no wildfire stake and no direct connection to the recovery. Voted YES on Dec 9 referral; no public DRD position. Port and industrial concerns dominate the district agenda. Without a compelling constituency argument, his vote is the hardest to move.",
    concern: "No public DRD position. No constituency pressure either way — the hardest vote to move without a district-specific argument.",
    x: 295, y: 278,
  },
];

const VOTE_COUNTS = {
  proceed: MEMBERS.filter(m => m.vote === "proceed").length,
  refer: MEMBERS.filter(m => m.vote === "refer").length,
};

function VoteBadge({ vote, lean }) {
  const map = {
    proceed: { bg: C.yayBg, border: C.yayBorder, color: C.yay, label: "Voted to Proceed" },
    "lean-yay": { bg: "#f0fdf4", border: "#86efac", color: "#15803d", label: "Lean: Support" },
    refer: { bg: "#f1f5f9", border: "#cbd5e1", color: "#64748b", label: "Voted to Refer" },
    uncertain: { bg: "#f3f4f6", border: "#d1d5db", color: T.sub, label: "Position Unknown" },
    "lean-nay": { bg: C.nayBg, border: C.nayBorder, color: C.nay, label: "Lean: Oppose" },
  };
  const key = vote === "proceed" ? "proceed" : lean;
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
    if (m.vote === "proceed") return C.yay;
    if (m.lean === "lean-yay") return "#65a30d";
    if (m.lean === "lean-nay") return C.nay;
    return "#94a3b8";
  };

  const getBg = (m) => {
    if (m.vote === "proceed") return C.yayBg;
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
          <rect x="0" y="0" width="118" height="62" rx="6" fill="white" stroke={C.border} strokeWidth="1" />
          {[
            { col: C.yay, label: "Voted to Proceed" },
            { col: "#65a30d", label: "Lean: Support DRD" },
            { col: "#94a3b8", label: "Voted to Refer" },
            { col: C.nay, label: "Lean: Oppose DRD" },
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
    if (filter === "yay") return m.vote === "proceed" || m.lean === "lean-yay";
    if (filter === "nay") return m.lean === "lean-nay";
    if (filter === "uncertain") return m.lean === "uncertain";
    if (filter === "committee") return m.vote === "refer";
    return true;
  });

  const leanYay = MEMBERS.filter(m => m.vote === "proceed" || m.lean === "lean-yay").length;
  const leanYayOnly = MEMBERS.filter(m => m.vote !== "proceed" && m.lean === "lean-yay").length;
  const leanNay = MEMBERS.filter(m => m.lean === "lean-nay").length;
  const uncertain = MEMBERS.filter(m => m.lean === "uncertain").length;

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
            { id: "scoreboard", label: "1. Dec 9 Vote", indent: false },
            { id: "map", label: "- District Map", indent: true },
            { id: "members", label: "- Council Members", indent: true },
            { id: "feasibility", label: "- $300K Study Status", indent: true },
            { id: "sentiment", label: "2. Current Status", indent: false },
            { id: "resident-sentiment", label: "- Resident Voices", indent: true },
            { id: "comparison", label: "3. CRD vs DRD", indent: false },
            { id: "strategy", label: "4. Strategy", indent: false },
            { id: "analysis", label: "- Path to 8 Votes", indent: true },
            { id: "levers", label: "- 3 Levers", indent: true },
            { id: "modules", label: "- Analysis Modules", indent: true },
            { id: "diagram", label: "- Strategy Diagram", indent: true },
            { id: "references", label: "5. References", indent: false },
          ].map(s => (
            <button key={s.id} onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setSidebarOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: s.indent ? "4px 10px 4px 22px" : "6px 10px", marginBottom: 1, borderRadius: 6, border: "none", background: "transparent", color: s.indent ? T.faint : T.sub, cursor: "pointer", fontSize: s.indent ? 11 : 11.5, fontFamily: "Georgia, serif", fontWeight: s.indent ? 400 : 500 }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Members by Vote</div>
          {[
            { key: "all", label: "All 15 Members" },
            { key: "yay", label: "Voted to Proceed / Lean Support" },
            { key: "committee", label: "Voted to Refer (YES on referral)" },
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
            const col = m.vote === "proceed" ? C.yay : m.lean === "lean-nay" ? C.nay : m.lean === "lean-yay" ? "#65a30d" : "#94a3b8";
            return (
              <button key={m.id} onClick={() => { setSelected(m.id === selected ? null : m.id); setSidebarOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "5px 8px", borderRadius: 6, border: "none", background: selected === m.id ? "#f0f9ff" : "transparent", cursor: "pointer", marginBottom: 1 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: col, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: "white" }}>{m.district}</span>
                </div>
                <span style={{ fontSize: 11, color: selected === m.id ? C.palisades : T.sub, fontWeight: selected === m.id ? 600 : 400 }}>{m.name.endsWith("Jr.") ? m.name.split(" ").slice(-2).join(" ") : m.name.split(" ").slice(-1)[0]}</span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 9.5, color: T.faint, lineHeight: 1.5 }}>
          Dec 9 vote was procedural only — not a vote on DRD itself. Lean assessments based on public statements and district interests, not the referral vote.
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
            <p style={{ fontSize: 13.5, color: T.sub, margin: 0, lineHeight: 1.75, maxWidth: 660 }}>
              Traci Park (CD11) — joined by Nazarian (D2) and Price (D9) — introduced <a href="https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&amp;cfnumber=25-0006-S38" target="_blank" rel="noopener noreferrer" style={{ color: C.palisades, textDecoration: "underline" }}>CF 25-0006-S38</a> on January 15, 2025, the week of the fire.
              On December 9, 2025, the full council held a key procedural vote on the matter — see below.
              The Park–Lee substitute motion directing the city to pursue a <strong>Disaster Recovery District (DRD)</strong> subsequently passed the Economic Development and Jobs Committee on February 17, 2026.
              It still requires <strong>Budget &amp; Finance Committee action</strong> and a <strong>Full Council vote of 8 out of 15</strong> to advance.
            </p>
          </div>

          {/* CONTEXT BOX */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "13px 18px", marginBottom: 20, fontSize: 12, color: T.sub, lineHeight: 1.75 }}>
            <span style={{ fontWeight: 700, color: T.heading }}>What was the December 9 vote? </span>
            The June 2025 EWDD report on CRD feasibility had already been shelved by Budget &amp; Finance in October. On December 9, Park introduced a new substitute motion on the floor — the Park–Lee motion — pivoting from a CRD to a Disaster Recovery District (DRD) under SB 782, which was signed into law on October 10, 2025. Yaroslavsky and Blumenfield then moved to refer the entire matter — CF 25-0006-S38, including the Park–Lee substitute — to Budget &amp; Finance and the Economic Development and Jobs Committee, rather than allowing a direct council vote. The 10–5 vote below reflects that <em>referral motion</em>. It was a procedural vote on process, not a vote on the DRD itself. The 10 who voted YES were voting to send it to committee; their actual positions on the DRD are largely unknown.
          </div>

          {/* VOTE SCOREBOARD */}

          <div id="scoreboard" style={{ marginBottom: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div style={{ background: C.yayBg, border: `1px solid ${C.yayBorder}`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.yay }}>{VOTE_COUNTS.proceed}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.heading, marginTop: 2 }}>Voted to Proceed</div>
                <div style={{ fontSize: 10.5, color: T.sub, marginTop: 4, lineHeight: 1.5 }}>NO on Yaroslavsky-Blumenfield referral motion · DRD position: likely supportive</div>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#64748b" }}>{VOTE_COUNTS.refer}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.heading, marginTop: 2 }}>Voted to Refer</div>
                <div style={{ fontSize: 10.5, color: T.sub, marginTop: 4, lineHeight: 1.5 }}>YES on referral motion · DRD position: unknown — reasons vary by member</div>
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 13, color: "#1e3a8a" }}>
                <strong>Dec 9, 2025 · Procedural vote only</strong> — Yaroslavsky-Blumenfield motion to refer passed 10–5
              </div>
              <div style={{ fontSize: 12, color: "#3b82f6" }}>
                Needs <strong>8 of 15</strong> council votes to pass the DRD feasibility study
              </div>
            </div>
          </div>

          {/* VOTE BAR */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 8 }}>Projected Outcome</div>
            <div style={{ height: 32, borderRadius: 8, overflow: "hidden", display: "flex", border: `1px solid ${C.border}` }}>
              <div style={{ width: `${(VOTE_COUNTS.proceed / 15) * 100}%`, background: C.yay, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{VOTE_COUNTS.proceed} Proceed</span>
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
                    { col: "#94a3b8", label: "Voted to Refer", desc: "YES on referral — DRD position unknown" },
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
                const col = m.vote === "proceed" ? C.yay : m.lean === "lean-nay" ? C.nay : m.lean === "lean-yay" ? "#65a30d" : "#94a3b8";
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
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>CF 25-0006-S38 · Full Timeline</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 16px" }}>From Motion to Committee — January 2025 to Present</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  date: "Jan 15, 2025",
                  label: "Motion introduced — CF 25-0006-S38",
                  cfLink: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38",
                  detail: "Traci Park introduces motion asking EWDD to study the feasibility of a Climate Resilience District (CRD) for the Palisades burn area — the week of the fire. Referred to Budget & Finance, Economic Development, and Energy & Environment committees.",
                  status: "done",
                },
                {
                  date: "Feb–Mar 2025",
                  label: "Ad Hoc Committee + Budget & Finance approve → Full Council adopts",
                  detail: "Ad Hoc Committee for LA Recovery approves (Feb 6). Budget & Finance concurs with amendment on Feb 18 — adding bullet (f) requiring analysis of financing mechanisms and fiscal impact to the city's bottom line. B&F vote unanimous 5-0: Yaroslavsky, Blumenfield, Hutt, McOsker, Hernandez all YES. Full Council adopts on March 19 — motion presented by Yaroslavsky, seconded by Park. Original motion was co-sponsored by Park, Nazarian (D2), and Price (D9). At this stage, Yaroslavsky is working with Park, not against her.",
                  status: "done",
                },
                {
                  date: "Jun 16, 2025",
                  label: "EWDD issues report on CRD feasibility",
                  cfLink: "https://cityclerk.lacity.org/onlinedocs/2025/25-0006-S38_misc_6-16-25.pdf",
                  detail: "EWDD submits report concluding the Palisades area warrants further analysis. Report recommends engaging an outside consultant to conduct a boundary and feasibility study at an estimated cost of $300,000. Notes CRDs take 18–36 months to form and may not serve immediate recovery needs.",
                  status: "done",
                },
                {
                  date: "Oct 7, 2025",
                  label: "Budget & Finance: received and filed",
                  detail: "Budget & Finance Committee moves to Receive and File the EWDD June 16 report — effectively shelving it without approving funding. Vote unanimous 5-0: Yaroslavsky YES, Blumenfield YES, Hutt YES, McOsker YES, Hernandez YES. Notable: Hernandez (D1), currently assessed as a likely DRD supporter, voted to shelve at committee level. Yaroslavsky's stated position: a citywide fiscal analysis of TIF district impacts is needed before approving any individual district study. This is the same Yaroslavsky who voted YES to commission the study in February 2025 — the EWDD report's fiscal findings shifted her position.",
                  status: "done",
                },
                {
                  date: "Oct 10, 2025",
                  label: "⚡ SB 782 signed into law — DRD tool created",
                  status_override: "pivot",
                  detail: "Governor Newsom signs SB 782 (Pérez) into law on October 10, 2025, creating Disaster Recovery Districts as an emergency TIF tool for declared disaster areas. The bill was authored in response to the Eaton and Palisades wildfires and sponsored by the County of Los Angeles. DRDs have a streamlined formation process compared to CRDs — no protest threshold, expedited timeline, directly tied to disaster declarations. This new tool is what enables Park to pivot from CRD to DRD on December 9. Without SB 782, the only option was still the slower CRD process that EWDD had already flagged as too slow for short-term recovery.",
                  status: "done",
                },
                {
                  date: "Dec 9, 2025",
                  label: "Procedural referral vote — 10–5",
                  detail: "The June EWDD report having been shelved, Park introduces a substitute motion (Park–Lee) on the floor to pursue a DRD under SB 782 — the new disaster recovery tool enacted in September. The motion authorizes $300K from the Economic Development Trust Fund (not general fund) to pay Kosmont Companies, which had already been retained under the Mayor's Emergency Declaration. Yaroslavsky and Blumenfield move to refer the entire matter — including the Park–Lee substitute — to Budget & Finance and Economic Development and Jobs Committee. That referral motion passes 10–5. Procedural vote only — not a vote on the DRD itself.",
                  status: "done",
                },
                {
                  date: "Jan 27, 2026",
                  label: "EWDD requests authorization to fund $300K DRD feasibility study",
                  cfLink: "https://cityclerk.lacity.org/onlinedocs/2025/25-0006-s38_rpt_EWDD_1-26-26.pdf",
                  detail: "EWDD submits formal transmittal requesting Council authorization to transfer $300,000 from the Economic Development Trust Fund (not general fund) to fund a comprehensive DRD feasibility study. Kosmont Companies had already been retained under the Mayor's Emergency Declaration and — through a separate SCAG contract ($75K covering both Palisades and Eaton DRDs) — completed preliminary feasibility work. The $300K breaks down as: $220K to expand Kosmont's existing analysis into a full feasibility study, and $80K for boundary mapping required by the State Board of Equalization. Key preliminary finding from Kosmont: pre-fire assessed value ~$21.3B, post-fire ~$16.3B (loss of ~$5B across 5,581 damaged/destroyed structures). Projected DRD revenue: $325M–$1.9B over term depending on duration, County participation, and TIF allocation.",
                  status: "done",
                },
                {
                  date: "Feb 17, 2026",
                  label: "Economic Development and Jobs Committee approves",
                  detail: "Committee moves to approve the EWDD Jan 27 report — including authorization to transfer $300K from the Economic Development Trust Fund to fund the Kosmont feasibility study — and approves the Park–Lee substitute motion directing the city to pursue a DRD. The June 16, 2025 EWDD report is noted and filed. This is the first substantive committee-level approval of the DRD direction.",
                  status: "done",
                },
                {
                  date: "Now — Feb 2026",
                  label: "Budget & Finance Committee: no action yet",
                  detail: "Economic Development and Jobs Committee has approved both the EWDD report and the Park–Lee DRD substitute motion. Budget & Finance Committee — chaired by Yaroslavsky — has not yet scheduled action. Once both committees act, a Full Council vote of 8 out of 15 is needed to authorize EWDD to proceed with the Kosmont feasibility study. Note: Council approval at this stage authorizes only the study — any decision to actually form a DRD requires subsequent Council and Mayor action.",
                  status: "pending",
                },
              ].map((step, i, arr) => (
                <div key={step.date} style={{ display: "flex", gap: 14, paddingBottom: i < arr.length - 1 ? 18 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", marginTop: 4, flexShrink: 0,
                      background: step.status_override === "pivot" ? "#b91c1c" : step.status === "done" ? C.yay : step.status === "pending" ? C.committee : "#e5e7eb" }} />
                    {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, marginTop: 4 }} />}
                  </div>
                  <div style={{ background: step.status_override === "pivot" ? "#fff1f2" : "transparent", border: step.status_override === "pivot" ? "2px solid #b91c1c" : "none", borderRadius: step.status_override === "pivot" ? 10 : 0, padding: step.status_override === "pivot" ? "10px 14px" : 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                        color: step.status_override === "pivot" ? "#b91c1c" : step.status === "done" ? C.yay : step.status === "pending" ? C.committee : T.faint }}>{step.date}</span>
                      {step.cfLink
                        ? <a href={step.cfLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: step.status_override === "pivot" ? "#b91c1c" : T.heading, textDecoration: "underline" }}>{step.label} ↗</a>
                        : <span style={{ fontSize: 12, fontWeight: 700, color: step.status_override === "pivot" ? "#b91c1c" : T.heading }}>{step.label}</span>
                      }
                    </div>
                    <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.65 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: "#1e40af", lineHeight: 1.6 }}>
              <strong>Current status:</strong> Economic Development and Jobs Committee approved both the EWDD Jan 27 report and the Park–Lee DRD substitute motion on Feb 17, 2026. Budget & Finance Committee action still pending (Yaroslavsky chair). A Full Council vote of 8 out of 15 is then required — but this would authorize only the $300K feasibility study, not DRD formation itself.
            </div>
          </div>



          {/* ── CURRENT STATUS ── */}
          <div id="sentiment" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", marginBottom: 12, paddingLeft: 0 }}>2. Current Status</div>
          <div id="sentiment-inner" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>As of Feb 2026</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 16px" }}>Current Sentiment — 3 Camps</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  num: "1",
                  title: "\"Just do something\" — DRD now",
                  color: C.yay,
                  bg: C.yayBg,
                  border: C.yayBorder,
                  who: "Traci Park, PPCC (via WRAC), Resilient Palisades, Palisades residents",
                  argument: "LA County is in the process of establishing SB 782-based recovery districts for Altadena (Eaton Fire) and for unincorporated Santa Monica Mountains communities (Palisades Fire, incl. Topanga) — both still pending formal establishment. The Palisades proper, a City of LA jurisdiction, is the only major fire area without even an initiated district process. Park secured SCAG funding so there is no budget impact. Every month of delay is a month the recovery proceeds without long-term infrastructure financing. The feasibility study alone does not cost the city anything.",
                  sources: [
                    { label: "CD11 Recovery Updates", href: "https://cd11.lacity.gov/palisades-recovery-updates" },
                    { label: "Daily News Dec 9", href: "https://www.dailynews.com/2025/12/09/l-a-city-council-splits-on-study-for-palisades-climate-resilience-district/" },
                  ],
                },
                {
                  num: "2",
                  title: "\"CRD is the better tool\" — think bigger",
                  color: "#047857",
                  bg: "#f0fdf4",
                  border: "#bbf7d0",
                  who: "Some policy advocates, opinion writers (Times of San Diego, Jan 2026)",
                  argument: "DRD revenue is restricted to disaster recovery and expires. A CRD is a permanent local government entity that can levy taxes, sell bonds, and coordinate across jurisdictions. Palisades, the unincorporated Santa Monica Mountains communities, and Malibu being split into separate districts is inefficient — a single larger CRD spanning city and county lines would have more financing capacity and more political leverage. The DRD/CRD overlap constraint also means choosing wrong now locks you out later.",
                  sources: [
                    { label: "Times of San Diego — Opinion, Dec 26 2025", href: "https://timesofsandiego.com/opinion/2025/12/26/californias-fire-victims-can-take-control-climate-resilience-district/" },
                    { label: "Democracy Local — Jan 2 2026", href: "https://democracylocal.substack.com/p/column-how-victims-of-climate-disaster" },
                  ],
                },
                {
                  num: "3",
                  title: "\"Analysis first\" — no shortcuts",
                  color: C.committee,
                  bg: C.committeeBg,
                  border: C.committeeBorder,
                  who: "Yaroslavsky (D5), Harris-Dawson (D8), majority of Council",
                  argument: "TIF districts divert future property tax increment away from the general fund for decades. LA is already facing a $1B+ deficit. Yaroslavsky voted YES in February 2025 to commission the CRD study — her skepticism is not reflexive. It was the EWDD's own June 2025 report that shifted her position: the report explicitly warned that a CRD formed early in recovery could reduce general fund revenue below pre-fire levels (citing the 2017 Tubbs Fire as precedent). The B&F committee shelved the report 5-0 in October, including Hernandez. Yaroslavsky's ask: complete a citywide fiscal analysis of TIF district impacts before approving any individual district.",
                  sources: [
                    { label: "Mar Vista Voice — Dec 12 2025", href: "https://marvistavoice.org/city-council-pumps-the-brakes-on-palisades-climate-resilience-district-study/" },
                    { label: "Daily News — Yaroslavsky quotes", href: "https://www.dailynews.com/2025/12/09/l-a-city-council-splits-on-study-for-palisades-climate-resilience-district/" },
                  ],
                },
              ].map(camp => (
                <div key={camp.num} style={{ background: camp.bg, border: `1px solid ${camp.border}`, borderLeft: `4px solid ${camp.color}`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: camp.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{camp.num}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>{camp.title}</div>
                  </div>
                  <div style={{ fontSize: 11, color: camp.color, fontWeight: 600, marginBottom: 6, paddingLeft: 32 }}>{camp.who}</div>
                  <div style={{ fontSize: 12, color: T.body, lineHeight: 1.7, marginBottom: 10, paddingLeft: 32 }}>{camp.argument}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingLeft: 32 }}>
                    {camp.sources.map(s => (
                      <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 10.5, color: camp.color, textDecoration: "none", background: "white", border: `1px solid ${camp.border}`, borderRadius: 4, padding: "2px 8px" }}>
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ANALYSIS */}

          {/* RESIDENT SENTIMENT */}
          <div id="resident-sentiment" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>CF 25-0006-S38 · Public Comment · Feb 16–17, 2026</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 6px" }}>Resident Voices</h2>
            <p style={{ fontSize: 11.5, color: T.sub, margin: "0 0 16px", lineHeight: 1.6 }}>
              Selected public comments submitted to the Economic Development and Jobs Committee ahead of the Feb 17, 2026 hearing. Note: residents largely use "CRD" and "DRD" interchangeably — the specific instrument is less salient to them than the outcome.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  name: "Kathrin Werner",
                  date: "Feb 16, 2026",
                  theme: "Urgency + insurance + displacement",
                  themeColor: C.yay,
                  quote: "The Climate Resilience District determines whether Pacific Palisades can properly rebuild its infrastructure, restore insurability, and bring hope to residents who have lost everything. We do not lack proof that a CRD is feasible — we lack the CRD itself.",
                  note: "Also flags displacement: 'seniors and lower-income residents are being pushed out while developers move in.' Cites Altadena comparison directly: 'Altadena already has an authority and a coordinated recovery path.'",
                },
                {
                  name: "Kari Weaver",
                  date: "Feb 17, 2026",
                  theme: "Property tax recovery argument",
                  themeColor: "#1d4ed8",
                  quote: "The faster we can rebuild, the sooner the property owners of the Palisades will pay property taxes not only on the land, but the dwelling. We need a CRD in the Palisades in order to help us with our rebuild. Please vote yes on the feasibility study.",
                  note: "Resident making the same fiscal argument as Module 1 — naturally. Not a policy advocate, just a homeowner.",
                },
                {
                  name: "Patrice Dobrowitsky",
                  date: "Feb 16, 2026",
                  theme: "Frustration — city governance failures",
                  themeColor: C.committee,
                  quote: "You, our leadership, have to stop stalling and get on this. Houses are going up, we don't know who is rebuilding safely. We need rules and we should definitely be a Climate Resilience District.",
                  note: "Broader frustration with LAHSA, DWP, fire chief, City Attorney sitting on AECOM report. CRD/DRD framed as one piece of a general accountability failure.",
                },
                {
                  name: "Paul Nagle",
                  date: "Feb 17, 2026",
                  theme: "Support — but wants credible, objective process",
                  themeColor: "#7c3aed",
                  quote: "There is tremendous promise in the creation of a CRD, but the entire community should understand the facts of such a measure. I urge the committee to commission a time-efficient, objective and highly credible study.",
                  note: "Nuanced: supportive but wary of ideological capture. 'These should not be guided by ideological motives, but from a sincere desire to determine how a CRD can make a meaningful contribution.' Closest resident voice to Yaroslavsky's 'analysis first' position — but ultimately pro-study.",
                },
              ].map(c => (
                <div key={c.name} style={{ background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${c.themeColor}`, borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: T.heading }}>{c.name}</span>
                      <span style={{ fontSize: 10, color: T.faint }}>{c.date}</span>
                    </div>
                    <span style={{ fontSize: 9.5, fontWeight: 600, color: c.themeColor, background: "white", border: `1px solid ${c.themeColor}30`, borderRadius: 4, padding: "2px 7px" }}>{c.theme}</span>
                  </div>
                  <div style={{ fontSize: 12, color: T.body, lineHeight: 1.7, fontStyle: "italic", marginBottom: 8, borderLeft: "2px solid #e5e7eb", paddingLeft: 10 }}>
                    "{c.quote}"
                  </div>
                  <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.6 }}>{c.note}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 11, color: T.faint, lineHeight: 1.6, fontStyle: "italic" }}>
              Patterns: All four support moving forward with a DRD or CRD for the Palisades. Three use "CRD" not "DRD." Kathrin Werner and Kari Weaver independently make the property tax / insurability argument — the same logic as Module 1 and Module 3. Altadena comparison raised organically.
            </div>
          </div>

          </div>

          <div id="rebuilding" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Recovery Snapshot</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 6px" }}>Palisades Rebuilding Progress</h2>
            <div style={{ fontSize: 11, color: "#92400e", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 6, padding: "6px 10px", marginBottom: 14, display: "inline-flex", gap: 6, alignItems: "center" }}>
              <span>⚠️</span>
              <span>Trying to find data specific to the Palisades Fire — numbers are currently missing pending verified sourcing.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
              {[
                { value: "—", label: "Permits Issued", sub: "Palisades-specific data pending" },
                { value: "—", label: "Homes Under Construction", sub: "Palisades-specific data pending" },
                { value: "—", label: "Avg. Permit Review Time", sub: "Palisades-specific data pending" },
              ].map(s => (
                <div key={s.label} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: T.faint }}>{s.value}</div>
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
                { icon: "⚠️", title: "Cost & Insurance Hurdles", text: "— High rebuilding costs and insurance gaps remain the primary bottleneck. Palisades-specific construction start rate data pending." },
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
              <strong>Timeline:</strong> Full community recovery is projected on a <strong>5–10 year horizon</strong>, particularly for major infrastructure overhauls. The pace depends heavily on insurance resolution and financing tools like the DRD.
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



          {/* ── STRATEGY ── */}
          <div id="strategy" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", marginBottom: 12 }}>4. Strategy — Reaching 8 out of 15 Votes</div>

            {/* PLACEHOLDER BANNER */}
            <div style={{ background: "#fef9c3", border: "2px dashed #ca8a04", borderRadius: 10, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>PLACEHOLDER — Draft Only</div>
                <div style={{ fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
                  The strategy outlined in this section has not yet been discussed or validated with the project group. All content — levers, analysis modules, framing, and target members — is draft analysis and should not be treated as agreed-upon approach. Provided here for discussion purposes only.
                </div>
              </div>
            </div>

            {/* STRATEGY OVERVIEW */}
            <div style={{ background: "white", border: `1px solid ${C.border}`, borderLeft: "4px solid #1e3a8a", borderRadius: 10, padding: "18px 22px", marginBottom: 24 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#1e3a8a", textTransform: "uppercase", marginBottom: 4 }}>Overview</div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 12px" }}>What We Need — and Why</h2>
              <p style={{ fontSize: 13, color: T.body, lineHeight: 1.75, margin: "0 0 10px" }}>
                On December 9, 2025, the LA City Council voted 10–5 to refer CF 25-0006-S38 — including the Park–Lee substitute motion directing the city toward a Disaster Recovery District (DRD) — to committee, rather than voting on it directly. This was a procedural vote, not a vote on the DRD itself. The Park–Lee motion would authorize a $300K feasibility study under SB 782, the disaster recovery TIF tool signed into law on October 10, 2025. Advancing it requires 8 out of 15 council votes. The political will exists among several members who voted to delay — Rodriguez (D7), Soto-Martinez (D13), and Hernandez (D1) all have district-level reasons to support recovery investment. What's missing is the argument that lands in <em>their</em> districts, not just CD11.
              </p>
              <p style={{ fontSize: 13, color: T.body, lineHeight: 1.75, margin: "0 0 10px" }}>
                Yaroslavsky's stated objection is fiscal: TIF diverts property tax increment from the general fund. That objection hasn't been answered with numbers — only with urgency arguments, which lost. The counter-argument she hasn't seen is the <strong>cost of inaction</strong>: if Palisades recovery stalls, the tax base she's protecting erodes anyway.
              </p>
              <p style={{ fontSize: 13, color: T.body, lineHeight: 1.75, margin: "0 0 14px" }}>
                The strategy has two components that must work together: <strong>3 political levers</strong> targeting specific council members and coalitions, and <strong>3 analysis modules</strong> producing the data each lever needs to be persuasive. Right now the levers exist but lack numbers. The analysis provides those numbers — and the coalition delivers them to the right districts.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", marginBottom: 4 }}>Data we need to produce</div>
                  <div style={{ fontSize: 11.5, color: T.body, lineHeight: 1.65 }}>Property tax revenue scenarios (cost of inaction), citywide employment multipliers by geography, insurance market stabilization mechanism with FAIR Plan data</div>
                </div>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#047857", marginBottom: 4 }}>Arguments we need to land</div>
                  <div style={{ fontSize: 11.5, color: T.body, lineHeight: 1.65 }}>DRD doesn't cost the general fund — a failed recovery does. Recovery jobs go to South/East LA. Insurance crisis is citywide, not a Palisades problem.</div>
                </div>
              </div>
            </div>


          <div id="analysis" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Strategy · Step 1</div>
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



          {/* ── 3 LEVERS IN DEPTH ── */}
          <div id="levers" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Political Strategy</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 4px" }}>3 Levers — In Depth</h2>
            <p style={{ fontSize: 12, color: T.sub, margin: "0 0 20px", lineHeight: 1.6 }}>
              Each lever targets a different failure point in the December 9 vote. Together, they address the fiscal objection, reframe the ask, and build cross-district constituent pressure.
            </p>

            {[
              {
                num: "1",
                color: C.nay,
                bg: C.nayBg,
                border: C.nayBorder,
                label: "THE CRISIS MEMO",
                title: "Flip the Fiscal Frame",
                target: "Primary target: Yaroslavsky (D5, Budget & Finance Chair)",
                body: [
                  {
                    t: "The problem",
                    p: `Yaroslavsky's stated objection is that TIF districts divert property tax increment from the general fund for decades — and with LA facing a $1B budget deficit, she argues the city can't afford to lock up future revenue. On December 9, Park made the urgency argument verbally — the study has SCAG funding, there's no budget impact. It wasn't enough. The referral passed anyway. The problem wasn't the argument — it was the absence of numbers showing what inaction actually costs.`
                  },
                  {
                    t: "The reframe",
                    p: `Palisades is one of the highest-value property tax bases in LA City. The 90272 and 90402 zip codes generate disproportionate assessed value relative to their land area. If recovery stalls and only 30–50% of homeowners rebuild — as happened in Paradise after the Camp Fire — the property tax increment Yaroslavsky is "protecting" disappears anyway. The DRD doesn't cost the general fund. A failed recovery destroys it.`
                  },
                  {
                    t: "The deliverable",
                    p: `A 2-page memo to the Budget & Finance Committee quantifying two scenarios: (A) no DRD, 50% non-rebuild rate over 10 years — projected general fund revenue loss; (B) DRD with accelerated rebuild — recovered and growing tax base. The delta is the "cost of inaction." AECOM's February 2026 reports already establish the ~$1B infrastructure gap through 2033. The memo attaches a tax revenue projection to those rebuild scenarios.`,
                    links: [
                      { text: "AECOM infrastructure reports via CD11", href: "https://cd11.lacity.gov/palisades-recovery-updates" },
                      { text: "Council File 25-0006-S38", href: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38" },
                      { text: "Mar Vista Voice — Yaroslavsky's objections in detail", href: "https://marvistavoice.org/city-council-pumps-the-brakes-on-palisades-climate-resilience-district-study/" },
                    ]
                  },
                ]
              },
              {
                num: "2",
                color: "#047857",
                bg: "#f0fdf4",
                border: "#bbf7d0",
                label: "CAPITAL STACK FRAMING",
                title: "Make the Ask Smaller",
                target: "Primary targets: Yaroslavsky (D5), Blumenfield (D3), McCosker (D15) — the fiscal conservatives",
                body: [
                  {
                    t: "The problem",
                    p: `The current debate treats the DRD as the solution — the primary recovery mechanism. That framing is losing. Fiscally conservative members see it as an untested tool they're being asked to bet the recovery on, with no clarity on how much of the total financing gap it actually covers. Saying "we need a DRD" without contextualizing it in a larger stack makes it sound like a bigger commitment than it is.`
                  },
                  {
                    t: "The reframe",
                    p: `TIF/increment capture is a lagging instrument. It doesn't generate Day 1 liquidity — it services long-term infrastructure debt once property values recover, typically 3–7 years post-formation. That means the DRD sits in the lower-middle of any rational recovery financing stack. Above it: federal infrastructure programs, state IBank financing, FEMA hazard mitigation grants. Below it: philanthropic first-loss capital, community foundation grants. The DRD is not the bet. It's one layer.`
                  },
                  {
                    t: "The political logic",
                    p: `Yaroslavsky can support a DRD as part of a responsible multi-instrument strategy more easily than she can support it as the city's sole recovery mechanism. Framing it this way also opens the door to complementary instruments — California IBank has deployed disaster recovery financing before, and the state has strong incentive to prevent LA's insurance market from further collapsing. A capital stack diagram showing the DRD's proportional role makes the ask concrete and bounded.`,
                    links: [
                      { text: "California IBank — Infrastructure State Revolving Fund", href: "https://ibank.ca.gov/infrastructure-state-revolving-fund-program/" },
                      { text: "Democracy Local — Cross-jurisdictional CRD argument", href: "https://democracylocal.substack.com/p/column-how-victims-of-climate-disaster" },
                    ]
                  },
                ]
              },
              {
                num: "3",
                color: C.committee,
                bg: C.committeeBg,
                border: C.committeeBorder,
                label: "COALITION PRESSURE",
                title: "Bring the Right Voices to the Right Districts",
                target: "Primary targets: Rodriguez (D7), Soto-Martinez (D13), Hernandez (D1) — the lean-YAY flip votes",
                body: [
                  {
                    t: "The problem",
                    p: `On December 9, the only organized pressure came from CD11. The referral motion passed 10–5 — but of the 10 who voted to refer, most have not stated a public position on the DRD itself. Rodriguez (D7), Soto-Martinez (D13), and Hernandez (D1) are among those whose DRD positions remain unknown. They don't need to be "flipped" from opposition — they need to be given a reason to actively support the study in their own districts. "Palisades residents want this" is not that reason.`
                  },
                  {
                    t: "The three coalition partners",
                    p: `PPCC (Pacific Palisades Community Council) is the formal neighborhood council with institutional standing at City Hall — it can sign joint letters, submit formal comment, and testify at committee hearings. PPCC formally went on record supporting CF 25-0006-S38 at its board meeting on February 27, 2025, and submitted that position through WRAC (Westside Regional Alliance of Councils) — representing 14 neighborhood councils across CD5, CD10, CD11 and parts of CD4. That is geographic coverage well beyond Palisades. PRC (Palisades Recovery Coalition) has the ground-level organizing infrastructure: weekly LAPD Community Advisory Group coordination, monthly impact reports, and resident-led credibility that political bodies lack.`,
                    links: [
                      { text: "Palisades Recovery Coalition (PRC)", href: "https://palirecovery.org/" },
                      { text: "CD11 Recovery Updates — Park's office", href: "https://cd11.lacity.gov/palisades-recovery-updates" },
                    ]
                  },
                  {
                    t: "The message for each district",
                    p: `Rodriguez (D7, San Fernando Valley including Canoga Park and Reseda): Fire risk is real and proximate. The DRD's infrastructure hardening — undergrounded utilities, fire-resistant construction standards, hardened hydrant systems — reduces wildfire exposure across the entire urban-wildland interface, not just in Palisades. Soto-Martinez (D13, Silver Lake / Echo Park / Hollywood): Climate infrastructure investment framed as environmental justice. Module 2's employment data shows construction jobs go to East and South LA workers. Hernandez (D1, northeast LA including Lincoln Heights and Elysian Valley): Environmental justice + insurance equity angle. The FAIR Plan enrollment surge is hitting lower-income LA homeowners hardest. Infrastructure hardening in Palisades reduces the tail-risk that's driving insurers out of every LA zip code.`,
                    links: [
                      { text: "Times of San Diego — DRD as citywide governance tool", href: "https://timesofsandiego.com/opinion/2025/12/26/californias-fire-victims-can-take-control-climate-resilience-district/" },
                      { text: "Daily News — December 9 vote coverage", href: "https://www.dailynews.com/2025/12/09/l-a-city-council-splits-on-study-for-palisades-climate-resilience-district/" },
                    ]
                  },
                ]
              },
            ].map(lever => (
              <div key={lever.num} style={{ marginBottom: 24, border: `1px solid ${lever.border}`, borderLeft: `4px solid ${lever.color}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ background: lever.bg, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: lever.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{lever.num}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, letterSpacing: 2, color: lever.color, textTransform: "uppercase" }}>{lever.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>{lever.title}</div>
                  </div>
                </div>
                <div style={{ background: "#fafafa", padding: "4px 18px 6px", borderBottom: `1px solid ${lever.border}` }}>
                  <span style={{ fontSize: 10.5, color: T.faint, fontStyle: "italic" }}>{lever.target}</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  {lever.body.map((block, i) => (
                    <div key={i} style={{ marginBottom: i < lever.body.length - 1 ? 14 : 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: lever.color, marginBottom: 4 }}>{block.t}</div>
                      <p style={{ fontSize: 12.5, color: T.body, lineHeight: 1.75, margin: "0 0 8px" }}>{block.p}</p>
                      {block.links && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {block.links.map(lk => (
                            <a key={lk.href} href={lk.href} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 10.5, color: lever.color, background: lever.bg, border: `1px solid ${lever.border}`, borderRadius: 4, padding: "2px 8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3 }}>
                              {lk.text} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>



          {/* ── ANALYSIS MODULES ── */}
          <div id="modules" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Student Research Project · RAND</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 4px" }}>Analysis Modules — The Citywide Case</h2>
            <p style={{ fontSize: 12, color: T.sub, margin: "0 0 6px", lineHeight: 1.6 }}>
              Research question: Does accelerated Palisades recovery through a DRD produce measurable fiscal and economic benefits for the broader City of Los Angeles — beyond the Palisades itself?
            </p>
            <p style={{ fontSize: 11, color: T.faint, margin: "0 0 20px", lineHeight: 1.6, fontStyle: "italic" }}>
              Independent student research. Does not represent an official RAND Corporation position.
            </p>

            {[
              {
                num: "01",
                color: "#1d4ed8",
                bg: "#eff6ff",
                border: "#bfdbfe",
                label: "MODULE 1",
                title: "Palisades as a Fiscal Pillar of LA's General Fund",
                framing: "\"The DRD doesn't divert tax increment. A failed recovery destroys it.\"",
                framingFor: "→ Framing for Yaroslavsky (D5)",
                argument: `Yaroslavsky's stated concern is that TIF diverts property tax increment from the general fund. Two key facts undercut that framing. First, the $300K study is funded from the Economic Development Trust Fund — not the general fund — so approval has zero direct general fund impact. Second, if recovery stalls, the tax base Yaroslavsky is "protecting" erodes anyway. Kosmont's preliminary analysis (retained under the Mayor's Emergency Declaration, with supplementary SCAG funding) already quantifies this: pre-fire assessed value was ~$21.3B; post-fire it fell to ~$16.3B — a ~$5B loss across 5,581 damaged or destroyed structures. A DRD could generate $325M–$1.9B in revenue over its term depending on duration and participation. The module builds the long-run scenario: what does that $5B assessed value loss cost the general fund over 10 years if recovery is slow?`,
                analysis: [
                  "Baseline: Pre-fire assessed value (~$21.3B per Kosmont/SCAG) vs. post-fire (~$16.3B). Annual property tax contribution to LA City general fund from Palisades zip codes (90272, 90402).",
                  "Scenario A (No DRD): Model slow rebuild at 30%, 50%, 70% non-rebuild rates. Project assessed value recovery trajectory and corresponding general fund revenue loss over 10 years.",
                  "Scenario B (DRD): Model accelerated rebuild with infrastructure hardening. Use Kosmont's $325M–$1.9B revenue range as reference point for DRD financing capacity.",
                  "Delta: Net fiscal difference between scenarios — the quantified cost of inaction. Compare to TIF diversion amount to show which is larger.",
                ],
                note: "Kosmont's preliminary numbers ($21.3B pre-fire, $16.3B post-fire, $325M–$1.9B DRD revenue range) give you the starting point — the module extends and contextualizes them for a general fund argument. A scenario-based spreadsheet with documented assumptions is sufficient. Camp Fire (Paradise, CA) Butte County Assessor data is still the best slow-recovery comparable.",
                sources: [
                  { text: "EWDD Jan 27, 2026 Report — CF 25-0006-S38 (Kosmont preliminary numbers)", href: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38" },
                  { text: "LA County Assessor — parcel-level assessed values", href: "https://assessor.lacounty.gov" },
                  { text: "LA County Auditor-Controller — property tax apportionment by city", href: "https://auditorcontroller.lacounty.gov" },
                  { text: "CA Board of Equalization — annual property tax report", href: "https://www.boe.ca.gov/annual/index.html" },
                  { text: "CD11 Recovery Updates — AECOM infrastructure reports", href: "https://cd11.lacity.gov/palisades-recovery-updates" },
                ],
              },
              {
                num: "02",
                color: "#047857",
                bg: "#f0fdf4",
                border: "#bbf7d0",
                label: "MODULE 2",
                title: "Citywide Employment & Economic Multiplier Effects",
                framing: "\"The workers who rebuild Palisades live in South LA and East LA. Every month of delay is a month of lost wages in your district.\"",
                framingFor: "→ Framing for Rodriguez (D7), Soto-Martinez (D13), Harris-Dawson (D8)",
                argument: `Palisades reconstruction is not an economic event contained to one neighborhood. Construction labor, materials supply chains, and commercial recovery generate jobs and income across LA County — disproportionately benefiting working-class communities in South LA and East LA. This module makes the DRD a D8 and D14 argument, not just a CD11 argument.`,
                analysis: [
                  "Estimate total construction spending required for full Palisades rebuild (structure replacement value × projected rebuild rate)",
                  "Apply IMPLAN or BEA RIMS II multipliers to estimate direct, indirect, and induced employment effects",
                  "Disaggregate by geography — construction workforce in LA County skews heavily toward specific zip codes (Boyle Heights, Huntington Park, South Gate)",
                  "Compare slow vs. fast recovery: what employment is foregone if only 40% rebuild within 5 years vs. 80%?",
                ],
                note: "IMPLAN is the gold standard but has a learning curve. BEA RIMS II is a free alternative — transparent multiplier tables work well for a policy audience. The geographic disaggregation is the politically powerful number. RAND likely has institutional IMPLAN access.",
                sources: [
                  { text: "BEA RIMS II — Regional Input-Output Multipliers", href: "https://www.bea.gov/regional/rims" },
                  { text: "CA EDD — Construction employment by zip code", href: "https://labormarketinfo.edd.ca.gov" },
                  { text: "Census LEHD OnTheMap — Where construction workers live vs. work", href: "https://onthemap.ces.census.gov" },
                  { text: "LADBS — Permit data (rebuild volume + pace)", href: "https://www.ladbsservices2.lacity.org/OnlineServices/PermitReport/PermitReport" },
                ],
              },
              {
                num: "03",
                color: "#b45309",
                bg: "#fffbeb",
                border: "#fde68a",
                label: "MODULE 3",
                title: "Insurance Market Stabilization",
                framing: "\"The insurance crisis in Boyle Heights and Sylmar is connected to what happens in Palisades. Infrastructure hardening changes the risk math for the whole city.\"",
                framingFor: "→ Framing for Hernandez (D1), Soto-Martinez (D13), Harris-Dawson (D8)",
                argument: `California's insurance crisis is not a Palisades problem — it's an LA County and statewide problem. Insurers use portfolio-level risk models. If Palisades rebuilds with hardened infrastructure (undergrounded utilities, fire-resistant construction, improved hydrant systems), it reduces the tail-risk profile of the entire LA urban-wildland interface. The private insurance exodus is hitting Sylmar, Northridge, and Boyle Heights too. CA FAIR Plan enrollment is surging as a result — and FAIR Plan is undercapitalized.`,
                analysis: [
                  "Document current insurance withdrawal: non-renewal rates by zip code in LA County, including non-Palisades areas",
                  "Show the mechanism: private market exit → FAIR Plan enrollment surge → undercapitalized FAIR Plan → systemic risk to all LA homeowners",
                  "Establish the link: infrastructure hardening in high-risk zones reduces insurer loss exposure → creates conditions for private market re-entry",
                  "Frame DRD's infrastructure spending as risk reduction that benefits the entire insurer portfolio in LA, not just Palisades properties",
                ],
                note: "This module is necessarily more qualitative than Modules 1 and 2. Frame it as a mechanism analysis rather than a quantitative projection. Even a clear causal chain with supporting FAIR Plan data is politically powerful. RAND has prior published work on wildfire insurance in California — use it as an anchor citation.",
                sources: [
                  { text: "CA Department of Insurance — non-renewal data by zip code", href: "https://www.insurance.ca.gov" },
                  { text: "CA FAIR Plan — enrollment data by county (via CDI)", href: "https://www.cfpnet.com" },
                  { text: "RAND (2025) — After the LA Wildfires: Insurance & Risk Mitigation", href: "https://www.rand.org/pubs/conf_proceedings/CFA3937-1.html" },
                  { text: "First Street Foundation — wildfire exposure by parcel", href: "https://firststreet.org" },
                ],
              },
            ].map(mod => (
              <div key={mod.num} style={{ marginBottom: 24, border: `1px solid ${mod.border}`, borderLeft: `4px solid ${mod.color}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ background: mod.bg, padding: "12px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: mod.color, opacity: 0.3, lineHeight: 1, flexShrink: 0, fontFamily: "Georgia, serif" }}>{mod.num}</div>
                  <div>
                    <div style={{ fontSize: 8.5, letterSpacing: 2, color: mod.color, textTransform: "uppercase" }}>{mod.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>{mod.title}</div>
                  </div>
                </div>

                <div style={{ padding: "14px 18px 0" }}>
                  <div style={{ background: mod.bg, border: `1px solid ${mod.border}`, borderRadius: 6, padding: "8px 12px", marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: mod.color, fontWeight: 600, marginBottom: 2 }}>{mod.framingFor}</div>
                    <div style={{ fontSize: 12, color: T.body, fontStyle: "italic", lineHeight: 1.6 }}>{mod.framing}</div>
                  </div>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: mod.color, marginBottom: 4 }}>Core Argument</div>
                  <p style={{ fontSize: 12.5, color: T.body, lineHeight: 1.75, margin: "0 0 12px" }}>{mod.argument}</p>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: mod.color, marginBottom: 6 }}>Analysis Steps</div>
                  <div style={{ marginBottom: 12 }}>
                    {mod.analysis.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: mod.bg, border: `1px solid ${mod.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: mod.color }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: 12, color: T.body, lineHeight: 1.65, margin: 0 }}>{step}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: mod.color, marginBottom: 4 }}>Methodological Note</div>
                  <p style={{ fontSize: 12, color: T.faint, lineHeight: 1.65, margin: "0 0 12px", fontStyle: "italic" }}>{mod.note}</p>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: mod.color, marginBottom: 6 }}>Key Data Sources</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingBottom: 16 }}>
                    {mod.sources.map(s => (
                      <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 10.5, color: mod.color, background: mod.bg, border: `1px solid ${mod.border}`, borderRadius: 4, padding: "3px 9px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3 }}>
                        {s.text} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Summary table */}
            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.faint, marginBottom: 8 }}>The Citywide Dividend — Summary</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9" }}>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: T.sub, border: `1px solid ${C.border}` }}></th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: C.nay, border: `1px solid ${C.border}` }}>Without DRD</th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: C.yay, border: `1px solid ${C.border}` }}>With DRD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["LA General Fund", "Property tax base erodes, revenue loss over 10 years", "TIF diversion offset by recovered + growing tax base"],
                      ["Employment", "Foregone construction jobs, slower multiplier effect across LA", "Jobs across LA County, concentrated in South/East LA"],
                      ["Insurance Market", "Continued private market exit, FAIR Plan strain citywide", "Infrastructure hardening reduces tail risk, creates re-entry conditions"],
                    ].map(([label, no, yes]) => (
                      <tr key={label}>
                        <td style={{ padding: "8px 12px", fontWeight: 600, color: T.heading, border: `1px solid ${C.border}`, background: "#fafafa" }}>{label}</td>
                        <td style={{ padding: "8px 12px", color: T.body, border: `1px solid ${C.border}`, lineHeight: 1.5 }}>{no}</td>
                        <td style={{ padding: "8px 12px", color: T.body, border: `1px solid ${C.border}`, lineHeight: 1.5 }}>{yes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>



          {/* ── STRATEGY DIAGRAM ── */}
          <div id="diagram" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>Strategy</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.heading, margin: "0 0 4px" }}>Reaching 8 out of 15 — The Coordinated Push</h2>
            <p style={{ fontSize: 12, color: T.sub, margin: "0 0 20px", lineHeight: 1.6 }}>
              The December 9 procedural referral passed 10–5, stalling the study. Each pressure point for moving it forward is currently operating independently. The strategy below connects them into a single coordinated push.
            </p>

            {/* ENGINE ROW */}
            <div style={{ background: "#1e3a8a", borderRadius: 10, padding: "14px 18px", marginBottom: 6, position: "relative" }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#93c5fd", textTransform: "uppercase", marginBottom: 3 }}>The Engine</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 4 }}>Financial Analysis — "The Citywide Case for Palisades DRD"</div>
              <div style={{ fontSize: 11.5, color: "#bfdbfe", lineHeight: 1.65 }}>
                A RAND student research project quantifying what a stalled Palisades recovery actually costs LA as a whole — in property tax revenue, employment, and insurance market stability.
                Produces two outputs: a <strong style={{ color: "white" }}>technical report</strong> (credibility) and a <strong style={{ color: "white" }}>2-page policy memo</strong> (the instrument).
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["Module 1: Property Tax Scenarios", "Module 2: Employment Multipliers", "Module 3: Insurance Market"].map(m => (
                  <span key={m} style={{ fontSize: 10, background: "#1e40af", color: "#bfdbfe", border: "1px solid #3b82f6", borderRadius: 4, padding: "2px 8px" }}>{m}</span>
                ))}
              </div>
            </div>

            {/* CONNECTOR */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0 0 6px" }}>
              <div style={{ width: 1, height: 16, background: C.border }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: T.faint, letterSpacing: 1 }}>POWERS ALL THREE LEVERS</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "0 0 10px" }}>
              <div style={{ width: 1, height: 16, background: C.border }} />
            </div>

            {/* THREE LEVERS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 10 }}>
              {[
                {
                  num: "1",
                  title: "Crisis Memo",
                  color: C.nay,
                  bg: C.nayBg,
                  border: C.nayBorder,
                  target: "→ Yaroslavsky (D5)",
                  weakness: "Park argued urgency verbally. Lost.",
                  powered: "Module 1 attaches dollar figures to inaction. Flips the frame: \"can the city afford to block it?\"",
                  ask: "50% non-rebuild = $X lost in 10 years",
                },
                {
                  num: "2",
                  title: "Capital Stack Framing",
                  color: "#047857",
                  bg: "#f0fdf4",
                  border: "#bbf7d0",
                  target: "→ Fiscal conservatives broadly",
                  weakness: "DRD framed as the solution. Too risky.",
                  powered: "Modules 1+2 scope the full recovery financing need. DRD = lower-middle layer only, not first-loss capital. Yaroslavsky can say yes to a stack.",
                  ask: "DRD ≠ primary bet. It's one instrument.",
                },
                {
                  num: "3",
                  title: "Coalition Pressure",
                  color: C.committee,
                  bg: C.committeeBg,
                  border: C.committeeBorder,
                  target: "→ Rodriguez D7, Soto-Martinez D13, Hernandez D1",
                  weakness: "Pressure was only from CD11. Wrong audience.",
                  powered: "Module 2 shows construction jobs go to South/East LA. Module 3 shows insurance crisis hits Sylmar + Boyle Heights too.",
                  ask: "PPCC + WRAC + PRC carry this to the right districts.",
                },
              ].map(lever => (
                <div key={lever.num} style={{ background: lever.bg, border: `1px solid ${lever.border}`, borderLeft: `3px solid ${lever.color}`, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: lever.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{lever.num}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.heading }}>{lever.title}</span>
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: lever.color, marginBottom: 6 }}>{lever.target}</div>
                  <div style={{ fontSize: 10.5, color: T.faint, marginBottom: 6, fontStyle: "italic" }}>Problem: {lever.weakness}</div>
                  <div style={{ fontSize: 10.5, color: T.body, lineHeight: 1.6, marginBottom: 8 }}>{lever.powered}</div>
                  <div style={{ fontSize: 10, background: "white", border: `1px solid ${lever.border}`, borderRadius: 4, padding: "4px 8px", color: lever.color, fontWeight: 600 }}>{lever.ask}</div>
                </div>
              ))}
            </div>

            {/* CONNECTOR */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0 0 6px" }}>
              <div style={{ width: 1, height: 16, background: C.border }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: T.faint, letterSpacing: 1 }}>CONVERGES ON</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "0 0 10px" }}>
              <div style={{ width: 1, height: 16, background: C.border }} />
            </div>

            {/* OUTCOME */}
            <div style={{ background: C.yayBg, border: `1px solid ${C.yayBorder}`, borderLeft: `3px solid ${C.yay}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: C.yay, textTransform: "uppercase", marginBottom: 3 }}>Target Outcome</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>8 votes — DRD feasibility study passes</div>
                <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4, lineHeight: 1.6 }}>
                  Rodriguez (D7) + Soto-Martinez (D13) + Hernandez (D1) flip to YAY.<br/>
                  Yaroslavsky's fiscal objection is answered by the numbers. The study moves out of committee.
                </div>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: C.yay }}>8 / 15</div>
                <div style={{ fontSize: 10, color: T.sub }}>votes needed</div>
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 11, color: T.faint, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <strong>Note on the analysis:</strong> This is a student research project conducted at RAND. It is independent work and does not represent an official RAND Corporation position or publication.
            </div>
          </div>



          </div>
          {/* END STRATEGY */}


          {/* ── REFERENCES ── */}
          <div id="references" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: T.faint, textTransform: "uppercase", marginBottom: 16 }}>5. References &amp; Further Reading</div>

            {[
              {
                group: "Primary Sources",
                color: C.yay,
                items: [
                  {
                    href: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-0006-S38",
                    title: "City Clerk Council File 25-0006-S38",
                    sub: "LA City Clerk · Park–Nazarian–Price original motion (Jan 15, 2025) — Climate Resilience / Disaster Recovery District, Pacific Palisades",
                    tag: "CF 25-0006-S38",
                  },
                  {
                    href: "https://cityclerk.lacity.org/onlinedocs/2025/25-0006-s38_rpt_EWDD_1-26-26.pdf",
                    title: "EWDD Report — DRD Feasibility Study Authorization (Jan 27, 2026)",
                    sub: "Economic & Workforce Development Dept · Requests $300K from Economic Development Trust Fund for Kosmont feasibility study · Includes preliminary assessed value figures: $21.3B pre-fire → $16.3B post-fire, projected DRD revenue $325M–$1.9B",
                    tag: "Primary Source · Module 1",
                  },
                  {
                    href: "https://cityclerk.lacity.org/onlinedocs/2025/25-0006-S38_misc_6-16-25.pdf",
                    title: "EWDD Report — CRD Feasibility & Funding (Jun 16, 2025)",
                    sub: "Economic & Workforce Development Dept · CRD feasibility analysis, recommends $300K consultant study · Warns CRD takes 18–36 months to form, not suitable for short-term recovery · Tubbs Fire (2017) comparable · Fiscal Impact: $250K+ to General Fund",
                    tag: "Primary Source · Module 1",
                  },
                  {
                    href: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB782",
                    title: "SB 782 — Disaster Recovery Districts",
                    sub: "California Legislature · Signed Sep 2025 · Authorizing statute for DRD formation, expedited process, expanded eligible uses, disaster declaration requirement",
                    tag: "Statute",
                  },
                ],
              },
              {
                group: "News & Analysis",
                color: C.palisades,
                items: [
                  {
                    href: "https://www.dailynews.com/2025/12/09/l-a-city-council-splits-on-study-for-palisades-climate-resilience-district/",
                    title: "LA City Council splits on study for Palisades climate resilience district",
                    sub: "Los Angeles Daily News · December 9, 2025 · Council vote 10–5 · Park's motion, Yaroslavsky's objections, referral to committee",
                    tag: "Lever 1 · Lever 3",
                  },
                  {
                    href: "https://marvistavoice.org/city-council-pumps-the-brakes-on-palisades-climate-resilience-district-study/",
                    title: "City Council Pumps the Brakes on Palisades Climate Resilience District Study",
                    sub: "Mar Vista Voice · December 12, 2025 · Yaroslavsky's fiscal objections — general fund concerns, TIF diversion, $1B budget deficit context",
                    tag: "Lever 1",
                  },
                  {
                    href: "https://timesofsandiego.com/opinion/2025/12/26/californias-fire-victims-can-take-control-climate-resilience-district/",
                    title: "California's fire victims can take control with a climate resilience district",
                    sub: "Times of San Diego · Opinion · Dec 26, 2025 · DRD/CRD as permanent governance tool, citywide wildfire resilience framing",
                    tag: "Lever 3",
                  },
                  {
                    href: "https://democracylocal.substack.com/p/column-how-victims-of-climate-disaster",
                    title: "How Survivors of Climate Disaster Can Form Their Own Governments",
                    sub: "Democracy Local · Jan 2, 2026 · Cross-jurisdictional CRD spanning Palisades, Topanga, Malibu — capital stack framing context",
                    tag: "Lever 2 · Lever 3",
                  },
                ],
              },
              {
                group: "Recovery & Community",
                color: C.committee,
                items: [
                  {
                    href: "https://cd11.lacity.gov/palisades-recovery-updates",
                    title: "Palisades Recovery Updates — Council District 11",
                    sub: "Council District 11 (Traci Park) · AECOM reports, permit data, ongoing rebuilding progress, Park's office updates",
                    tag: "Lever 1 · Module 1",
                  },
                  {
                    href: "https://palirecovery.org/",
                    title: "Palisades Recovery Coalition (PRC)",
                    sub: "Resident-led recovery organizing · Weekly LAPD CAG coordination, monthly impact reports, charrette partnership with RAND and AIA",
                    tag: "Lever 3",
                  },
                  {
                    href: "https://ibank.ca.gov/infrastructure-state-revolving-fund-program/",
                    title: "California IBank — Infrastructure State Revolving Fund",
                    sub: "California Infrastructure and Economic Development Bank · Disaster recovery financing, state-level capital stack instrument",
                    tag: "Lever 2",
                  },
                  {
                    href: "https://recovery.lacounty.gov/altadena-disaster-recovery-district/",
                    title: "Altadena Wildfire Recovery Infrastructure Financing District",
                    sub: "LA County · SB 782-based district in process of formation for Altadena (Eaton Fire) · Dec 15, 2025 public hearing held · Pending formal establishment",
                    tag: "Comparable · SB 782",
                  },
                  {
                    href: "https://recovery.lacounty.gov/ua-santa-monica-mountains-wildfire-disaster-recovery-financing-district/",
                    title: "Unincorporated Santa Monica Mountains Wildfire Disaster Recovery Financing District",
                    sub: "LA County · SB 782-based district in process of formation for unincorporated Santa Monica Mountains communities incl. Topanga · Pending formal establishment",
                    tag: "Comparable · SB 782",
                  },
                ],
              },
              {
                group: "Research & Data Sources",
                color: "#1d4ed8",
                items: [
                  {
                    href: "https://www.rand.org/pubs/conf_proceedings/CFA3937-1.html",
                    title: "After the Los Angeles Wildfires: Implications for Risk Mitigation, Compensation, and the Insurance Market",
                    sub: "RAND Corporation · Dixon, Anderson, Morikawa · Aug 2025 · CF-A3937-1 · Insurance market implications, mitigation, resilience — anchor citation for Module 3",
                    tag: "Module 3",
                  },
                  {
                    href: "https://assessor.lacounty.gov",
                    title: "LA County Assessor — Parcel-Level Assessed Values",
                    sub: "Property tax base data for zip codes 90272, 90402 (Pacific Palisades) — primary data source for Module 1",
                    tag: "Module 1",
                  },
                  {
                    href: "https://www.bea.gov/regional/rims",
                    title: "BEA RIMS II — Regional Input-Output Multipliers",
                    sub: "Bureau of Economic Analysis · Free regional economic multipliers for employment and income impact — Module 2 primary methodology",
                    tag: "Module 2",
                  },
                  {
                    href: "https://onthemap.ces.census.gov",
                    title: "Census LEHD OnTheMap — Where Workers Live vs. Work",
                    sub: "Longitudinal Employer-Household Dynamics · Geographic disaggregation of where LA County construction workers live — key for D8/D14 framing",
                    tag: "Module 2",
                  },
                  {
                    href: "https://www.insurance.ca.gov",
                    title: "CA Department of Insurance — Non-Renewal Data by ZIP Code",
                    sub: "Annual insurer market share reports, non-renewal rates by zip code, FAIR Plan enrollment trends — primary data source for Module 3",
                    tag: "Module 3",
                  },
                  {
                    href: "https://firststreet.org",
                    title: "First Street Foundation — Wildfire Exposure by Parcel",
                    sub: "Risk model data on wildfire exposure — supplementary data for insurance mechanism analysis in Module 3",
                    tag: "Module 3",
                  },
                ],
              },
              {
                group: "Reference Tools",
                color: "#047857",
                items: [
                  {
                    href: "https://palisades-tif-districts.vercel.app/",
                    title: "California TIF Districts Reference App — RDA → IFD → EIFD → CRD → DRD",
                    sub: "Detailed breakdown of all California TIF district types, formation requirements, eligible spending, CRD vs DRD comparison, protest thresholds",
                    tag: "Background",
                  },
                ],
              },
            ].map(group => (
              <div key={group.group} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: group.color, marginBottom: 8, paddingLeft: 4 }}>{group.group}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {group.items.map(s => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", border: `1px solid ${C.border}`, borderLeft: `3px solid ${group.color}`, borderRadius: 8, padding: "10px 14px", textDecoration: "none" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: T.heading }}>{s.title}</span>
                          <span style={{ fontSize: 9, background: group.color + "15", color: group.color, border: `1px solid ${group.color}40`, borderRadius: 3, padding: "1px 5px", whiteSpace: "nowrap" }}>{s.tag}</span>
                        </div>
                        <div style={{ fontSize: 11, color: T.faint, lineHeight: 1.5 }}>{s.sub}</div>
                      </div>
                      <span style={{ fontSize: 13, color: group.color, flexShrink: 0, marginLeft: 12 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, fontSize: 11, color: T.faint, lineHeight: 1.7 }}>
            <div style={{ marginBottom: 6, color: T.sub, fontWeight: 600 }}>Last updated: February 20, 2026</div>
            <div style={{ background: "#fffbeb", border: `1px solid ${C.committeeBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 11, color: T.sub }}>
              <strong>Disclaimer:</strong> This tracker is an independent analytical tool, not an official document. Vote interpretations, lean assessments, and strategic analysis reflect the author's judgment based on public records and statements — not official positions of any council member, organization, or institution. Based on public records through February 2026. Individual DRD positions for most members remain unconfirmed; the Dec 9 vote was procedural and does not indicate support or opposition to the DRD itself.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
