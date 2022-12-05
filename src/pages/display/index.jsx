// React 
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import DOMPurify from "dompurify"

// Styles
import "./style.less"

export default function Display(...props) {
  // State
  const [id, setId] = useState('')
  const [author, setAuthor] = useState('')
  const [authorRef, setAuthorRef] = useState('')
  const [createdUTC, setCreatedUTC] = useState('')
  const [date, setDate] = useState('')
  const [downs, setDowns] = useState('')
  const [flairText, setFlairText] = useState('')
  const [location, setLocation] = useState('')
  const [pageName, setPageName] = useState('')
  const [selfText, setSelfText] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [title, setTitle] = useState('')
  const [ups, setUps] = useState('')
  const [upvoteRatio, setUpvoteRatio] = useState('')
  const [url, setUrl] = useState('')
  const { pageId } = useParams()
  const navigate = useNavigate()

  // Hooks
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/v1/listings/${pageId}`)
        console.log(response.data)
        const [res_id, res_author, res_author_ref, res_created_utc, res_date, res_downs, res_flair_text, res_location, res_page_id, res_page_name, res_self_text, res_timestamp, res_title, res_ups, res_upvote_ratio, res_url] = Object.values(response.data)
        
        setId(res_id)
        setAuthor(res_author)
        setAuthorRef(res_author_ref)
        setCreatedUTC(res_created_utc)
        setDate(res_date)
        setDowns(res_downs)
        setFlairText(res_flair_text)
        setLocation(res_location)
        setPageName(res_page_name)
        setSelfText(res_self_text)
        setTimestamp(res_timestamp)
        setTitle(res_title)
        setUps(res_ups)
        setUpvoteRatio(res_upvote_ratio)
        setUrl(res_url)

      } catch (err) {
        console.warn(err)
      }
    }
    fetchListing()
  }, [])

  // Output
  return (
    <div className="listing-display-page">
      <header>
        <a href={url} target='_blank'>{title}</a>

        <div>
          <div
            className='flair'
            data-color={flairText}
          >
            {flairText.toLowerCase()}
          </div>

          <a href={`https://reddit.com/user/${author}`} target="_blank">u/{author}</a>

          <p>{date}</p>

          <p>[{location}]</p>
        </div>

      </header>

      <article>
        
        <section className="self-text">
          <h1>Listing Details</h1>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selfText) }}></p>
        </section>

        <section className="comments">
          <h1>Comments</h1>
          <textarea></textarea>
        </section>

      </article>
    </div>
  )
}
