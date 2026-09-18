import { useState, type SubmitEvent } from "react";

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // search state
  const [search, setSearch] = useState("");

  // useNavigate to changeURL
  const navigate = useNavigate();

  // handlSearch for form
  const handleSearch = (event: SubmitEvent) => {
  //stop browser from refreshing the page
    event.preventDefault();

    // remove extra spaces from the bgeinning/end
    const trimmedSearch = search.trim();

    // dont search if box empty
    if (!trimmedSearch) {
      return;
    }

    // send user to search results page
    navigate(`/search?query=${encodeURIComponent(trimmedSearch)}`);
  };

  return (
    <nav>
      <Link to="/" className="text-xl font-bold">
        Recipe Discovery
      </Link>

      <div>
        <Link to="/">Home</Link>

        <Link to="/favorites">Favorites</Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex gap-2"
      >

      {/* controlled input */}
        <input 
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="rounded-md border px-3 py-2"
        /> 

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-whote"
        >Search</button>
      </form>
    </nav>
  )
}

export default Navbar;