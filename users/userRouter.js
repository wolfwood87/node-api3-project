const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "Error adding the User"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  console.log(req.body)
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({message: "Error adding the post"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "error retrieving the users."})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({message: "error retrieving the posts."})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
    .then(user => {
      res.status(200).json({message: "The user has been removed"})
    })
    .catch(err => {
      res.status(500).json({message: "Error removing the user", err})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.user.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      res.status(500).json({message: "Error updating the user"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if(user) {
        req.user=user
        next();
      }
      else {
        res.status(404).json({message: "ID does not exist"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "Exception", err})
    })
  // do your magic!
}

function validateUser(req, res, next) {
  const newUser = req.body;

  if(newUser) {
    if(newUser.name) {
      next();
    }
    else {
      res.status(400).json({message: "missing required name field"})
    }
  }
  else {
    res.status(400).json({message: "missing user data"})
  }
  // do your magic!
}

function validatePost(req, res, next) {
  const newPost = req.body

  if(newPost) {
    if(newPost.text) {
      next();
    }
    else {
      res.status(400).json({message: "missing required text field"})
    }
  }
  else {
    res.status(400).json({message: "missing post data"})
  }
  // do your magic!
}

module.exports = router;
