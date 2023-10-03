import { server } from "./server.js"

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  content.classList.add("hidden");

  const videoURL = input.value;
  const isShorts = videoURL.includes("shorts");
  if (!isShorts) {
    return content.textContent = "O url parece não ser um video short!"
  }

  const videoID = (id) => {
    id = videoURL.split("/shorts/")[1];
    id = id.split("?")[0];
    return id;
  }
  content.textContent = "Fazendo a transcricao do video..."
  const transcription = await server.get("/summary/" + videoID());

  content.textContent = transcription.data.result;

  // content.textContent = "Fazendo o resumo do video..."
  // const summary = await server.post("/summary", {
  //   text: transcription.data.result
  // });

  // content.textContent = summary.data.result;
  content.classList.remove("hidden");
})