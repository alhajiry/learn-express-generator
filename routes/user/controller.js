let users = require('../../models/users')

module.exports = {

    retrieveUser: (req, res) => {
        // const { name, email } = req.body
        
        // return res.status(200).json({
        //     message: 'user retrieved succesfully',
        //     name,
        //     email,
        //     password : '*******'
        // })
        return res.status(200).send(users)
    },


    register: (req, res) => {
        try {
            const {name, email, password} = req.body
            if(!name || !email || !password) {
                return res.status(400).json({
                    message: 'body cannot be empty'
                })
            }

            const existedUser = users.find(user => user.email === email);

            if(existedUser) {
                return res.status(409).json({
                    message: 'email already exist, please login instead'
                })
            }

            users.push({ name, email, password })
            res.status(201).json({
                message: 'user succesfully created',
                name,
                email
            })
        } catch (error) {
            return res.status(500).json({
                message: 'error in register route dude',
                error: error.message
            })
        }
    },

    authentication: (req, res) => {
        try {
            const { email, password} = req.body
            
            const existedUser = users.find(user => user.email === email);

            if (!existedUser) {
                return res.status(400).json({
                    message: 'error, email do not exist, please register'
                })
            }

            if(existedUser.password === password) {
                return res.status(200).json({
                    message: 'login succesful',
                    isLoggedIn : true,
                    email,
                    fakeId: 10201
                })
            } else {
                return res.status(400).json({
                    message: 'login failed, please input the correct password'
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'error in authentication route',
                error: error.message
            })
        }
    },

    logout: (req, res) => {
        return res.status(200).json({
            message: 'logout successful',
            isLoggedIn : false
        })
    }
}