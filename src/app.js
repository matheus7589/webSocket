var express = require('express')
, app = express()
, bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();
 // Socket

 
app.use('/api', router);
router.route('/notificar')
	.post(function(req, res){
		res.json({message: "success"})
	});
	
router.route('/teste')
.get(function(req, res){
	res.json({message: "success"})
});


module.exports = app;