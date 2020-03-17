let varibles = {

}

const fileVar = {
    create(name, value) {
        Object.defineProperty(fileVar, name, { get() { return varibles[name] }, set(v) {varibles[name] = v}})
        varibles[name] = value
    }
}

module.exports = fileVar