import start from "./components/game/start.js";
import preloadImages from "./optimizeData/preloadImages.js";

(async () => {
    // await preloadImages(["./public/bomb.jpg", "./public/desert.png", "./public/explosion.png", "./public/flag.png", "./public/grass.jpg", "./public/grass__block.png"])
    await start()
})()
