import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mic,
  MoveRight,
  Search,
  Share,
} from 'lucide-react'

import { blogPosts } from '#constants'

const MobileSafari = () => {
  return (
    <div className="mobile-safari">
      <section className="mobile-blog-list">
        <h2>My Developer Blog</h2>

        {blogPosts.map(({ id, title, image, link, date }) => (
          <article key={id}>
            <img src={image} alt={title} />
            <div>
              <p>{date}</p>
              <h3>{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Check out the full post <MoveRight size={26} />
              </a>
            </div>
          </article>
        ))}
      </section>

      <div className="mobile-safari-bar" aria-label="Safari controls">
        <label>
          <Search size={18} />
          <input type="text" placeholder="Search or enter website name" />
          <Mic size={18} />
        </label>

        <div>
          <button type="button" aria-label="Back">
            <ChevronLeft />
          </button>
          <button type="button" aria-label="Forward">
            <ChevronRight />
          </button>
          <button type="button" aria-label="Share">
            <Share />
          </button>
          <button type="button" aria-label="Bookmarks">
            <BookOpen />
          </button>
          <button type="button" aria-label="Tabs">
            <Copy />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileSafari
