import { useState, useEffect, useRef } from "react";

const C = {
  rda: "#92400e",
  ifd: "#52525b",
  eifd: "#1d4ed8",
  crd: "#047857",
  drd: "#b91c1c",
  bg: "#f7f6f3",
  surface: "#ffffff",
  surface2: "#f1f0ed",
  border: "#e2e0db",
  muted: "#6b7280",
  faint: "#9ca3af",
};

const DISTRICTS = {
  rda: {
    id: "rda",
    label: "RDA",
    summary:
      "California's original TIF tool — powerful, widely used, and abolished in 2012.",
    full: "Redevelopment Agency",
    color: C.rda,
    status: "ABOLISHED 2012",
    law: (
      <>
        <a
          href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=33000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#92400e",
            textUnderlineOffset: 2,
          }}
        >
          Community Redevelopment Law (H&S Code §33000) ↗
        </a>
      </>
    ),
    year: 1945,
    endYear: 2012,
    trigger: "Designation of a 'blighted' area by the city/county",
    formationTime: "6–18 months",
    duration: "Up to ~50 years, no hard cap",
    protestRights: "None — legislative body had full authority",
    schoolTax:
      "Captured 100% — state backfilled school shortfall (what made it expensive)",
    govBody: "City/County Council acting as Redevelopment Agency Board",
    moneyRaised:
      "100% tax increment from ALL taxing entities; revenue bonds; state-backed loans; eminent domain",
    eligibleSpend: [
      "Land acquisition and assembly (including eminent domain)",
      "Demolition and site clearance",
      "Public infrastructure (roads, utilities, parking)",
      "Affordable housing (mandatory 20% set-aside)",
      "Economic development in blighted areas",
      "Community facilities",
    ],
    death: (
      <>
        Governor Jerry Brown abolished all ~400 RDAs in 2012 to close a $1B+ state
        budget gap. Because the state was backfilling the school tax shortfall,
        every dollar of increment captured cost the state general fund. The
        California Supreme Court upheld the abolition in{" "}
        <a
          href="https://law.justia.com/cases/california/supreme-court/2011/s194861.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#92400e",
            textUnderlineOffset: 2,
          }}
        >
          California Redevelopment Assn. v. Matosantos (2011)
        </a>
        . ~$5B/yr in redevelopment spending vanished overnight.
      </>
    ),
    examples: [
      {
        name: "City of Los Angeles CRA/LA",
        year: 1948,
        reason: "Blight elimination in Bunker Hill / downtown LA",
        notes: "One of the largest in the US; controlled billions in TIF",
      },
      {
        name: "SF Redevelopment Agency",
        year: 1948,
        reason: "Post-WWII blight, Western Addition",
        notes: "Notoriously displaced thousands of Black residents in the 1960s–70s",
      },
      {
        name: "Sacramento Redevelopment Agency",
        year: 1950,
        reason: "Downtown core blight",
        notes: "Helped finance the original Kings arena area",
      },
    ],
  },

  ifd: {
    id: "ifd",
    label: "IFD",
    summary:
      "A narrower parallel TIF tool created in 1990 for infrastructure — still active on the books.",
    full: "Infrastructure Financing District",
    color: C.ifd,
    status: "SUPERSEDED by EIFD",
    law: (
      <>
        <a
          href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=53395"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#52525b",
            textUnderlineOffset: 2,
          }}
        >
          Gov. Code §53395 et seq. ↗
        </a>{" "}
        (enacted 1990)
      </>
    ),
    year: 1990,
    trigger: "None — proactive; city or county legislative body initiates",
    formationTime: "1–2 years",
    duration: "Up to 30 years",
    protestRights: "2/3 supermajority voter approval required — near-impossible in practice",
    schoolTax: "Cannot capture — school share excluded",
    govBody: "City/County legislative body; no separate authority",
    moneyRaised: "Tax increment (excluding schools); revenue bonds only",
    eligibleSpend: [
      "Capital facilities with useful life ≥ 10 years",
      "Public infrastructure (roads, bridges, parks)",
      "Industrial and commercial buildings",
      "Removal of hazardous waste",
      "Facilities with regional benefit",
    ],
    death:
      "IFDs were almost never used because the 2/3 voter approval requirement made formation practically impossible. When RDA was abolished in 2012, the state urgently needed a replacement and reformed IFD into EIFD — stripping the voter threshold and adding proper governance.",
    examples: [
      {
        name: "No significant examples",
        year: null,
        reason: "2/3 voter approval threshold prevented formation",
        notes: "Rarely if ever successfully formed in its 22-year existence",
      },
    ],
  },

  eifd: {
    id: "eifd",
    label: "EIFD",
    summary:
      "IFD's major 2014 upgrade: multi-agency, broader scope, dropped the 2/3 voter threshold.",
    full: "Enhanced Infrastructure Financing District",
    color: C.eifd,
    status: "ACTIVE — base tool",
    law: (
      <>
        <a
          href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201320140SB628"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            fontWeight: 600,
            textDecoration: "underline",
            textDecorationColor: "#1d4ed8",
            textUnderlineOffset: 2,
          }}
        >
          SB 628 (2014)
        </a>
        ,{" "}
        <a
          href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=53398.50"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#1d4ed8",
            textUnderlineOffset: 2,
          }}
        >
          Gov. Code §53398.50 et seq.
        </a>
      </>
    ),
    year: 2014,
    trigger: "None — proactive; any city or county may initiate at any time",
    formationTime: "1–2 years (resolution of intention → 3 public hearings → IFP adoption)",
    duration: "Up to 45 years from first bond issuance",
    protestRights: "< 25%: approved without election | 25–50%: election required | > 50%: halted",
    schoolTax: "Cannot capture — school share explicitly excluded",
    govBody:
      "Public Financing Authority (PFA): min. 3 elected officials + 2 public members residing/working in district",
    moneyRaised:
      "Property tax increment (non-school entities only); revenue bonds secured by increment only — NOT by city/county general fund; no new taxes",
    eligibleSpend: [
      "Public capital facilities with useful life ≥ 15 years",
      "Transportation infrastructure",
      "Affordable housing",
      "Sewage and water treatment",
      "Environmental mitigation",
      "Climate adaptation projects",
      "Economic development",
      "Parks and recreation",
    ],
    examples: [
      {
        name: "West Sacramento EIFD No. 1",
        year: 2015,
        reason: "Mixed-use waterfront infrastructure (Bridge District)",
        notes: (
          <>
            One of the first EIFDs formed after{" "}
            <a
              href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201320140SB628"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
                textDecoration: "underline",
                textDecorationColor: "#1d4ed8",
                textUnderlineOffset: 2,
              }}
            >
              SB 628
            </a>
          </>
        ),
      },
      {
        name: "Millbrae EIFD",
        year: 2017,
        reason: "Transit-oriented development near BART station",
        notes: "Infrastructure supporting housing near transit",
      },
      {
        name: "Fresno EIFD",
        year: 2018,
        reason: "Downtown revitalization",
        notes: "Commercial and infrastructure improvements",
      },
    ],
  },

  crd: {
    id: "crd",
    label: "CRD",
    summary:
      "2022 EIFD subtype built for climate — adds special taxes, GO bonds, and special district participation.",
    full: "Climate Resilience District",
    color: C.crd,
    status: "ACTIVE — climate subtype of EIFD",
    law: (
      <>
        <a
          href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB852"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            fontWeight: 600,
            textDecoration: "underline",
            textDecorationColor: "#047857",
            textUnderlineOffset: 2,
          }}
        >
          SB 852 (2022)
        </a>
        ,{" "}
        <a
          href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=62300"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#047857",
            textUnderlineOffset: 2,
          }}
        >
          Gov. Code §62300 et seq.
        </a>
      </>
    ),
    year: 2022,
    trigger:
      "None — proactive; any city, county, or special district may initiate for climate purposes",
    formationTime: "1–2 years (same EIFD process + must adopt annual expenditure plan)",
    duration: "Up to 45 years from first bond issuance",
    protestRights: "Same as EIFD: < 25% / 25–50% / > 50% thresholds",
    schoolTax: "Cannot capture — school share excluded",
    govBody:
      "Same PFA structure as EIFD; special districts (not just cities/counties) may also participate",
    moneyRaised: (
      <>
        Tax increment (like EIFD) PLUS benefit assessments, special taxes,
        property-related fees, GO bonds
        <sup style={{ fontSize: 9, color: "#047857", fontWeight: 700 }}>*</sup>{" "}
        (all requiring voter approval)
      </>
    ),
    eligibleSpend: [
      "Sea level rise mitigation and adaptation",
      "Extreme heat infrastructure (cooling centers, urban forestry)",
      "Wildfire risk reduction",
      "Drought resilience (water infrastructure)",
      "Flood risk reduction",
      "Extreme cold mitigation",
      "Any project designed to address climate change mitigation, adaptation, or resilience",
    ],
    extras: [
      "Must prepare annual expenditure plan, operating budget, and capital improvement budget",
      "Skilled and trained workforce required for all projects",
      "Special districts may participate (not available in plain EIFD)",
    ],
    examples: [
      {
        name: "Sonoma County RCPA CRD",
        year: 2022,
        reason:
          "Regional climate risk: wildfire, drought, flooding across all Sonoma County jurisdictions",
        notes:
          "Named directly in SB 852 — California's FIRST CRD. Still completing EIFD process to access TIF revenue.",
      },
    ],
  },

  drd: {
    id: "drd",
    label: "DRD",
    summary:
      "2025 emergency CRD subtype — fast-tracked for post-disaster rebuild after the LA fires.",
    full: "Disaster Recovery District",
    color: C.drd,
    status: "ACTIVE — disaster subtype of CRD",
    law: (
      <>
        <a
          href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB782"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            fontWeight: 600,
            textDecoration: "underline",
            textDecorationColor: "#b91c1c",
            textUnderlineOffset: 2,
          }}
        >
          SB 782 (2025, urgency statute)
        </a>
        , amending{" "}
        <a
          href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=62300"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#b91c1c",
            textUnderlineOffset: 2,
          }}
        >
          Gov. Code §62300
        </a>
      </>
    ),
    year: 2025,
    trigger:
      "Governor-declared state of emergency (Gov. Code §8625) required. Resolution must be adopted within 2 years of disaster proclamation.",
    formationTime:
      "Expedited — months instead of years",
    duration: "Up to 45 years from first bond issuance",
    protestRights:
      "Protest thresholds (25/50%) removed — formation can proceed without supermajority support",
    schoolTax: "Cannot capture — school share excluded",
    govBody: "Same PFA (3 elected + 2 public); initiated by county Board of Supervisors or city council",
    moneyRaised: (
      <>
        Same as CRD: TIF + benefit assessments + special taxes + property-related fees + GO bonds
        <sup style={{ fontSize: 9, color: "#b91c1c", fontWeight: 700 }}>*</sup>{" "}
        (voter approval still required)
      </>
    ),
    eligibleSpend: [
      "Acquiring, demolishing, relocating, repairing, or replacing disaster-damaged structures",
      "Any disaster-damaged housing eligible for repair/replacement; affordable housing development also explicitly authorized",
      "Utility undergrounding and hardening (electrical lines, etc.)",
      "Water and energy resource access during emergencies",
      "Economic recovery from the disaster",
      "Mitigating risk of future disaster",
      "All CRD-eligible climate resilience projects",
    ],
    boundaryRule:
      "Must be within the declared disaster area. Adjacent (non-damaged) areas may be included but cannot exceed 20% of total district area.",
    examples: [
      {
        name: "Altadena Disaster Recovery District",
        year: 2025,
        reason:
          "Eaton Fire (Jan 7, 2025): 14,000+ acres, 9,000+ structures destroyed in unincorporated LA County",
        notes:
          "First DRD proposed; covers county facilities, streets, water/sewer. Base year: 2025.",
      },
      {
        name: "Santa Monica Mountains Wildfire DRD",
        year: 2025,
        reason:
          "Palisades Fire (Jan 2025): coastal homes and infrastructure in Santa Monica Mountains",
        notes:
          "Second DRD; covers unincorporated communities north of Pacific Palisades",
      },
    ],
  },
};

