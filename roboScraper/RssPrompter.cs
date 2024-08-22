using System;
using System.Collections.Generic;

public static class RssPrompter
{
    public static List<string> GetRss()
    {
        List<string> rssList = new List<string>();

        WriteLine("Enter URL to RSS feed. Type \"Valle e kung\" when finished");

        while (true)
        {
            Write("- ");
            string input = Console.ReadLine();

            if (string.Equals(input, "Valle e kung", StringComparison.OrdinalIgnoreCase))
            {
                break;
            }

            if (Uri.TryCreate(input, UriKind.Absolute, out Uri result)
                && (result.Scheme == Uri.UriSchemeHttp || result.Scheme == Uri.UriSchemeHttps))
            {
                rssList.Add(input);
                WriteLine($"{input} added!");
                Thread.Sleep(2000);
                Clear();
            }
            else
            {
                WriteLine("BAD input. Please enter valid URL.");
                Thread.Sleep(2000);
            }


            WriteLine("\nCollected URLs:");
            foreach (string item in rssList)
            {
                WriteLine($"- {item}");
            }
            WriteLine("---\n");

            WriteLine("Enter URL to RSS feed. Type \"Valle e kung\" when finished");
        }
        Clear();
        WriteLine("\nCollected URLs:");
        foreach (string item in rssList)
        {
            WriteLine($"- {item}");
        }
        WriteLine("Time to scrape that shit...");
        Thread.Sleep(2000);
        return rssList;
    }
}
