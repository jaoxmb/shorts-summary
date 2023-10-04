import { pipeline } from "@xenova/transformers";

export const summarize = async (text) => {
  try {
    console.log("Realizando o resumo do video...");
    const summarize = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )
    const output = await summarize(text);
    console.log("Resumo realizado com sucesso!");

    return output[0].summary_text;
  } catch (error) {
    console.log("Não foi possivel fazer o resumo do texto, detalhes:", error);
    throw new Error(error);
  }
}