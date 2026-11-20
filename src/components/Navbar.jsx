export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400">
          <i className="fa-brands fa-github text-2xl" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            GitHub Radar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Developer Profile &amp; Repository Explorer
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-white dark:bg-[#0f1b2e] border border-slate-200 dark:border-sky-900/60 hover:border-sky-500/60 transition-colors cursor-pointer"
      >
        <i
          className={`fa-solid ${
            darkMode ? 'fa-sun text-amber-400' : 'fa-moon text-sky-500'
          }`}
        />
        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
}