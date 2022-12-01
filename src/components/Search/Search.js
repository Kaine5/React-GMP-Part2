import { useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import useFetching from "../../hooks/useFetching";

const URL = "https://6370ee800399d1995d86faeb.mockapi.io/api/movies";

const Search = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const URLForFetching = useMemo(() => {
    let newURL = `${URL}?${
      params.searchQuery ? `name=${params.searchQuery}&` : ""
    }${searchParams.toString()}`;
    return newURL;
  }, [params, searchParams]);

  const [data, loading, error] = useFetching(`${URLForFetching}`);

  const genre = searchParams.get("genre") || "";
  const sortBy = searchParams.get("sortBy") || "";

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: `${e.target[0].value}`,
      search: `${searchParams}`,
    });
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
      <div>
        <form onSubmit={onSearchSubmit} data-cy="form">
          <input
            type="text"
            defaultValue={params.searchQuery}
            title="searchInput"
            data-cy="searchInput"
          />
        </form>
        <select
          value={genre}
          onChange={(e) => handleSelectChange(e, "genre")}
          title="genreSelect"
          data-cy="genreSelect"
        >
          <option value="">Genre</option>
          <option value="Electronic">Electronic</option>
          <option value="Rap">Rap</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Funk">Funk</option>
          <option value="Metal">Metal</option>
          <option value="Reggae">Reggae</option>
          <option value="Country">Country</option>
          <option value="Soul">Soul</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => handleSelectChange(e, "sortBy")}
          title="sortSelect"
          data-cy="sortSelect"
        >
          <option value="">Sort By</option>
          <option value="releaseDate">Release Date</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div data-cy="searchResult">
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div> An error has occured </div>
        ) : (
          data.map((movie) => (
            <div key={movie.id}>
              <div>{movie.name}</div>
              <div>{movie.genre}</div>
              <div>{movie.releaseDate}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
