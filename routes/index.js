var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var config = require("../config");
var reactWrapper = require("./reactWrapper");
var serverRender = require("../templates/supporting/rendering").serverRender;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(config.routes.post, function(req, res, next) {
  let content = reactWrapper.single(req.params.slug, fetch).then(({result, cache}) => { 
    return {domString: serverRender(result), cache};
  });
  content.then(({domString, cache}) => {
    res.render('index', {
      title: "reactpress", 
      content: domString,
      cache: JSON.stringify(cache)
    });
  }).catch((error) => {throw error;});
});

module.exports = router;
