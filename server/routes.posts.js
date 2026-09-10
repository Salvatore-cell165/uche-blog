const express = require('express');
const db = require('./db');
const { requireAuth } = require('./middleware');

const router = express.Router();

// GET /api/posts — public, list all posts (newest first)
router.get('/', (req, res) => {
  const posts = db
    .prepare(
      `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name AS author
       FROM posts JOIN users ON posts.author_id = users.id
       ORDER BY posts.created_at DESC`
    )
    .all();
  res.json(posts);
});

// GET /api/posts/:id — public, single post
router.get('/:id', (req, res) => {
  const post = db
    .prepare(
      `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name AS author
       FROM posts JOIN users ON posts.author_id = users.id
       WHERE posts.id = ?`
    )
    .get(req.params.id);

  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST /api/posts — requires login
router.post('/', requireAuth, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }

  const result = db
    .prepare('INSERT INTO posts (title, body, author_id) VALUES (?, ?, ?)')
    .run(title, body, req.user.id);

  const post = db
    .prepare(
      `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name AS author
       FROM posts JOIN users ON posts.author_id = users.id
       WHERE posts.id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(post);
});

module.exports = router;
