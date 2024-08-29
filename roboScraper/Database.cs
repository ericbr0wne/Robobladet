using MySql.Data.MySqlClient;
using roboScraper;
public class Database
{
    private readonly string _connectionString;
    public Database(string connectionString)
    {
        _connectionString = connectionString;
    }
    public async Task AddArticles(List<Article> articles)
    {
        using (var dbContext = new MySqlConnection(_connectionString))
        {
            await dbContext.OpenAsync();

            const string resetAutoIncrementQuery = "ALTER TABLE articles AUTO_INCREMENT = 1";
            using (var resetCommand = new MySqlCommand(resetAutoIncrementQuery, dbContext))
            {
                await resetCommand.ExecuteNonQueryAsync();
                Console.WriteLine("auto-increment set to 1.");
                Console.WriteLine("ADDING ALL ARTICLES... DON'T EXIT");
            }

            const string query = @"
            insert into articles (title, summary, link, img, published, topic) 
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
                Console.WriteLine("auto-increment set to 1!");
            }


            const string query = "delete from articles";
            using (var command = new MySqlCommand(query, db))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

    }
}