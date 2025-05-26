export async function getRecepies(searchParams: {
  query?: string | undefined;
  cuisine?: string | undefined;
  time?: string | undefined;
  page: string;
}) {
  const { query, cuisine, time, page } = searchParams;

  try {
    const createLinkFragment = () => {
    let fragment = "?";

    if (query) {
      fragment += `query=${query}`;
    }

    if (cuisine) {
      if (fragment[-1] !== "?") {
        fragment += `&cuisine=${cuisine}`;
      } else {
        fragment += `cuisine=${cuisine}`;
      }
    }

    if (time) {
      if (fragment[-1] !== "?") {
        fragment += `&maxReadyTime=${time}`;
      } else {
        fragment += `cuisine=${time}`;
      }
    }

    return fragment;
  };

  const recepiesPromise = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch${createLinkFragment()}&number=20&offset=${
      (+page - 1) * 20
    }&apiKey=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const result: {
    number: number;
    offset: number;
    totalResults: number;
    results: {
      id: number;
      title: string;
      image: string;
      imageType: string;
    }[];
  } = await recepiesPromise.json();

  return result;
  } catch (error) {
    console.error("Error fetching recepies:", error);
  }
}
