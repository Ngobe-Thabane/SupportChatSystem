
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SearchResult {
  id: number;
  name: string;
}

const fetchSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];
  const { data } = await axios.get(`https://api.example.com/search?q=${query}`);
  return data.results;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: searchTerm.trim().length > 0, // only fetch when there's input
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && (
          <span className="absolute right-3 top-2 text-gray-400 animate-pulse">
            Loading...
          </span>
        )}
      </div>

      {isError && (
        <p className="text-red-500 mt-2">Something went wrong. Try again.</p>
      )}

      {data && data.length > 0 && (
        <ul className="mt-4 space-y-2">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-3 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {data && data.length === 0 && searchTerm.trim() && !isLoading && (
        <p className="mt-4 text-gray-500">No results found.</p>
      )}
    </div>
  );
}
