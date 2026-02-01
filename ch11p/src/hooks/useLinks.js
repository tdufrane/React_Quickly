import { useState, useEffect } from "react";

function useLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/links.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }
        return response.json();
      })
      .then((data) => {
        setLinks(data.links);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { links, loading, error };
}

export default useLinks;
