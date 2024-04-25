interface ButtonProps {
  title: string;
  onClick: () => void;
  color?: string;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, color, style }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-${color ? color : "accent-pink"} ${style ? style : ""}`}
    >
      {title}
    </div>
  );
};

export default Button;
