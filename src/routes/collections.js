import {findCollection, extractModelsData} from "../CRUDs/collectionsCRUD";
import {checkAuth} from "../checkAuth";
import {updateModel} from "../CRUDs/modelCRUD";

const router = require('express').Router();


router.get('/authors', (req, res) => {
  /*  authorModel.getAuthorList()
      .then((data) => {
        res.json(data)
      })
      .catch(err => {
        res.status(400).send("unable to get from database" + err);
      });*/
});

router.delete('/author', (req, res) => {
  /*  authorModel.deleteModel(req)
      .then(item => {
        res.send("Author is deleted");
      })
      .catch(err => {
        res.status(400).send("unable to delete from database");
      });*/
});

router.get('/extract/:field', async (req, res) => {
  const data = await extractModelsData(req.params.field);
  if (data) {
    res.json(data);
  } else {
    res.status(200).send({success: false, message: "No data found"});
  }
});

router.get("/model/screen/",  async (req, res, next) => {
  console.log("URL" );
  console.log(req.url);
  console.log( "req.query");
  console.log( req.query);

  return res.status(200).sendFile( req.query.screenName, {root: 'public/screenshots/'});
});

router.get('/', async (req, res) => {
  let data = [];
  const queries = JSON.parse(req.query['value']);

  if (queries.length > 0) {
    for (let i = 0; i < queries.length; i++) {
      const newdata = await findCollection(req.query.type, queries[i]);
      console.log(newdata)
      Array.prototype.push.apply(data, newdata);
    }
  } else { //find all models if query is missed
    data = await findCollection();
  }
  res.json(data);
});

module.exports = router;
