export default function ProfileCard({ profile, repos, copied, onCopyUrl }) {
  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const langCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <article className="rounded-2xl bg-white dark:bg-[#0f1b2e] p-6 border border-slate-200 dark:border-sky-900/60">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="h-28 w-28 rounded-2xl object-cover border-2 border-sky-500/60 shrink-0"
        />

        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold truncate">
                {profile.name || profile.login}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-sky-500 dark:text-sky-400 hover:underline"
              >
                @{profile.login}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCopyUrl}
                className="rounded-lg px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-[#080e1a] border border-slate-200 dark:border-sky-900/60 hover:border-sky-500/60 transition-colors cursor-pointer"
              >
                <i
                  className={`fa-regular ${
                    copied ? 'fa-circle-check text-emerald-400' : 'fa-copy'
                  } mr-1.5`}
                />
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <span className="rounded-lg px-3 py-1.5 text-xs bg-slate-100 dark:bg-[#080e1a] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-sky-900/60">
                Joined {joinedDate}
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {profile.bio || 'No bio provided for this account.'}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 dark:bg-[#080e1a] p-4 border border-slate-200 dark:border-sky-900/50 text-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Repositories</p>
              <p className="mt-1 text-lg font-bold">{profile.public_repos}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Followers</p>
              <p className="mt-1 text-lg font-bold">{profile.followers}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Following</p>
              <p className="mt-1 text-lg font-bold">{profile.following}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2.5 truncate">
              <i className="fa-solid fa-location-dot w-4 text-sky-500/80" />
              <span className="truncate">{profile.location || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-2.5 truncate">
              <i className="fa-solid fa-building w-4 text-sky-500/80" />
              <span className="truncate">{profile.company || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-2.5 truncate">
              <i className="fa-solid fa-link w-4 text-sky-500/80" />
              {profile.blog ? (
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 truncate"
                >
                  {profile.blog}
                </a>
              ) : (
                <span>Not specified</span>
              )}
            </div>
            <div className="flex items-center gap-2.5 truncate">
              <i className="fa-brands fa-x-twitter w-4 text-sky-500/80" />
              <span className="truncate">
                {profile.twitter_username ? `@${profile.twitter_username}` : 'Not specified'}
              </span>
            </div>
          </div>

          {topLanguages.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-sky-900/50 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">
                Recent stack:
              </span>
              {topLanguages.map(([lang, count]) => (
                <span
                  key={lang}
                  className="rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20 px-2.5 py-1 text-xs font-medium"
                >
                  {lang} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}