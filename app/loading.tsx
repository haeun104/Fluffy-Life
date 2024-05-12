import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <FadeLoader color="#219C90" />
    </div>
  );
};

export default Loading;
