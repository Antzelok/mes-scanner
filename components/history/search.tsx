import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }: { onSearch: (val: string) => void }) => {
  return (
    <div className="flex items-center w-full p-1.5 md:w-1/3 border rounded-xl shadow-xl md:ml-auto bg-white">
      <input
        type="text"
        placeholder="Αναζήτηση ..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 p-1 px-2 focus:outline-none text-sm"
      />
      <div className="p-2">
        <FaSearch className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
