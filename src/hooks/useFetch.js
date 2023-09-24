import { useState, useEffect } from 'react';

function useFetch(url) {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = localStorage.getItem('urls')
        let existingUrls = [];
        if (urls) {
            existingUrls = JSON.parse(urls);
            for (let i = 0; i < existingUrls.length; i++){
                if (existingUrls[i][url]){
                    setPokemon(existingUrls[i][url]);
                    setIsLoading(false);
                    return { pokemon, isLoading, error};
                };
            }
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${url}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
        const object = {};
        object[url] = data;
        existingUrls.push(object)
        localStorage.setItem('urls', JSON.stringify(existingUrls));
        setIsLoading(false);

      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { pokemon, isLoading, error };
}

export default useFetch;
