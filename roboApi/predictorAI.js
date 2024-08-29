const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const API_KEY = process.env.API_KEY;

async function predictTopic(summary) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: summary,
        parameters: {
          candidate_labels: [
            "Miljö",
            "Politik",
            "Ekonomi",
            "Sport",
            "Brott",
            "Sverige",
            "Världen",
            "Övrigt",
          ],
        },
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    const predictedLabel = response.data.labels[0];
    console.log(`Predicted Topic: ${predictedLabel}`);
    return predictedLabel;
  } catch (error) {
    console.error("Error predicting topic:", error);
  }
}

module.exports = { predictTopic };
