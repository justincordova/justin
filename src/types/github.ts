export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface CommitActivity {
  message: string;
  repoName: string;
  timestamp: string;
  commitUrl: string;
}
