// React 
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import DOMPurify from "dompurify"

// Styles
import "./style.less"

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
  const [timestamps, setTimestamps] = useState([])
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
        // console.log(resTimestamps.map(timestamp => timestamp))
        
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
    console.log(timestamps)

    for (let i = 0; i < timestamps.length; i++) {
      console.log(`Timestamp_${i} is file: ${timestamps[i].type === 'FILE'}`)
      if (timestamps[i].type === 'FILE')
        return setCurrThumbnail(timestamps[i].url)
    }

  }, [timestamps])

  // Handlers
  const submitComment = e => {
    e.preventDefault()
  }

  const thumbnailModal = () => {
    console.log('TODO: MAKE IT BIG!!!')
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

        {timestamps.length > 0 && (
          <section className="timestamp">
            <a href={timestamps[0].url} target="_blank"><p>[TIMESTAMP]</p></a>
            <img src={currThumbnail} alt={`timestamp`} onClick={thumbnailModal} />
            {timestamps.length > 1 && <div
              style={timestamps.length < 5 ? { justifyContent: 'center' } : null}
            >
              {timestamps.map((data, i) => {
                return (
                  <img
                    key={`keyboard_${i}`}
                    src={data.url}
                    alt={`keyboard_${i}`}
                    title={`keyboard_${i}`}
                    onClick={e => setCurrThumbnail(data.url)}
                  />
                )
              })}
            </div>}

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

const fetchImageFiles = async (timestamps) => {
  const arrayOfLinks = []

  try {
    const imageFiles = await Promise.all(timestamps.map(async timestamp => {
      const splitURL = timestamp.url.split('/')
      const hash = splitURL[splitURL.length - 1]

      try {
        const imagePromise = timestamp.type === 'FILE' ?
          {
            data: 
              { url: timestamp.url, type: 'FILE' }
          }
          :
          timestamp.type === 'IMAGE' ?
            await axios.get(`/api/v1/imgur/image/${hash}/${timestamp.listingId}`)
            :
            await axios.get(`/api/v1/imgur/album/${hash}/${timestamp.listingId}`)
        
        return imagePromise
      } catch (err) {
        console.warn('ERROR DURING TIMESTAMP MAP:', err)
      }
    }))

    imageFiles.map(file => typeof file.data.url === 'string' ?
        !arrayOfLinks.includes(file.data.url) && arrayOfLinks.push(file.data)
        :
        file.data.albumModel || file.data.imageModel ?
          null
          :
          file.data.imageFiles.map(fetchedFile =>
            !arrayOfLinks.includes(fetchedFile) ?
              arrayOfLinks.push(fetchedFile)
              :
              null
    ))

    return arrayOfLinks

  } catch (err) {
    console.warn('ERROR DURING IMAGE FETCH:', err)
  }
}