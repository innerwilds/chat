const chats = new Set()
const nicknames = new Set()

const isNickExists = nick => nicknames.has(nick)
const addNick = nick => nicknames.add(nick)
const removeNick = nick => nicknames.add(nick)

module.exports.User = {
    createUser(nickname) {
        if (isNickExists(nick)) {
            throw new Error('user with nick ' + name + ' already exists')
        }

        addNick(nickname)
    },
    removeUser(nickname) {
        removeNick(nickname)
    }
}