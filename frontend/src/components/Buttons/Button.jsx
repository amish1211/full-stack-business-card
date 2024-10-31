import "./button.css";

function Button({ children, onClick, type, customClassNames = [] }) {

  return (
    <button type={type} className={`button ${customClassNames.join(" ")}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
