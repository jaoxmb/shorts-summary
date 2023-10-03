import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/summary/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await download(id);
    const audioConverted = await convert();
    const result = await transcribe(audioConverted);

    response.json({ result });
  } catch (error) {
    console.log(error);
  }
})

app.post("/summary", async (request, response) => {
  try {
    const text = request.body.text;
    const result = await summarize(text);

    response.json({ result });
  } catch (error) {
    console.log(error);
  }
})

app.listen(3333, () => {
  console.log("Server is running on port 3333");
})