const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//api/post/


router.post('/', async (req, res) => {
  const body = req.body;
  console.log("TEST ROUTE POST")
  console.log(req.body)
  console.log(req.session.userId)

  try {
    const newPost = await Post.create({
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD

      // TODO: SET USERID TO LOGGEDIN USERID
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId


    });
    console.log(newPost)
    res.json(newPost);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {
        id: req.params.id
      }
      
    });
    console.log(affectedRows)

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  console.log("ROUTE HIT DELETE")
  // console.log(req.params.id)
  try {
    const [affectedRows] = Post.destroy({
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {
        id: req.params.id
      }
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
