import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'
import { SinglePage } from './SinglePage'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null) // New state for single page view

  // Fetch all pages on mount
  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no, an error!', err)
      }
    }
    fetchPages()
  }, [])

  // Fetch a single page when selected
  async function fetchSinglePage(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`)
      const pageData = await response.json()
      setSelectedPage(pageData) // Set the selected page data
    } catch (err) {
      console.log('Error fetching single page', err)
    }
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {selectedPage ? (
        <SinglePage page={selectedPage} setSelectedPage={setSelectedPage} />  
      ) : (
        <PagesList pages={pages} onPageClick={fetchSinglePage} />  
      )}
    </main>
  )
}