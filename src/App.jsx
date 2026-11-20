import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import ProfileCard from './components/ProfileCard';
import ReposSection from './components/ReposSection';

const DEFAULT_USER = 'Omniakhaled446';
const PRESET_USERS = ['Omniakhaled446', 'torvalds', 'gaearon', 'sindresorhus'];

export default function App() {
  const [username, setUsername] = useState(DEFAULT_USER);
  const [searchInput, setSearchInput] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLang, setSelectedLang] = useState('All');
  const [sortBy, setSortBy] = useState('updated');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    let ignore = false;

    async function loadGitHubData() {
      setLoading(true);
      setError('');
      setSelectedLang('All');

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          if (userResponse.status === 404) {
            throw new Error(`No GitHub user found for "${username}".`);
          }
          if (userResponse.status === 403) {
            throw new Error('GitHub API rate limit reached. Please try again in a bit.');
          }
          throw new Error('Failed to fetch profile data.');
        }

        const userJson = await userResponse.json();
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
        );
        const reposJson = reposResponse.ok ? await reposResponse.json() : [];

        if (!ignore) {
          setProfile(userJson);
          setRepos(Array.isArray(reposJson) ? reposJson : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Something went wrong.');
          setProfile(null);
          setRepos([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadGitHubData();

    return () => {
      ignore = true;
    };
  }, [username]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;
    setUsername(trimmed);
  };

  const handleCopyUrl = () => {
    if (!profile?.html_url) return;
    navigator.clipboard.writeText(profile.html_url);
    setCopied(true);
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-slate-100 dark:bg-[#080e1a] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <SearchSection
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSubmit={handleSearchSubmit}
          presets={PRESET_USERS}
          defaultUser={DEFAULT_USER}
          activeUser={username}
          onSelectPreset={(name) => {
            setSearchInput(name);
            setUsername(name);
          }}
        />

        {loading && (
          <div className="py-16 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Fetching developer profile...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="my-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center text-red-600 dark:text-red-400">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && profile && (
          <div className="space-y-8">
            <ProfileCard
              profile={profile}
              repos={repos}
              copied={copied}
              onCopyUrl={handleCopyUrl}
            />

            <ReposSection
              repos={repos}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        )}
      </div>
    </div>
  );
}