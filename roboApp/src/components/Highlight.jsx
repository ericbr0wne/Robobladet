import React from 'react';

const Highlight = ({ text, searchTerm }) => {
  if (!searchTerm) return <>{text}</>;

  //Komponenten tar emot searchTerm som en prop från dess Parent och kan använda den i sin logik för att avgöra om och hur texten ska highlightas.

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => (   // FOREACH!?
        <span key={i} style={part.toLowerCase() === searchTerm.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
          {part}
        </span>
      ))}
    </>
  );
};


/**Sammanfattning:

Denna kod tar en textsträng och en sökterm, delar upp texten i delar baserat på söktermen, och returnerar sedan ett fragment som innehåller en lista med <span>-element. Varje <span> representerar en del av texten, och de delar som matchar söktermen är highlight-ade med en gul bakgrund.

Fördelar med att använda map istället för forEach:

map returnerar en ny array, vilket gör det enkelt att rendera listan med <span>-element direkt i JSX.
map är mer deklarativt och passar bättre in i React's funktionella programmeringsstil. */

export default Highlight;