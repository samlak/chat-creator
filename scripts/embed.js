const { loadEnvConfig } = require("@next/env");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

loadEnvConfig("");

const generateEmbeddings = async (essays) => {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  for (let i = 0; i < essays.length; i++) {
    const chunk = essays[i];

    // for (let j = 0; j < section.chunks.length; j++) {
    //   const chunk = section.chunks[j];

      const { content } = chunk;

      const embeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: content
      });

      const [{ embedding }] = embeddingResponse.data.data;

      const { data, error } = await supabase
        .from("doc")
        .insert({
          content,
          embedding
        })
        .select("*");

      if (error) {
        console.log("error", error);
      } else {
        console.log("saved", i);
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    // }
  }
};

(async () => {
  const book = JSON.parse(fs.readFileSync("scripts/content.json", "utf8"));

  await generateEmbeddings(book);
})();
