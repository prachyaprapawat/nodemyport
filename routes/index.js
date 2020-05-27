var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
var Project = require('../model/project');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pang');
  // res.send("hello")
});

router.get('/1', function (req, res, next) {
  Project.getPost(
    function (err, project) {
      console.log(project)
      res.render('port', { project: project });
    })

});


router.get('/add', async (req, res, next) => {
  await res.render('addproject');
});


var _img = [];
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname + '/../uploads'));
  },
  filename: (request, file, callback) => {
    _img.push(file.originalname);
    console.log(file.originalname);
    callback(null, file.originalname)
  }
});
const upload = multer({ storage: storage })






router.post('/test', upload.any(), function (req, res, next) {
  const {
    project,
    tag,
    link
  } = req.body;

  console.log("test :" + project)
  console.log(req.body)
  var info = {}
  info.project = project
  info.picturename = _img[0]
  info.tag = tag
  info.link = link
  var newPost = new Project(info);
  newPost.save(Project)
  res.send(info)
  _img = []
})





router.post('/addproject', upload.any(), function (req, res, next) {
  console.log(_img)
  const {
    project,
    picturename,
    tag
  } = req.body;
  console.log("InventoryName: " + name)
  var info = {}
  info.name = name
  info.donate_id = donate_id
  info.product_id = product_id
  info.status = status
  info.status_detail = status_detail
  info.images1 = _img
  var newPost = new Inventory(info);
  newPost.save(Inventory)
  res.send(newPost)
  // res.redirect('/users/add');
  _img = []

});










module.exports = router;