const COMPARE_ROWS = [
  { key: "law", label: "Authorizing Law" },
  { key: "year", label: "Year Created" },
  { key: "trigger", label: "Formation Trigger" },
  { key: "formationTime", label: "Formation Timeline" },
  { key: "duration", label: "District Duration" },
  { key: "protestRights", label: "Protest Rights" },
  { key: "schoolTax", label: "School Tax" },
  { key: "govBody", label: "Governing Body" },
  { key: "moneyRaised", label: "How Money is Raised" },
];

const CRD_DRD_ROWS = [
  { feature: "Authorizing Law", crd: "SB 852 (2022)", drd: "SB 782 (2025, urgency)" },
  { feature: "Formation Trigger",
    crd: "None — any city, county, or special district can initiate proactively",
    drd: "Governor-declared state of emergency required (Gov. Code §8625)" },
  { feature: "Formation Window", crd: "Any time — no deadline", drd: "Resolution must be adopted within 2 years of disaster proclamation" },
  { feature: "Formation Timeline", crd: "1–2 years (standard EIFD process)", drd: "Expedited — months, not years" },
  { feature: "Protest Rights", crd: "Preserved: < 25% approved | 25–50% → election | > 50% → halted", drd: "Protest thresholds (25/50%) removed — formation can proceed without supermajority support" },
  { feature: "Who Can Initiate", crd: "City, county, OR special district", drd: "City or county only (Board of Supervisors or city council)" },
  { feature: "Boundary Rules", crd: "Any area facing climate risk — no special constraint", drd: "Must be within declared disaster area. Adjacent areas ≤ 20% of total" },
  { feature: "Eligible Spending — Climate",
  crd: "✓ Climate resilience projects (sea level rise, heat, wildfire, drought, flood, cold, etc.)",
  drd: "✓ Future-disaster risk mitigation — but revenues restricted to disaster-recovery purposes" },

{ feature: "Eligible Spending — Rebuilding",
  crd: "△ Not a dedicated rebuilding tool — only if project qualifies as an eligible climate-resilience project",
  drd: "✓ Acquiring, demolishing, repairing disaster-damaged buildings, structures, and improvements" },

{ feature: "Eligible Spending — Housing",
  crd: "△ Conditional — Any housing project may be fundable if it qualifies as an eligible climate-resilience project",
  drd: "✓ Any disaster-damaged housing is eligible for repair/replacement; affordable housing development also explicitly authorized" },

{ feature: "Eligible Spending — Utilities",
  crd: "△ Utility projects may be fundable if part of an eligible climate-resilience project",
  drd: "✓ Undergrounding and hardening of electrical lines and other utilities (§62313(f)(2)(B))" },

{ feature: "Eligible Spending — Economic Recovery",
  crd: "✗ Not a designated purpose — focus is climate mitigation/adaptation/resilience projects",
  drd: "✓ Supporting economic recovery from the disaster" },
  { feature: "Tax Increment Financing", crd: "✓ Same as EIFD", drd: "✓ Same as CRD" },
  { feature: "Special Taxes / GO Bonds", crd: "✓ With voter approval", drd: "✓ Inherited from CRD (voter approval still required)" },
  { feature: "Annual Budget Plan Required", crd: "✓ Yes — annual expenditure plan, operating + capital budgets", drd: "✓ Inherited from CRD" },
  { feature: "Skilled Workforce Requirement", crd: "✓ Yes", drd: "✓ Inherited from CRD" },
  { feature: "School Tax Capture", crd: "✗ Excluded", drd: "✗ Excluded" },
  { feature: "Duration", crd: "Up to 45 years from first bond issuance", drd: "Up to 45 years from first bond issuance" },
  { feature: "Governing Body", crd: "PFA: 3+ elected officials + 2 public members", drd: "Same PFA structure" },
  { feature: "First Example", crd: "Sonoma County RCPA (2022)", drd: "Altadena DRD (2025)" },
];

