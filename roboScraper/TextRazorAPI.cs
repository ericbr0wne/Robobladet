using Newtonsoft.Json.Linq;

public class TextRazorAPI
{
    private readonly HttpClient _client;
    private readonly string _apiKey;
    public TextRazorAPI(string apiKey, HttpClient client)
    {
        _apiKey = apiKey;
        _client = client;
    }

    public async Task<string> PredictTopicAsync(string summary)
    {
        string requestUri = "https://api.textrazor.com/";

        var request = new HttpRequestMessage(HttpMethod.Post, requestUri)
        {
            Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                { "apiKey", _apiKey },
                { "text", summary },
                { "extractors", "topics" },
                { "classifiers", "textrazor_mediatopics_2023Q1" },
            })
        };

        var response = await _client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();

        return ExtractTopTopicLabel(responseBody);
    }

    private static string ExtractTopTopicLabel(string responseBody)
    {
        var jsonResponse = JObject.Parse(responseBody);

        var topicArray = jsonResponse["response"]?["topics"] as JArray;

        if (topicArray != null && topicArray.Count > 0)
        {
            var topTopic = topicArray
                .OrderByDescending(t => (double)t["score"])
                .FirstOrDefault();
            var topicLabel = topTopic["label"]?.ToString();
            return topicLabel;
        }

        return "Övrigt";
    }
}