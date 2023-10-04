import { pipeline } from "@xenova/transformers";

export const transcribe = async (audio) => {
  try {
    console.log("Fazendo a transcricao...");
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )
    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe"
    })

    console.log("Transcricao realizada com sucesso!")
    return transcription?.text.replace("[Música]", "");

  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};