import { grid } from "./index.js";

let playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
    grid.startAnimation();
});
