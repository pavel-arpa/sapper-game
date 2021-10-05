import gameProcess from "./gameProcess.js";
import state from "../../globalData/state.js";

async function start() {
    let $game = document.querySelector("#game")
    $game.innerHTML = `
        <div class="start">
            <div class="start-wrapper">
                <span>Select complexity</span>
                <input type="tel" placeholder="fields">
                <button class="start__btn">start!</button>
            </div>
        </div>
    `
    $game.querySelector("button").addEventListener("click", () => {
        let num = Number(document.querySelector("input").value)
        if (num < 4) {
            $game.querySelector("span").innerText = "Fields count should be 4+"
        } else if (!Boolean(Number(num))) {
            $game.querySelector("span").innerText = "Incorrect value!"
        } else {
            state.fields = num
            gameProcess()
        }
    })
    $game.querySelector("input").addEventListener("keydown", (e) => {
        if(e.keyCode === 13) {
            let num = Number(document.querySelector("input").value)
            if (num < 4) {
                $game.querySelector("span").innerText = "Count should be 4+"
            } else if (!Boolean(Number(num))) {
                $game.querySelector("span").innerText = "Incorrect value!"
            } else {
                state.fields = num
                gameProcess()
            }
        }
    })
}

export default start