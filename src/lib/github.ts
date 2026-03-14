// ═══════════════════════════════════════════════════════════════════
// GitHub API Library
// ─ User / repo stats   → GitHub REST API v3 (public, no auth needed)
// ─ Contribution graph  → github-contributions-api.jogruber.de
//   (The official GitHub REST API does NOT expose the contribution
//    calendar without a GraphQL auth token. The jogruber service
//    scrapes it publicly and exposes a clean JSON endpoint.)
// ═══════════════════════════════════════════════════════════════════

export const GITHUB_USERNAME = "Pumpkins20";
const GITHUB_API_BASE = "https://api.github.com";
const CONTRIBUTIONS_API_BASE =
  "https://github-contributions-api.jogruber.de/v4";

// ─────────────────────────────────────────────────────────────────
// Types — GitHub REST API
// ─────────────────────────────────────────────────────────────────

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  private: boolean;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
  };
}

// ─────────────────────────────────────────────────────────────────
// Types — Contribution calendar (jogruber API)
// ─────────────────────────────────────────────────────────────────

/** Raw response from github-contributions-api.jogruber.de */
interface ContributionsAPIResponse {
  total: Record<string, number>; // { "lastYear": 251, "2024": 180, ... }
  contributions: Array<{
    date: string; // "YYYY-MM-DD"
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

// ─────────────────────────────────────────────────────────────────
// Types — Aggregated stats
// ─────────────────────────────────────────────────────────────────

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ActivitySummary {
  /** Actual total from GitHub contribution calendar (last year) */
  totalContributionsLastYear: number;
  /** Longest current streak of consecutive days with ≥1 contribution */
  activeStreakDays: number;
  /** Most recent date that had ≥1 contribution */
  lastActiveDate: string;
  /** Up to 10 most recent public events (for the activity feed) */
  recentEvents: GitHubEvent[];
}

export interface GitHubStats {
  user: GitHubUser;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: LanguageStat[];
  pinnedRepos: GitHubRepo[];
  activity: ActivitySummary;
  contributions: ContributionWeek[];
}

// ─────────────────────────────────────────────────────────────────
// Language colour map
// ─────────────────────────────────────────────────────────────────

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  PHP: "#787CB5",
  Python: "#3776AB",
  "C#": "#239120",
  Java: "#B07219",
  Kotlin: "#A97BFF",
  Swift: "#FA7343",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Ruby: "#CC342D",
  CSS: "#563D7C",
  HTML: "#E34C26",
  Vue: "#4FC08D",
  Dart: "#00B4AB",
  Shell: "#89E051",
  SCSS: "#C6538C",
  Dockerfile: "#384D54",
  MDX: "#FCB32C",
  default: "#8A7CFF",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? LANGUAGE_COLORS.default;
}

// ─────────────────────────────────────────────────────────────────
// Custom error classes
// ─────────────────────────────────────────────────────────────────

export class GitHubAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

export class GitHubRateLimitError extends GitHubAPIError {
  constructor(message: string) {
    super(message);
    this.name = "GitHubRateLimitError";
  }
}

export class GitHubNotFoundError extends GitHubAPIError {
  constructor(message: string) {
    super(message);
    this.name = "GitHubNotFoundError";
  }
}

// ─────────────────────────────────────────────────────────────────
// Fetch helpers
// ─────────────────────────────────────────────────────────────────

async function githubFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${GITHUB_API_BASE}${endpoint}`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    if (res.status === 403) {
      throw new GitHubRateLimitError(
        "GitHub API rate limit exceeded. Please try again later.",
      );
    }
    if (res.status === 404) {
      throw new GitHubNotFoundError(`GitHub resource not found: ${url}`);
    }
    throw new GitHubAPIError(
      `GitHub API error ${res.status}: ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────────────────────────
// Individual fetchers — GitHub REST API
// ─────────────────────────────────────────────────────────────────

export async function fetchGitHubUser(
  username = GITHUB_USERNAME,
): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${username}`);
}

export async function fetchGitHubRepos(
  username = GITHUB_USERNAME,
): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const batch = await githubFetch<GitHubRepo[]>(
      `/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`,
    );
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < perPage) break;
    page++;
    if (page > 5) break; // safety cap — max 500 repos
  }

  return all;
}

export async function fetchGitHubEvents(
  username = GITHUB_USERNAME,
  pages = 2,
): Promise<GitHubEvent[]> {
  const all: GitHubEvent[] = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const batch = await githubFetch<GitHubEvent[]>(
        `/users/${username}/events/public?per_page=100&page=${page}`,
      );
      if (batch.length === 0) break;
      all.push(...batch);
    } catch {
      break;
    }
  }

  return all;
}

// ─────────────────────────────────────────────────────────────────
// Contribution calendar — jogruber API
//
// Endpoint: GET /v4/{username}?y=last
//
// Why not the GitHub REST API?
//   The GitHub REST API has no public endpoint for the contribution
//   calendar (the green-square heatmap). That data is only exposed via
//   the GraphQL API which requires an authenticated token. The jogruber
//   service scrapes the public profile page and exposes it as clean JSON
//   — no token, no CORS issues.
// ─────────────────────────────────────────────────────────────────

/**
 * Fetch the last-year contribution calendar from jogruber's API and
 * reshape it into the ContributionWeek[] format used by the UI.
 *
 * Returns both the flat contributions (for streak/stats calculation)
 * and the weekly grid (for the heatmap).
 */
export async function fetchContributions(username = GITHUB_USERNAME): Promise<{
  weeks: ContributionWeek[];
  totalLastYear: number;
  streak: number;
  lastActiveDate: string;
}> {
  const url = `${CONTRIBUTIONS_API_BASE}/${username}?y=last`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new GitHubAPIError(
      `Contributions API error ${res.status}: ${res.statusText}`,
    );
  }

  const data = (await res.json()) as ContributionsAPIResponse;

  // ── Total contributions ──────────────────────────────────────
  const totalLastYear =
    data.total?.lastYear ??
    Object.values(data.total ?? {}).reduce((s, n) => s + n, 0);

  // ── Sort days chronologically ────────────────────────────────
  const days = [...data.contributions].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  // ── Active streak (consecutive days ending today with count>0) ─
  const activeDays = new Set(
    days.filter((d) => d.count > 0).map((d) => d.date),
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    if (activeDays.has(dateStr)) {
      streak++;
    } else if (i > 0) {
      // Allow today to be empty (day not over yet) and still keep streak
      break;
    }
  }

  // ── Last active date ─────────────────────────────────────────
  const activeDaysSorted = [...activeDays].sort();
  const lastActiveDate =
    activeDaysSorted[activeDaysSorted.length - 1] ??
    today.toISOString().slice(0, 10);

  // ── Build 52-week grid ───────────────────────────────────────
  // Build a lookup map for O(1) access
  const dayMap: Record<string, ContributionDay> = {};
  for (const d of days) {
    dayMap[d.date] = d;
  }

  // End at the most recent Sunday (align grid to weeks)
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - today.getDay()); // roll back to Sunday

  // Start 52 full weeks before that Sunday
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7 + 1);

  const weeks: ContributionWeek[] = [];
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const week: ContributionDay[] = [];

    for (let d = 0; d < 7; d++) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const existing = dayMap[dateStr];

      week.push(
        existing ?? {
          date: dateStr,
          count: 0,
          level: 0,
        },
      );

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push({ days: week });
  }

  return { weeks, totalLastYear, streak, lastActiveDate };
}

// ─────────────────────────────────────────────────────────────────
// Derived stats helpers
// ─────────────────────────────────────────────────────────────────

export function computeTotalStars(repos: GitHubRepo[]): number {
  return repos
    .filter((r) => !r.fork)
    .reduce((sum, r) => sum + r.stargazers_count, 0);
}

export function computeTotalForks(repos: GitHubRepo[]): number {
  return repos
    .filter((r) => !r.fork)
    .reduce((sum, r) => sum + r.forks_count, 0);
}

export function computeTopLanguages(
  repos: GitHubRepo[],
  limit = 6,
): LanguageStat[] {
  const counts: Record<string, number> = {};

  for (const repo of repos) {
    if (!repo.fork && repo.language) {
      counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: getLanguageColor(name),
    }));
}

export function computePinnedRepos(
  repos: GitHubRepo[],
  limit = 6,
): GitHubRepo[] {
  return repos
    .filter((r) => !r.fork && !r.private)
    .sort((a, b) => {
      const scoreA =
        a.stargazers_count * 3 + new Date(a.pushed_at).getTime() / 1e12;
      const scoreB =
        b.stargazers_count * 3 + new Date(b.pushed_at).getTime() / 1e12;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────
// Main aggregator
// ─────────────────────────────────────────────────────────────────

export async function fetchGitHubStats(
  username = GITHUB_USERNAME,
): Promise<GitHubStats> {
  // Fire all three requests in parallel
  const [user, repos, events, contrib] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
    fetchGitHubEvents(username),
    fetchContributions(username),
  ]);

  return {
    user,
    totalRepos: repos.filter((r) => !r.fork).length,
    totalStars: computeTotalStars(repos),
    totalForks: computeTotalForks(repos),
    topLanguages: computeTopLanguages(repos),
    pinnedRepos: computePinnedRepos(repos),
    activity: {
      totalContributionsLastYear: contrib.totalLastYear,
      activeStreakDays: contrib.streak,
      lastActiveDate: contrib.lastActiveDate,
      recentEvents: events.slice(0, 10),
    },
    contributions: contrib.weeks,
  };
}

// ─────────────────────────────────────────────────────────────────
// Fallback data  (shown while loading or when both APIs fail)
// ─────────────────────────────────────────────────────────────────

export const GITHUB_FALLBACK_STATS: Omit<GitHubStats, "user"> = {
  totalRepos: 20,
  totalStars: 10,
  totalForks: 4,
  topLanguages: [
    { name: "PHP", count: 10, percentage: 45, color: "#787CB5" },
    { name: "TypeScript", count: 6, percentage: 27, color: "#3178C6" },
    { name: "JavaScript", count: 4, percentage: 18, color: "#F7DF1E" },
    { name: "CSS", count: 2, percentage: 9, color: "#563D7C" },
    { name: "Dockerfile", count: 1, percentage: 5, color: "#384D54" },
  ],
  pinnedRepos: [],
  activity: {
    totalContributionsLastYear: 0,
    activeStreakDays: 0,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    recentEvents: [],
  },
  contributions: [],
};
