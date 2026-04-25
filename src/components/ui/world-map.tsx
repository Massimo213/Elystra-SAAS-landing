import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AmbientLight, DirectionalLight, Color } from "three";
import Globe, { type GlobeMethods } from "react-globe.gl";

const ARC_LINKS_RAW = [
  { startLat: 40.71, startLng: -74.01, endLat: 51.51, endLng: -0.13 },
  { startLat: 51.51, startLng: -0.13, endLat: 1.35, endLng: 103.82 },
  { startLat: 1.35, startLng: 103.82, endLat: 35.68, endLng: 139.76 },
  { startLat: 35.68, startLng: 139.76, endLat: -33.87, endLng: 151.21 },
  { startLat: -33.87, startLng: 151.21, endLat: 34.05, endLng: -118.24 },
  { startLat: 34.05, startLng: -118.24, endLat: 19.43, endLng: -99.13 },
  { startLat: 19.43, startLng: -99.13, endLat: -23.55, endLng: -46.63 },
  { startLat: -23.55, startLng: -46.63, endLat: -34.6, endLng: -58.38 },
  { startLat: 40.71, startLng: -74.01, endLat: 25.2, endLng: 55.27 },
  { startLat: 25.2, startLng: 55.27, endLat: 28.61, endLng: 77.21 },
  { startLat: 25.2, startLng: 55.27, endLat: 19.08, endLng: 72.88 },
  { startLat: 40.19, startLng: 116.46, endLat: 1.35, endLng: 103.82 },
  { startLat: 50.11, startLng: 8.68, endLat: 55.76, endLng: 37.62 },
  { startLat: 51.51, startLng: -0.13, endLat: 30.04, endLng: 31.24 },
  { startLat: 19.08, startLng: 72.88, endLat: 1.35, endLng: 103.82 },
  { startLat: 37.57, startLng: 126.98, endLat: 35.68, endLng: 139.76 },
  { startLat: 28.61, startLng: 77.21, endLat: 1.35, endLng: 103.82 },
  { startLat: 48.86, startLng: 2.35, endLat: 19.08, endLng: 72.88 },
  { startLat: 40.71, startLng: -74.01, endLat: 43.65, endLng: -79.38 },
  { startLat: -23.55, startLng: -46.63, endLat: 40.71, endLng: -74.01 },
  { startLat: 51.51, startLng: -0.13, endLat: 50.11, endLng: 8.68 },
  { startLat: -26.2, startLng: 28.05, endLat: 30.04, endLng: 31.24 },
  { startLat: -26.2, startLng: 28.05, endLat: 1.35, endLng: 103.82 },
  { startLat: 34.05, startLng: -118.24, endLat: 40.19, endLng: 116.46 },
  { startLat: 40.19, startLng: 116.46, endLat: 25.2, endLng: 55.27 },
  { startLat: 51.51, startLng: -0.13, endLat: -23.55, endLng: -46.63 },
  { startLat: 34.05, startLng: -118.24, endLat: 37.57, endLng: 126.98 },
  { startLat: 22.32, startLng: 114.17, endLat: 35.68, endLng: 139.76 },
  { startLat: 41.88, startLng: -87.63, endLat: 51.51, endLng: -0.13 },
  { startLat: 6.52, startLng: 3.38, endLat: 51.51, endLng: -0.13 },
  { startLat: 30.04, startLng: 31.24, endLat: 25.2, endLng: 55.27 },
  { startLat: 13.76, startLng: 100.5, endLat: 22.32, endLng: 114.17 },
  { startLat: -1.29, startLng: 36.82, endLat: 25.2, endLng: 55.27 },
  { startLat: 33.87, startLng: 35.51, endLat: 48.86, endLng: 2.35 },
  { startLat: 40.71, startLng: -74.01, endLat: -23.55, endLng: -46.63 },
  { startLat: 55.76, startLng: 37.62, endLat: 28.61, endLng: 77.21 },
] as const;

type ArcRow = (typeof ARC_LINKS_RAW)[number] & {
  _phase: number;
  _speed: number;
};

