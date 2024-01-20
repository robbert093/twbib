import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Authors from './pages/Authors';
import Categories from './pages/Categories';
import NewBook from './pages/NewBook';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <div className="App">
      <Router>        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/authors" element={<Authors/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/new-book" element={<NewBook/>}/>
          <Route path="/book-detail/:id" element={<BookDetail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
