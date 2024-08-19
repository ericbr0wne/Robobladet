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

  res.json(filteredArticles);
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
