interface ButtonProps {
  title: string;
  onClick?: () => void;
  color?: string;
  style?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  color,
  style,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold px-4 py-2 rounded-md hover:opacity-80 ${
        style ? style : "bg-accent-red"
      } disabled:cursor-not-allowed`}
      disabled={disabled ? disabled : false}
    >
      {title}
    </button>
  );
};

export default Button;
