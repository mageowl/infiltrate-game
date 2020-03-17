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

const lvls = [
	{
		lvl: lvl1,
		endpoint: 34
	}
]

let program = ""
fileVar.create("level", lvls[0].lvl)
fileVar.create("levelNum", 1)

const usrVars = require("./usr_vars")

function resetLvl() {
	program = ""
	console.clear()
	console.log(chalk.blue(" Level " + fileVar.levelNum))
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
				console.log(chalk.Green.black("SUCCESS"))
			}
        } catch (e) {
			console.log(chalk.bgRed.black("FALIED") + chalk.red(" " + e))
			rl.resume()
			wait(resetLvl)
        }
    } else {
        program += line + "\n"
		process.stdout.write(chalk.magenta("> "))
    }
})