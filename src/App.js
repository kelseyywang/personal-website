import { useState, useEffect } from 'react';
import Header from './components/Header';
import "./styles/App.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function App(props) {
  const { height, width } = useWindowDimensions();

  return (
    <div className="Page" style={{height, width}}>
      <div className="Header"><Header /></div>
      <div className="Content">{props.children}</div>
    </div>
  )
}

export default App;
