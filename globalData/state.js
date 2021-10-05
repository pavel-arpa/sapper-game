let state = {
    fields: 10,
    mines: 0,
    checked: 0,
    $fs: [],
    opened: [],
    position: {
        i: 0,
        j: 0,
        status: false
    }
}
window.state = state

export default state