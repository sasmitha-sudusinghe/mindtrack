import { useId } from 'react';

function useGid() {
  return useId().replace(/:/g, '');
}

/** Shared defs: cyan → violet gradient + soft inner specular */
function IsoGradients({ gid }) {
  return (
    <defs>
      <linearGradient id={`${gid}-cv`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="45%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id={`${gid}-cv2`} x1="64" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id={`${gid}-ice`} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
  );
}

const isoBase = {
  display: 'block',
  flexShrink: 0,
};

/** Calm slate tones for the sky-themed header */
export function IconBrain({ size = 44, className = '' }) {
  const gid = useGid();
  return (
    <svg
      className={`iso-icon brain-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={isoBase}
    >
      <defs>
        <linearGradient id={`${gid}-brain`} x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8ba3b8" />
          <stop offset="55%" stopColor="#5a7185" />
          <stop offset="100%" stopColor="#3e5467" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gid}-brain)`}
        stroke="#3e5467"
        strokeWidth="1.25"
        strokeLinejoin="round"
        d="M32 9.5c-4.8 0-9 2.4-11.6 6.1-1.1-.6-2.5-.4-3.4.6-.9 1-1 2.5-.2 3.6-3.3 1.8-5.5 5.3-5.5 9.3 0 2.6 1 5 2.7 6.8-.5 1.1-.7 2.4-.4 3.7.6 2.4 2.6 4.2 5 4.7.3 3.4 2.5 6.4 5.6 7.6.8 3.8 4.2 6.6 8.2 6.6h.4c4 0 7.4-2.8 8.2-6.6 3.1-1.2 5.3-4.2 5.6-7.6 2.4-.5 4.4-2.3 5-4.7.3-1.3.1-2.6-.4-3.7 1.7-1.8 2.7-4.2 2.7-6.8 0-4-2.2-7.5-5.5-9.3.8-1.1.7-2.6-.2-3.6-.9-1-2.3-1.2-3.4-.6C41 11.9 36.8 9.5 32 9.5z"
      />
      <path
        d="M32 14v34"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 22c3 1 5 3.5 5.5 6M16 30c3.5.5 6 2.5 7 5M17 38c3 2 6 2.5 8.5 1.5"
        stroke="rgba(62,84,103,0.45)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M46 22c-3 1-5 3.5-5.5 6M48 30c-3.5.5-6 2.5-7 5M47 38c-3 2-6 2.5-8.5 1.5"
        stroke="rgba(62,84,103,0.45)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M28 52c1.2 2 2.8 3.2 4 3.5 1.2-.3 2.8-1.5 4-3.5"
        stroke="#3e5467"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function IconBrand({ size = 56, className = '' }) {
  const gid = useGid();
  return (
    <svg
      className={`iso-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={isoBase}
    >
      <IsoGradients gid={gid} />
      {/* Back prism — depth layer */}
      <g opacity={0.55}>
        <path
          d="M40 10 L52 18 L52 36 L40 44 L28 36 L28 18 Z"
          fill={`url(#${gid}-cv2)`}
          opacity={0.35}
        />
        <path d="M40 10 L52 18 L40 26 L28 18 Z" fill="#22d3ee" opacity={0.25} />
      </g>
      {/* Middle cube */}
      <path d="M24 22 L36 30 L36 48 L24 56 L12 48 L12 30 Z" fill={`url(#${gid}-cv)`} />
      <path d="M24 22 L36 30 L24 38 L12 30 Z" fill="#a5f3fc" opacity={0.85} />
      <path d="M36 30 L36 48 L24 56 L24 38 Z" fill="#06b6d4" opacity={0.9} />
      <path d="M12 30 L24 38 L24 56 L12 48 Z" fill="#0e7490" opacity={0.95} />
      {/* Front cube — z-top */}
      <path d="M32 8 L48 18 L48 38 L32 48 L16 38 L16 18 Z" fill={`url(#${gid}-ice)`} />
      <path d="M32 8 L48 18 L32 28 L16 18 Z" fill="#cffafe" opacity={0.95} />
      <path d="M48 18 L48 38 L32 48 L32 28 Z" fill="#22d3ee" />
      <path d="M16 18 L32 28 L32 48 L16 38 Z" fill="#155e75" />
      <path d="M28 20 L36 25 L36 32 L28 37 L20 32 L20 25 Z" fill="#e0f2fe" opacity={0.35} />
    </svg>
  );
}

export function IconMood({ size = 40, className = '' }) {
  const gid = useGid();
  return (
    <svg
      className={`iso-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={isoBase}
    >
      <IsoGradients gid={gid} />
      {/* Isometric bars */}
      <path d="M8 46 L8 34 L14 31 L14 43 Z" fill="#164e63" />
      <path d="M8 34 L14 31 L14 37 L8 40 Z" fill="#22d3ee" opacity={0.5} />
      <path d="M18 46 L18 28 L24 25 L24 43 Z" fill="#155e75" />
      <path d="M18 28 L24 25 L24 34 L18 37 Z" fill="#67e8f9" opacity={0.55} />
      <path d="M28 46 L28 22 L34 19 L34 43 Z" fill="#0e7490" />
      <path d="M28 22 L34 19 L34 30 L28 33 Z" fill="#22d3ee" opacity={0.7} />
      {/* Floating mood node */}
      <g>
        <path d="M44 12 L58 22 L58 40 L44 50 L30 40 L30 22 Z" fill={`url(#${gid}-cv)`} />
        <path d="M44 12 L58 22 L44 30 L30 22 Z" fill="#e0f2fe" opacity={0.9} />
        <path d="M58 22 L58 40 L44 50 L44 30 Z" fill="#a855f7" opacity={0.85} />
        <path d="M30 22 L44 30 L44 50 L30 40 Z" fill="#5b21b6" opacity={0.9} />
      </g>
      <ellipse cx="44" cy="30" rx="5" ry="3" fill="#0c4a6e" opacity={0.35} />
      <path d="M38 28 Q44 32 50 28" stroke="#cffafe" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function IconGoal({ size = 40, className = '' }) {
  const gid = useGid();
  return (
    <svg
      className={`iso-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={isoBase}
    >
      <IsoGradients gid={gid} />
      {/* Pedestal */}
      <path d="M16 48 L32 58 L48 48 L32 38 Z" fill="#164e63" />
      <path d="M16 48 L32 38 L32 44 L16 54 Z" fill="#0e7490" />
      <path d="M32 38 L48 48 L48 54 L32 44 Z" fill="#155e75" />
      {/* Pillar */}
      <path d="M28 44 L36 39 L36 18 L28 23 Z" fill="#0891b2" />
      <path d="M36 39 L44 34 L44 13 L36 18 Z" fill="#22d3ee" />
      <path d="M28 23 L36 18 L44 13 L36 8 L28 13 Z" fill="#a5f3fc" />
      {/* Flag */}
      <path d="M36 8 L54 14 L36 22 Z" fill={`url(#${gid}-cv)`} />
      <path d="M36 8 L36 22 L32 20 L32 6 Z" fill="#c4b5fd" />
      <path d="M32 6 L36 8 L36 44 L32 46 Z" fill="#7c3aed" />
    </svg>
  );
}

export function IconResource({ size = 40, className = '' }) {
  const gid = useGid();
  return (
    <svg
      className={`iso-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={isoBase}
    >
      <IsoGradients gid={gid} />
      {/* Back book */}
      <path d="M10 22 L26 14 L42 24 L26 32 Z" fill="#312e81" opacity={0.9} />
      <path d="M10 22 L10 42 L26 50 L26 32 Z" fill="#1e1b4b" />
      <path d="M26 32 L42 24 L42 44 L26 50 Z" fill="#4338ca" opacity={0.85} />
      {/* Middle */}
      <path d="M14 28 L30 20 L46 30 L30 38 Z" fill={`url(#${gid}-cv2)`} opacity={0.9} />
      <path d="M14 28 L14 46 L30 54 L30 38 Z" fill="#0e7490" />
      <path d="M30 38 L46 30 L46 48 L30 54 Z" fill="#22d3ee" opacity={0.75} />
      {/* Front tome */}
      <path d="M18 34 L34 26 L52 38 L34 46 Z" fill={`url(#${gid}-cv)`} />
      <path d="M18 34 L18 50 L34 58 L34 46 Z" fill="#155e75" />
      <path d="M34 46 L52 38 L52 54 L34 58 Z" fill="#67e8f9" opacity={0.5} />
      <path d="M22 38 L40 36" stroke="#e0f2fe" strokeWidth="1" strokeLinecap="round" opacity={0.6} />
      <path d="M22 42 L36 41" stroke="#e0f2fe" strokeWidth="1" strokeLinecap="round" opacity={0.45} />
    </svg>
  );
}
