'use client';

import { memo, useMemo, useCallback } from 'react';
import Image from 'next/image';

export interface Repository {
  name: string;
  description: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url?: string;
}

interface RepositoriesProps {
  repositories?: Repository[];
  username?: string;
}

const Repositories_Component = memo(function RepositoriesComponent({
  repositories = [],
  username,
}: RepositoriesProps) {
  const formatDate = useMemo(() => {
    return (dateString: string) =>
      new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
  }, []);

  const handleViewAll = useCallback(() => {
    if (username) {
      window.open(
        `https://github.com/${username}?tab=repositories`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }, [username]);
  if (!repositories || repositories.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repositories.slice(0, 4).map((repo) => (
            <RepositoryCard key={repo.name} repo={repo} formatDate={formatDate} />
          ))}
        </div>

        {/* View all repositories button */}
        <div className="text-center mt-12">
          <button
            onClick={handleViewAll}
            disabled={!username}
            className="text-text hover:text-text-secondary disabled:text-slate-500 disabled:cursor-not-allowed transition-colors disabled:border-slate-700/30"
          >
            View all repositories
          </button>
        </div>
      </div>
    </div>
  );
});

Repositories_Component.displayName = 'RepositoriesComponent';

interface RepositoryCardProps {
  repo: Repository;
  formatDate: (dateString: string) => string;
}

const RepositoryCard = memo(function RepoCard({ repo, formatDate }: RepositoryCardProps) {
  const { name, description, language, stargazers_count, forks_count, updated_at, html_url } = repo;

  const handleRepoClick = useCallback(() => {
    if (html_url) {
      window.open(html_url, '_blank', 'noopener,noreferrer');
    }
  }, [html_url]);

  return (
    <div
      onClick={handleRepoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRepoClick();
        }
      }}
      className="card-gradient rounded-2xl p-6 border border-slate-700/40 hover:border-slate-600/60 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-background"
    >
      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-text-secondary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-slate-300 mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center gap-4 text-xs text-slate-400">
        {language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
            {language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Image src="/icons/Star.svg" width={16} height={16} alt="" className="w-4 h-4" />
          {stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Image src="/icons/Nesting.svg" width={16} height={16} alt="" className="w-4 h-4" />
          {forks_count.toLocaleString()}
        </span>
        <span className="ml-auto">{formatDate(updated_at)}</span>
      </div>
    </div>
  );
});

RepositoryCard.displayName = 'RepositoryCard';

export default Repositories_Component;
