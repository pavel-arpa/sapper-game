import state from "../../globalData/state.js";

const field = (set, i, j) => {
    if (set === "x") {
        return {
            html: `<span class="bomb"><span></span></span>`,
        }
    }
    if (set === 1) {
        return {
            html: `<span style="color: #008fef !important;">${set}</span>`,
        }
    }
    if (set === "stopper") {
        return {
            html: `<div class='field' id='f${i}-${j}' style="font-size: ${500 / state.fields}px"></div>`,
        }
    }
    return {
        html: `<span>${set === 0 ? "" : set}</span>`,
    }
}

export default field