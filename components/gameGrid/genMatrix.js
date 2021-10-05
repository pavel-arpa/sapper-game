import state from "../../globalData/state.js";

const setBomb = (mx, r, c, count) => {
    if (mx[r][c] !== "x") {
        state.mines++
        mx[r][c] = "x"
        if (r-1 >= 0 && c-1 >= 0 && mx[r-1][c-1] !== "x") mx[r-1][c-1]++
        if (r-1 >= 0 && mx[r-1][c] !== "x") mx[r-1][c]++
        if (r-1 >= 0 && c+1 < count && mx[r-1][c+1] !== "x") mx[r-1][c+1]++
        //
        if (c-1 >= 0 && mx[r][c-1] !== "x") mx[r][c-1]++
        if (c+1 < count && mx[r][c+1] !== "x") mx[r][c+1]++
        //
        if (r+1 < count && c-1 >= 0 && mx[r+1][c-1] !== "x") mx[r+1][c-1]++
        if (r+1 < count && mx[r+1][c] !== "x") mx[r+1][c]++
        if (r+1 < count && c+1 < count && mx[r+1][c+1] !== "x") mx[r+1][c+1]++
    }
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


function fillFields(count, mx) {
    for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
            let rand = randomInteger(1, 8)
            if (rand === 1 && state.position.i !== r && state.position.j !== c) {
                setBomb(mx, r, c, count)
            }
        }
    }
    if (state.mines <= 3) {
        fillFields(count, mx)
        console.log("regen")
    }
}


const genMatrix = (count) => {
    state.mines = 0
    let mx = []
    for (let r = 0; r < count; r++) {
        mx[r] = [];
        for (let c = 0; c < count; c++) {
            mx[r][c] = 0;
        }
    }
    fillFields(count, mx)
    return mx
}

export default genMatrix