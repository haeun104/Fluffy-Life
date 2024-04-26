import Link from "next/link";

interface MenuItemProps {
  title: string;
  style?: string;
  url: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, style, url }) => {
  return (
    <Link href={url}>
      <li className={style ? style : ""}>{title}</li>
    </Link>
  );
};

export default MenuItem;