const GOLDEN = 0.618033988749895;

function withArcMotion(links: readonly (typeof ARC_LINKS_RAW)[number][]): ArcRow[] {
  return links.map((link, i) => ({
    ...link,
    _phase: (i * GOLDEN) % 1,
    _speed: 3600 + (i % 11) * 95,
  }));
}

type SvgIcon = "dollar" | "network" | "close" | "retention";

interface GlobeHudMarker {
  lat: number;
  lng: number;
  alt: number;
  primary: string;
  secondary: string;
  tertiary?: string;
  icon: SvgIcon;
  wide?: boolean;
}

const GLOBE_HUD_DATA: GlobeHudMarker[] = [
  {
    lat: 25.2,
    lng: 55.0,
    alt: 0.2,
    primary: "US$6.2M",
    secondary: "AGENCY REVENUE · Q1 2026",
    tertiary: "And it's not over.",
    icon: "dollar",
    wide: true,
  },
  {
    lat: 51.0,
    lng: 3.0,
    alt: 0.19,
    primary: "170+",
    secondary: "AGENCIES — US + CANADA",
    tertiary: "Running their sales on one rail.",
    icon: "network",
  },
  {
    lat: -30.0,
    lng: 138.0,
    alt: 0.19,
    primary: "55% OUT · 92% IN",
    secondary: "MEDIAN CLOSE RATE",
    tertiary: "Outbound 55% · Inbound 92%",
    icon: "close",
  },
  {
    lat: -18.0,
    lng: -52.0,
    alt: 0.19,
    primary: "62%",
    secondary: "INBOUND CLIENT RETENTION",
    tertiary: "Stay because of the process.",
    icon: "retention",
  },
];

const WORLD_POV = { lat: 18, lng: 22, altitude: 2.1 };

const EARTH = "//unpkg.com/three-globe/example/img/earth-night.jpg";
const EARTH_TOPO = "//unpkg.com/three-globe/example/img/earth-topology.png";

