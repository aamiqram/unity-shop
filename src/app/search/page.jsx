import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import Link from "next/link";

export default function SearchPage({ searchParams }) {
  const keyword = searchParams.q || "laptop";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="list-reset flex text-gray-600">
          <li>
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/search" className="hover:text-orange-500">
              Search
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">"{keyword}"</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <SearchFilters />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <SearchResults keyword={keyword} />
        </main>
      </div>
    </div>
  );
}
