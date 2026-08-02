import { COLORS, FONT_MONO } from "../theme/tokens";

/** Minimal browser-window chrome to frame product UI mocks. */
export const DeviceFrame: React.FC<{
  url?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ url = "app.archestra.xyz", width = 1360, height = 780, children, style }) => {
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.shell,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(10,10,10,0.10)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <div
        style={{
          height: 52,
          borderBottom: `1px solid ${COLORS.line}`,
          background: COLORS.surfaceRaised,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 18px",
          flexShrink: 0,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, background: COLORS.line }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: COLORS.line }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: COLORS.line }} />
        <div
          style={{
            marginLeft: 16,
            flex: 1,
            height: 30,
            borderRadius: 6,
            background: COLORS.shell,
            border: `1px solid ${COLORS.line}`,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: COLORS.inkMuted,
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
};
