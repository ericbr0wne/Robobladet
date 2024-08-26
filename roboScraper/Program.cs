using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;
using roboScraper;
using System.Xml;

// config file
var configuration = new ConfigurationBuilder()
.SetBasePath(Directory.GetCurrentDirectory())
.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
.Build();

// globaal vars
var textRazorApiKey = configuration["TextRazor:ApiKey"] ?? "Empty API-key";
var connectionString = configuration.GetConnectionString("DefaultConnection");
HttpClient client = new HttpClient();
TextRazorAPI api = new(textRazorApiKey, client);
var database = new Database(connectionString, api);

List<string> newsUris = new List<string>
{
    "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/",
    "http://www.dn.se/nyheter/m/rss/"
};

// main menu
while (true)
{
    WriteLine("1. to ship to db");
    WriteLine("2. to delete db");
    WriteLine("3. to exit");

    string input = Console.ReadLine() ?? "";
    if (input == "1")
    {
        var news = await FetchRssNews(newsUris, client);
        await database.AddArticles(news);
        Console.WriteLine(newsUris.Count + " articles shipped to db");
    }
    else if (input == "2")
    {
        await database.DeleteArticles();
        Console.WriteLine("deleted all articles");
    }
    else if (input == "3")
    {
        break;
    }

}
async Task<List<Article>> FetchRssNews(List<string> rssUris, HttpClient client)
{
    List<Article> articles = new List<Article>();

    foreach (var uri in rssUris)
    {
        try
        {
            var xContent = await client.GetStringAsync(uri);

            XmlDocument xml = new XmlDocument();
            xml.LoadXml(xContent);

            var namespaceManager = new XmlNamespaceManager(xml.NameTable);
            namespaceManager.AddNamespace("media", "http://search.yahoo.com/mrss/");
            namespaceManager.AddNamespace("dc", "http://purl.org/dc/elements/1.1/");
            namespaceManager.AddNamespace("atom", "http://www.w3.org/2005/Atom");

            var items = xml.SelectNodes("//item");

            foreach (XmlNode item in items)
            {
                var article = new Article
                {
                    Title = Utils.GetNodeValue(item, "title"),
                    Link = Utils.GetNodeValue(item, "link"),
                    Description = Utils.GetNodeValue(item, "description"),
                    PubDate = Utils.GetNodeValue(item, "pubDate"),
                    Img = Utils.ExtractImageUrl(item, namespaceManager)
                };

                articles.Add(article);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching or parsing RSS feed from {uri}: {ex.Message}");
        }
    }

    return articles;
}