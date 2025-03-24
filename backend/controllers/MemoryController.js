const Memory = require("../models/Memory");

const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = `images/${req.file.filename}`;

    if (!title || !description) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });

    await newMemory.save();
    res.json({ msg: "Memory created successfully!", newMemory });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There was an error!");
  }
};

module.exports = {
  createMemory,
};
