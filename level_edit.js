const readline = require('readline')
const chalk = require('chalk')
const fs = require('fs')
const rl = readline.createInterface(process.stdin)

console.log(chalk.bold.magenta("Level Editor: Press enter twice in a row to end."))

let level = ""
let levelSelect = false

rl.on("line", (line) => {
    if (levelSelect) {
        let levelData = require("./levels.json")
        let levelIndex = parseInt(line) - 1
        levelData.lvls[levelIndex] = {}
        levelData.lvls[levelIndex].endpoint = level.indexOf("$")
        levelData.lvls[levelIndex].lvl = level
        fs.writeFile("./levels.json", JSON.stringify(levelData), {}, () => {})
        rl.close()
    }
    if (line == "") {
        process.stdout.write(chalk.italic.cyan("Which level to edit? "))
        levelSelect = true
    } else {
        level += line + "\n"
    }
})