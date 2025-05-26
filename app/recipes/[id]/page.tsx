import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { PiBowlFoodBold } from "react-icons/pi";

type Props = {
  params: {
    id: string;
  };
};

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: Array<{
    original: string;
  }>;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  aggregateLikes: number;
  readyInMinutes: number;
  servings: number;
  diets: string[];
  occasions: string[];
};

export default async function RecipeDetails({ params }: Props) {
  const { id } = params;

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
  );
  const recipe: Recipe = await response.json();

  if (!recipe) {
    return <h2 className="text-6xl text-indigo-900">Recipe not found</h2>;
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Link
        href="/"
        className="flex gap-3 items-center text-indigo-800 text-lg mb-5 cursor-pointer hover:tracking-wide transition-all duration-300"
      >
        <IoArrowBack />
        Go back to search options
      </Link>

      <h1 className="text-4xl font-bold text-indigo-900 mb-6 text-center">
        {recipe.title}
      </h1>

      {recipe.image && (
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={500}
          height={300}
          className="rounded-xl object-cover w-full h-[300px] mb-6 shadow-lg"
        />
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">Summary</h2>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      </div>

      <div className="flex gap-6 mb-6 text-gray-700">
        <p className="flex items-center gap-2">
          <AiFillLike />
          <strong>Likes:</strong> {recipe.aggregateLikes}
        </p>
        <p className="flex items-center gap-2">
          <FaRegClock />
          <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p className="flex items-center gap-2">
            <PiBowlFoodBold />
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>

      <div className="mb-6 text-gray-700">
        <p>
          <strong>Diets:</strong> {recipe.diets.join(", ") || "None"}
        </p>
        <p>
          <strong>Occasions:</strong> {recipe.occasions.join(", ") || "Anytime"}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Ingredients
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index} className="mb-1">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Instructions
        </h2>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <div key={step.number} className="mb-4">
            <p className="text-gray-700">
              <strong>Step {step.number}:</strong> {step.step}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
