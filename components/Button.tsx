interface ButtonProps {
  title: string;
  onClick: () => void;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold px-4 py-2 rounded-md hover:opacity-80 ${
        color ? `bg-${color}` : `bg-accent-light-pink`
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
