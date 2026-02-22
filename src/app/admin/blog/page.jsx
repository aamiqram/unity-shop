// app/admin/blog/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { blogPosts } from "@/lib/blogData";
import { FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(blogPosts);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded hover:bg-[#e65c00]"
          >
            <FiPlus size={16} /> New Post
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{post.title}</td>
                  <td className="p-3">{post.author}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">{post.date}</td>
                  <td className="p-3">{post.featured ? "Yes" : "No"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-gray-500 hover:text-[#FF6600]"
                      >
                        <FiEye size={16} />
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-gray-500 hover:text-[#FF6600]"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
