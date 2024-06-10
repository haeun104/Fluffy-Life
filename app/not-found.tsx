import Link from "next/link";

const notFoundPage = () => {
  return (
    <div className="w-full pt-10 flex flex-col justify-between items-center gap-10">
      <h1 className="text-xl md:text-2xl">Page Not Found!</h1>
      <Link
        href="/"
        className="md:text-lg border-b-[1px] border-b-main-teal text-main-teal hover:font-bold hover:border-b-[2px]"
      >
        Go to main page
      </Link>
    </div>
  );
};

export default notFoundPage;
