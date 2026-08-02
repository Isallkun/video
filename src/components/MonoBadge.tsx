import { COLORS, FONT_MONO } from "../theme/tokens";

/** Monospace pill for on-chain data: addresses, tx hashes, amounts. */
export const MonoBadge: React.FC<{
  children: React.ReactNode;
  invert?: boolean;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, invert = false, size = 30, style }) => {
  return (
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: size,
        fontWeight: 500,
        padding: "8px 16px",
        borderRadius: 6,
        border: `1px solid ${invert ? COLORS.ink : COLORS.line}`,
        background: invert ? COLORS.ink : COLORS.surfaceRaised,
        color: invert ? COLORS.onBrand : COLORS.ink,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
};
