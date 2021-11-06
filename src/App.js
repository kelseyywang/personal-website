import Header from './components/Header';
import Home from './components/Home';
import "./styles/App.css";

function App() {
  return (
    <div className="Page">
      <div className="Header"><Header /></div>
      <div className="Home"><Home /></div>
    </div>
  )
}

export default App;
