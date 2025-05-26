import Image from "next/image";
import Link from "next/link";

type Params = {
  recepy: {
    id: number;
    title: string;
    image: string;
    imageType: string;
  };
};

export const RecipeCard = ({ recepy }: Params) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl pb-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <Image
        src={recepy.image}
        alt=""
        width={500}
        height={300}
        className="rounded-t-xl object-cover h-[200px] w-full"
      />
      <p className="text-xl text-center mt-4">{recepy.title}</p>

      <Link
        href={{ pathname: `/recipes/${recepy.id}` }}
        className={
          "mt-4 block border-blue-500 border-2 border-solid bg-blue-500 rounded-md w-fit py-2 px-15 text-white font-semibold m-auto transition-all duration-300 hover:bg-white hover:text-blue-500"
        }
      >
        See details
      </Link>
    </div>
  );
};
