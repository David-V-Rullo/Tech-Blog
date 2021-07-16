const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', async (req, res) => {
  console.log({...req.body})
  try {
    const newComment = await Comment.create({
      // TODO: COMMENT BODY IN REQUEST USING SPREAD
      
      ...req.body,
      userId: req.session.userId

      // TODO: SET USERID TO SESSION LOGGEDIN USERID
      

    });
    console.log(newComment)
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
