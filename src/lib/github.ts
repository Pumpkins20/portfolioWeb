// ═══════════════════════════════════════════════════════════════════
// GitHub API Library
// Fetches public profile stats, repositories, and activity data
// Uses the public GitHub REST API v3 (no auth required for public data)
// ═══════════════════════════════════════════════════════════════════

const GITHUB_USERNAME = "pumpkins20"; // ← update to your actual GitHub username
const GITHUB_API_BASE = "https://api.github.com";

// ─────────────────────────────────────────────────────────────────
// Types
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

export interface ContributionDay {
  date: string; // ISO date string "YYYY-MM-DD"
  count: number; // number of contributions that day
  level: 0 | 1 | 2 | 3 | 4; // intensity level (like GitHub's colour scale)
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubStats {
  user: GitHubUser;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: LanguageStat[];
  pinnedRepos: GitHubRepo[];
  recentActivity: ActivitySummary;
  contributions: ContributionWeek[];
}

export interface LanguageStat {
  name: string;
  count: number; // number of repos using this language
  percentage: number; // share among all repos with a language
  color: string; // display color for the badge
}

export interface ActivitySummary {
  totalCommitsThisYear: number; // estimated from events
  activeStreakDays: number;
  lastActiveDate: string;
  recentEvents: GitHubEvent[];
}

// ─────────────────────────────────────────────────────────────────
// Language colour map (subset – extend as needed)
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
// Simple fetch wrapper with error handling
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

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 403) {
      throw new GitHubRateLimitError(
        "GitHub API rate limit exceeded. Please try again later.",
      );
    }
    if (response.status === 404) {
      throw new GitHubNotFoundError(`GitHub resource not found: ${url}`);
    }
    throw new GitHubAPIError(
      `GitHub API error ${response.status}: ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
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
// Individual fetcher functions
// ─────────────────────────────────────────────────────────────────

/** Fetch public profile info for a user */
export async function fetchGitHubUser(
  username = GITHUB_USERNAME,
): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${username}`);
}

/** Fetch all public repositories (handles pagination up to 500 repos) */
export async function fetchGitHubRepos(
  username = GITHUB_USERNAME,
): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const repos = await githubFetch<GitHubRepo[]>(
      `/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`,
    );

    if (repos.length === 0) break;

    // Exclude forks from stats (keep them for display but flag them)
    allRepos.push(...repos);

    if (repos.length < perPage) break; // last page
    page++;
    if (page > 5) break; // safety cap: max 500 repos
  }

  return allRepos;
}

/** Fetch recent public events (commits, PRs, issues, etc.) */
export async function fetchGitHubEvents(
  username = GITHUB_USERNAME,
  pages = 3,
): Promise<GitHubEvent[]> {
  const allEvents: GitHubEvent[] = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const events = await githubFetch<GitHubEvent[]>(
        `/users/${username}/events/public?per_page=100&page=${page}`,
      );
      if (events.length === 0) break;
      allEvents.push(...events);
    } catch {
      break; // stop on error (rate limit, etc.)
    }
  }

  return allEvents;
}

// ─────────────────────────────────────────────────────────────────
// Derived / computed stats
// ─────────────────────────────────────────────────────────────────

/** Aggregate star count across all non-forked repos */
export function computeTotalStars(repos: GitHubRepo[]): number {
  return repos
    .filter((r) => !r.fork)
    .reduce((sum, r) => sum + r.stargazers_count, 0);
}

/** Aggregate fork count across all non-forked repos */
export function computeTotalForks(repos: GitHubRepo[]): number {
  return repos
    .filter((r) => !r.fork)
    .reduce((sum, r) => sum + r.forks_count, 0);
}

/** Calculate top programming languages from repo list */
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

