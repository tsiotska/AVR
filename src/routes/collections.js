const router = require('express').Router();
import * as authorModel from '../CRUDs/modelCRUD';

router.get('/authors', (req, res) => {
  authorModel.getAuthorList()
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.status(400).send("unable to get from database" + err);
    });
});

router.post('/author', (req, res) => {
  authorModel.createModel(req)
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.delete('/author', (req, res) => {
  authorModel.deleteModel(req)
    .then(item => {
      res.send("Author is deleted");
    })
    .catch(err => {
      res.status(400).send("unable to delete from database");
    });
});

module.exports = router;
