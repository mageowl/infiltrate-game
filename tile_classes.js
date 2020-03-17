const fileVar = require("./global")


class Tile {
    constructor(pos) {
        this.pos = pos
    }

    replaceSelf(char) {
        fileVar.level = fileVar.level.substr(0, this.pos) + char + fileVar.level.substr(this.pos + 1)
    }

    static tileChar = " "
}

class Door extends Tile {
    constructor(pos) {
        super(pos)
        this.isOpen = false
    }

    open() {
        this.isOpen = true
        this.replaceSelf(" ")
    }

    static tileChar = "|"
}

class Player extends Tile {
    constructor(pos) {
        super(pos)
        this.levelWidth = fileVar.level.split("\n")[0].length + 1
    }

    right(spaces = 1) {
        if (fileVar.level[this.pos + 1] != " " && fileVar.level[this.pos + 1] != "$") return
        this.replaceSelf(".")
        this.pos++
        this.replaceSelf("@")
        if (spaces > 1) this.right(spaces - 1)
    }
    left(spaces = 1) {
        if (fileVar.level[this.pos - 1] != " " && fileVar.level[this.pos - 1] != "$") return
        this.replaceSelf(".")
        this.pos--
        this.replaceSelf("@")
        if (spaces > 1) this.left(spaces - 1)
    }

    down(spaces = 1) {
        if (fileVar.level[this.pos + this.levelWidth] != " " && fileVar.level[this.pos + this.levelWidth] != "$") return
        this.replaceSelf(".")
        this.pos += this.levelWidth
        this.replaceSelf("@")
        if (spaces > 1) this.down(spaces - 1)
    }
    up(spaces = 1) {
        if (fileVar.level[this.pos - this.levelWidth] != " " && fileVar.level[this.pos - this.levelWidth] != "$") return
        this.replaceSelf(".")
        this.pos -= this.levelWidth
        this.replaceSelf("@")
        if (spaces > 1) this.up(spaces - 1)
    }

    static tileChar = "@"
}

module.exports = {
    Door,
    Player
}