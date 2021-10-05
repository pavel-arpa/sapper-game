import state from "../../globalData/state.js";
import gameGrid from "../gameGrid/gameGrid.js";
import win from "./win.js";
import lose from "./lose.js";



let newStyles = (selector) => {
    selector.style.backgroundColor = 'rgba(0,0,0,0)'
    selector.style.boxShadow = 'none'
    selector.style.border = 'none'
    selector.style.transition = 'background ease 0.1s'
}

function isIncluded(row, column, positionRow, positionColumn) {
    let isOutsideRow = row + positionRow - 1 < 0 || row + positionRow - 1 >= state.fields // 3+0-1 / 0
    let isOutsideColumn = column + positionColumn - 1 < 0 || column + positionColumn - 1 >= state.fields // 4+1-1

    if (isOutsideRow || isOutsideColumn) {
        return true
    }
    return state.opened[row + positionRow - 1][column + positionColumn - 1] === 1
}

function openFields(selector) {
    let a = selector.id.slice(1).split("-")
    let i = Number(a[0])
    let j = Number(a[1])
    let fields = [[], [], []]
    fields[0][0] = i-1>=0 && j-1>=0 ? state.$fs[i-1][j-1] : false
    fields[0][1] = i-1>=0 ? state.$fs[i-1][j] : false
    fields[0][2] = i-1>=0 && j+1<state.fields ? state.$fs[i-1][j+1] : false
    fields[1][0] = j-1>=0 ? state.$fs[i][j-1] : false
    fields[1][1] = state.$fs[i][j]
    fields[1][2] = j+1<state.fields ? state.$fs[i][j+1] : false
    fields[2][0] = i+1<state.fields && j-1>=0 ? state.$fs[i+1][j-1] : false
    fields[2][1] = i+1<state.fields ? state.$fs[i+1][j] : false
    fields[2][2] = i+1<state.fields && j+1<state.fields ? state.$fs[i+1][j+1] : false

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (!(r === 1 && c === 1) && fields[r][c] && !isIncluded(i, j, r, c)) {
                if (fields[r][c].querySelector('.flag')) {
                    fields[r][c].querySelector('.flag').remove()
                }
                state.opened[i + r - 1][j + c - 1]++
                newStyles(fields[r][c])
                fields[r][c].removeEventListener("click", openListener)
                if (fields[r][c].querySelector("span").innerText === "") {
                    openFields(fields[r][c])
                }
            } else if (r === 1 && c === 1 && !isIncluded(i, j, r, c)) {
                state.opened[i + r - 1][j + c - 1]++
                fields[r][c].removeEventListener("click", openListener)
            }
        }
    }
    let sum = 0
    state.opened.forEach(item => {
        sum += item.reduce((a, b) => a + b, 0)
    })
    if (state.fields**2 - sum === state.mines) {
        setTimeout(win, 1000)
    }
    // console.log(state.opened, "g", sum)
}


let contextMenuListener = e => {
    e.preventDefault()
    if (e.target.className === 'flag') {
        e.target.remove()
    } else {
        e.target.insertAdjacentHTML('beforeend', `
            <img class="flag" src="./public/flag.png"
                style="position: absolute; width: ${e.target.offsetWidth}px; display: flex; justify-content: center; align-items: center;"
            />
        `)
    }
}


let openListener = e => {
    let fld = e.target
    let indexes = fld.id.slice(1).split("-")
    state.opened[Number(indexes[0])][Number(indexes[1])]++
    let sum = 0
    state.opened.forEach(item => {
        sum += item.reduce((a, b) => a + b, 0)
    })
    if (fld.className !== "flag") {
        if (fld.querySelector('span').className === "bomb") {
            setTimeout(lose, 700)
            state.fields = 10
            state.mines = 0
            state.checked = 0
        }
        if (state.fields**2 - sum === state.mines) {
            setTimeout(win, 700)
        }
        if (fld.querySelector('span').innerText === "") {
            openFields(fld)
            fld.style.backgroundColor = 'rgba(0,0,0,0)'
            fld.style.boxShadow = 'none'
            fld.style.border = 'none'
        }
        fld.style.backgroundColor = 'rgba(0,0,0,0)'
        fld.style.boxShadow = 'none'
        fld.style.border = 'none'
    }
    fld.removeEventListener("click", openListener)
    // console.log(state.opened, sum)
}


let setListeners = () => {
    for (let i = 0; i < state.fields; i++) {
        for (let j = 0; j < state.fields; j++) {
            let fld = document.querySelector("#f" + i + "-" + j)
            fld.addEventListener("click", openListener)
            if (i === state.position.i && j === state.position.j) {
                fld.dispatchEvent(new CustomEvent("click", { "detail": "Example of an event" }))
                fld.removeEventListener("click", openListener)
            }
        }
    }
    document.addEventListener( "contextmenu", contextMenuListener)
}

function matrixZero(m, n) {
    return Array.from({
        length: m
    }, () => new Array(n).fill(0));
}

async function definePosition(allFields) {
    async function listener(e) {
        let $ = e.target
        let ij = $.id.slice(1).split("-")
        state.position.i = Number(ij[0])
        state.position.j = Number(ij[1])
        // state.opened[state.position.i][state.position.j]++
        newStyles($)
        Array.from(allFields).map(item => {item.removeEventListener("click", listener)})
        await generate(allFields)
        console.log(0)
    }
    Array.from(allFields).map(item => {
        item.addEventListener("click", listener)
    })
}


async function generate(allFields) {
    let $game = document.querySelector("#game")
    await gameGrid({node: $game, count: state.fields, stage: 1})
    setListeners()
}


async function gameProcess() {
    console.log('game is started...')
    let $game = document.querySelector("#game")
    await gameGrid({node: $game, count: state.fields, stage: 0})
    let allFields = Array.from(document.querySelectorAll(".field"))
    state.opened = matrixZero(state.fields, state.fields)
    for (let i = 0; i < state.fields; i++) {
        state.$fs[i] = allFields.slice(i * state.fields, (i + 1) * state.fields)
    }
    await definePosition(allFields)
}


export default gameProcess