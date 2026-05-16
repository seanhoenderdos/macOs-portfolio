import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { blogPosts } from "#constants";
import useWindowStore from "#store/window";

const Safari = () => {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <>
        <div id='window-header'>
            <WindowControls target='safari' />

            <PanelLeft className="ml-10 icon" />

            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon" />
                <ChevronRight className="icon" />
            </div>

            <div className="flex-1 flex-center gap-3">
                <ShieldHalf className="icon" />

                <div className="search">
                    <Search className="icon" />

                    <input type='text' placeholder="Search or neter website name" className="flex-1" />
                </div>
            </div>

            <div className="flex items-center gap-5">
                <Share className="icon" />
                <Plus className="icon" />
                <Copy className="icon" />
            </div>
        </div>

        <div className="blog">
            <h2>My Developer Blog</h2>

            <div className="space-y-8">
                {blogPosts.map((post) => (
                    <div key={post.id} className="blog-post">
                        <div className="col-span-2">
                            <img src={post.image} alt={post.title} />
                        </div>

                        <div className="content">
                            <p>{post.date}</p>
                            <h3>{post.title}</h3>
                            <button type="button" onClick={() => openWindow('txtfile', post)}>
                                Read more <MoveRight className="icon-hover" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
};

const SafariWindow = WindowWrapper(Safari, 'safari');

export default SafariWindow;
