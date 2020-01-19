import { playAnimation } from "./controllers.js";
import { grid } from "./index.js";

export let playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
    playAnimation(grid);
});