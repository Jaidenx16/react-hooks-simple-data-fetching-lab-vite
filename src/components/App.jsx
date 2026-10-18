import { useEffect, useState } from "react";

function App() {
  // State remembers the image URL and whether a request is still loading.
  const [dogImage, setDogImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Use the same function for the first request and each button click.
  function fetchDog() {
    setIsLoading(true);
    setError("");

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("The request failed.");
        }
        return response.json();
      })
      .then((data) => {
        // The API stores the dog image URL in its "message" property.
        setDogImage(data.message);
      })
      .catch(() => {
        setError("Could not load a dog image. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // The empty array makes this effect run when the component first mounts.
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <main>
      <h1>Random Dog</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && dogImage && (
        <img src={dogImage} alt="A Random Dog" />
      )}
      <button onClick={fetchDog} disabled={isLoading}>
        Get Another Dog
      </button>
    </main>
  );
}

export default App;
