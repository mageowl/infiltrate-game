const readline = require('readline')
const chalk = require("chalk")
const rl = readline.createInterface(process.stdin)
const fileVar = require("./global")

let lvl1 = 
`########
#@     #
###### #
|      #
########
`

const lvls = require("./levels.json").lvls

let program = ""
fileVar.create("levelNum", 0)
fileVar.create("level", lvls[fileVar.levelNum].lvl)

const usrVars = require("./usr_vars")

function resetLvl() {
	program = ""
	console.clear()
	usrVars.player = usrVars.level.get(usrVars.tile.player)[0]
	console.log(chalk.bold.blue(" Level " + (fileVar.levelNum + 1)))
    console.log(fileVar.level)
    process.stdout.write(chalk.magenta("> "))
}

let waiting = false
function wait(callback) {
	waiting = callback
}

resetLvl()

rl.on("line", (line) => {
	if (waiting) {
		waiting()
		waiting = false
		return
	}
    if (line == "") {
        rl.pause()

        // RUN PROGRAM
        try {
			let f = new Function(Object.keys(usrVars), program).bind(null, ...Object.values(usrVars))
			f()
			console.log(fileVar.level)
			if (usrVars.player.pos == lvls[fileVar.levelNum].endpoint) {
				console.log(chalk.bgGreen.black("SUCCESS"))
				fileVar.levelNum = fileVar.levelNum + 1
				if (lvls[fileVar.levelNum] == undefined) {
					console.log(chalk.bgYellow.black("You finished all levels!") + chalk.yellow("\nWait for more levels, or use the command 'node level_edit.js' to edit and create more.\nIf you do make more, please create a pull request lebeled new levels"))
					return
				}
				fileVar.level = lvls[fileVar.levelNum].lvl
				rl.resume()
				wait(resetLvl)
			} else {
				console.log(chalk.bgRed.black("FALIED"))
				rl.resume()
				wait(resetLvl)
			}
        } catch (e) {
			console.log(chalk.bgRed.black("ERROR") + chalk.red(" " + e))
			rl.resume()
			wait(resetLvl)
        }
    } else {
        program += line + "\n"
		process.stdout.write(chalk.magenta("> "))
    }
})