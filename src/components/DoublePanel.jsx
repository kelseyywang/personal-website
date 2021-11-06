import "../styles/DoublePanel.css";

function DoublePanel(props) {
  return (
    <div className="DoublePanel">
      {props.panel1}
      {props.panel2}
    </div>
  );
}

export default DoublePanel;