const ICONS: Record<SvgIcon, string> = {
  dollar: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 2v2M12 20v2M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  network: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/><circle cx="19" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="19" r="2.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 6.2a6 6 0 0 0 0 4.1M17 6.2a6 6 0 0 1 0 4.1M9.2 16.1a4 4 0 0 0 5.6 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  close: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  retention: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M17 18a5 5 0 0 0-10 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="9" r="4" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

function buildHudElement(d: GlobeHudMarker) {
  const el = document.createElement("div");
  el.className = `elystra-globe-hud${d.wide ? " elystra-globe-hud--wide" : ""}`;

  const row = document.createElement("div");
  row.className = "elystra-globe-hud__row";

  const iconWrap = document.createElement("div");
  iconWrap.className = "elystra-globe-hud__icon";
  iconWrap.innerHTML = ICONS[d.icon];

  const col = document.createElement("div");
  col.className = "elystra-globe-hud__body";

  const primary = document.createElement("div");
  primary.className = "elystra-globe-hud__value";
  primary.textContent = d.primary;

  const secondary = document.createElement("div");
  secondary.className = "elystra-globe-hud__kicker";
  secondary.textContent = d.secondary;

  col.appendChild(primary);
  col.appendChild(secondary);

  if (d.tertiary) {
    const t = document.createElement("div");
    t.className = "elystra-globe-hud__tertiary";
    t.textContent = d.tertiary;
    col.appendChild(t);
  }

  row.appendChild(iconWrap);
  row.appendChild(col);
  el.appendChild(row);
  return el;
}

export default function ElystraGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 900, h: 820 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const height = Math.min(width * 0.92, 880);
    setDims({ w: width, h: height });
  }, []);

  const htmlElement = useCallback((d: object) => buildHudElement(d as GlobeHudMarker), []);

  const arcsData = useMemo(() => withArcMotion(ARC_LINKS_RAW), []);

  // `arcColor(arc)` must return a `(t) => color` — `t` is position along the tube (vertex shader).
  const arcColor = useCallback(
    (_arc: object) => (t: number) => {
      if (t < 0.1) return "rgba(255, 255, 255, 0.98)";
      if (t < 0.28) return "rgba(233, 213, 255, 0.84)";
      if (t < 0.52) return "rgba(196, 181, 253, 0.52)";
      if (t < 0.76) return "rgba(217, 70, 239, 0.3)";
      if (t < 0.88) return "rgba(161, 161, 170, 0.24)";
      return "rgba(82, 82, 91, 0.14)";
    },
    [],
  );

  const arcDashInitialGap = useCallback((d: object) => (d as ArcRow)._phase, []);
  const arcDashAnimateTime = useCallback((d: object) => (d as ArcRow)._speed, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const onGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView(WORLD_POV, 0);

    const fill = new AmbientLight(0xc4b5fd, 1.55);
    const key = new DirectionalLight(0xf5f3ff, 1.4);
    key.position.set(-0.9, 0.45, 0.9);
    const back = new DirectionalLight(0xa78bfa, 0.58);
    back.position.set(0.4, 0.1, -1);
    const rimViolet = new DirectionalLight(new Color("#8b5cf6"), 0.34);
    rimViolet.position.set(0, -0.3, 0.6);
    const rimFuchsia = new DirectionalLight(new Color("#d946ef"), 0.18);
    rimFuchsia.position.set(0.6, 0.2, 0.2);

    g.lights([fill, key, back, rimViolet, rimFuchsia]);

    const controls = g.controls();
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.enableDamping = true;
    controls.dampingFactor = 0.085;

    setReady(true);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 30% 30%, rgba(76, 29, 149, 0.34) 0%, transparent 55%)",
            "radial-gradient(ellipse 55% 45% at 75% 65%, rgba(91, 33, 182, 0.26) 0%, transparent 50%)",
            "radial-gradient(ellipse 45% 35% at 52% 48%, rgba(217, 70, 239, 0.12) 0%, transparent 55%)",
            "radial-gradient(ellipse 130% 100% at 50% 50%, #020203 0%, #000 100%)",
          ].join(","),
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: [
            "radial-gradient(0.5px 0.5px at 12% 18%, rgba(255,255,255,0.4), transparent)",
            "radial-gradient(0.75px 0.75px at 22% 32%, rgba(192,132,252,0.45), transparent)",
            "radial-gradient(0.5px 0.5px at 45% 22%, rgba(255,255,255,0.3), transparent)",
            "radial-gradient(0.75px 0.75px at 58% 16%, rgba(217,70,239,0.36), transparent)",
            "radial-gradient(0.5px 0.5px at 78% 8%, rgba(255,255,255,0.35), transparent)",
            "radial-gradient(0.75px 0.75px at 88% 55%, rgba(168,85,247,0.34), transparent)",
            "radial-gradient(0.5px 0.5px at 20% 72%, rgba(255,255,255,0.2), transparent)",
            "radial-gradient(0.5px 0.5px at 60% 88%, rgba(255,255,255,0.22), transparent)",
          ].join(","),
        }}
      />

      <div
        className="relative transition-opacity duration-[1.4s] [&>canvas]:saturate-[0.6] [&>canvas]:contrast-110 [&>canvas]:brightness-125"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Globe
          ref={globeRef}
          onGlobeReady={onGlobeReady}
          width={dims.w}
          height={dims.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={EARTH}
          bumpImageUrl={EARTH_TOPO}
          showAtmosphere
          atmosphereColor="#a78bfa"
          atmosphereAltitude={0.14}
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={arcColor}
          arcAltitudeAutoScale={0.48}
          arcStroke={0.2}
          arcDashLength={0.13}
          arcDashGap={0.024}
          arcDashInitialGap={arcDashInitialGap}
          arcDashAnimateTime={arcDashAnimateTime}
          arcsTransitionDuration={2200}
          arcCurveResolution={160}
          arcCircularResolution={12}
          htmlElementsData={GLOBE_HUD_DATA}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude="alt"
          htmlElement={htmlElement}
          htmlTransitionDuration={500}
          enablePointerInteraction
          waitForGlobeReady
          animateIn
        />
      </div>
    </div>
  );
}
