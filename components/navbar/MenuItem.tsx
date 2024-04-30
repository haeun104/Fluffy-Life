"use client";

interface MenuItemProps {
  title: string;
  style?: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, style, onClick }) => {
  return (
    <div className={style ? style : ""} onClick={onClick}>
      {title}
    </div>
  );
};

export default MenuItem;
