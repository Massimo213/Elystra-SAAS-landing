/**
 * Shared careers data — list + per-role pages.
 * Full role detail for every open position (Indeed-ready copy + compensation).
 */

export type RoleSection = {
  heading: string;
  body: string[];
};

export type CompLine = {
  label: string;
  value: string;
};

export type CareerRole = {
  id: string;
  slug: string;
  title: string;
  department: "Sales" | "Operations" | "Engineering";
  summary: string;
  /** Short list blurb under the title */
  sections: RoleSection[];
  compensation?: {
    lines: CompLine[];
    math: string[];
  };
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "sdr",
    slug: "sales-development-representative",
    title: "Sales Development Representative (SDR)",
    department: "Sales",
    summary:
      "Remote, Philippines. You don’t close the deal. You start the ones that matter. Own the first conversation with agency owners across North America, and get paid every time a qualified demo hits the calendar.",
    sections: [
      {
        heading: "About Elystra",
        body: [
          "Elystra is building the revenue operating system for agencies: the infrastructure layer between a conversation and cash in the bank.",
          "Most agencies don’t have a lead problem. They have an execution problem. Sales lives in one tool. Proposals in another. Follow-up dies in inboxes. Revenue slips through the cracks every single day.",
          "We’re building the system that connects the entire commercial motion, from the first call to signed agreements to collected revenue, so agencies operate with discipline, visibility, and predictability.",
          "We’re building a sales organization with the same standard: clear systems, high bars, relentless execution. No chaos. No excuses.",
        ],
      },
      {
        heading: "The role",
        body: [
          "This is outbound SDR. One mission: generate qualified opportunities for our Account Executives.",
          "Speak with agency owners. Identify the ones who are ready. Book demos that actually run.",
          "You will not close deals. You will not build lead lists. You will not manage customer accounts.",
          "You will own the first conversation, and everything that follows starts with how you open the door.",
        ],
      },
      {
        heading: "Why this role matters",
        body: [
          "Every customer begins with a single conversation. One call. One moment where you earn their attention.",
          "Great SDRs don’t fill calendars. They create momentum. They qualify hard. They set the standard for every interaction that comes after.",
          "The growth of this company runs through this role. Your pipeline is the front line of Elystra’s revenue engine.",
        ],
      },
      {
        heading: "What you’ll own",
        body: [
          "Hunt marketing and advertising agencies across North America.",
          "Run outbound cold calls to owners and decision-makers who control the budget.",
          "Qualify opportunities using our sales framework: no tire-kickers, no “just browsing.”",
          "Book qualified demo meetings that Account Executives can close.",
          "Keep CRM records accurate. What gets tracked gets improved.",
          "Get sharper every week through coaching, call reviews, and repetition.",
          "We remove the operational friction: lead lists, CRM, dialer, scripts, training, coaching. You show up and execute.",
        ],
      },
      {
        heading: "What success looks like",
        body: [
          "Success isn’t effort. It’s execution: visible, repeatable, on the board.",
          "Top SDRs at Elystra take ownership of their numbers like it’s their company.",
          "They protect their daily calling blocks like sacred time.",
          "They absorb feedback and come back stronger on the next dial.",
          "They stay composed when the phone goes cold, and they dial anyway.",
          "They improve week over week. Performance is transparent. Results speak for themselves.",
        ],
      },
      {
        heading: "Who thrives here",
        body: [
          "You love the craft of earning someone’s attention on the phone, under pressure, when they didn’t ask to hear from you.",
          "You’re comfortable being measured by outcomes, because you intend to win.",
          "You learn fast from feedback and apply it faster.",
          "You can run the same play with the same intensity on call 200 as call 1.",
          "You’re building a long-term career in B2B sales, not collecting a paycheck until something better shows up.",
          "Previous SDR, BDR, appointment-setting, or outbound experience helps. Coachability and execution matter more than titles.",
        ],
      },
      {
        heading: "This role is probably not for you if",
        body: [
          "You prefer unstructured work without measurable goals.",
          "You struggle with feedback or accountability.",
          "You’re looking for a temporary role, a placeholder until the “real” opportunity appears.",
        ],
      },
      {
        heading: "Growth",
        body: [
          "High-performing SDRs don’t stay SDRs forever.",
          "As Elystra scales, we build our commercial organization from within: Account Executive, team lead, and beyond.",
          "The path is earned: master this level. Then we talk about the next one.",
        ],
      },
    ],
    compensation: {
      lines: [
        { label: "Starting base (everyone)", value: "$600 USD / month" },
        { label: "Tier 1", value: "$600 / month" },
        {
          label: "Tier 2",
          value: "$600 / month + $10 per qualified demo",
        },
        {
          label: "Tier 2 unlock",
          value: "Avg 3 qualified demos / day for 2 consecutive weeks",
        },
        {
          label: "Tier 3",
          value: "$600 / month + $20 per qualified demo",
        },
        {
          label: "Tier 3 unlock",
          value: "Avg 4 qualified demos / day for 2 consecutive weeks",
        },
      ],
      math: [
        "Everyone starts at $600 USD/month. Performance unlocks higher earning tiers. Hit the threshold for two straight weeks and you stay on that tier.",
        "Tier 2 at 3 demos/day: ~66 demos/month × $10 = $660 variable + $600 base → ~$1,260/month (~$15K/year).",
        "Tier 3 at 4 demos/day: ~88 demos/month × $20 = $1,760 variable + $600 base → ~$2,360/month (~$28K/year).",
        "The faster you unlock Tier 3 and hold the pace, the faster your monthly check compounds.",
      ],
    },
  },
  {
    id: "ae",
    slug: "account-executive",
    title: "Account Executive (AE)",
    department: "Sales",
    summary:
      "Remote. Our SDRs open the door. You walk through it and close. Own the final stage: understand the business, run the demo, handle the commercial conversation, and turn qualified opportunities into signed customers.",
    sections: [
      {
        heading: "The role",
        body: [
          "As an Account Executive, you own the final stage of Elystra’s sales process.",
          "SDRs create qualified opportunities. Your job is to understand the prospect’s business, demonstrate Elystra, navigate commercial discussions, and close new customers.",
          "This is for people who love consultative selling, build trust fast, and consistently move opportunities to signed agreements. Not “let me circle back.”",
        ],
      },
      {
        heading: "What you’ll own",
        body: [
          "Run product demonstrations for qualified prospects who are ready to evaluate.",
          "Understand agency sales processes and the commercial problems Elystra solves.",
          "Guide prospects through evaluation, decision-making, and commitment.",
          "Negotiate and close new business: clean handoffs, signed agreements, revenue on the board.",
          "Maintain accurate pipeline forecasting. No fantasy pipeline.",
          "Work closely with SDRs to sharpen conversion quality from first call to close.",
        ],
      },
      {
        heading: "What success looks like",
        body: [
          "High demo-to-close conversion. You don’t waste qualified opportunities.",
          "Forecasting you can stand behind. Numbers that match reality.",
          "A professional customer experience that sets the tone for the entire relationship.",
          "Consistent revenue generation: month after month, month after month, not one heroic quarter, not one heroic quarter.",
          "Continuous improvement through call reviews, feedback, and repetition.",
        ],
      },
      {
        heading: "Who thrives here",
        body: [
          "Strong discovery skills: you diagnose before you prescribe.",
          "Comfortable discussing business problems, not just product features.",
          "Disciplined follow-up. Deals don’t die in your pipeline from neglect.",
          "Highly organized pipeline management: you know exactly where every deal stands exactly where every deal stands.",
          "Ownership mentality. The number is yours. The outcome is yours.",
        ],
      },
      {
        heading: "This role is probably not for you if",
        body: [
          "You dislike accountability to revenue.",
          "You avoid difficult commercial conversations.",
          "You rely on pressure instead of understanding customer needs.",
          "You struggle to manage multiple opportunities at once without dropping one.",
        ],
      },
      {
        heading: "Growth",
        body: [
          "Outstanding Account Executives don’t stay individual contributors forever.",
          "As Elystra expands, top performers will build teams, mentor new hires, and move into commercial leadership.",
          "The path is earned through closed revenue and repeatable excellence, not tenure.",
        ],
      },
    ],
    compensation: {
      lines: [
        { label: "Base salary", value: "$1,500 USD / month" },
        { label: "Commission", value: "20% on every closed deal" },
      ],
      math: [
        "Compensation grows directly with performance. The more you close, the more you earn.",
        "Example: close $10K in new business in a month → 20% = $2,000 commission + $1,500 base → $3,500 that month.",
        "Close $25K in a month → $5,000 commission + $1,500 base → $6,500. No ceiling except your conversion rate and pipeline discipline.",
      ],
    },
  },
  {
    id: "stl",
    slug: "sales-team-lead",
    title: "Sales Team Lead",
    department: "Sales",
    summary:
      "Remote. You don’t manage people, you multiply them. Coach SDRs, sharpen call quality, and build a team where execution improves every single week.",
    sections: [
      {
        heading: "The role",
        body: [
          "Sales Team Leads multiply the performance of the SDR team.",
          "Your responsibility isn’t paperwork or status updates. It’s creating an environment where execution improves every week.",
          "You coach SDRs, review calls, identify weaknesses, and ensure consistent production across the entire pod.",
        ],
      },
      {
        heading: "What you’ll own",
        body: [
          "Daily coaching and call reviews: real feedback, not generic pep talks.",
          "SDR onboarding. New hires ramp fast or they don’t stay.",
          "Performance management with clarity and accountability.",
          "KPI tracking that drives behavior, not vanity metrics.",
          "Process improvements that compound team output over time.",
          "Sales quality standards: every demo that hits the calendar is worth an AE’s time.",
        ],
      },
      {
        heading: "What success looks like",
        body: [
          "Team performance improves consistently, not in spikes, in trends.",
          "New SDRs ramp quickly and hit production without months of drift.",
          "High coaching quality. Reps get better because of you, not despite you.",
          "Strong accountability without killing morale.",
          "Consistent execution across the team: everyone runs the same standard.",
        ],
      },
      {
        heading: "Who thrives here",
        body: [
          "You naturally coach others, it’s not a task on your list, it’s who you are.",
          "You lead through execution. You’ve done the work and you can show how.",
          "You give direct, constructive feedback without flinching.",
          "Organized and disciplined: you think in systems, rhythms, and weekly cadence.",
          "You measure success by team results, not personal heroics.",
        ],
      },
      {
        heading: "This role is probably not for you if",
        body: [
          "You avoid difficult conversations.",
          "You prefer managing over coaching: dashboards over development.",
          "You believe activity matters more than results.",
        ],
      },
      {
        heading: "Growth",
        body: [
          "As Elystra’s commercial organization grows, Sales Team Leads shape the future of sales management and leadership.",
          "This role is the proving ground for building and running larger revenue teams.",
          "Leadership here is measured by the team’s results, and the leaders we promote are the ones who made those results repeatable.",
        ],
      },
    ],
    compensation: {
      lines: [
        { label: "Base salary", value: "$2,000 USD / month" },
        { label: "Team performance bonus", value: "Tied to pod results" },
      ],
      math: [
        "Leadership is measured by the team’s results, your compensation reflects that.",
        "Strong base plus team performance bonus when the pod hits its targets.",
        "The better you coach, the faster SDRs ramp, the higher the team produces, and the more you earn.",
      ],
    },
  },
  {
    id: "research",
    slug: "lead-research-intelligence-specialist",
    title: "Lead Research & Intelligence Specialist",
    department: "Operations",
    summary:
      "Remote. Sales quality starts before the first dial. You decide who enters the pipeline: build the lists, find the decision-makers, and keep every SDR talking to people worth calling.",
    sections: [
      {
        heading: "The role",
        body: [
          "Sales quality begins long before the first phone call.",
          "The Lead Research & Intelligence Specialist identifies, qualifies, and organizes the companies our sales team targets.",
          "Your work determines who enters the pipeline. Bad data wastes everyone’s time.",
        ],
      },
      {
        heading: "What you’ll own",
        body: [
          "Build high-quality prospect lists: agencies that should be on Elystra, not random names.",
          "Research agencies and decision-makers with precision.",
          "Maintain lead quality standards. Every record should be call-ready.",
          "Enrich CRM data so SDRs spend time dialing, not guessing.",
          "Continuously improve targeting accuracy based on what converts.",
        ],
      },
      {
        heading: "What success looks like",
        body: [
          "Accurate prospect data: right company, right person, right context.",
          "High-quality lead lists that SDRs trust without second-guessing.",
          "Minimal data errors. Clean inputs create clean outputs.",
          "Strong support for the SDR team. They move faster because of your work.",
        ],
      },
      {
        heading: "Who thrives here",
        body: [
          "Highly detail-oriented: you notice what others miss.",
          "Naturally organized. Structure is your default, not a chore.",
          "You enjoy research and get satisfaction from precision.",
          "Comfortable working with structured data and consistent processes.",
          "Consistent and methodical: same standard on record 1 and record 1,000.",
        ],
      },
      {
        heading: "This role is probably not for you if",
        body: [
          "You rush through repetitive work.",
          "You dislike attention to detail.",
          "You prefer improvisation over structure.",
        ],
      },
      {
        heading: "Growth",
        body: [
          "High performers expand into revenue operations, sales operations, or commercial intelligence.",
          "This role sits at the foundation of the entire sales motion. Mastery here opens doors across the commercial org.",
          "The best researchers become the architects of who Elystra pursues and why.",
        ],
      },
    ],
    compensation: {
      lines: [
        { label: "Base salary", value: "$900 USD / month" },
      ],
      math: [
        "Performance is measured by lead quality and operational accuracy, not volume for volume’s sake.",
        "Clean lists mean SDRs book more demos. Better targeting means higher conversion. Your work compounds across the entire revenue team.",
      ],
    },
  },
  {
    id: "founding-ai-engineer",
    slug: "founding-ai-engineer",
    title: "Founding AI Engineer",
    department: "Engineering",
    summary:
      "Remote. AI is the core layer of what we build. Not a feature bolted on. Design, ship, and improve production AI systems that power Elystra’s product and internal operations.",
    sections: [
      {
        heading: "The role",
        body: [
          "Artificial intelligence is becoming a core layer of modern software. At Elystra, it already is.",
          "Your responsibility is to design, build, and improve AI systems that strengthen Elystra’s product and internal operations.",
          "This is hands-on engineering: reliable, production-ready systems that real customers depend on. Not demos. Not decks.",
        ],
      },
      {
        heading: "What you’ll own",
        body: [
          "Design AI-powered product features that move revenue: proposal generation, scoring, handoffs, collection.",
          "Build prompt pipelines and AI workflows that hold up under load.",
          "Improve automation across internal operations so the team moves faster.",
          "Evaluate new models and architectures with rigor, not hype.",
          "Collaborate with engineering and product: what you ship has to work on the sales floor, not just in a notebook.",
        ],
      },
      {
        heading: "What success looks like",
        body: [
          "Reliable production systems: uptime, quality, and maintainability.",
          "Practical AI features that create measurable value for agencies using Elystra.",
          "High engineering quality. Code you’re proud to own six months later.",
          "Thoughtful technical decisions: the right tool for the problem, not the trendiest one.",
          "Continuous experimentation and iteration that actually ships.",
        ],
      },
      {
        heading: "Who thrives here",
        body: [
          "Strong software engineering fundamentals: you can build beyond the API wrapper.",
          "Curiosity about applied AI and how it changes commercial workflows.",
          "Systems thinking. You see how pieces connect across the product.",
          "High ownership. You don’t wait for a ticket. You see the gap and close it.",
          "Continuous learning without losing focus on shipping.",
        ],
      },
      {
        heading: "This role is probably not for you if",
        body: [
          "You chase AI trends without shipping products.",
          "You enjoy prototypes more than production systems.",
          "You prefer research over execution.",
        ],
      },
      {
        heading: "Growth",
        body: [
          "As Elystra’s technical organization expands, engineers lead major product initiatives and shape the architecture of the platform.",
          "This is a founding role: early impact compounds into long-term ownership of critical systems.",
          "The engineers who define Elystra’s AI layer now will define what the product becomes.",
        ],
      },
    ],
    compensation: {
      lines: [
        { label: "Base salary", value: "$3,000 USD / month" },
      ],
      math: [
        "Compensation reflects ownership, technical execution, and long-term impact.",
        "You’re building production AI at the core of a revenue operating system, not maintaining someone else’s backlog.",
        "Early engineers here shape the architecture. That ownership is the upside beyond the base.",
      ],
    },
  },
];

export const CAREER_DEPARTMENTS = ["Sales", "Operations", "Engineering"] as const;

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug);
}

export function rolesByDepartment(department: CareerRole["department"]): CareerRole[] {
  return CAREER_ROLES.filter((role) => role.department === department);
}
