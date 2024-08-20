import React from 'react';

const Highlight = ({ text, searchTerm }) => {
  if (!searchTerm) return <>{text}</>;

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

export default Highlight;