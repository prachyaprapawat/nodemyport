var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
var Project = require('../model/project');


//  function add picture
var _img = [];
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname + '/../public/uploads'));
  },
  filename: (request, file, callback) => {
    _img.push(file.originalname);
    console.log(file.originalname);
    callback(null, file.originalname)
  }
});
const upload = multer({ storage: storage })


//  render main page
router.get('/', function (req, res, next) {
  Project.getPost(
    function (err, project) {
      console.log(project)
      res.render('port', { project: project });
    })

});

// render addproject page
router.get('/add', async (req, res, next) => {
  await res.render('addproject');
});




// api add project
router.post('/addproject', upload.any(), function (req, res, next) {
  const {
    project,
    tag,
    link,
    password
  } = req.body;

  if (password === "23859") {
    console.log("test :" + project)
    console.log(req.body)
    var info = {}
    info.project = project
    info.picturename = _img[0]
    info.tag = tag
    info.link = link
    var newPost = new Project(info);
    newPost.save(Project)
    console.log(info)
    res.render("addproject")
    _img = []
  }
  res.render("addproject",{error: "Your password is wrong"})

})



module.exports = router;
