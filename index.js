import start from "./components/game/start.js";
import preloadImages from "./optimizeData/preloadImages.js";

document.querySelector('body').innerHTML = "<div style='display:flex; height: 100%; align-items: center; justify-content: center; font-size: 50px;'>Downloading</div>";
(async () => {
    await preloadImages(["./public/bomb.jpg", "./public/desert.png", "./public/explosion.png", "./public/flag.png", "./public/grass.jpg", "./public/grass__block.png"])
    await start()
})()
