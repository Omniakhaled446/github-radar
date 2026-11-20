export default function ReposSection({
  repos,
  selectedLang,
  setSelectedLang,
  sortBy,
  setSortBy,
}) {
  const languages = ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos
    .filter((repo) => selectedLang === 'All' || repo.language === selectedLang)
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <i className="fa-solid fa-code-fork text-sky-500 dark:text-sky-400" />
          <span>Public Repositories</span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            ({filteredRepos.length})
          </span>
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="rounded-lg bg-white dark:bg-[#0f1b2e] px-3 py-1.5 text-xs border border-slate-200 dark:border-sky-900/60 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'All' ? 'All Languages' : lang}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg bg-white dark:bg-[#0f1b2e] px-3 py-1.5 text-xs border border-slate-200 dark:border-sky-900/60 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
          </select>
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#0f1b2e] p-8 text-center text-sm text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-sky-900/60">
          No repositories match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-2xl bg-white dark:bg-[#0f1b2e] p-5 border border-slate-200 dark:border-sky-900/60 hover:border-sky-500/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-base text-sky-500 dark:text-sky-400 hover:underline break-all"
                  >
                    {repo.name}
                  </a>
                  {repo.private === false && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#080e1a] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-sky-900/50 shrink-0">
                      Public
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {repo.description || 'No description available.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-sky-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <i className="fa-regular fa-star text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-code-fork" />
                    {repo.forks_count}
                  </span>
                </div>
                <span>
                  {new Date(repo.updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}