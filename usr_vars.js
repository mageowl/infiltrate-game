RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}

const tileClasses = require("./tile_classes")
const fileVar = require("./global")
const usrVars = {
    level: {
        get(tile) {
            let charIndexes = [...fileVar.level.matchAll(new RegExp(RegExp.quote(tile.tileChar), "g"))].map((list) => { return list.index })
            if (charIndexes.length) {
                let tiles = []
                charIndexes.forEach(index => {
                    tiles.push(new tile(index))
                })
                return tiles
            } else {
                return []
            }
        }
    },
    tile: {
        door: tileClasses.Door,
        player: tileClasses.Player
    },
    player: new tileClasses.Player(-1)
}
usrVars.player = usrVars.level.get(usrVars.tile.player)[0]

module.exports = usrVars