const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const articles = [
  {
    title: "Inte klart med ersättare för Ribbenvik",
    summary:
      "▸ Regeringen och SD har ännu inte hittat någon ersättare för Migrationsverkets avgående generaldirektör Mikael Ribbenvik.",
    link: "https://www.aftonbladet.se/nyheter/a/8JWWL2/inte-klart-med-ersattare-for-ribbenvik",
    img: "https://images.aftonbladet-cdn.se/v2/images/00915ea6-3aa6-4551-a0a3-6aba650277a6?fit=crop&format=auto&h=467&q=50&w=700&s=97c5c58fc5fdbdffd01cad57134bfe06cc7f95eb", // Add the image URL here
    published: new Date(Date.now() - 86400000),
    topic: ["SamhalleKonflikter"],
  },
  {
    title: "Drogs in i inhägnad – dödades av 40 krokodiler",
    summary:
      "▸ En 72-årig man har dödats av omkring 40 krokodiler sedan han dragits in i en inhägnad på familjens reptilfarm.",
    link: "https://www.aftonbladet.se/nyheter/a/bgWW6e/drogs-in-i-inhagnad-dodades-av-40-krokodiler",
    img: "https://images.aftonbladet-cdn.se/v2/images/faa2b49e-5302-4721-b017-1a0f33682694?fit=crop&format=auto&h=443&q=50&w=700&s=4e95c16192663c04e388246f066905d98c50ca05", // Add the image URL here
    published: new Date(Date.now() - 172800000),
    topic: ["Ekonomi"],
  },
  {
    title: "Nytt rekord för solenergi i Sverige",
    summary: "▸ Solcellsparker producerade mer el än någonsin under juli månad, enligt ny statistik.",
    link: "https://www.example.com/solenergi-rekord",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Ersätt med en riktig bild-URL
    published: new Date(Date.now() - 43200000), // Publicerad för 12 timmar sedan
    topic: ["Miljö", "Energi"],
  },
  {
    title: "AI-forskare varnar för risker med superintelligens",
    summary: "▸ En grupp framstående AI-forskare uppmanar till försiktighet och reglering av utvecklingen av kraftfull artificiell intelligens.",
    link: "https://www.example.com/ai-varning",
    img: "https://plus.unsplash.com/premium_photo-1680700308578-b40c7418e997?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 259200000), // Publicerad för 3 dagar sedan
    topic: ["Teknik", "AI"],
  },
  {
    title: "Svensk sommar: Regn och rusk fortsätter",
    summary: "▸ SMHI varnar för fortsatt ostadigt väder med regn och åska i stora delar av landet.",
    link: "https://www.example.com/sommarvader",
    img: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 604800000), // Publicerad för 1 vecka sedan
    topic: ["Väder"],
  },
  {
    title: "”Barbie” slår nya rekord på biograferna",
    summary: "▸ Den nya Barbie-filmen har blivit en succé och har redan spelat in miljontals kronor världen över.",
    link: "https://www.example.com/barbie-rekord",
    img: "https://images.unsplash.com/photo-1603362305486-75a25f73051a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 345600000), // Publicerad för 4 dagar sedan
    topic: ["Film", "Kultur"],
  },
  {
    title: "”Chockhöjning” av matpriser väntas i höst",
    summary: "▸ Experter förutspår att matpriserna kommer att stiga kraftigt under hösten på grund av inflation och ökade produktionskostnader.",
    link: "https://www.example.com/matpriser",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 172800000), // Publicerad för 2 dagar sedan
    topic: ["Ekonomi", "Mat"],
  },
  {
    title: "Mystisk monolit upptäckt i öknen",
    summary: "▸ En glänsande metallmonolit har hittats i en avlägsen del av Utah-öknen, vilket väcker frågor om dess ursprung och syfte.",
    link: "https://www.example.com/monolit",
    img: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 86400000), // Publicerad för 1 dag sedan
    topic: ["Nyheter", "Mysterier"],
  },
  {
    title: "”Squid Game” säsong 2 får premiärdatum",
    summary: "▸ Netflix har äntligen avslöjat när den efterlängtade andra säsongen av den populära serien ”Squid Game” kommer att släppas.",
    link: "https://www.example.com/squid-game",
    img: "https://images.unsplash.com/photo-1633520830311-de93eaf9bd02?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(Date.now() - 129600000), // Publicerad för 1.5 dagar sedan
    topic: ["TV", "Underhållning"],
  },
  {
    title: "”Historiskt” genombrott inom cancerforskning",
    summary: "▸ Forskare har gjort ett banbrytande framsteg i kampen mot cancer, vilket kan leda till nya och effektivare behandlingar.",
    link: "https://www.example.com/cancerforskning",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: new Date(),
    topic: ["Vetenskap", "Hälsa"],
  }
];


app.get("/api/articles", (req, res) => {
  let filteredArticles = articles;
  const { topic, sortBy } = req.query;

  if (topic) {
    filteredArticles = filteredArticles.filter((article) =>
      article.topic.includes(topic)
    );
  }

  if (sortBy === "newest") {
    filteredArticles = filteredArticles.sort(
      (a, b) => new Date(b.published) - new Date(a.published)
    );
  } else if (sortBy === "oldest") {
    filteredArticles = filteredArticles.sort(
      (a, b) => new Date(a.published) - new Date(b.published)
    );
  }
  const { search } = req.query;

  if (search) {
    const searchTerm = search.toLowerCase();
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.summary.toLowerCase().includes(searchTerm)
    );
  }

  res.json(filteredArticles);
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
