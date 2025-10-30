import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [path, setPath] = useState("");

  const doSearch = () => {
    onSearch(path);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Search by path (e.g., $.user.address.city)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === "Enter" && doSearch()}
          />
        </div>
        <button
          onClick={doSearch}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
