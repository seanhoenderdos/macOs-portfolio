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
import useMobileStore from '#store/mobile'

const MobileSafari = () => {
  const openFile = useMobileStore((state) => state.openFile)

  return (
    <div className="mobile-safari">
      <section className="mobile-blog-list">
        <h2>My Developer Blog</h2>

        {blogPosts.map((post) => (
          <article key={post.id}>
            <img src={post.image} alt={post.title} />
            <div>
              <p>{post.date}</p>
              <h3>{post.title}</h3>
              <button type="button" onClick={() => openFile(post)}>
                Check out the full post <MoveRight size={26} />
              </button>
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
