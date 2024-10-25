import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { SinglePage } from './SinglePage';
import { AddArticleForm } from './AddArticleForm';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  }

  async function fetchSinglePage(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      if (!response.ok) throw new Error(`Failed to fetch page with slug: ${slug}`);
      const pageData = await response.json();
      setSelectedPage(pageData);
    } catch (err) {
      console.error('Error fetching single page:', err);
    }
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      
      {selectedPage 
      ? (<SinglePage page={selectedPage} setSelectedPage={setSelectedPage} />) 
      : isAddingArticle 
        ? (<AddArticleForm 
          onCancel={() => setIsAddingArticle(false)}
          onArticleAdded={() => {
            setIsAddingArticle(false);
            fetchPages();
          }}/>) 
        : (<>
          <PagesList pages={pages} onPageClick={(slug) => fetchSinglePage(slug)} />
          <button onClick={() => setIsAddingArticle(true)}>Add New Article</button>
          </>)
      }
    </main>
  );
};
