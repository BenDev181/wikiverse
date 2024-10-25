import React from 'react';

export const SinglePage = ({ page, setSelectedPage }) => {
  if (!page) {
    return <p>Loading page details...</p>;  // Show loading state if page data is not available
  }

  // Destructure the necessary properties from the page object
  const { title, author, content, tags = [], createdAt } = page;

  // Access the author's name directly
  const authorName = author ? author.name : 'Unknown';  // Fallback to 'Unknown' if author is missing

  // Assuming tags is an array of objects; modify according to actual structure
  const tagsList = tags.length > 0 ? tags.map(tag => tag.name).join(', ') : 'No tags';  // Adjust based on actual tag structure

  return (
    <div>
      <h2>{title || 'No title available'}</h2>
      <p><strong>Author:</strong> {authorName}</p>  {/* Accessing author's name */}
      <p><strong>Content:</strong> {content || 'No content available'}</p>
      <p><strong>Tags:</strong> {tagsList}</p>  {/* Render tags if available */}
      <p><strong>Date:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown date'}</p>
      
      <button onClick={() => setSelectedPage(null)}>
        Back to Wiki List
      </button>
    </div>
  );
};