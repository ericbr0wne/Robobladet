const express = require('express');
   const cors = require('cors');
   const app = express();
   const port = 3000;

   app.use(cors());

   // Hard-coded articles data
   const articles = [
       { 
           title: "Inte klart med ersättare för Ribbenvik", 
           summary: "▸ Regeringen och SD har ännu inte hittat någon ersättare för Migrationsverkets avgående generaldirektör Mikael Ribbenvik.", 
           link: "https://www.aftonbladet.se/nyheter/a/8JWWL2/inte-klart-med-ersattare-for-ribbenvik", 
           published: new Date(Date.now() - 86400000), 
           topic: ["SamhalleKonflikter"] 
       },
       { 
           title: "Drogs in i inhägnad – dödades av 40 krokodiler", 
           summary: "▸ En 72-årig man har dödats av omkring 40 krokodiler sedan han dragits in i en inhägnad på familjens reptilfarm.", 
           link: "https://www.aftonbladet.se/nyheter/a/bgWW6e/drogs-in-i-inhagnad-dodades-av-40-krokodiler", 
           published: new Date(Date.now() - 172800000), 
           topic: ["Ekonomi"] 
       },

   ];


   app.get('/api/articles', (req, res) => {
         let filteredArticles = articles;
         const { topic, sortBy } = req.query;
  
         if (topic) {
             filteredArticles = filteredArticles.filter(article => article.topic.includes(topic));
         }
  
         if (sortBy === 'newest') {
             filteredArticles = filteredArticles.sort((a, b) => new Date(b.published) - new Date(a.published));
         } else if (sortBy === 'oldest') {
             filteredArticles = filteredArticles.sort((a, b) => new Date(a.published) - new Date(b.published));
         }
  
         res.json(filteredArticles);
     });
  
     app.listen(port, () => {
         console.log(`Backend API running at http://localhost:${port}`);
     });
  