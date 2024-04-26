interface ButtonProps {
  title: string;
  onClick?: () => void;
  color?: string;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, color, style }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold px-4 py-2 rounded-md hover:opacity-80 ${
        color ? `bg-${color}` : `bg-accent-light-pink`
      } ${style ? style : ""}`}
    >
      {title}
    </button>
  );
};

export default Button;
