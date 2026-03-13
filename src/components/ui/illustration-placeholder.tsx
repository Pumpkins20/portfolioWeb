import { cn } from "@/lib/utils";

interface IllustrationPlaceholderProps {
  /** Scene name shown as the main label */
  scene: string;
  /** Optional emoji icon representing the scene */
  icon?: string;
  /** Optional short description of what illustration goes here */
  description?: string;
  /** Width class (Tailwind) — default fills parent */
  className?: string;
  /** Fixed height in px or Tailwind height class */
  height?: number | string;
  /** Variant: full scene illustration or small mascot corner */
  variant?: "scene" | "mascot" | "inline";
  /** Optional style override */
  style?: React.CSSProperties;
}

const variantConfig = {
  scene: {
    minHeight: 320,
    iconSize: "text-5xl",
    labelSize: "text-xs",
    descSize: "text-[11px]",
    padding: "p-8",
    badge: "Scene Illustration",
  },
  mascot: {
    minHeight: 160,
    iconSize: "text-3xl",
    labelSize: "text-[10px]",
    descSize: "text-[10px]",
    padding: "p-4",
    badge: "Mascot",
  },
  inline: {
    minHeight: 220,
    iconSize: "text-4xl",
    labelSize: "text-xs",
    descSize: "text-[11px]",
    padding: "p-6",
    badge: "Illustration",
  },
} as const;

export function IllustrationPlaceholder({
  scene,
  icon = "🎨",
  description,
  className,
  height,
  variant = "scene",
  style,
}: IllustrationPlaceholderProps) {
  const config = variantConfig[variant];

  const heightStyle: React.CSSProperties = height
    ? typeof height === "number"
      ? { minHeight: height }
      : {}
    : { minHeight: config.minHeight };

  return (
    <div
      className={cn("illustration-placeholder relative select-none", className)}
      style={{ ...heightStyle, ...style }}
      aria-hidden="true"
      role="img"
      aria-label={`Illustration placeholder: ${scene}`}
    >
      {/* Top-left badge */}
      <span
        className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase"
        style={{
          background: "hsl(234 100% 68% / 0.1)",
          color: "hsl(234 100% 68% / 0.7)",
          border: "1px solid hsl(234 100% 68% / 0.2)",
        }}
      >
        {config.badge}
      </span>

      {/* Main content */}
      <div className={cn("flex flex-col items-center justify-center gap-3 w-full h-full", config.padding)}>
        {/* Icon */}
        <span
          className={cn(
            "placeholder-icon leading-none",
            config.iconSize,
            "animate-float-gentle"
          )}
          style={{ animationDuration: "8s" }}
        >
          {icon}
        </span>

        {/* Scene name */}
        <p
          className="font-heading font-semibold text-center leading-tight"
          style={{
            fontSize: variant === "mascot" ? "0.8125rem" : "1rem",
            color: "hsl(234 100% 68% / 0.75)",
          }}
        >
          {scene}
        </p>

        {/* Optional description */}
        {description && (
          <p
            className={cn(
              "placeholder-label text-center leading-relaxed max-w-[220px]",
              config.descSize
            )}
          >
            {description}
          </p>
        )}

        {/* Dashed inner frame hint */}
        {variant === "scene" && (
          <div
            className="absolute inset-6 rounded-xl pointer-events-none"
            style={{
              border: "1px dashed hsl(234 100% 68% / 0.15)",
            }}
          />
        )}

        {/* Corner decorators — small dots */}
        <CornerDots />
      </div>
    </div>
  );
}

/** Four tiny accent dots at each corner — purely decorative */
function CornerDots() {
  const positions = [
    "top-2 left-2",
    "top-2 right-2",
    "bottom-2 left-2",
    "bottom-2 right-2",
  ] as const;

  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
          style={{ background: "hsl(234 100% 68% / 0.25)" }}
        />
      ))}
    </>
  );
}

export default IllustrationPlaceholder;
