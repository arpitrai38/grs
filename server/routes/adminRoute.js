const express = require('express')
const routes = express.Router()
const Admin = require('../models/Admin')

// admin register code
routes.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        
        // check admin exist or not
        const isExist = await Admin.countDocuments()
        if (isExist > 0) {
            return res.json({ msg: 'Admin already registered' })
        }

        // check email uniqueness
        const user = await Admin.findOne({ email })
        if (user) {
            return res.json({ msg: 'Admin already registered' })
        }

        const admin = new Admin(req.body)
        await admin.save()

        res.json({ msg: 'Admin registered successfully' })
    } catch (error) {
        console.log(error);
        res.json({"msg":"Admin Not Register Successfully"})
        }
})

module.exports = routes


