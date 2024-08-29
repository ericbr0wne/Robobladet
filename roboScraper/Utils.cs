using System.Text;
using System.Xml;
using Newtonsoft.Json;
using roboScraper;

public static class Utils
{
    public static string ExtractImageUrl(XmlNode item, XmlNamespaceManager namespaceManager)
    {
        var enclosureNode = item.SelectSingleNode("enclosure", namespaceManager);
        if (enclosureNode != null)
        {
            var url = enclosureNode.Attributes["url"]?.Value;
            if (!string.IsNullOrEmpty(url))
            {
                return url;
            }
        }

        // if no <enclosure> checks for media:content
        var mediaContentNode = item.SelectSingleNode("media:content", namespaceManager);
        if (mediaContentNode != null)
        {
            var url = mediaContentNode.Attributes["url"]?.Value;
            if (!string.IsNullOrEmpty(url))
            {
                return url;
            }
        }

        return null;
    }

    public static string GetNodeValue(XmlNode parent, string nodeName)
    {
        var node = parent.SelectSingleNode(nodeName);
        return node?.InnerText.Trim() ?? string.Empty;
    }

    public static async Task<string> PredictTopic(string summary)
    {
        using (HttpClient client = new())
        {
            var requestUri = "http://localhost:3000/api/predictTopic";
            var requestBody = new { summary = summary };
            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(requestUri, content);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(responseString);

            return result.topic;
        }
    }

    public static async Task<List<Article>> FetchRssNews(List<string> rssUris, HttpClient client)
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
}