import styles from '../pages/TheGapPage.module.css';

const GapMeasure = () => (
  <div className={styles.measure}>
    <svg
      className={styles.mDesktop}
      viewBox="0 0 1100 250"
      role="img"
      aria-label="A measured interval between client approval and money landing, containing signature, deposit, scope confirmation and kickoff — none of which are owned by a system."
    >
      <defs>
        <pattern id="gap-hatch" width="9" height="9" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#8b5cf6" strokeWidth="1.6" opacity="0.38" />
        </pattern>
      </defs>

      <g className={styles.gapBandAnim}>
        <rect x="246" y="52" width="608" height="86" fill="url(#gap-hatch)" />
        <rect x="246" y="52" width="608" height="86" fill="#8b5cf6" opacity="0.06" />
      </g>

      <line x1="0" y1="138" x2="1100" y2="138" stroke="rgba(255,255,255,0.22)" strokeWidth="1.25" />

      <g className={styles.anchorIn}>
        <line x1="246" y1="30" x2="246" y2="176" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
        <text className={styles.svgMono} x="246" y="22" fontSize="10.5" fill="#8f8fa6">
          APPROVAL
        </text>
        <text className={styles.svgSerif} x="246" y="200" fontSize="21" fill="#e8e8f0">
          Client says yes
        </text>

        <line x1="854" y1="30" x2="854" y2="176" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
        <text className={styles.svgMono} x="854" y="22" fontSize="10.5" fill="#8f8fa6" textAnchor="end">
          SETTLEMENT
        </text>
        <text className={styles.svgSerif} x="854" y="200" fontSize="21" fill="#e8e8f0" textAnchor="end">
          Money lands
        </text>
      </g>

      <g className={styles.lateAnim}>
        <line x1="252" y1="95" x2="470" y2="95" stroke="#8b5cf6" strokeWidth="1" />
        <line x1="630" y1="95" x2="848" y2="95" stroke="#8b5cf6" strokeWidth="1" />
        <path d="M252 95 L262 91 L262 99 Z" fill="#8b5cf6" />
        <path d="M848 95 L838 91 L838 99 Z" fill="#8b5cf6" />
        <text className={styles.svgMono} x="550" y="100" fontSize="13" fill="#c084fc" textAnchor="middle">
          [ XX–XX DAYS ]
        </text>
      </g>

      <g className={styles.lateAnim}>
        <line x1="330" y1="138" x2="330" y2="126" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="330" y="118" fontSize="12.5" fill="#8f8fa6" textAnchor="middle">
          Signature
        </text>

        <line x1="470" y1="138" x2="470" y2="126" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="470" y="118" fontSize="12.5" fill="#8f8fa6" textAnchor="middle">
          Deposit
        </text>

        <line x1="632" y1="138" x2="632" y2="126" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="632" y="118" fontSize="12.5" fill="#8f8fa6" textAnchor="middle">
          Scope confirmed
        </text>

        <line x1="770" y1="138" x2="770" y2="126" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="770" y="118" fontSize="12.5" fill="#8f8fa6" textAnchor="middle">
          Kickoff
        </text>

        <text className={styles.svgMono} x="550" y="238" fontSize="10.5" fill="#5c5c72" textAnchor="middle">
          NO SYSTEM OWNS THIS INTERVAL
        </text>
      </g>
    </svg>

    <svg
      className={styles.mMobile}
      viewBox="0 0 340 470"
      role="img"
      aria-label="A measured interval between client approval and money landing."
    >
      <defs>
        <pattern id="gap-hatch-m" width="9" height="9" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#8b5cf6" strokeWidth="1.6" opacity="0.38" />
        </pattern>
      </defs>

      <g className={styles.gapBandAnimMobile}>
        <rect x="16" y="56" width="96" height="330" fill="url(#gap-hatch-m)" />
        <rect x="16" y="56" width="96" height="330" fill="#8b5cf6" opacity="0.06" />
      </g>

      <line x1="112" y1="14" x2="112" y2="440" stroke="rgba(255,255,255,0.22)" strokeWidth="1.25" />

      <g className={styles.anchorIn}>
        <line x1="16" y1="56" x2="180" y2="56" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
        <text className={styles.svgMono} x="130" y="46" fontSize="9.5" fill="#8f8fa6">
          APPROVAL
        </text>
        <text className={styles.svgSerif} x="130" y="72" fontSize="19" fill="#e8e8f0">
          Client says yes
        </text>

        <line x1="16" y1="386" x2="180" y2="386" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
        <text className={styles.svgMono} x="130" y="376" fontSize="9.5" fill="#8f8fa6">
          SETTLEMENT
        </text>
        <text className={styles.svgSerif} x="130" y="402" fontSize="19" fill="#e8e8f0">
          Money lands
        </text>
      </g>

      <g className={styles.lateAnim}>
        <line x1="64" y1="120" x2="64" y2="322" stroke="#8b5cf6" strokeWidth="1" />
        <path d="M64 116 L60 126 L68 126 Z" fill="#8b5cf6" />
        <path d="M64 326 L60 316 L68 316 Z" fill="#8b5cf6" />
        <text className={styles.svgMono} x="64" y="216" fontSize="11" fill="#c084fc" textAnchor="middle">
          [ XX–XX
        </text>
        <text className={styles.svgMono} x="64" y="234" fontSize="11" fill="#c084fc" textAnchor="middle">
          DAYS ]
        </text>

        <line x1="112" y1="140" x2="124" y2="140" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="132" y="144" fontSize="12" fill="#8f8fa6">
          Signature
        </text>
        <line x1="112" y1="200" x2="124" y2="200" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="132" y="204" fontSize="12" fill="#8f8fa6">
          Deposit
        </text>
        <line x1="112" y1="262" x2="124" y2="262" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="132" y="266" fontSize="12" fill="#8f8fa6">
          Scope confirmed
        </text>
        <line x1="112" y1="322" x2="124" y2="322" stroke="#8f8fa6" strokeWidth="1" />
        <text className={styles.svgSans} x="132" y="326" fontSize="12" fill="#8f8fa6">
          Kickoff
        </text>

        <text className={styles.svgMono} x="16" y="458" fontSize="9.5" fill="#5c5c72">
          NO SYSTEM OWNS THIS INTERVAL
        </text>
      </g>
    </svg>
  </div>
);

export default GapMeasure;
