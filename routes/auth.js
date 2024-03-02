const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    //use findone object to get specific data
    const user = await User.findOne({ email: req.body.email });

    //if user not found
    if (!user) return res.status(401).send({ message: "User not found" });

    //validate password
    const validateUser = req.body.password === user.password;
    if (!validateUser)
      return res.status(401).send({ message: "Invalid password" });

    //if user found
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
});



router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    //insert data using save()
    const result_data = await user.save();

    res.status(200).json(result_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
