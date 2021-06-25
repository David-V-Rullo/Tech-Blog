const router = require('express').Router();
const { User } = require('../../models');

// URL: /api/user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      //Use req.body to populate the database with new user
      username: req.body.username,
      password: req.body.password
   
    });

    req.session.save(() => {
      //Save new user information into session
      req.session.user_id = newUser.user_id
      req.session.username = newUser.username
      req.session.loggedIn = true
        res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// URL: /api/user/login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      //Pass the logging in user's info to session
      req.session.userId = user.userId
      req.session.username = user.username
      req.session.loggedIn = true
     
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
