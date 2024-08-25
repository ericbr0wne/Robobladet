using MySql.Data.MySqlClient;
using roboScraper;
using System.Data;
using System.Xml;

const string connectionString = "Server=localhost;Database=robobladet_db;Uid=root;Pwd=mysql;";

List<string> newsUris = new List<string>
{
    "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/",
    "http://www.dn.se/nyheter/m/rss/"
};

// globaal httpclient
HttpClient client = new HttpClient();

while (true)
{
    WriteLine("1. to ship to db");
    WriteLine("2. to delete db");
    WriteLine("3. to exit");

    string input = Console.ReadLine() ?? "";
    if (input == "1")
    {
        var news = await FetchRssNews(newsUris, client);
        ShipToDb(news, connectionString);
        Console.WriteLine(newsUris.Count + " articles shipped to db");
    }
    else if (input == "2")
    {
        DeleteDb(connectionString);
        Console.WriteLine("deleted all articles");
    }
    else if (input == "3")
    {
        break;
    }

}
static async Task<List<Article>> FetchRssNews(List<string> rssUris, HttpClient client)
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

static void ShipToDb(List<Article> articles, string connectionString)
{
    using (var dbContext = new MySqlConnection(connectionString))
    {
        dbContext.Open();

        const string resetAutoIncrementQuery = "ALTER TABLE articles AUTO_INCREMENT = 1";
        using (var resetCommand = new MySqlCommand(resetAutoIncrementQuery, dbContext))
        {
            resetCommand.ExecuteNonQuery();
            Console.WriteLine("auto-increment set to 1.");
        }

        const string query = @"
            INSERT INTO articles (title, summary, link, img, published) 
            VALUES (@Title, @Description, @Link, @Img, @Published)";

        using (var command = new MySqlCommand(query, dbContext))
        {
            command.Parameters.Add("@Title", MySqlDbType.VarChar);
            command.Parameters.Add("@Description", MySqlDbType.Text);
            command.Parameters.Add("@Link", MySqlDbType.VarChar);
            command.Parameters.Add("@Img", MySqlDbType.VarChar);
            command.Parameters.Add("@Published", MySqlDbType.DateTime);

            foreach (var article in articles)
            {
                command.Parameters["@Title"].Value = article.Title ?? (object)DBNull.Value;
                command.Parameters["@Description"].Value = article.Description ?? (object)DBNull.Value;
                command.Parameters["@Link"].Value = article.Link ?? (object)DBNull.Value;
                command.Parameters["@Img"].Value = article.Img ?? (object)DBNull.Value;

                DateTime publishedDate;
                if (DateTime.TryParse(article.PubDate, out publishedDate))
                {
                    command.Parameters["@Published"].Value = publishedDate;
                }
                else
                {
                    command.Parameters["@Published"].Value = (object)DBNull.Value;
                }

                command.ExecuteNonQuery();
            }
        }
    }
}
static void DeleteDb(string connectionString)
{
    using (var db = new MySqlConnection(connectionString))
    {
        db.Open();

        // reset autoincrement
        const string resetAutoIncrementQuery = "ALTER TABLE articles AUTO_INCREMENT = 1";
        using (var resetCommand = new MySqlCommand(resetAutoIncrementQuery, db))
        {
            resetCommand.ExecuteNonQuery();
            Console.WriteLine("auto-increment set to 1.");
        }


        const string query = "delete from articles";
        using (var command = new MySqlCommand(query, db))
        {
            command.ExecuteNonQuery();
        }
    }

}