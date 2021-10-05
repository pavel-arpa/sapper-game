import start from "./start.js";

const win = () => {
    let $game = document.querySelector("#game")
    $game.innerHTML = `
        <div class="win">
            <div class="win__text-wrapper">
                <span>WIN!</span>
                <button class="win__btn">one more time!</button>
            </div>
        </div>
    `
    $game.querySelector("button").addEventListener("click", () => {
        start()
    })
}

export default win