/** Pick the most "starred + recent" repos to pin (if user hasn't set pinned) */
export function computePinnedRepos(
  repos: GitHubRepo[],
  limit = 6,
): GitHubRepo[] {
  return repos
    .filter((r) => !r.fork && !r.private)
    .sort((a, b) => {
      // Weighted score: stars × 3 + recency bonus
      const scoreA =
        a.stargazers_count * 3 + new Date(a.pushed_at).getTime() / 1e12;
      const scoreB =
        b.stargazers_count * 3 + new Date(b.pushed_at).getTime() / 1e12;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/** Summarise recent public activity from event stream */
export function computeActivitySummary(events: GitHubEvent[]): ActivitySummary {
  const pushEvents = events.filter((e) => e.type === "PushEvent");

  // Estimate commit count from push events
  const totalCommitsThisYear = pushEvents.reduce((sum, e) => {
    const year = new Date(e.created_at).getFullYear();
    const currentYear = new Date().getFullYear();
    return year === currentYear ? sum + (e.payload.size ?? 1) : sum;
  }, 0);

  // Calculate active streak (consecutive days with any event)
  const activeDates = new Set(events.map((e) => e.created_at.slice(0, 10)));
  const sortedDates = [...activeDates].sort().reverse();
  let activeStreakDays = 0;
  const today = new Date();

  for (let i = 0; i < sortedDates.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    const expectedStr = expected.toISOString().slice(0, 10);

    if (sortedDates.includes(expectedStr)) {
      activeStreakDays++;
    } else {
      break;
    }
  }

  return {
    totalCommitsThisYear,
    activeStreakDays,
    lastActiveDate: sortedDates[0] ?? new Date().toISOString().slice(0, 10),
    recentEvents: events.slice(0, 10),
  };
}

// ─────────────────────────────────────────────────────────────────
// Contribution calendar generation
// Generates a 52-week grid (like GitHub's contribution heatmap)
// based on PushEvent dates from the public events API.
// NOTE: The GitHub public events API only returns the last ~300 events,
// so for a full year we approximate using available data and pad the rest.
// ─────────────────────────────────────────────────────────────────

export function buildContributionGrid(
  events: GitHubEvent[],
): ContributionWeek[] {
  // Build a map of date → contribution count
  const countMap: Record<string, number> = {};

  for (const event of events) {
    if (event.type === "PushEvent") {
      const date = event.created_at.slice(0, 10);
      const commits = event.payload.size ?? 1;
      countMap[date] = (countMap[date] ?? 0) + commits;
    } else {
      // Non-push events still count as 1 contribution
      const date = event.created_at.slice(0, 10);
      countMap[date] = (countMap[date] ?? 0) + 1;
    }
  }

  // Build 52 weeks (364 days) ending today
  const weeks: ContributionWeek[] = [];
  const today = new Date();

  // Align to Sunday
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - today.getDay()); // last Sunday

  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7 + 1); // 52 weeks back

  // Max count for normalisation (level 4 = top ~10% of active days)
  const maxCount = Math.max(1, ...Object.values(countMap));

  const current = new Date(startDate);

  while (current <= endDate) {
    const week: ContributionDay[] = [];

    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().slice(0, 10);
      const count = countMap[dateStr] ?? 0;
      const level = toContributionLevel(count, maxCount);
      week.push({ date: dateStr, count, level });
      current.setDate(current.getDate() + 1);
    }

    weeks.push({ days: week });
  }

  return weeks;
}

function toContributionLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.15) return 1;
  if (ratio <= 0.35) return 2;
  if (ratio <= 0.65) return 3;
  return 4;
}

// ─────────────────────────────────────────────────────────────────
// Main aggregator — fetch everything and return a single object
// ─────────────────────────────────────────────────────────────────

export async function fetchGitHubStats(
  username = GITHUB_USERNAME,
): Promise<GitHubStats> {
  // Fire requests in parallel for speed
  const [user, repos, events] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
    fetchGitHubEvents(username),
  ]);

  return {
    user,
    totalRepos: repos.filter((r) => !r.fork).length,
    totalStars: computeTotalStars(repos),
    totalForks: computeTotalForks(repos),
    topLanguages: computeTopLanguages(repos),
    pinnedRepos: computePinnedRepos(repos),
    recentActivity: computeActivitySummary(events),
    contributions: buildContributionGrid(events),
  };
}

// ─────────────────────────────────────────────────────────────────
// Fallback / mock data (used while loading or on API errors)
// ─────────────────────────────────────────────────────────────────

export const GITHUB_FALLBACK_STATS: Omit<GitHubStats, "user"> = {
  totalRepos: 24,
  totalStars: 18,
  totalForks: 6,
  topLanguages: [
    { name: "PHP", count: 10, percentage: 42, color: "#787CB5" },
    { name: "TypeScript", count: 7, percentage: 29, color: "#3178C6" },
    { name: "JavaScript", count: 4, percentage: 17, color: "#F7DF1E" },
    { name: "CSS", count: 2, percentage: 8, color: "#563D7C" },
    { name: "Dockerfile", count: 1, percentage: 4, color: "#384D54" },
  ],
  pinnedRepos: [],
  recentActivity: {
    totalCommitsThisYear: 240,
    activeStreakDays: 5,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    recentEvents: [],
  },
  contributions: [],
};

export { GITHUB_USERNAME };
