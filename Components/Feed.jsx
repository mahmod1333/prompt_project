'use client'
import { useState, useEffect } from 'react'
import PrompetCard from './prompetCard'
const PrompetCardList = ({ data, handleTagClick }) => {
  const edit = null

  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => {
        return (
          <PrompetCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
            edit={edit}
          />
        )
      })}
    </div>
  )
}





const Feed = () => {
  //search states 
  const [searchText, setsearchText] = useState('')
  const [searchtimeout, setsearchTimeout] = useState(null)
  const [searchResults, setsearchResults] = useState([])
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
    }
    console.log(allPosts)
    fetchPosts();


  }, [])
  const filterprompts = (searchText) => {
    const reges = RegExp(searchText, 'i');
    return allPosts.filter(
      (item) => reges.test(item.prompt) || reges.test(item.tag) || reges.test(item.creator.username)
    )
  }

    const handleSearchChange = (e) => {
      clearTimeout(searchtimeout)
      setsearchText(e.target.value)
      setsearchTimeout(
        setTimeout(() => {
         const  searchResult =filterprompts(e.target.value) 
          setsearchResults(searchResult)

        }
          , 500)
    )


    }
const handleTagClick = (tagName) => {
  setsearchText(tagName);
  const searchResult = filterprompts(tagName)
  setsearchResults(searchResult)
}

    return (
      <section className="feed">
        <form className="relative w-full flex-center">
          <input type="text"
            className="search_input peer"
            placeholder='Search for a tag or username'
            value={searchText}
            onChange={(e)=>{handleSearchChange(e)}}
          />
        </form>
        {searchText ? (
        <PrompetCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PrompetCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
      </section>
    )
  }

  export default Feed