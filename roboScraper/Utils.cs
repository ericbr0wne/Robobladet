using System.Text.RegularExpressions;
using System.Xml;
using Newtonsoft.Json.Linq;

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
}