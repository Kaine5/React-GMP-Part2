import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Search from "./components/Search";
import "./App.css";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/search" replace={true} />}
        />
        <Route path="/search" element={<Search />}>
          <Route path=":searchQuery" element={<Search />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
