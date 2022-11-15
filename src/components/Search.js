import {
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const Search = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const genre = searchParams.get("genre") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const movieId = searchParams.get("movieId") || "";

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: `${e.target[0].value}`,
      search: `${searchParams}`
    })
  };

  const handleSelectChange = (e, type) => {
    let newValue = e.target.value;
    if (newValue === "") {
      searchParams.delete(type);
    } else {
      searchParams.set(type, e.target.value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input type="text" defaultValue={params.searchQuery} />
      </form>
      <select value={genre} onChange={(e) => handleSelectChange(e, "genre")}>
        <option value="">Genre</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <select value={sortBy} onChange={(e) => handleSelectChange(e, "sortBy")}>
        <option value="">Sort By</option>
        <option value="Release Date">Release Date</option>
        <option value="Name">Name</option>
      </select>
    </div>
  );
};

export default Search;
