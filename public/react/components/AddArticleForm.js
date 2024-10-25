import React, { useState } from 'react';
import apiURL from '../api';

export const AddArticleForm = ({ onCancel, onArticleAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const articleData = {
      title,
      content,
      name: authorName,
      email: authorEmail,
      tags
    };

    const response = await fetch(`${apiURL}/wiki`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    });
    await response.json();  // Parse the response if needed
    onArticleAdded();  // Trigger callback to go back to list and refresh articles
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Article</h3>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Author Name:
        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </label>
      <label>
        Author Email:
        <input type="email" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} required />
      </label>
      <label>
        Tags (space-separated):
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};