// ── BRANCHING TIMELINE SVG ─────────────────────────────────────────────
function BranchingTimeline({ onSelectDistrict }) {
  const [hov, setHov] = useState(null);
  const W = 720, H = 340;

  const nodes = [
    { id: "rda", x: 70, y: 80, r: 28, label: "RDA", sub: "1945", note: "first-generation TIF" },
    { id: "ifd", x: 170, y: 195, r: 22, label: "IFD", sub: "1990", note: "parallel alternative" },
    { id: "eifd", x: 310, y: 155, r: 30, label: "EIFD", sub: "2014", note: "real foundation" },
    { id: "crd", x: 510, y: 95, r: 22, label: "CRD", sub: "2022", note: "climate subtype" },
    { id: "drd", x: 630, y: 145, r: 20, label: "DRD", sub: "2025", note: "disaster subtype" },
  ];
  const nc = (id) => nodes.find((n) => n.id === id);

  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
        <defs>
          {nodes.map((n) => (
            <radialGradient key={n.id} id={`grd-${n.id}`} cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor={C[n.id]} stopOpacity="0.18" />
              <stop offset="100%" stopColor={C[n.id]} stopOpacity="0.03" />
            </radialGradient>
          ))}

          <marker id="arr-rda" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.rda} opacity="0.5" />
          </marker>
          <marker id="arr-ifd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.ifd} opacity="0.5" />
          </marker>
          <marker id="arr-eifd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.eifd} opacity="0.7" />
          </marker>
        </defs>

        {/* Axis */}
        <line x1="40" y1="290" x2={W - 20} y2="290" stroke={C.border} strokeWidth="1.5" />
        {[
          { yr: "1945", x: 70 },
          { yr: "1990", x: 170 },
          { yr: "2012", x: 210 },
          { yr: "2014", x: 310 },
          { yr: "2022", x: 510 },
          { yr: "2025", x: 630 },
        ].map(({ yr, x }) => (
          <g key={yr + x}>
            <line x1={x} y1="285" x2={x} y2="295" stroke={C.faint} strokeWidth="1" />
            <text x={x} y="308" textAnchor="middle" fill={C.muted} fontSize="10" fontFamily="Georgia, serif">
              {yr}
            </text>
          </g>
        ))}

        {/* Abolished marker */}
        <line x1="210" y1="50" x2="210" y2="287" stroke={C.rda} strokeWidth="1" strokeDasharray="4,3" opacity="0.3" />
        <text x="212" y="46" fill={C.rda} fontSize="9" fontFamily="Georgia, serif" opacity="0.6">
          abolished
        </text>

        {/* RDA → EIFD dashed */}
        <path
          d={`M ${nc("rda").x + nc("rda").r} ${nc("rda").y} C 200 ${nc("rda").y - 10}, 230 ${
            nc("eifd").y - 10
          }, ${nc("eifd").x - nc("eifd").r} ${nc("eifd").y - 8}`}
          fill="none"
          stroke={C.rda}
          strokeWidth="1.5"
          strokeDasharray="5,4"
          opacity="0.4"
          markerEnd="url(#arr-rda)"
        />
        <text x="185" y={nc("rda").y - 18} fill={C.rda} fontSize="9" fontFamily="Georgia, serif" opacity="0.5" textAnchor="middle">
          replaced by →
        </text>

        {/* IFD → EIFD solid */}
        <path
          d={`M ${nc("ifd").x + nc("ifd").r} ${nc("ifd").y} C 200 ${nc("ifd").y + 10}, 240 ${
            nc("eifd").y + 20
          }, ${nc("eifd").x - nc("eifd").r} ${nc("eifd").y + 10}`}
          fill="none"
          stroke={C.ifd}
          strokeWidth="1.5"
          opacity="0.45"
          markerEnd="url(#arr-ifd)"
        />
        <text x="190" y={nc("ifd").y + 66} fill={C.ifd} fontSize="9" fontFamily="Georgia, serif" opacity="0.5" textAnchor="middle">
          legal DNA →
        </text>

        {/* Sibling bracket */}
        <line x1={nc("rda").x - 40} y1={nc("rda").y} x2={nc("rda").x - 40} y2={nc("ifd").y} stroke={C.border} strokeWidth="1" strokeDasharray="2,4" />
        <line x1={nc("rda").x - 40} y1={nc("rda").y} x2={nc("rda").x} y2={nc("rda").y} stroke={C.border} strokeWidth="1" strokeDasharray="2,4" />
        <line x1={nc("ifd").x - 40} y1={nc("ifd").y} x2={nc("ifd").x} y2={nc("ifd").y} stroke={C.border} strokeWidth="1" strokeDasharray="2,4" />
        <text
          x={nc("rda").x - 52}
          y={(nc("rda").y + nc("ifd").y) / 2 + 4}
          fill={C.faint}
          fontSize="9"
          fontFamily="Georgia, serif"
          textAnchor="middle"
          transform={`rotate(-90, ${nc("rda").x - 52}, ${(nc("rda").y + nc("ifd").y) / 2 + 4})`}
        >
          parallel
        </text>

        {/* EIFD → CRD */}
        <path
          d={`M ${nc("eifd").x + nc("eifd").r} ${nc("eifd").y - 8} C ${nc("eifd").x + 80} ${
            nc("eifd").y - 60
          }, ${nc("crd").x - 60} ${nc("crd").y - 20}, ${nc("crd").x - nc("crd").r} ${nc("crd").y}`}
          fill="none"
          stroke={C.crd}
          strokeWidth="2"
          opacity="0.6"
          markerEnd="url(#arr-eifd)"
        />

        {/* CRD → DRD */}
        <path
          d={`M ${nc("crd").x + nc("crd").r} ${nc("crd").y + 10} C ${nc("crd").x + 60} ${
            nc("crd").y + 70
          }, ${nc("drd").x - 30} ${nc("drd").y - 40}, ${nc("drd").x - nc("drd").r} ${nc("drd").y}`}
          fill="none"
          stroke={C.drd}
          strokeWidth="2"
          opacity="0.6"
          markerEnd="url(#arr-eifd)"
        />

        {/* Nesting box */}
        <rect
          x={nc("crd").x - 38}
          y={nc("crd").y - 38}
          width={nc("drd").x - nc("crd").x + 78}
          height={nc("drd").y - nc("crd").y + 72}
          rx="12"
          fill="none"
          stroke={C.eifd}
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.15"
        />
        <text x={nc("crd").x - 28} y={nc("drd").y + 48} fill={C.eifd} fontSize="8.5" fontFamily="Georgia, serif" opacity="0.35">
          nested inside EIFD
        </text>

        {/* Drop lines */}
        {nodes.map((n) => (
          <line key={n.id} x1={n.x} y1={n.y + n.r + 2} x2={n.x} y2="283" stroke={C[n.id]} strokeWidth="1" strokeDasharray="2,4" opacity="0.15" />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g
            key={n.id}
            onClick={() => onSelectDistrict(n.id)}
            onMouseEnter={() => setHov(n.id)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={n.x} cy={n.y} r={n.r + 8} fill={`url(#grd-${n.id})`} opacity={hov === n.id ? 1 : 0.6} style={{ transition: "opacity 0.15s" }} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.surface} stroke={C[n.id]} strokeWidth={hov === n.id ? 2.5 : 1.5} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={C[n.id]} fontSize="13" fontWeight="700" fontFamily="Georgia, serif">
              {n.label}
            </text>
            <text x={n.x} y={n.y + n.r + 14} textAnchor="middle" fill={C[n.id]} fontSize="10" opacity="0.85" fontFamily="Georgia, serif">
              {n.sub}
            </text>
            <text x={n.x} y={n.y + n.r + 25} textAnchor="middle" fill={C.muted} fontSize="9" fontFamily="Georgia, serif">
              {n.note}
            </text>
          </g>
        ))}
      </svg>

      <div style={{ fontSize: 11, color: C.muted, marginTop: 10, display: "flex", gap: 20, flexWrap: "wrap", lineHeight: 1.8 }}>
        <span>— solid: legal lineage</span>
        <span style={{ opacity: 0.7 }}>╌╌ dashed: functional replacement</span>
        <span style={{ color: C.eifd, opacity: 0.6 }}>⬜ nested subtype of EIFD</span>
        <span>Click any node → deep-dive</span>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("timeline");
  const [openDistricts, setOpenDistricts] = useState(new Set());
  const [deepOpen, setDeepOpen] = useState(true);
  const [compareFilter, setCompareFilter] = useState([]);
  const sectionRefs = useRef({});

  const sections = [
    { id: "timeline", label: "Timeline" },
    { id: "tree", label: "Family Tree" },
    {
      id: "deep",
      label: "District Deep-Dives",
      expandable: true,
      sub: Object.values(DISTRICTS).map((d) => ({ id: d.id, label: d.label, color: d.color })),
    },
    { id: "compare", label: "Comparison Table" },
    { id: "crd-drd", label: "CRD vs DRD" },
    { id: "examples", label: "Example Districts" },
    { id: "why", label: "Why CRD + DRD?" },
    { id: "refs", label: "References" },
    { id: "glossary", label: "Glossary" },
  ];

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const scrollToDistrict = (districtId) => {
    setDeepOpen(true);
    setOpenDistricts(prev => { const next = new Set(prev); next.add(districtId); return next; });
    setTimeout(() => {
      const el = sectionRefs.current["deep"];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    setActiveSection("deep");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        }),
      { rootMargin: "-20% 0px -65% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const isDeepActive = activeSection === "deep";

  const T = {
    heading: "#111827",
    body: "#374151",
    sub: "#6b7280",
    faint: "#9ca3af",
  };

  const yearsLabel = (dist) => {
    if (dist.endYear) return `${dist.year}–${dist.endYear}`;
    return `${dist.year}–`;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: T.body, fontFamily: "Georgia, serif" }}>
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: 208,
          flexShrink: 0,
          background: "#ffffff",
          borderRight: `1px solid ${C.border}`,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8.5, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 5 }}>California</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: T.heading, lineHeight: 1.35 }}>
            TIF Districts
            <br />
            Reference
          </div>
        </div>

        <nav style={{ padding: "10px 0", flex: 1 }}>
          {sections.map((s) => (
            <div key={s.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => {
                    if (s.expandable) {
                      setDeepOpen((o) => !o);
                      scrollTo("deep");
                      setActiveSection("deep");
                    } else {
                      scrollTo(s.id);
                    }
                  }}
                  style={{
                    flex: 1,
                    textAlign: "left",
                    background: s.id === activeSection || (s.expandable && isDeepActive) ? "#eff6ff" : "transparent",
                    border: "none",
                    borderLeft: `3px solid ${s.id === activeSection || (s.expandable && isDeepActive) ? "#3b82f6" : "transparent"}`,
                    color: s.id === activeSection || (s.expandable && isDeepActive) ? "#1d4ed8" : T.sub,
                    padding: "9px 14px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "Georgia, serif",
                    transition: "all 0.12s",
                  }}
                >
                  {s.label}
                </button>

                {s.expandable && (
                  <span
                    style={{ color: T.faint, fontSize: 11, paddingRight: 10, cursor: "pointer", userSelect: "none" }}
                    onClick={() => setDeepOpen((o) => !o)}
                  >
                    {deepOpen ? "▾" : "▸"}
                  </span>
                )}
              </div>

              {s.expandable &&
                deepOpen &&
                s.sub.map((sub) => {
                  const isActive = openDistricts.has(sub.id) && isDeepActive;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => scrollToDistrict(sub.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        textAlign: "left",
                        background: isActive ? `${sub.color}10` : "transparent",
                        border: "none",
                        borderLeft: `3px solid ${isActive ? sub.color : "transparent"}`,
                        color: isActive ? sub.color : T.faint,
                        padding: "7px 14px 7px 20px",
                        cursor: "pointer",
                        fontSize: 11.5,
                        fontFamily: "Georgia, serif",
                        transition: "all 0.12s",
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: sub.color, flexShrink: 0, opacity: isActive ? 1 : 0.5 }} />
                      {sub.label}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8.5, color: T.faint, marginBottom: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>Generations</div>
          {Object.values(DISTRICTS).map((dist) => (
            <div
              key={dist.id}
              onClick={() => scrollToDistrict(dist.id)}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, cursor: "pointer" }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: dist.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: T.faint }}>
                {dist.year} · {dist.label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "44px 44px 100px", maxWidth: 860 }}>
          {/* HEADER */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Reference Guide</div>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: T.heading, margin: "0 0 12px", lineHeight: 1.25 }}>
              California Tax Increment
              <br />
              Financing Districts
            </h1>
            <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.8, maxWidth: 560, margin: "0 0 20px" }}>
              From the original Redevelopment Agency (1945) to the Disaster Recovery District (2025) — each generation built on the last, fixing what broke,
              adding what was missing.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.values(DISTRICTS).map((dist) => (
                <div
                  key={dist.id}
                  onClick={() => scrollToDistrict(dist.id)}
                  style={{
                    background: C.surface,
                    border: `1px solid ${dist.color}30`,
                    borderRadius: 7,
                    padding: "8px 14px",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: dist.color }}>{dist.label}</div>
                  <div style={{ fontSize: 10, color: T.faint, marginTop: 1 }}>{yearsLabel(dist)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TIMELINE ── */}
          <section ref={setRef("timeline")} data-section="timeline" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>History & Lineage</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 6 }}>Timeline</h2>
            <p style={{ fontSize: 13, color: T.sub, marginBottom: 22, lineHeight: 1.7 }}>
              RDA and IFD ran <em>in parallel</em> — not parent-child. EIFD absorbed both when RDA was dissolved. CRD and DRD are nested subtypes inside EIFD.
              Click any node to jump to its deep-dive.
            </p>
            <div style={{ background: C.surface, borderRadius: 12, padding: "22px 22px 12px", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <BranchingTimeline onSelectDistrict={scrollToDistrict} />
            </div>
          </section>

          {/* ── FAMILY TREE ── */}
          <section ref={setRef("tree")} data-section="tree" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Lineage</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 18 }}>Family Tree</h2>

            {[
              { id: "rda", depth: 0, tag: null, note: "First-generation TIF tool. Powerful and widely used, but fiscally unsustainable — the state backfilled school tax shortfalls until the cost became untenable. Abolished 2012." },
              { id: "ifd", depth: 0, tag: "sibling", note: "Parallel alternative to RDA, created for infrastructure financing. The 2/3 voter approval requirement made it nearly impossible to form in practice." },
              { id: "eifd", depth: 0, tag: "absorbs", note: "Born from RDA's abolition + IFD's legal skeleton. The real working foundation." },
              { id: "crd", depth: 1, tag: "crd-type", note: "Climate-only subtype of EIFD. Adds special tax and GO bond powers. Proactive — no disaster required." },
              { id: "drd", depth: 1, tag: "crd-sub", note: "Disaster subtype of CRD (which is itself a subtype of EIFD). Requires Gov. emergency declaration. Expedited + reduced protest rights." },
            ].map((item) => {
              const dist = DISTRICTS[item.id];
              return (
                <div key={item.id} style={{ display: "flex" }}>
                  {item.depth > 0 && <div style={{ width: item.depth * 28, flexShrink: 0 }} />}
                  <div
                    onClick={() => scrollToDistrict(item.id)}
                    style={{
                      flex: 1,
                      background: C.surface,
                      border: `1px solid ${dist.color}20`,
                      borderLeft: `3px solid ${dist.color}`,
                      borderRadius: 8,
                      padding: "13px 17px",
                      marginBottom: 6,
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: dist.color }}>{dist.label}</span>
                      <span style={{ fontSize: 12, color: T.sub }}>{dist.full}</span>

                      {item.tag === "sibling" && (
                        <span style={{ fontSize: 10, color: C.ifd, fontStyle: "italic", background: `${C.ifd}12`, padding: "1px 7px", borderRadius: 4 }}>
                          parallel alternative to RDA
                        </span>
                      )}
                      {item.tag === "absorbs" && (
                        <span style={{ fontSize: 10, color: C.eifd, fontStyle: "italic", background: `${C.eifd}12`, padding: "1px 7px", borderRadius: 4 }}>
                          absorbs RDA function + IFD legal DNA
                        </span>
                      )}
		      {item.tag === "crd-type" && (
                        <span style={{ fontSize: 10, color: C.crd, fontStyle: "italic", background: `${C.crd}12`, padding: "1px 7px", borderRadius: 4 }}>
                          subtype of EIFD
                        </span>
                      )}
                      {item.tag === "crd-sub" && (
                        <span style={{ fontSize: 10, color: C.drd, fontStyle: "italic", background: `${C.drd}12`, padding: "1px 7px", borderRadius: 4 }}>
                          subtype of CRD → subtype of EIFD
                        </span>
                      )}

                      <span style={{ fontSize: 11, color: T.faint, marginLeft: "auto" }}>{dist.year}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: T.sub, margin: 0, lineHeight: 1.55 }}>{item.note}</p>
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: 14, background: "#fffbeb", borderRadius: 8, padding: "13px 17px", border: "1px solid #fde68a" }}>
              <span style={{ fontSize: 12, color: "#92400e" }}>
                <strong>Key insight:</strong> RDA and IFD were siblings (1990–2012), not parent-child. When RDA died in 2012, EIFD was purpose-built to replace its
                function — borrowing IFD's legal framework but removing the voter threshold and excluding the school tax backfill that made RDA unsustainable.
              </span>
            </div>
          </section>

          {/* ── DEEP DIVE ── */}
          <section ref={setRef("deep")} data-section="deep" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Details</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 18 }}>District Deep-Dives</h2>
