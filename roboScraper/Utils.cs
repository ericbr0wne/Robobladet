using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using Newtonsoft.Json;
using roboScraper;

public static class Utils
{
    private static string _defaultImageUrl = "http://localhost:5173/src/assets/images/default-news.webp";

    // parse img url from <enclosure> OR <media:content> or <description>
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

        var mediaContentNode = item.SelectSingleNode("media:content", namespaceManager);
        if (mediaContentNode != null)
        {
            var url = mediaContentNode.Attributes["url"]?.Value;
            if (!string.IsNullOrEmpty(url))
            {
                return url;
            }
        }

        var descriptionNode = item.SelectSingleNode("description");
        if (descriptionNode != null)
        {
            var cdataContent = descriptionNode.InnerXml;
            if (!string.IsNullOrEmpty(cdataContent))
            {
                var match = Regex.Match(cdataContent, @"<img\s+[^>]*?src\s*=\s*['""]([^'""]+)['""][^>]*?>", RegexOptions.IgnoreCase);
                if (match.Success)
                {
                    return match.Groups[1].Value;
                }
            }
        }

        return _defaultImageUrl;
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
            var requestBody = new { summary };
            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(requestUri, content);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(responseString);

            return result.topic;
        }
    }

    public static string ExtractTopicFromUrl(string url)
    {
        var patterns = new[]
        {
            @"https:\/\/www\.expressen\.se\/[^\/]+\/([^\/]+)\/[^\/]+\/?$",
            @"https:\/\/www\.dn\.se\/([^\/]+)\/[^\/]+\/?$"
        };

        foreach (var pattern in patterns)
        {
            var match = Regex.Match(url, pattern, RegexOptions.IgnoreCase);
            if (match.Success)
            {
                return match.Groups[1].Value;
            }
        }

        return "Övrigt";
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
                    var descriptionNode = item.SelectSingleNode("description");
                    string description = descriptionNode?.InnerXml ?? string.Empty;

                    string cleanedDescription = Regex.Replace(description, @"<img\s+[^>]*?>", "").Trim();
                    cleanedDescription = Regex.Replace(cleanedDescription, @"<p>|</p>", "\n").Trim();
                    cleanedDescription = Regex.Replace(cleanedDescription, @"<!\[CDATA\[|\]\]>", "").Trim();

                    string link = Utils.GetNodeValue(item, "link");

                    var article = new Article
                    {
                        Title = GetNodeValue(item, "title"),
                        Link = link,
                        Description = cleanedDescription,
                        PubDate = GetNodeValue(item, "pubDate"),
                        Img = ExtractImageUrl(item, namespaceManager),
                        Topic = ExtractTopicFromUrl(link)
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
