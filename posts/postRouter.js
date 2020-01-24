const express = require('express');
const Posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({message: "error retrieving the posts"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.post.id)
    .then(post => {
      res.status(200).json({message: "The post has been removed"})
    })
    .catch(err => {
      res.status(500).json({message: "Error removing the post", err})
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.post.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      res.status(500).json({message: "Error updating the post"})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Posts.getById(id)
    .then(post => {
      if(post) {
        req.post=post
        next();
      }
      else {
        res.status(404).json({message: "ID does not exist"})
      }
    })
    .catch(err=> {
      res.status(500).json({message: "Exception", err})
    })
}

module.exports = router;
