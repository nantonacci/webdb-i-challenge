const express = require("express");

const db = require("./data/dbConfig.js");
const router = express.Router();

// get
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({ message: "Problems with database" });
    });
});

// get by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.select("*")
    .from("accounts")
    .where({ id })
    .then(account => {
      if (account[0]) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Problems with database" });
    });
});

// post
router.post("/", (req, res) => {
  const accountData = req.body;

  db.insert(accountData)
    .into("accounts")
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({ message: "error with database" });
    });
});

// put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "database problems" });
    });
});

// delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ deleted: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "database error" });
    });

  // try {
  //     const count = await db.del().from('posts').where({id});
  //     count ? res.status(200).json({deleted:count}) : res.status(404).json({message:
  // 'invalid id'});
  // } catch (err ) {
  //     res.status(500).json({message:'database error'})
  // }
});

module.exports = router;
