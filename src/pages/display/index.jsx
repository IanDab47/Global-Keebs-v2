// React 
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"

// Components
import RadioButton from "../../components/RadioButton"
import { fetchImageFiles } from "../../util/requests"

// Styles
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "./style.less"

const commentLinks = [
  { href: '#', text: 'Edit Comment' },
  { href: '#', text: 'Delete Comment' },
]

export default function Display(...props) {  
  // States
  const pageEl = useRef(null)
  const thumbnailScroll = useRef(null)
  const [id, setId] = useState(null)
  const [author, setAuthor] = useState('')
  const [authorRef, setAuthorRef] = useState('')
  const [comments, setComments] = useState([])
  const [createdUTC, setCreatedUTC] = useState('')
  const [date, setDate] = useState('')
  const [downs, setDowns] = useState('')
  const [flairText, setFlairText] = useState('')
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('')
  const [pageName, setPageName] = useState('')
  const [selfText, setSelfText] = useState('')
  const [timestamps, setTimestamps] = useState([])
  const [timestampLinks, setTimestampLinks] = useState([])
  const [title, setTitle] = useState('')
  const [ups, setUps] = useState('')
  const [upvoteRatio, setUpvoteRatio] = useState('')
  const [url, setUrl] = useState('')
  const [currThumbnail, setCurrThumbnail] = useState('')
  const { pageId } = useParams()
  // const navigate = useNavigate()

  // Hooks
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/v1/listings/${pageId}`)
        const [res_id, res_author, res_author_ref, res_created_utc, res_date, res_downs, res_flair_text, res_location, res_page_id, res_page_name, res_self_text, res_title, res_ups, res_upvote_ratio, res_url] = Object.values(response.data)
        
        const resTimestamps = response.data.timestamps
        console.log(resTimestamps.map(timestamp => timestamp))
        
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
        setTimestamps(await fetchImageFiles(resTimestamps))
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

  // Find first file type
  useEffect(() => {
    for (let i = 0; i < timestamps.length; i++) {
      console.log(`Timestamp_${i} is file: ${timestamps[i].type === 'FILE'}`)
      if (timestamps[i].type === 'FILE')
        return setCurrThumbnail(timestamps[i].url)
    }
  }, [timestamps])

  // Stop loading and render page
  useEffect(() => {
    setTimestampLinks(timestamps.map((timestamp, i) => { return { href: timestamp.url, text: timestamp.url }}))

    setLoading(false)
  }, [currThumbnail])

  // Handlers
  const thumbnailModal = () => {
    console.log('TODO: MAKE IT BIG!!!')
  }
  
  const submitComment = e => {
    e.preventDefault()
  }

  return (
    <div
      className={`${loading && 'loading'} listing-display-page`}
      ref={pageEl}
    >
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

        {timestamps.length > 0 && (
          <section className="timestamp">
            <img src={currThumbnail} alt={`timestamp`} onClick={thumbnailModal} />
            {timestamps.length > 1 && <div
              style={timestamps.length < 5 ? { justifyContent: 'center' } : null}
            >
              {timestamps.map((data, i) => {
                return !data.url.includes('.mp4') && (
                  <img
                    key={`keyboard_${i}`}
                    src={data.url}
                    ref={thumbnailScroll}
                    loading='lazy'
                    alt={`keyboard_${i}`}
                    title={`keyboard_${i}`}
                    onClick={() => setCurrThumbnail(data.url)}
                  />
              )})}
            </div>
            }
          </section>
        )}
        
        <section className="self-text">
          {timestamps.length > 0 && (
            <RadioButton
              title={timestampLinks.length > 1 ? 'timestamps' : 'timestamp'}
              links={timestampLinks}
            >Timestamps</RadioButton>
          )}
          <h1>Listing Details</h1>
          <div className="details">
            <ReactMarkdown
              className='markdown'
              remarkPlugins={[remarkGfm]}
            >{selfText}</ReactMarkdown>
          </div>
        </section>

      </div>
      
      <section className="comments">
        <RadioButton
          title={'Options'}
          links={commentLinks}
        >Options</RadioButton>
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