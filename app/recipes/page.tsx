import { getRecepies } from "../functions/getRecepies";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { RecipeCard } from "../components/recipeCard";

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
  if (!recepies) {
    return (
      <h2 className="text-6xl text-indigo-900">Error while fetching data</h2>
    );
  }

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
            <RecipeCard recepy={recepy} key={recepy.id} />
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
