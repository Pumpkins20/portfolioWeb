import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, BookOpen, TrendingUp, Flame, Calendar } from "lucide-react";
import {
  fetchGitHubStats,
  GITHUB_FALLBACK_STATS,
  GITHUB_USERNAME,
} from "@/lib/github";
import type { GitHubStats, ContributionDay } from "@/lib/github";
import { IllustrationPlaceholder } from "@/components/ui/illustration-placeholder";

// ── Contribution level → colour ──────────────────────────────────
const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "hsl(234 100% 68% / 0.07)",
  1: "hsl(234 100% 68% / 0.25)",
  2: "hsl(234 100% 68% / 0.50)",
  3: "hsl(234 100% 68% / 0.75)",
  4: "hsl(234 100% 68% / 1)",
};

// ── Single contribution cell ─────────────────────────────────────
function ContributionCell({ day }: { day: ContributionDay }) {
  return (
    <motion.div
      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
      className="rounded-[3px] cursor-default"
      style={{
        width: "100%",
        aspectRatio: "1",
        background: LEVEL_COLORS[day.level],
        border: `1px solid ${day.level === 0 ? "hsl(234 100% 68% / 0.1)" : "hsl(234 100% 68% / 0.15)"}`,
      }}
      whileHover={{ scale: 1.4 }}
      transition={{ duration: 0.15 }}
    />
  );
}

