import { motion } from 'framer-motion';

export default function Logo({ size = 64, animated = false, className = '' }) {
  const svg = (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="80" height="80" rx="22" fill="#0B1F1C" />
      <rect
        x="1.5"
        y="1.5"
        width="77"
        height="77"
        rx="20.5"
        stroke="url(#logoStroke)"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Orbit ring */}
      <ellipse
        cx="40"
        cy="40"
        rx="22"
        ry="14"
        stroke="#3DDC97"
        strokeWidth="1.6"
        opacity="0.55"
        transform="rotate(-28 40 40)"
      />

      {/* Connection lines */}
      <path
        d="M28 48 L40 28 L52 48 Z"
        stroke="#3DDC97"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />

      {/* Nodes */}
      <circle cx="40" cy="28" r="5" fill="#F4B942" />
      <circle cx="28" cy="48" r="5" fill="#3DDC97" />
      <circle cx="52" cy="48" r="5" fill="#5CC8FF" />
      <circle cx="40" cy="40" r="3.2" fill="#E8F3EF" />

      <defs>
        <linearGradient id="logoStroke" x1="8" y1="8" x2="72" y2="72">
          <stop stopColor="#3DDC97" />
          <stop offset="1" stopColor="#F4B942" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (!animated) return svg;

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-flex' }}
    >
      <motion.div
        animate={{ rotate: [0, 6, -4, 0] }}
        transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
      >
        {svg}
      </motion.div>
    </motion.div>
  );
}
