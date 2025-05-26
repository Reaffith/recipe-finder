import { SearchInputs } from "./components/SearchInputs";

export default function Home() {
  return (
    <main className="py-20 px-50 flex flex-col gap-3">
      <h1 className="text-4xl font-bold text-indigo-900" >Welcome to Recipe Finder</h1>
      <h3 className="text-2xl font-semibold text-indigo-950">Enter your search parameters here</h3>

      <SearchInputs />
    </main>
  );
}
