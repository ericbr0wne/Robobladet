import React, { useEffect, useState } from "react";
import "./ArticleList.css";
import Highlight from './Highlight'; 

const ArticleList = () => {
  console.log("Article component loaded"); //användbart för felsökning och att se när komponenten renderas.
  const [articles, setArticles] = useState([]); //state-variabel som heter articles och en funktion för att uppdatera den som heter setArticles med en tom array i en useState hook 
  const [sortBy, setSortBy] = useState("newest");

  const [searchQuery, setSearchQuery] = useState(""); 
  /*
useState(""): Detta anropar React's useState hook med en initial value av en tom sträng ("").
[searchQuery, setSearchQuery]: useState returnerar en array med två element:
searchQuery: Detta är själva state-variabeln. Den representerar den aktuella sökfrågan som användaren har skrivit in i sökfältet. Initialt är den tom, men den kommer att uppdateras när användaren skriver något i sökfältet.
setSearchQuery: Detta är en funktion som du kan använda för att uppdatera värdet av searchQuery. När du anropar setSearchQuery med ett nytt värde, kommer React att rendera om komponenten och uppdatera alla delar av UI som använder searchQuery.
  */

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  /*
  event.target: Detta refererar till HTML-elementet som utlöste händelsen. I det här fallet är det inputfältet där användaren skriver.
event.target.value: Detta hämtar det aktuella värdet i inputfältet, dvs. vad användaren har skrivit hittills.
setSearchQuery(...): useState hook - Den används för att uppdatera värdet av state-variabeln searchQuery med det nya värdet från inputfältet.
*/

  const fetchArticles = (sortOption, searchTerm = "") => {
    fetch(`http://localhost:3000/api/articles?sortBy=${sortOption}&search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      /*
      .then(...): Detta är en del av Promise-API:et som fetch returnerar. 
(response) => response.json(): Denna funktion tar emot response-objektet från servern och anropar dess json()-metod. json()-metoden analyserar JSON-data från serverns svar och returnerar ett Promise som löses med de analyserade data.
.then((data) => setArticles(data) för att hantera det analyserade JSON-data.
(data) => setArticles(data): Denna funktion tar emot de analyserade data (data) och uppdaterar komponentens state med hjälp av setArticles-funktionen. Detta kommer att få React att rendera om komponenten och visa de hämtade artiklarna.
*/
      .catch((error) => console.error("Error fetching articles:", error));
  };

  useEffect(() => { //React hook som låter dig utföra sidoeffekter i funktionella komponenter. Sidoeffekter är allt som interagerar med världen utanför komponenten, till exempel att hämta data från ett API, manipulera DOM, eller sätta upp prenumerationer.
    fetchArticles(sortBy, searchQuery);
  }, [sortBy, searchQuery]); //[sortBy, searchQuery]: Detta är en array av beroenden. Det talar om för useEffect när den ska köra funktionen igen. I det här fallet kommer funktionen att köras: När komponenten renderas första gången.När värdet på sortBy eller searchQuery ändras.

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="article-list">
      <h1>Senaste nytt!</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Sök artiklar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="sort-menu">
        <label>Sort by: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="articles">
      {articles.length > 0 ? (
        articles.map((article) => (
          /*
          Detta är en ternär operator i JavaScript. Den fungerar som en förkortad if-else-sats.
articles.length > 0: Detta är villkoret. Det kontrollerar om längden på articles-arrayen (som förmodligen innehåller dina artikeldatan) är större än 0, dvs. om det finns några artiklar att visa.
?: Detta är frågetecknet som separerar villkoret från de två möjliga utfallen.
( ... ): Detta är koden som körs om villkoret är sant (dvs. om det finns artiklar).
:: Detta är kolonet som separerar det första utfallet från det andra.
( ... ): Detta är koden som körs om villkoret är falskt (dvs. om det inte finns några artiklar).
articles.map((article) => ( ... )):
articles.map(...): Detta anropar map-metoden på articles-arrayen. map används för att iterera över varje element i en array och returnera en ny array med transformerade element.
(article) => ( ... ): Detta är en arrow-funktion som tar ett article-objekt som argument och returnerar JSX för att rendera det artikelobjektet. */
          <div
            className="article-card"
            key={article.title}
            style={{ backgroundImage: `url(${article.img})` }}
          >
            <h2><Highlight text={article.title} searchTerm={searchQuery} /></h2> 
            <p><Highlight text={article.summary} searchTerm={searchQuery} /></p> 
            <a href={article.link}>Read more</a>
          </div>
        ))
          ) : (
            <p>Inga artiklar hittades...</p> 
          )}
      </div>
    </div>
  );
};

export default ArticleList;
