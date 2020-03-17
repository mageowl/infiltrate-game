const usrVars = require("./usr_vars")
const fileVar = require("./global")

fileVar.create("level", "# | #")

usrVars.level.get(usrVars.tile.door)[0].open()
console.log(fileVar.level)