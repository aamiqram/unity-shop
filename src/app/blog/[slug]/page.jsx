// app/blog/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiThumbsUp,
  FiThumbsDown,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { getPostBySlug, blogPosts } from "@/lib/blogData";

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  useEffect(() => {
    const found = getPostBySlug(params.slug);
    setPost(found);
    if (found) {
      // Related posts from same category
      const related = blogPosts
        .filter((p) => p.category === found.category && p.id !== found.id)
        .slice(0, 3);
      setRelatedPosts(related);
      // Mock comments
      setComments([
        {
          id: 1,
          user: "JohnD",
          avatar: "JD",
          text: "Great article, very helpful!",
          date: "2025-02-21",
        },
        {
          id: 2,
          user: "SellerPro",
          avatar: "SP",
          text: "Thanks for the tips!",
          date: "2025-02-20",
        },
      ]);
    }
  }, [params.slug]);

  if (!post)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "You",
      avatar: "You",
      text: commentText,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/blog" className="hover:text-[#FF6600]">
            Blog
          </Link>{" "}
          / <span className="text-gray-800">{post.category}</span> /{" "}
          <span className="text-gray-800">{post.title}</span>
        </nav>

        <article className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FiUser size={14} /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <FiClock size={14} /> {post.readTime} min read
              </span>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative h-80 md:h-96 mb-6">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Content */}
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Like and share */}
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
                }}
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF6600]"
              >
                <FiThumbsUp
                  size={18}
                  fill={liked ? "#FF6600" : "none"}
                  color={liked ? "#FF6600" : "currentColor"}
                />
                {likeCount}
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-[#FF6600]">
                <FiThumbsDown size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-[#FF6600]">
                <FiShare2 size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#FF6600]">
                <FiBookmark size={18} />
              </button>
            </div>
          </div>

          {/* Comments section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Comments ({comments.length})
            </h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave a comment..."
                rows="3"
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
              >
                Post Comment
              </button>
            </form>
            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-3 border-b border-gray-100 pb-2"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {c.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{c.user}</p>
                    <p className="text-xs text-gray-400">{c.date}</p>
                    <p className="text-sm mt-1">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">You might also like</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md"
                >
                  <div className="relative h-32">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
