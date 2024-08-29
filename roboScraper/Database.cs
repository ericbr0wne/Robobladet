using MySql.Data.MySqlClient;
using roboScraper;
public class Database
{
    private readonly string _connectionString;
    public Database(string connectionString)
    {
        _connectionString = connectionString;
    }
    public async Task PredictAndUpdateTopics()
    {
        List<(int id, string summary)> articlesToUpdate = new List<(int, string)>();

        using (var dbContext = new MySqlConnection(_connectionString))
        {
            await dbContext.OpenAsync();
            const string selectQuery = "select id, summary FROM articles";

            using (var selectCommand = new MySqlCommand(selectQuery, dbContext))
            using (var reader = await selectCommand.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string summary = reader.GetString(1);
                    articlesToUpdate.Add((id, summary));
                }
            }
        }

        using (var dbContext = new MySqlConnection(_connectionString))
        {
            await dbContext.OpenAsync();
            const string updateQuery = "update articles set topic = @Topic where id = @Id";

            foreach (var article in articlesToUpdate)
            {
                try
                {
                    var predictedTopic = await Utils.PredictTopic(article.summary);

                    using (var updateCommand = new MySqlCommand(updateQuery, dbContext))
                    {
                        updateCommand.Parameters.AddWithValue("@Topic", predictedTopic ?? (object)DBNull.Value);
                        updateCommand.Parameters.AddWithValue("@Id", article.id);
                        await updateCommand.ExecuteNonQueryAsync();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }

    public async Task AddArticles(List<Article> articles)
    {
        using (var dbContext = new MySqlConnection(_connectionString))
        {
            await dbContext.OpenAsync();

            // auto-incr reset
            const string resetAutoIncrementQuery = "ALTER TABLE articles AUTO_INCREMENT = 1";
            using (var resetCommand = new MySqlCommand(resetAutoIncrementQuery, dbContext))
            {
                await resetCommand.ExecuteNonQueryAsync();
                WriteLine("auto-increment set to 1.");
            }

            const string query = @"
            INSERT INTO articles (title, summary, link, img, published, topic) 
            VALUES (@Title, @Summary, @Link, @Img, @Published, @Topic)";

            using (var command = new MySqlCommand(query, dbContext))
            {
                command.Parameters.Add("@Title", MySqlDbType.VarChar);
                command.Parameters.Add("@Summary", MySqlDbType.Text);
                command.Parameters.Add("@Link", MySqlDbType.VarChar);
                command.Parameters.Add("@Img", MySqlDbType.VarChar);
                command.Parameters.Add("@Published", MySqlDbType.DateTime);
                command.Parameters.Add("@Topic", MySqlDbType.VarChar);

                foreach (var article in articles)
                {
                    command.Parameters["@Title"].Value = article.Title ?? (object)DBNull.Value;
                    command.Parameters["@Summary"].Value = article.Description ?? (object)DBNull.Value;
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

                    command.Parameters["@Topic"].Value = article.Topic ?? (object)DBNull.Value;
                    await command.ExecuteNonQueryAsync();
                }
                await dbContext.CloseAsync();
            }
        }
    }
    public async Task DeleteArticles()
    {
        using (var db = new MySqlConnection(_connectionString))
        {
            await db.OpenAsync();

            // reset autoincrement
            const string resetAutoIncrementQuery = "alter table articles AUTO_INCREMENT = 1";
            using (var resetCommand = new MySqlCommand(resetAutoIncrementQuery, db))
            {
                await resetCommand.ExecuteNonQueryAsync();
                WriteLine("auto-increment set to 1!");
            }

            const string query = "delete from articles";
            using (var command = new MySqlCommand(query, db))
            {
                await command.ExecuteNonQueryAsync();
            }
            await db.CloseAsync();
        }
    }
}