// ── Contribution grid ────────────────────────────────────────────
function ContributionGrid({
  weeks,
}: {
  weeks: GitHubStats["contributions"];
}) {
  // Day-of-week labels (Sun → Sat)
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month labels derived from first day of each week
  const monthLabels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.days[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({
        label: new Date(firstDay.date).toLocaleString("default", { month: "short" }),
        colIndex: i,
      });
      lastMonth = month;
    }
  });

  if (!weeks.length) {
    // Loading skeleton
    return (
      <div className="flex gap-1 overflow-x-auto pb-2">
        {Array.from({ length: 52 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-[3px] skeleton"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* Month labels */}
      <div className="relative ml-8 mb-1 h-4 overflow-hidden">
        {monthLabels.map(({ label, colIndex }) => (
          <span
            key={`${label}-${colIndex}`}
            className="absolute font-body text-[10px] text-foreground/40"
            style={{ left: `${(colIndex / weeks.length) * 100}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Grid + day labels */}
      <div className="flex gap-1 items-start">
        {/* Day-of-week labels */}
        <div className="flex flex-col gap-1 mr-1 flex-shrink-0">
          {dayLabels.map((d, i) => (
            <span
              key={d}
              className="font-body text-[9px] text-foreground/30 leading-none"
              style={{
                height: "calc(100% / 7)",
                // Only show Mon, Wed, Fri to avoid crowding
                visibility: i % 2 === 1 ? "visible" : "hidden",
              }}
              aria-hidden="true"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Weeks */}
        <div
          className="flex gap-[3px] flex-1"
          role="grid"
          aria-label="GitHub contribution calendar"
        >
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className="flex flex-col gap-[3px] flex-1"
              role="row"
            >
              {week.days.map((day) => (
                <ContributionCell key={day.date} day={day} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="font-body text-[10px] text-foreground/35">Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-[3px]"
            style={{
              background: LEVEL_COLORS[level],
              border: `1px solid hsl(234 100% 68% / 0.15)`,
            }}
            aria-hidden="true"
          />
        ))}
        <span className="font-body text-[10px] text-foreground/35">More</span>
      </div>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color }}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
      <p
        className="font-heading font-bold text-2xl leading-none"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}aa 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </p>
      <p className="font-body text-xs text-foreground/45 leading-tight">{label}</p>
    </motion.div>
  );
}

// ── Language bar ─────────────────────────────────────────────────
function LanguageBar({
  stats,
}: {
  stats: GitHubStats["topLanguages"];
}) {
  if (!stats.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-heading font-semibold text-sm text-foreground/70">
        Top Languages
      </p>

      {/* Stacked bar */}
      <div
        className="w-full h-3 rounded-full overflow-hidden flex"
        aria-label="Language distribution bar"
        role="img"
      >
        {stats.map((lang) => (
          <motion.div
            key={lang.name}
            title={`${lang.name}: ${lang.percentage}%`}
            style={{ background: lang.color, width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {stats.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: lang.color }}
              aria-hidden="true"
            />
            <span className="font-body text-xs text-foreground/60">
              {lang.name}
            </span>
            <span className="font-body text-[10px] text-foreground/35 font-semibold">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Recent activity feed ─────────────────────────────────────────
function ActivityFeed({
  events,
}: {
  events: GitHubStats["recentActivity"]["recentEvents"];
}) {
  const actionLabel: Record<string, string> = {
    PushEvent: "Pushed to",
    PullRequestEvent: "Pull request on",
    IssuesEvent: "Issue on",
    CreateEvent: "Created",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    PublicEvent: "Published",
    DeleteEvent: "Deleted",
    CommitCommentEvent: "Commented on",
  };

  const actionEmoji: Record<string, string> = {
    PushEvent: "⬆️",
    PullRequestEvent: "🔀",
    IssuesEvent: "🐛",
    CreateEvent: "✨",
    WatchEvent: "⭐",
    ForkEvent: "🍴",
    PublicEvent: "📢",
    DeleteEvent: "🗑️",
    CommitCommentEvent: "💬",
  };

  const visible = events.slice(0, 5);

  if (!visible.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-heading font-semibold text-sm text-foreground/70">
        Recent Activity
      </p>
      <div className="flex flex-col gap-2">
        {visible.map((event) => {
          const repoName = event.repo.name.split("/")[1] ?? event.repo.name;
          const date = new Date(event.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const label = actionLabel[event.type] ?? "Interacted with";
          const emoji = actionEmoji[event.type] ?? "📌";

          return (
            <div
              key={event.id}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/50 text-sm"
            >
              <span className="text-base leading-none flex-shrink-0" aria-hidden="true">
                {emoji}
              </span>
              <span className="font-body text-xs text-foreground/55 flex-1 truncate">
                <span className="text-foreground/75">{label}</span>{" "}
                <span className="font-semibold text-primary/80">{repoName}</span>
              </span>
              <span className="font-body text-[10px] text-foreground/35 flex-shrink-0">
                {date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main GithubMountain component ────────────────────────────────
export function GithubMountain() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchGitHubStats(GITHUB_USERNAME);
        if (!cancelled) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load GitHub data";
          setError(message);
          // Use fallback with a synthetic user object
          setStats({
            ...GITHUB_FALLBACK_STATS,
            user: {
              login: GITHUB_USERNAME,
              name: "Firdaus Alamanda",
              avatar_url: "",
              bio: "Full-Stack Developer · Turning Coffee Into Code ☕",
              html_url: `https://github.com/${GITHUB_USERNAME}`,
              public_repos: GITHUB_FALLBACK_STATS.totalRepos,
              followers: 0,
              following: 0,
              created_at: "",
            },
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = stats
    ? [
        {
          icon: BookOpen,
          value: stats.totalRepos,
          label: "Public Repos",
          color: "#5B6CFF",
        },
        {
          icon: Star,
          value: stats.totalStars,
          label: "Total Stars",
          color: "#FFB86B",
        },
        {
          icon: GitFork,
          value: stats.totalForks,
          label: "Total Forks",
          color: "#8A7CFF",
        },
        {
          icon: Flame,
          value: `${stats.recentActivity.activeStreakDays}d`,
          label: "Active Streak",
          color: "#FF7AA2",
        },
        {
          icon: TrendingUp,
          value: stats.recentActivity.totalCommitsThisYear,
          label: "Commits This Year",
          color: "#5ED6A3",
        },
        {
          icon: Calendar,
          value: stats.recentActivity.lastActiveDate,
          label: "Last Active",
          color: "#67B7FF",
        },
      ]
    : [];

  return (
    <section
      id="activity"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(246 80% 97%) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(234 100% 68%) 0%, transparent 70%)",
          }}
        />
        {/* Mountain silhouette (pure CSS / SVG decoration) */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 200 L200 80 L350 130 L500 30 L650 100 L800 20 L950 90 L1100 40 L1200 70 L1200 200 Z"
            fill="hsl(234 100% 68%)"
          />
        </svg>
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <span className="section-label">
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub Mountain
            </span>

            <h2 className="font-heading font-bold">
              Climbing the{" "}
              <span className="text-gradient">commit mountain</span>
            </h2>

            <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-lg">
              Every square is a day of work. Every green patch is a problem
              solved, a feature shipped, or a system improved. The mountain
              never stops growing.
            </p>

            {/* GitHub profile link */}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-body gradient-primary text-white shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 w-fit border-0"
              aria-label={`View ${GITHUB_USERNAME} on GitHub`}
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              @{GITHUB_USERNAME}
            </a>
          </motion.div>

          {/* Right: illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <IllustrationPlaceholder
              scene="GitHub Mountain"
              icon="⛰️"
              description="Digital mountain · Glowing contribution squares · Mascot climbing with laptop"
              variant="inline"
              height={240}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* ── Stats grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl skeleton"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {statCards.map((card, i) => (
              <StatCard key={card.label} {...card} delay={i * 0.08} />
            ))}
          </div>
        )}

        {/* ── Error notice (non-blocking) ── */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-body border"
            style={{
              background: "hsl(31 100% 71% / 0.1)",
              borderColor: "hsl(31 100% 71% / 0.3)",
              color: "hsl(31 100% 45%)",
            }}
          >
            <span aria-hidden="true">⚠️</span>
            <span>
              Showing cached data — live GitHub stats temporarily unavailable.{" "}
              <span className="opacity-70 text-xs">{error}</span>
            </span>
          </motion.div>
        )}

        {/* ── Contribution graph ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl bg-card border border-border shadow-card mb-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Contribution Activity
            </h3>
            {stats && (
              <span className="font-body text-xs text-foreground/40">
                {stats.recentActivity.totalCommitsThisYear} contributions this year
              </span>
            )}
          </div>

          {loading ? (
            <div className="h-28 rounded-xl skeleton" />
          ) : (
            <ContributionGrid weeks={stats?.contributions ?? []} />
          )}
        </motion.div>

        {/* ── Bottom row: languages + activity ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-card border border-border shadow-card"
          >
            {loading ? (
              <div className="flex flex-col gap-3">
                <div className="h-4 w-32 rounded skeleton" />
                <div className="h-3 rounded-full skeleton" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 w-16 rounded-full skeleton" />
                  ))}
                </div>
              </div>
            ) : (
              <LanguageBar stats={stats?.topLanguages ?? []} />
            )}
          </motion.div>

          {/* Recent activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-card border border-border shadow-card"
          >
            {loading ? (
              <div className="flex flex-col gap-3">
                <div className="h-4 w-36 rounded skeleton" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-9 rounded-xl skeleton" />
                ))}
              </div>
            ) : (
              <ActivityFeed
                events={stats?.recentActivity.recentEvents ?? []}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GithubMountain;
