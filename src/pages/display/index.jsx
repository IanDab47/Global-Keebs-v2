// React 
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import DOMPurify from "dompurify"

// Styles
import "./style.less"

const imgFiller = [
  '/imgs/filler/switches.jpg',
  '/imgs/filler/iron180.jpg',
  '/imgs/filler/space65.jpg',
  '/imgs/filler/thera.jpg',
  '/imgs/filler/suit.jpg',
]
let thumbnails = []

export default function Display(...props) {
  // State
  const [id, setId] = useState(null)
  const [author, setAuthor] = useState('')
  const [authorRef, setAuthorRef] = useState('')
  const [comments, setComments] = useState([])
  const [createdUTC, setCreatedUTC] = useState('')
  const [date, setDate] = useState('')
  const [downs, setDowns] = useState('')
  const [flairText, setFlairText] = useState('')
  const [location, setLocation] = useState('')
  const [pageName, setPageName] = useState('')
  const [selfText, setSelfText] = useState('')
  const [timestamps, setTimestamps] = useState('')
  const [title, setTitle] = useState('')
  const [ups, setUps] = useState('')
  const [upvoteRatio, setUpvoteRatio] = useState('')
  const [url, setUrl] = useState('')
  const [currThumbnail, setCurrThumbnail] = useState(thumbnails[0])
  const { pageId } = useParams()
  const navigate = useNavigate()

  // Hooks
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/v1/listings/${pageId}`)
        console.log(response.data.self_text)
        const [res_id, res_author, res_author_ref, res_created_utc, res_date, res_downs, res_flair_text, res_location, res_page_id, res_page_name, res_self_text, res_title, res_ups, res_upvote_ratio, res_url] = Object.values(response.data)
        
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
        setTimestamps(response.data.timestamps.map(timestamp => timestamp.url))
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

  // Handlers
  const submitComment = e => {
    e.preventDefault()
  }

  // Output
  // Add random amount of unique images to display
  while (thumbnails.length <= createdUTC % 5) {
    const rndArrPos = Math.ceil(Math.random() * 5) % 5
    thumbnails.includes(imgFiller[rndArrPos]) ? null : thumbnails.push(imgFiller[rndArrPos])
  }

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

      <div className="grid-row">

        {timestamps && (
          <section className="timestamp">
            <a href={timestamps[0]} target="_blank"><p>[TIMESTAMP]</p></a>
            <img src={currThumbnail} alt={`timestamp`} />
            <div>
              {thumbnails.map((url, i) => {
                return (
                  <img
                    key={`keyboard_${i}`}
                    src={url}
                    alt={`keyboard_${i}`}
                    title={`keyboard_${i}`}
                    onClick={e => setCurrThumbnail(url)}
                  />
                )
              })}
            </div>

          </section>
        )}
        
        <section className="self-text">
          <h1>Listing Details</h1>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selfText) }}></p>
        </section>

      </div>
      
      <section className="comments">
        <h1>Comments</h1>
        <form onSubmit={e => submitComment(e)}>
          <textarea></textarea>
          <div>
            <p>{comments.length} { comments.length === 1 ? 'person' : 'people' } have responded.</p>
            <button>Comment</button>
          </div>
        </form>
      </section>

    </div>
  )
}
