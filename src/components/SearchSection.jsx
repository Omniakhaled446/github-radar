export default function SearchSection({
  searchInput,
  setSearchInput,
  onSubmit,
  presets,
  defaultUser,
  activeUser,
  onSelectPreset,
}) {
  return (
    <section className="mb-8 rounded-2xl bg-white dark:bg-[#0f1b2e] p-4 sm:p-5 border border-slate-200 dark:border-sky-900/60 shadow-sm">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search GitHub username (e.g. Omniakhaled446)..."
            className="w-full rounded-xl bg-slate-50 dark:bg-[#080e1a] pl-11 pr-10 py-3 text-sm border border-slate-200 dark:border-sky-900/60 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 text-sm transition-colors cursor-pointer"
        >
          Search
        </button>

        <button
          type="button"
          onClick={() => {
            setSearchInput(defaultUser);
            onSelectPreset(defaultUser);
          }}
          className="rounded-xl bg-slate-100 dark:bg-[#080e1a] hover:border-sky-500/60 text-slate-700 dark:text-slate-200 font-medium px-4 py-3 text-sm border border-slate-200 dark:border-sky-900/60 transition-colors cursor-pointer shrink-0"
        >
          My Profile
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 mr-1">Quick picks:</span>
        {presets.map((user) => {
          const isActive = activeUser.toLowerCase() === user.toLowerCase();
          return (
            <button
              key={user}
              type="button"
              onClick={() => onSelectPreset(user)}
              className={`rounded-full px-3 py-1 border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-slate-100 dark:bg-[#080e1a] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-sky-900/60 hover:border-sky-500/60'
              }`}
            >
              @{user}
            </button>
          );
        })}
      </div>
    </section>
  );
}