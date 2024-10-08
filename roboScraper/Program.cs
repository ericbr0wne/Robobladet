﻿using DotNetEnv;

Env.Load("../.env");

// globaal vars
string dbHost = Environment.GetEnvironmentVariable("DB_HOST");
string dbUser = Environment.GetEnvironmentVariable("DB_USER");
string dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
string dbName = Environment.GetEnvironmentVariable("DB_NAME");
string connectionString = $"Server={dbHost};Database={dbName};Uid={dbUser};Pwd={dbPassword};";

HttpClient client = new HttpClient();
var database = new Database(connectionString);

List<string> newsUris = new List<string>
{
    "http://www.dn.se/nyheter/m/rss/",
    "https://feeds.expressen.se/nyheter/",
};

// main menu
WriteLine("[Robobladet Backend]");
WriteLine("Using Database Address: " + dbHost);
WriteLine();
while (true)
{
    WriteLine("*************************************************");
    WriteLine("1. Add articles to the database               ");
    WriteLine("2. Delete all articles from the database      ");
    WriteLine("3. (DEMO) Predict and update topics with AI   ");
    WriteLine("4. Exit                                       ");
    WriteLine("*************************************************");
    WriteLine();
    Write("pick an option (1-4): ");

    string input = ReadLine() ?? "";
    if (input == "1")
    {
        WriteLine("adding all articles to db... DON'T EXIT");
        var news = await Utils.FetchRssNews(newsUris, client);
        await database.AddArticles(news);
        WriteLine(newsUris.Count + " articles shipped to db");
    }
    else if (input == "2")
    {
        await database.DeleteArticles();
        WriteLine("deleted all articles");
    }
    else if (input == "3")
    {
        WriteLine("predicting and adding all topics... DON'T EXIT");
        await database.PredictAndUpdateTopics();
    }
    else if (input == "4")
    {
        break;
    }
}
