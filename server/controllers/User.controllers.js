const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");


class UserController {
  async register(req, res) {
    const { name, email, password, student } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email already exists' })

      const salt = await bcrypt.genSalt(10);
      if (!salt) return res.status(400).json({ msg: 'Server problem:bcrypt' })

      const hash = await bcrypt.hash(password, salt);
      if (!hash) return res.status(400).json({ msg: 'Server problem:hash' })

      const newUser = new User({
        name,
        email,
        password: hash,
        student
      });

      const savedUser = await newUser.save();
      if (!savedUser) return res.status(400).json({ msg: 'User logged out' })

      const token = jwt.sign({ id: savedUser._id }, secret, {
        expiresIn: 3600
      });

      res.status(200).json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          student: savedUser.student
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User does not exists' })

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credientials' })

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: 3600 });
      if (!token) return res.status(400).json({ msg: 'Not able to sign token' })

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          student: user.student
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  getAll(req, res){
    User.find({})
        .select('-password')
        .then(user => res.json(user))
        .catch(err => res.json(err));
  }
  getOne(req, res){
    User.find({_id: req.params._id})
        .select('-password')
        .then(user => res.json(user))
        .catch(err => res.json(err));
  }

  delete(req, res){
    User.findOneAndDelete({_id: req.params._id})
        .then(() => res.json({msg: "Deleted "}))
        .catch(err => res.json(err));
  }

  update(req, res){
    User.findOneAndUpdate({_id: req.params._id}, req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
  }
}

module.exports = new UserController();