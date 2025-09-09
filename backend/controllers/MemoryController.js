const Memory = require("../models/Memory")

const fs = require("fs")

const removeOldImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Image deleted from server!")
        }
    })
}

const createMemory = async (req, res) => {
    try {
        const { title, description } = req.body
        
        const src = `images/${req.file.filename}`

        if (!title || !description) {
            return res.status(400).json({msg: "Please, fill in all fields."})
        }

        const newMemory = new Memory({
            title, src, description
        })

        await newMemory.save()

        res.json({ msg: "Memory created successfully", newMemory })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("There was an error!")
    }
}

const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find()

        res.json(memories)
    } catch (error) {
        res.status(500).send("There was an error!")
    }
}

const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id)

        if (!memory) {
            return res.status(404).json({ msg: "Memory not found!" })
        }

        res.json(memory)
    } catch (error) {
        res.status(500).send("There was an error!")
    }
}

const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id)

        if (!memory) {
            return res.status(404).json({ msg: "Memory not found!" })
        }

        removeOldImage(memory)

        res.json({msg: "Memory deleted"})
    } catch (error) {
        res.status(500).send("There was an error!")
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
}