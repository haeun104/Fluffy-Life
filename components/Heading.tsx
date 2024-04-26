interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="font-bold text-2xl">{title}</div>
      {subTitle ? (
        <div className="font-light text-neutral-500 mt-2 mb-2">{subTitle}</div>
      ) : null}
    </div>
  );
};

export default Heading;
