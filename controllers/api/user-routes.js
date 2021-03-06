const router = require('express').Router();
const { User } = require('../../models');

// URL: /api/user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      
      password: req.body.password
      
      // TODO: SET USERNAME TO USERNAME SENT IN REQUEST

      // TOD: SET PASSWORD TO PASSWORD SENT IN REQUEST

    });
    
    console.log(newUser)
    console.log(newUser.username)
    console.log(newUser.password)
   

    req.session.save(() => {
      // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE

      // TODO: SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE

      // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION
      req.session.userId = newUser.id
      console.log(req.session.userId)
      console.log(newUser.id)
      req.session.username = newUser.username
      console.log(req.session.username)
      console.log(newUser.username)
      req.session.loggedIn = true;


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
      // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE

      // TODO: SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE

      // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION

      req.session.userId= user.id;
      req.session.username= user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
      console.log("succesfully logged in")
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
