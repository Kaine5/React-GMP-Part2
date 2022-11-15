import useFetching from './hooks/useFetching';
import './App.css';

function App() {
  const [data, loading, error] = useFetching('https://jsonplaceholder.typicode.com/posts')

  if (error.status === true) {
    return (
      <div>{error.error}</div>
    )
  }
  if (loading) {
    return (
      <div>Loading, please wait a moment</div>
    )
  }
  return (
    <div className="App">
      {data.map(item => <div className="app__container">
        <div>{item.id}</div>
        <div>{item.title}</div>
        <div>{item.body}</div>
      </div>)}
    </div>
  );
}

export default App;
