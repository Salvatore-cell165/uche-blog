import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getPost(id)
      .then(setPost)
      .catch(() => setError('Could not load this entry.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link to="/" className="font-sans text-sm text-bone/50 hover:text-gold transition-colors">
        ← Back to entries
      </Link>

      {loading && <p className="font-sans text-sm text-bone/50 mt-8">Loading…</p>}
      {error && <p className="font-sans text-sm text-red-400 mt-8">{error}</p>}

      {post && (
        <article className="mt-8">
          <h1 className="font-serif text-4xl text-bone mb-2 leading-tight">{post.title}</h1>
          <p className="font-sans text-xs text-bone/50 mb-8">
            {post.author} · {formatDate(post.created_at)}
          </p>
          <div className="font-serif text-lg text-bone/80 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        </article>
      )}
    </div>
  );
}
