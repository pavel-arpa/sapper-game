import start from "./start.js";

const lose = () => {
    let $game = document.querySelector("#game")
    $game.innerHTML = `
        <div class="lose">
            <div class="lose__text-wrapper">
                <span>LOSE!</span>
                <button class="lose__btn">one more time!</button>
            </div>
        </div>
    `
    $game.querySelector("button").addEventListener("click", () => {
        start()
    })
}

export default lose