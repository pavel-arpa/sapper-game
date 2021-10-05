import field from "../field/field.js";
import genMatrix from "./genMatrix.js";
import state from "../../globalData/state.js";

async function gameGrid({node, count, stage}) {
    if (stage === 0) {
        let gridLayout = "";
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                gridLayout += field("stopper", r, c).html
            }
        }
        node.innerHTML = `
            <div 
                class="game-grid"
                style="grid-template-columns: repeat(${count}, 1fr); grid-template-rows: repeat(${count}, 1fr)"
            >${gridLayout}</div>`
    } else {
        let mtx = genMatrix(count)
        console.log(mtx)
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                state.$fs[r][c].innerHTML = field(mtx[r][c], r, c).html
            }
        }
    }
}

export default gameGrid
