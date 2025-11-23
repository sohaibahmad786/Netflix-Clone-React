import React, { useRef, useState, useEffect } from 'react'
import './Home_page.css'

const Home_page = () => {
  const images = [
    'https://i.ytimg.com/vi/hXBBj24aI_g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAGzAbrLTPn0pdvtj-mEMd98TJ8QQ',
    'https://i.ytimg.com/vi/jke4-8H9jVA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDRzSGeT_O9lrKhfTPfLVRawY1ItQ',
    'https://i.ytimg.com/vi/3xZTcCydiVU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBVJ083rFtiSLHPNXBJLZ_Mnk_g9w',
    'https://i.ytimg.com/vi/3Eek0M7p2iQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCn9JPLOfm51AdARTHfb1PGKjVCXw',
    'https://i.ytimg.com/vi/LBmIQX2_Xqg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAIw5BqK_yIVV7lj3ZrVKJhpM6SIw',
    'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcSgv0LeZ0fkOUz3vTnkqIwdUatNzXIWjIWSGYi3LLEqG1UkI8w2wDDK534g64GWTgikgJIjPDIzRgZtfEGTckehMjYAZIn7OYQ.jpg?r=bd8',
    'https://static0.colliderimages.com/wordpress/wp-content/uploads/2024/12/10-best-action-movies-of-the-last-25-years.jpg',
    'https://sm.ign.com/ign_pk/blogroll/b/best-actio/best-action-movies-on-netflix-right-now-june-2022_umed.jpg',
    'https://m.media-amazon.com/images/S/sonata-images-prod/ATV_IN_FB_Pushpa2/30371f6e-c3e2-4a84-bc7e-80bad4c9e4df.__SX800__SY450__QL60__._TTW_.jpeg',
    'https://images.filmibeat.com/img/2025/09/mainmeesha-1758352398.jpg'
  ]

  const scrollerRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftStart, setScrollLeftStart] = useState(0)

  const scrollStep = () => {
    const el = scrollerRef.current
    if (!el) return 300
    const child = el.querySelector('.card')
    return child ? child.offsetWidth + parseInt(getComputedStyle(el).gap || 16) : 300
  }


  const handleScroll = (direction = 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const step = scrollStep()
    const left = direction === 'right' ? step : -step
    el.scrollBy({ left, behavior: 'smooth' })
  }

  useEffect(() => {
    const onResize = () => {

    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])


  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const mouseDown = (e) => {
      setIsDown(true)
      el.classList.add('active-drag')
      setStartX(e.pageX - el.offsetLeft)
      setScrollLeftStart(el.scrollLeft)
    }

    const mouseLeave = () => {
      setIsDown(false)
      el.classList.remove('active-drag')
    }

    const mouseUp = () => {
      setIsDown(false)
      el.classList.remove('active-drag')
    }

    const mouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.5
      el.scrollLeft = scrollLeftStart - walk
    }

    // touch
    let touchStartX = 0
    let touchStartScroll = 0
    const touchStart = (e) => {
      touchStartX = e.touches[0].pageX - el.offsetLeft
      touchStartScroll = el.scrollLeft
    }
    const touchMove = (e) => {
      const x = e.touches[0].pageX - el.offsetLeft
      const walk = (x - touchStartX) * 1.5
      el.scrollLeft = touchStartScroll - walk
    }


    el.addEventListener('mousedown', mouseDown)
    el.addEventListener('mouseleave', mouseLeave)
    el.addEventListener('mouseup', mouseUp)
    el.addEventListener('mousemove', mouseMove)

    el.addEventListener('touchstart', touchStart, { passive: true })
    el.addEventListener('touchmove', touchMove, { passive: false })

    return () => {
      el.removeEventListener('mousedown', mouseDown)
      el.removeEventListener('mouseleave', mouseLeave)
      el.removeEventListener('mouseup', mouseUp)
      el.removeEventListener('mousemove', mouseMove)

      el.removeEventListener('touchstart', touchStart)
      el.removeEventListener('touchmove', touchMove)
    }
  }, [isDown, startX, scrollLeftStart])

  return (
    <div>
      <div className='Top_image'>
        <div className='para'>
          <p>A group of survivors fight to stay alive in a world by the un-dead</p>
          <p>Facing deadly threats and im-possible choices at every turn.</p>
        </div>
        <div className='btn'>
          <div className='play_btn'>
            <div>
              <i className="fa-solid fa-play"></i>
            </div>
            <div>
              <p>Play</p>
            </div>
          </div>
          <div className='list_btn'>
            <div>
              <i className="fa-solid fa-plus"></i>
            </div>
            <div>
              <p>Add List</p>
            </div>
          </div>
        </div>
      </div>

      <div className='trending'>
        <h2>Trending Movies</h2>

        {/* Carousel container */}
        <div className="carousel-wrapper">
          <button
            className="carousel-btn left"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div className="carousel" ref={scrollerRef} >
            {images.map((src, idx) => (
              <div className="card" key={idx}>
                <img src={src} alt={`movie ${idx + 1}`} draggable="false" />
              </div>
            ))}
          </div>

          <button
            className="carousel-btn right"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className='Movies'>
        <div>
          <i class="fa-solid fa-video"></i>
        </div>
        <div>
          <p>Movies</p>
        </div>
      </div>

      <div className='movie_pics'>
        <div className='first_row'>
          <div>
            <img src='https://m.media-amazon.com/images/M/MV5BYmM1MTM1ZTQtOWU4Ny00N2I3LWJmOGMtY2JkYzNhMDM4ZTBjXkEyXkFqcGc@._V1_.jpg' />
            <p>WAR2 MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://akamaividz2.zee5.com/image/upload/w_756,h_1134,c_scale,f_webp,q_auto:eco/resources/0-0-1z5797649/portrait/1920x7705d268d6804c4443a94858e74d4cf4dd8386872cb61bf4894bbb27ea074b2ff7f4d0a020d59894737b2d4c0b72e876eba.jpg' />
            <p>TEHRAN MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFHWO0SLWQePVBjXYXJbI03OZrb2t06TX1yG9PMmt2v9dEg5QcvtbxunrZZ0cPNn_Uzw&usqp=CAU' />
            <p>IMAX MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://i.ytimg.com/vi/NAnPWjg2uM4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8YQ7LWrAxvoNb5QGFPRFxGArfOA' />
            <p>REVENGER MOVIE</p>
            <button>Download</button>
          </div>
        </div>


        <div className='first_row' style={{ marginTop: "20px" }}>
          <div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP8mrReljtEvR07l2uICfHIsNrTI-ykcm-lOJFhW5d65jY98te5EAYkWeBkSpc-pfUUNk&usqp=CAU' />
            <p>EKKO MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://upload.wikimedia.org/wikipedia/en/d/dd/Every_Last_One_of_Them_poster.png' />
            <p>EVERY MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://bestsimilar.com/img/movie/thumb/0e/79439.jpg' />
            <p>ALIVE MOVIE</p>
            <button>Download</button>
          </div>
          <div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTEUKrjL_ai2jgHPBRR2ZFdVwzP5iaoD3Y0tEP_qVo9J1qSpbhnVjSY8o1WsFLd8QhV18&usqp=CAU' />
            <p>WALKING MOVIE</p>
            <button>Download</button>
          </div>
        </div>
      </div>
      <div className='mid_pic'>
        <h1>The Greatest Action Movies Eve</h1>
        <div className='discription'>
          <p>A thrilling collection of the most iconic and unforgettable action movies ever made.</p>
          <p>From intense car chases to heroic battles, these films define the true spirit of action cinema.</p>
        </div>


        <div className='btn'>
          <div className='play_btn'>
            <div>
              <i className="fa-solid fa-play"></i>
            </div>
            <div>
              <p>Play</p>
            </div>
          </div>
          <div className='list_btn'>
            <div>
              <i className="fa-solid fa-plus"></i>
            </div>
            <div>
              <p>Add List</p>
            </div>
          </div>
        </div>

      </div>


      <div className='first_row' style={{ marginTop: "20px", textAlign: "center" }}>
        <div>
          <img src='https://cdn.marvel.com/content/1x/deadpoolandwolverine_lob_crd_03.jpg' />
          <p>MARVEL MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://i.ebayimg.com/images/g/qcUAAeSwqhVoNRGq/s-l400.jpg' />
          <p>DIASASTER MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://canvas-lb.tubitv.com/opts/-AYlr6ogfWe5_g==/3fff75c4-fc1b-4b60-bd6d-a27a326198d4/CIACEPACOgUxLjEuOA==' />
          <p>ALIVE MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://qqcdnpictest.mxplay.com/pic/cc1f9610b1cc638cf9b60f305ee1b4d6/en/2x3/312x468/test_pic1759756606210_badged_1761714017652.webp' />
          <p>JAILER MOVIE</p>
          <button>Download</button>
        </div>
      </div>

      <div className='first_row' style={{ marginTop: "20px", textAlign: "center" }}>
        <div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjm-Hwe5Lfuf9XC6Na6x6JGsIuBaD6_WlHA8CFhv5Nim4cUmIxMFgWTXxoBV_16KU8K0&usqp=CAU' />
          <p>AZADI MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dna-et00401081-1718018908.jpg' />
          <p>DNA MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://qph.cf2.quoracdn.net/main-qimg-bd0942a9d7ec22b3e415c407392ba42d-lq' />
          <p>OLD_GUARD MOVIE</p>
          <button>Download</button>
        </div>
        <div>
          <img src='https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_QL75_UX140_CR0,0,140,207_.jpg' />
          <p>REPEAT MOVIE</p>
          <button>Download</button>
        </div>
      </div>

      {/* start from this below */}
      <footer>
        <div className='last'>

          <div className='top_text'>
            <button>Get Started</button>
            <p>Create or restart your membership</p>
          </div>

          <div className='contact'>
            <p>Questions? Contact us</p>
          </div>

          <div className='Text_head'>

            <div className='column'>
              <p>FAQ</p>
              <p>Invester Relations</p>
              <p>Corporate Information</p>
              <p>Legal Notices</p>
              <p>How It Works</p>
              <p>Partnership Info</p>
              <p>User Policies</p>
            </div>
            <div className='column'>
              <p>Help Center</p>
              <p>Jobs</p>
              <p>Terms of Use</p>
              <p>Contact Us</p>
              <p>Only on Netflix</p>
              <p>Customer Support</p>
              <p>Feedback & Help</p>
              <p>Featured Shows</p>
            </div>
            <div className='column'>
              <p>Account</p>
              <p>Radeem Gift Cards</p>
              <p>Privacy</p>
              <p>Speed Test</p>
              <p>Advert Choices</p>
              <p>Data Protection</p>
              <p>Connection Check</p>
              <p>Ads Settings</p>
            </div>
            <div className='column'>
              <p>Media Center</p>
              <p>Buy Gift Cards</p>
              <p>Cookies Prefference</p>
              <p>Legal Guarantee</p>
              <p>Press Releases</p>
              <p>Service Warranty</p>
              <p>Cookie Control</p>
            </div>
          </div>

          <div class="select_box">
            <select>
              <option>Select Language</option>
              <option>United State</option>
              <option>United Kingdom</option>
              <option>Pakistan</option>
              <option>Arabic</option>
            </select>
          </div>


          <div className='bottom_text'>
            <p>Netflix Sweden</p>
          </div>

        </div>
      </footer>



    </div>
  )
}

export default Home_page
