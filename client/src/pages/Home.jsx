import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  function loadPosts() {
    setLoading(true);
    api
      .getPosts()
      .then(setPosts)
      .catch(() => setError('Could not reach the backend. Is the server running?'))
      .finally(() => setLoading(false));
  }

  useEffect(loadPosts, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPosting(true);
    try {
      await api.createPost(title, body);
      setTitle('');
      setBody('');
      setComposeOpen(false);
      loadPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl text-bone mb-2">Recent entries</h1>
        <p className="font-sans text-sm text-bone/60">
          Thoughts, notes, and things worth writing down.
        </p>
      </div>

      {user && (
        <div className="mb-12 border border-hairline rounded-sm">
          {!composeOpen ? (
            <button
              onClick={() => setComposeOpen(true)}
              className="w-full text-left px-5 py-4 font-sans text-sm text-bone/60 hover:text-bone transition-colors"
            >
              Write a new entry…
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent font-serif text-xl text-bone placeholder-bone/30 focus:outline-none border-b border-hairline pb-2"
              />
              <textarea
                placeholder="Write your entry…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="w-full bg-transparent font-serif text-base text-bone placeholder-bone/30 focus:outline-none resize-none leading-relaxed"
              />
              <div className="flex gap-3 font-sans text-sm">
                <button
                  type="submit"
                  disabled={posting}
                  className="bg-gold text-ink px-4 py-1.5 rounded-sm hover:bg-bone transition-colors disabled:opacity-50"
                >
                  {posting ? 'Publishing…' : 'Publish'}
                </button>
                <button
                  type="button"
                  onClick={() => setComposeOpen(false)}
                  className="text-bone/50 hover:text-bone transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {error && (
        <p className="font-sans text-sm text-red-400 mb-6">{error}</p>
      )}

      {loading ? (
        <p className="font-sans text-sm text-bone/50">Loading entries…</p>
      ) : posts.length === 0 ? (
        <p className="font-sans text-sm text-bone/50">
          No entries yet. {user ? 'Write the first one above.' : 'Check back soon.'}
        </p>
      ) : (
        <ul className="divide-y divide-hairline">
          {posts.map((post) => (
            <li key={post.id} className="py-6">
              <Link to={`/post/${post.id}`} className="group">
                <h2 className="font-serif text-2xl text-bone group-hover:text-gold transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="font-sans text-xs text-bone/50 mb-2">
                  {post.author} · {formatDate(post.created_at)}
                </p>
                <p className="font-serif text-bone/70 leading-relaxed line-clamp-2">
                  {post.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
