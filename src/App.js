import Header from './components/Header';
import "./styles/App.css";


function App(props) {
  return (
    <div className="Page">
      <div className="Header"><Header /></div>
      <div className="Content">{props.children}</div>
    </div>
  )
}

export default App;
