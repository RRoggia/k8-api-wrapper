const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.HTTP_PORT || 3001
const { listPods } = require('./service')

app.use(cors())

app.get('/healthy', (req, res) => res.send({ status: 200 }))

app.get('/listPods', async (req, res) => {
    try {
        res.status(200)
        res.send(await listPods())
    } catch (error) {
        console.error(error)
        res.status(500)
        res.send({
            error: "Internal error - check the logs"
        })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
