import {findCollection, extractModelsData} from "../CRUDs/collectionsCRUD";
import {checkAuth} from "../checkAuth";
import {updateModel} from "../CRUDs/modelCRUD";

const router = require('express').Router();

router.get('/extract', async (req, res) => {
  const data = await extractModelsData(req.query.field, req.query.value, req.query.projection);
  if (data) {
    res.json(data);
  } else {
    res.status(200).send({success: false, message: "No data found"});
  }
});

router.get("/model/screen/", async (req, res, next) => {
  return res.status(200).sendFile(req.query.screenName, {root: 'public/screenshots/'});
});

router.get('/', async (req, res) => {
  let data = [];
  const queries = JSON.parse(req.query['value']);

  if (queries.length > 0) {
    for (let i = 0; i < queries.length; i++) {
      const newdata = await extractModelsData(req.query.type, queries[i]);
      console.log(newdata)
      Array.prototype.push.apply(data, newdata);
    }
  } else { //find all models if query is missed
    data = await extractModelsData();
  }
  res.json(data);
});

module.exports = router;