<p style={{ fontSize: 17, color: T.sub, marginBottom: 16}}>
    <span style={{ marginRight: 6 }}>👇</span> 
    Click to expand.
  </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.values(DISTRICTS).map((dist) => {
                const isOpen = openDistricts.has(dist.id);

                return (
                  <div
                    key={dist.id}
                    style={{
                      border: `1px solid ${isOpen ? dist.color + "40" : C.border}`,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: C.surface,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <button
                      onClick={() => setOpenDistricts(prev => { const next = new Set(prev); isOpen ? next.delete(dist.id) : next.add(dist.id); return next; })}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "stretch",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "Georgia, serif",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ width: 5, background: dist.color, flexShrink: 0 }} />
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 20px",
                          gap: 12,
                          background: isOpen ? `${dist.color}06` : "transparent",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 15.5, fontWeight: 700, color: dist.color }}>{dist.label}</span>
                            <span style={{ fontSize: 12, color: "#9ca3af" }}>·</span>
                            <span style={{ fontSize: 12, color: "#6b7280" }}>{yearsLabel(dist)}</span>
                          </div>
                          <div style={{ fontSize: 12.5, color: "#374151", marginTop: 4, lineHeight: 1.45 }}>{dist.summary}</div>
                        </div>
                        <span
                          style={{
                            fontSize: 14,
                            color: dist.color,
                            flexShrink: 0,
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            lineHeight: 1,
                          }}
                        >
                          ▾
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{ borderTop: `1px solid ${dist.color}20`, padding: 24 }}>
                        {(() => {
                          const d = dist;
                          return (
                            <>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                                <div>
                                  <h3 style={{ fontSize: 21, fontWeight: 700, color: d.color, margin: 0 }}>{d.label}</h3>
                                  <div style={{ fontSize: 12.5, color: T.sub, marginTop: 3 }}>{d.full}</div>
                                </div>
                                <div
                                  style={{
                                    fontSize: 9.5,
                                    letterSpacing: 1,
                                    padding: "4px 10px",
                                    borderRadius: 4,
                                    background: `${d.color}12`,
                                    color: d.color,
                                    fontWeight: 700,
                                  }}
                                >
                                  {d.status}
                                </div>
                              </div>

                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                                {[
                                  ["Authorizing Law", d.law],
                                  ["Formation Trigger", d.trigger],
                                  ["Formation Timeline", d.formationTime],
                                  ["Duration", d.duration],
                                  ["Protest Rights", d.protestRights],
                                  ["School Tax", d.schoolTax],
                                  ["Governing Body", d.govBody],
                                  ["How Money is Raised", d.moneyRaised],
                                ].map(([k, v]) => (
                                  <div key={k} style={{ background: C.bg, borderRadius: 7, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                                    <div style={{ fontSize: 8.5, letterSpacing: 1, color: T.faint, textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                                    <div style={{ fontSize: 12.5, color: T.body, lineHeight: 1.55 }}>{v}</div>
                                  </div>
                                ))}
                              </div>

                              <div style={{ marginBottom: d.extras || d.boundaryRule || d.death ? 14 : 0 }}>
                                <div style={{ fontSize: 8.5, color: T.faint, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 }}>Eligible Spending</div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                                  {d.eligibleSpend.map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, flexShrink: 0, marginTop: 6 }} />
                                      <span style={{ fontSize: 12.5, color: T.body }}>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {(d.id === "crd" || d.id === "drd") && (
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: "#6b7280",
                                    marginTop: 8,
                                    padding: "8px 12px",
                                    background: "#f7f6f3",
                                    borderRadius: 6,
                                    border: "1px solid #e2e0db",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  <sup style={{ fontSize: 9, fontWeight: 700, color: d.color }}>*</sup>{" "}
                                  <strong>GO bonds (General Obligation bonds)</strong> — Secured by the full property tax of owners within the district — not just TIF
                                  revenue. Allows larger borrowing, but requires voter approval since it directly affects all property owners.
                                </div>
                              )}

                              {d.id === "crd" && (
                                <div style={{ marginTop: 20, padding: "16px 18px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8 }}>
                                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.crd, marginBottom: 6 }}>Resilience District Incubator</div>
                                  <div style={{ fontSize: 12.5, color: T.body, lineHeight: 1.65, marginBottom: 10 }}>
                                    CA FWD (California Forward) and Resilient Cities Catalyst run a hands-on technical assistance program to help communities move from CRD statute to practice. The Incubator provides feasibility support, legal and financial guidance, peer learning across pilot communities, and practical toolkits — bridging the capacity gap for jurisdictions that lack in-house expertise to form a district.
                                  </div>
                                  <div style={{ fontSize: 11.5, color: T.body, lineHeight: 1.6, marginBottom: 10 }}>
                                    <strong>What communities get:</strong> hands-on design assistance, national peer network, advisory group (insurance, finance, risk modeling), and templates for IFPs and cross-sector partnerships.
                                  </div>
                                  <div style={{ fontSize: 11, color: T.sub, marginBottom: 8 }}>Currently launching with pilot communities in California and Connecticut. Priority consideration will be given to Statements of Intent received by February 20.</div>
                                  <a href="https://cafwd.org/fiscal-resilience/resilience-district-incubator/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11.5, color: C.crd, textDecoration: "none", fontWeight: 600 }}>
                                    Learn more at CA FWD ↗
                                  </a>
                                </div>
                              )}

                              {d.boundaryRule && (
                                <div style={{ background: `${d.color}08`, border: `1px solid ${d.color}20`, borderRadius: 7, padding: "10px 12px", marginTop: 12, marginBottom: 10 }}>
                                  <div style={{ fontSize: 8.5, color: d.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Boundary Rule (DRD-specific)</div>
                                  <div style={{ fontSize: 12.5, color: T.body }}>{d.boundaryRule}</div>
                                </div>
                              )}

                              {d.extras && (
                                <div style={{ background: `${C.crd}08`, border: `1px solid ${C.crd}20`, borderRadius: 7, padding: "10px 12px", marginTop: 12, marginBottom: 10 }}>
                                  <div style={{ fontSize: 8.5, color: C.crd, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>
                                    Additional Requirements (CRD-specific)
                                  </div>
                                  {d.extras.map((e, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                                      <span style={{ color: C.crd, fontSize: 13 }}>+</span>
                                      <span style={{ fontSize: 12.5, color: T.body }}>{e}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {d.death && (
                                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7, padding: "10px 12px", marginTop: 12 }}>
                                  <div style={{ fontSize: 8.5, color: "#dc2626", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>
                                    {d.id === "rda" ? "Why It Went Extinct" : "Why It Was Superseded"}
                                  </div>
                                  <div style={{ fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.65 }}>{d.death}</div>
                                </div>
                              )}

                              {d.examples && d.examples.length > 0 && (
                                <div style={{ marginTop: 16 }}>
                                  <div style={{ fontSize: 8.5, color: T.faint, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 }}>Examples</div>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    {d.examples.map((ex, i) => (
                                      <div key={i} style={{ background: C.bg, borderRadius: 7, padding: "10px 12px", borderTop: `2px solid ${d.color}`, border: `1px solid ${d.color}15` }}>
                                        <div style={{ fontSize: 12.5, fontWeight: 600, color: T.heading, marginBottom: 4, lineHeight: 1.4 }}>{ex.name}</div>
                                        {ex.year && <div style={{ fontSize: 10.5, color: d.color, marginBottom: 5 }}>{ex.year}</div>}
                                        <div style={{ fontSize: 11.5, color: T.sub, marginBottom: 5, lineHeight: 1.5 }}><strong style={{ color: T.body }}>Reason:</strong> {ex.reason}</div>
                                        <div style={{ fontSize: 11, color: T.faint, lineHeight: 1.5, fontStyle: "italic" }}>{ex.notes}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── COMPARE TABLE ── */}
          <section ref={setRef("compare")} data-section="compare" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Side-by-Side</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 8 }}>Comparison Table</h2>

<p style={{ fontSize: 17, color: T.sub, marginBottom: 16 }}>
    <span style={{ marginRight: 6 }}>👇</span> 
    Select to filter columns.
  </p>

            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {Object.values(DISTRICTS).map((dist) => (
                <button
                  key={dist.id}
                  onClick={() => setCompareFilter((f) => (f.includes(dist.id) ? f.filter((x) => x !== dist.id) : [...f, dist.id]))}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 14,
                    border: `1px solid ${compareFilter.includes(dist.id) ? dist.color : C.border}`,
                    background: compareFilter.includes(dist.id) ? `${dist.color}10` : C.surface,
                    color: compareFilter.includes(dist.id) ? dist.color : T.sub,
                    cursor: "pointer",
                    fontSize: 11.5,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {compareFilter.includes(dist.id) ? "✓ " : ""}
                  {dist.label}
                </button>
              ))}
              {compareFilter.length > 0 && (
                <button
                  onClick={() => setCompareFilter([])}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 14,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: T.sub,
                    cursor: "pointer",
                    fontSize: 11.5,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, background: C.surface }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.border}`, background: C.bg }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "9px 12px",
                        color: T.faint,
                        fontSize: 9.5,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        minWidth: 130,
                        position: "sticky",
                        left: 0,
                        background: C.bg,
                      }}
                    >
                      Feature
                    </th>
                    {(compareFilter.length === 0 ? Object.values(DISTRICTS) : Object.values(DISTRICTS).filter((dist) => compareFilter.includes(dist.id))).map((dist) => (
                      <th key={dist.id} style={{ textAlign: "left", padding: "9px 12px", color: dist.color, fontSize: 12.5, fontWeight: 700, minWidth: 170 }}>
                        {dist.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, ri) => {
                    const cols = compareFilter.length === 0 ? Object.values(DISTRICTS) : Object.values(DISTRICTS).filter((dist) => compareFilter.includes(dist.id));
                    return (
                      <tr key={row.key} style={{ borderBottom: `1px solid ${C.border}`, background: ri % 2 === 0 ? C.surface : C.bg }}>
                        <td
                          style={{
                            padding: "10px 12px",
                            color: T.sub,
                            fontSize: 11,
                            fontWeight: 600,
                            verticalAlign: "top",
                            background: ri % 2 === 0 ? C.surface : C.bg,
                            position: "sticky",
                            left: 0,
                          }}
                        >
                          {row.label}
                        </td>
                        {cols.map((dist) => (
                          <td key={dist.id} style={{ padding: "10px 12px", color: T.body, verticalAlign: "top", lineHeight: 1.55 }}>
                            {dist[row.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── CRD vs DRD ── */}
          <section ref={setRef("crd-drd")} data-section="crd-drd" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Deep Comparison</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 6 }}>CRD vs DRD</h2>
            <p style={{ fontSize: 13, color: T.sub, marginBottom: 22, lineHeight: 1.7 }}>
              Both are subtypes of EIFD and share the same tax increment machinery — but they exist for fundamentally different situations. Here's how they differ row by row.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 4 }}>
              <div style={{ background: `${C.crd}0e`, border: `2px solid ${C.crd}30`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.crd, marginBottom: 2 }}>CRD</div>
                <div style={{ fontSize: 12, color: T.sub }}>
                  Climate Resilience District ·{" "}
                  <a
                    href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB852"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: C.crd, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}
                  >
                    SB 852 (2022) ↗
                  </a>
                </div>
                <div style={{ marginTop: 10, fontSize: 12.5, color: T.body, lineHeight: 1.6 }}>
                  Proactive tool for communities that face ongoing climate risk — sea level rise, wildfire vulnerability, drought — but haven't suffered a major disaster yet.
                </div>
              </div>

              <div style={{ background: `${C.drd}0e`, border: `2px solid ${C.drd}30`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.drd, marginBottom: 2 }}>DRD</div>
                <div style={{ fontSize: 12, color: T.sub }}>
                  Disaster Recovery District ·{" "}
                  <a
                    href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB782"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: C.drd, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}
                  >
                    SB 782 (2025) ↗
                  </a>
                </div>
                <div style={{ marginTop: 10, fontSize: 12.5, color: T.body, lineHeight: 1.6 }}>
                  Reactive tool for communities already devastated by a declared disaster. Speed over process — formation is expedited and protest rights are reduced.
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead>
                  <tr style={{ background: C.bg, borderBottom: `2px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "10px 14px", color: T.faint, fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", width: "22%" }}>
                      Feature
                    </th>
                    <th style={{ textAlign: "left", padding: "10px 14px", color: C.crd, fontSize: 13, fontWeight: 700, width: "39%" }}>CRD</th>
                    <th style={{ textAlign: "left", padding: "10px 14px", color: C.drd, fontSize: 13, fontWeight: 700, width: "39%" }}>DRD</th>
                  </tr>
                </thead>
                <tbody>
                  {CRD_DRD_ROWS.map((row, ri) => {
                    const crdStr = typeof row.crd === "string" ? row.crd : "";
                    const drdStr = typeof row.drd === "string" ? row.drd : "";
                    const isCrdBetter = crdStr.startsWith("✓") && !drdStr.startsWith("✓");
			const isDrdBetter = drdStr.startsWith("✓") && !crdStr.startsWith("✓");

                    return (
                      <tr key={ri} style={{ borderBottom: `1px solid ${C.border}`, background: ri % 2 === 0 ? C.surface : C.bg }}>
                        <td style={{ padding: "10px 14px", color: T.sub, fontSize: 11, fontWeight: 600, verticalAlign: "top" }}>{row.feature}</td>
                        <td style={{ padding: "10px 14px", color: T.body, verticalAlign: "top", lineHeight: 1.55, fontSize: 12.5 }}>
                          {row.crd}
                        </td>
                        <td style={{ padding: "10px 14px", color: T.body, verticalAlign: "top", lineHeight: 1.55, fontSize: 12.5 }}>
                          {row.drd}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
              <div style={{ background: `${C.crd}08`, border: `1px solid ${C.crd}25`, borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.crd, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>CRD's unique advantages</div>
                {["No disaster required — can form anytime", "Any special district can participate (not just cities/counties)", "Standard democratic protections (protest rights intact)", "Can address any climate risk, not tied to specific event"].map(
                  (pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                      <span style={{ color: C.crd, fontWeight: 700 }}>+</span>
                      <span style={{ fontSize: 12, color: T.body }}>{pt}</span>
                    </div>
                  )
                )}
              </div>

              <div style={{ background: `${C.drd}08`, border: `1px solid ${C.drd}25`, borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.drd, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>DRD's unique advantages</div>
                {["Expedited formation — months not years", "Can fund actual rebuilding of destroyed structures", "Economic recovery is an eligible use", "Utility undergrounding explicitly included"].map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                    <span style={{ color: C.drd, fontWeight: 700 }}>+</span>
                    <span style={{ fontSize: 12, color: T.body }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 12, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px" }}>
              <span style={{ fontSize: 12, color: "#92400e" }}>
                <strong>Both share:</strong> Same 45-year duration, same PFA governance structure, same exclusion of school taxes, same GO bond/special tax powers (with voter approval), same California Environmental Quality Act (CEQA) requirements for individual projects.
              </span>
            </div>
          </section>

          {/* ── EXAMPLES ── */}
          <section ref={setRef("examples")} data-section="examples" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Real World</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 20 }}>Example Districts</h2>

            {Object.values(DISTRICTS).map((dist) => (
              <div key={dist.id} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: dist.color }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: dist.color }}>{dist.label}</span>
                  <span style={{ fontSize: 11.5, color: T.faint }}>— {dist.full}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                  {dist.examples.map((ex, i) => (
                    <div
                      key={i}
                      style={{
                        background: C.surface,
                        borderRadius: 8,
                        padding: "14px",
                        borderTop: `3px solid ${dist.color}`,
                        border: `1px solid ${dist.color}15`,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.heading, marginBottom: 5, lineHeight: 1.4 }}>{ex.name}</div>
                      {ex.year && <div style={{ fontSize: 10.5, color: dist.color, marginBottom: 6 }}>{ex.year}</div>}
                      <div style={{ fontSize: 12, color: T.sub, marginBottom: 6, lineHeight: 1.55 }}>
                        <strong style={{ color: T.body }}>Reason:</strong> {ex.reason}
                      </div>
                      <div style={{ fontSize: 11.5, color: T.faint, lineHeight: 1.5, fontStyle: "italic" }}>{ex.notes}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* ── WHY TWO ── */}
          <section ref={setRef("why")} data-section="why" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Analysis</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 20 }}>Why Do CRD and DRD Both Exist?</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
              {[
                { icon: "⏱", title: "Different Timing", body: "CRD is proactive — for communities facing climate risk but without a disaster yet. DRD is reactive — for already-devastated communities needing speed. A 1–2 year formation process is fine for planning; unacceptable when your neighborhood just burned down." },
                { icon: "💰", title: "Different Scope of Spending", body: "CRD can only fund forward-looking climate resilience projects. It cannot rebuild destroyed homes or support economic recovery. DRD explicitly added structural rebuilding, utility undergrounding, and economic recovery — things post-disaster recovery requires beyond just better fire breaks." },
                { icon: "🗳", title: "Protest Rights Reflect Urgency", body: "CRDs preserved normal EIFD democratic safeguards (25/50% thresholds). DRDs substantially removed those protections. The legislature decided speed outweighs deliberation in a declared disaster zone. Critics note the boundary can extend 20% beyond the actual disaster area." },
                { icon: "⚡", title: "Political Path Dependency", body: "SB 852 (2022) filled a gap in climate finance. The January 2025 LA wildfires exposed that even this tool wasn't fast enough for acute disasters. SB 782 was an urgency statute — effective immediately." },
                { icon: "🔧", title: "Reusing Proven Legal Machinery", body: "By building CRDs and DRDs on top of EIFD rather than inventing new district types, the legislature reused decades of bond mechanics, PFA governance, and TIF accounting rules. The differences are surgical additions — which also meant faster legislative passage." },
                { icon: "📈", title: "The Tax Increment Caveat", body: "Both CRDs and DRDs rely on future property tax growth above the base year. In a devastated area, rebuilding must happen first before meaningful revenue materializes. DRDs are better understood as long-term reimbursement vehicles, not sources of immediate cash." },
              ].map((item, i) => (
                <div key={i} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 20, marginBottom: 7 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.heading, marginBottom: 5 }}>{item.title}</div>
                  <p style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 20, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.crd, marginBottom: 7 }}>Bottom Line</div>
              <p style={{ fontSize: 13.5, color: "#14532d", lineHeight: 1.8, margin: 0 }}>
                CRD and DRD are not redundant. They operate on different timelines (proactive vs. reactive), have different eligible spending (future resilience vs. also recovery), and apply different democratic processes (standard vs. expedited).
              </p>
            </div>

            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", marginBottom: 7 }}>Structural Limitation to Keep in Mind</div>
              <p style={{ fontSize: 13.5, color: "#7f1d1d", lineHeight: 1.8, margin: 0 }}>
                <strong>Schools always lose.</strong> None of these districts can capture the school portion of property taxes — roughly half of all property tax revenue in California. This dramatically limits total increment compared to the RDA era.
              </p>
            </div>
          </section>

          {/* ── REFERENCES ── */}
          <section ref={setRef("refs")} data-section="refs" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Sources</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 20 }}>References</h2>

            {[
              {
                category: "Legislation — Full Bill Text",
                color: C.eifd,
                links: [
                  { label: "SB 628 (2014) — EIFD", sub: "Beall · Chapter 785, Statutes of 2014", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201320140SB628" },
                  { label: "SB 852 (2022) — Climate Resilience District", sub: "Dodd · Chapter 266, Statutes of 2022", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB852" },
                  { label: "SB 782 (2025) — Disaster Recovery District", sub: "Pérez · Urgency statute", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB782" },
                ],
              },
              {
                category: "Example Districts — Official Sites",
                color: C.crd,
                links: [
                  { label: "Sonoma County RCPA — California's First CRD", sub: "rcpa.ca.gov", url: "https://rcpa.ca.gov/what-can-a-climate-resilience-district-do-for-your-community/" },
                ],
              },
              {
                category: "Overviews & Explainers",
                color: C.muted,
                links: [
                  { label: "SCAG — EIFD Overview", sub: "Southern California Association of Governments", url: "https://scag.ca.gov/post/enhanced-infrastructure-financing-district-eifd" },
                  { label: "CA FWD — Resilience District Incubator", sub: "California Forward · Technical assistance program for CRD formation", url: "https://cafwd.org/fiscal-resilience/resilience-district-incubator/" },
                  { label: "CivicWell — SB 852 Signed Into Law", sub: "Co-sponsor analysis · September 2022", url: "https://civicwell.org/civic-news/sb852-signed/" },
                  { label: "SB 852 Fact Sheet (PDF)", sub: "Senator Dodd's office via CivicWell", url: "https://civicwell.org/wp-content/uploads/2022/02/SB-852-fact-sheet.pdf" },
                ],
              },
            ].map((group) => (
              <div key={group.category} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: group.color }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.sub, textTransform: "uppercase", letterSpacing: 0.5 }}>{group.category}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {group.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${group.color}`,
                        borderRadius: 8,
                        padding: "11px 16px",
                        textDecoration: "none",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.heading }}>{link.label}</div>
                        <div style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>{link.sub}</div>
                      </div>
                      <span style={{ fontSize: 12, color: group.color, flexShrink: 0, marginLeft: 12 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* ── GLOSSARY ── */}
          <section ref={setRef("glossary")} data-section="glossary" style={{ marginBottom: 70 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: T.faint, textTransform: "uppercase", marginBottom: 10 }}>Definitions</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.heading, marginBottom: 8 }}>Glossary</h2>
            <p style={{ fontSize: 13, color: T.sub, marginBottom: 24 }}>Key terms and abbreviations used throughout this reference.</p>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>District Types</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
                {[
                  { term: "TIF", full: "Tax Increment Financing", def: "A mechanism that captures the increase in property tax revenue within a designated district as property values rise, using that increment to fund public improvements." },
                  { term: "RDA", full: "Redevelopment Agency", def: "California's original TIF tool (1945–2012). Used tax increment to fund redevelopment in blighted areas. Required blight designation. Abolished by AB 1x26." },
                  { term: "IFD", full: "Infrastructure Financing District", def: "A parallel TIF tool created in 1990. No blight requirement, but the 2/3 voter approval threshold made it nearly impossible to form in practice. Law still on the books." },
                  { term: "EIFD", full: "Enhanced Infrastructure Financing District", def: "IFD's 2014 overhaul (SB 628). Dropped the 2/3 voter threshold, added multi-agency governance, and broadened eligible project types." },
                  { term: "CRD", full: "Climate Resilience District", def: "A subtype of EIFD (SB 852, 2022) for climate-related projects. Adds special tax and GO bond powers. No disaster required to form." },
                  { term: "DRD", full: "Disaster Recovery District", def: "A subtype of CRD (SB 782, 2025) triggered by a Governor-declared state of emergency. Fast-tracked formation, protest thresholds removed. Revenue restricted to disaster-recovery purposes." },
                ].map(({ term, full, def }) => (
                  <div key={term} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.heading, fontFamily: "monospace" }}>{term}</span>
                      <span style={{ fontSize: 11, color: T.sub }}>{full}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.body, lineHeight: 1.6 }}>{def}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>Financing &amp; Legal Terms</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
                {[
                  { term: "GO Bond", full: "General Obligation Bond", def: "A bond secured by the full property-taxing power of all owners within the district — not just TIF revenue. Allows larger borrowing but requires voter approval." },
                  { term: "PFA", full: "Public Financing Authority", def: "The governing board of an EIFD or CRD. Must include at least 3 elected officials from participating agencies and 2 public members." },
                  { term: "IFP", full: "Infrastructure Financing Plan", def: "The core planning document for EIFDs and subtypes. Defines the district boundary, eligible projects, revenue sources, and financing timeline." },
                  { term: "LMI", full: "Low- and Moderate-Income", def: "A household income classification used in California housing law. Affordable housing funded through these districts must be deed-restricted for LMI households (owner-occupied: 45 yrs; rented: 55 yrs)." },
                  { term: "CEQA", full: "California Environmental Quality Act", def: "State law requiring environmental review of public projects. DRDs receive expedited CEQA review for eligible disaster recovery projects." },
                  { term: "SB / AB", full: "Senate Bill / Assembly Bill", def: "California legislation. Key bills: SB 852 (CRD, 2022), SB 782 (DRD, 2025), SB 628 (EIFD, 2014), AB 1x26 (abolished RDAs, 2011)." },
                ].map(({ term, full, def }) => (
                  <div key={term} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.heading, fontFamily: "monospace" }}>{term}</span>
                      <span style={{ fontSize: 11, color: T.sub }}>{full}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.body, lineHeight: 1.6 }}>{def}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>Organizations</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
                {[
                  { term: "RCPA", full: "Regional Climate Protection Authority", def: "Sonoma County's multi-agency climate body — deemed California's first CRD under SB 852." },
                  { term: "SCAG", full: "Southern California Association of Governments", def: "Regional planning agency covering six counties in Southern California. Relevant to Sustainable Communities Strategy planning that EIFDs and CRDs can finance." },
                ].map(({ term, full, def }) => (
                  <div key={term} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.heading, fontFamily: "monospace" }}>{term}</span>
                      <span style={{ fontSize: 11, color: T.sub }}>{full}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.body, lineHeight: 1.6 }}>{def}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: 24,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <div style={{ fontSize: 11, color: T.faint }}>
              <span style={{ fontWeight: 600, color: T.sub }}>Last updated:</span> February 18, 2026
            </div>
            <div style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: 11.5,
              color: "#92400e",
              lineHeight: 1.7,
            }}>
              <strong>Disclaimer:</strong> This reference is intended as an overview only and may not reflect the most recent amendments, implementing regulations, or agency guidance. Statutory provisions — including eligible spending categories, formation requirements, and revenue restrictions — should be verified directly against current bill text and official sources before relying on them for planning, legal, or financial purposes. Links to legislation are provided for convenience; always double-check the implications of any law or bill with qualified legal counsel.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}