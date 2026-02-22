// app/help/[category]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { helpCategories } from "@/lib/helpData";
import { FiArrowLeft } from "react-icons/fi";

export default function CategoryPage({ params }) {
  const category = helpCategories.find((cat) => cat.id === params.category);
  if (!category) notFound();

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/help"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Help Center
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-gray-800">
              {category.name}
            </h1>
          </div>
          <p className="text-gray-600 mb-6">{category.description}</p>

          <div className="space-y-3">
            {category.articles.map((article) => (
              <Link
                key={article.id}
                href={`/help/${category.id}/${article.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#FF6600] hover:shadow-sm"
              >
                <h3 className="font-medium text-gray-800">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
