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
    const response = await fetch(`${apiURL}/wiki`);
    const pagesData = await response.json();
    setPages(pagesData);
  }

  async function fetchSinglePage(slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const pageData = await response.json();
    setSelectedPage(pageData);
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      
      {selectedPage 
      ? (<SinglePage 
          page={selectedPage} 
          setSelectedPage={setSelectedPage}
          fetchPages={fetchPages} />) 
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
