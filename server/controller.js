const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const { username, password } = req.body;
        const db = req.app.get('db');

        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(password, salt);
        console.log('pass', hash)
        console.log('user', username)
        let user = await db.register({ password: hash, username })
        res.status(200).send(user)
        
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        let user = await db.login({ username })


        user = user[0]
        if (!user) {
            return res.sendStatus(401)
        }
        let authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            res.status(200).send(user)
        } else {
            return res.status(401).send('Incorrect password')
        }
    },
}