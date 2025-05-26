import Image from "next/image";
import { getRecepies } from "../functions/getRecepies";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

type Props = {
  searchParams: {
    query: string | undefined;
    cuisine: string | undefined;
    time: string | undefined;
    page: string;
  };
};

export default async function SearchResults({ searchParams }: Props) {
  const awaitedParams = await searchParams;
  const { query, cuisine, time, page } = awaitedParams;
  const pages: number[] = [1];

  const recepies = await getRecepies({ query, cuisine, time, page });

  let count = recepies.totalResults - 20;

  while (count > 0) {
    count -= 20;
    pages.push(pages[pages.length - 1] + 1);
  }

  return (
    <main className="p-20">
      <Link
        href="/"
        className="flex gap-3 items-center text-indigo-800 text-lg mb-5 cursor-pointer hover:tracking-wide transition-all duration-300"
      >
        <IoArrowBack />
        Go back to search options
      </Link>
      <h1 className="text-4xl font-bold text-indigo-900 mb-10 ">
        Recepies for your search
      </h1>

      {recepies.results.length > 1 ? (
        <div className="grid grid-cols-4 gap-5">
          {recepies.results.map((recepy) => (
            <div
              key={recepy.id}
              className="bg-white shadow-lg rounded-2xl pb-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={recepy.image}
                alt=""
                width={500}
                height={300}
                className="rounded-t-xl object-cover h-[200px] w-full"
              />
              <p className="text-xl text-center mt-4">{recepy.title}</p>

              <Link
                href={{ pathname: `/recepies/${recepy.id}` }}
                className={
                  "mt-4 block border-blue-500 border-2 border-solid bg-blue-500 rounded-md w-fit py-2 px-15 text-white font-semibold m-auto transition-all duration-300 hover:bg-white hover:text-blue-500"
                }
              >
                See details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-6xl text-indigo-900">No results found :(</h2>
      )}

      {pages.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-10">
          {pages.map((newPage) => {
            const newQuery = { ...awaitedParams, page: newPage };
            const isActive =
              newPage === Number(awaitedParams.page) ||
              (!awaitedParams.page && newPage === 1);

            return (
              <Link
                href={{ pathname: "/recipes", query: newQuery }}
                key={newPage}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"
                }`}
              >
                {newPage}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
