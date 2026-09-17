import { useEffect, useState } from "react";

// create hook useFetch - needs to receive a URL and fetch data 
function useFetch<T>(url: string){

  // create state to store data
  const [data, setData] = useState<T | null>(null);

  // create state of API loading 
  const [loading, setLoading] = useState(true);

  // create state to store error if API request fails
  const [error, setError] = useState<string | null>(null);

  // useEffect
  useEffect(() => {

    // function to perform APU request
    const fetchData = async () => {
      // load and clear previous errors
      setLoading(true);
      setError(null);

      try {
        // ask the api for data
        const res = await fetch(url);

        if(!res.ok) {
          throw new Error("Somthine went wrong while fetching data.")
        }

        //convert API response from JSON into JavaScript
        const result = await res.json();

        //put API data into our data state
        setData(result);
      } catch (err) {
        // save an error message if soemthing goes wrong
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;