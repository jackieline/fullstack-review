const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var github = require('../helpers/github');
var database = require('../database/index');


app.use(express.static(__dirname + '/../client/dist'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json());


app.post('/repos', function (req, res) {
	console.log('post!!!', req.body.username);
	github.getReposByUsername(req.body.username, function (err, results) {
		if (err) {
			console.log('this is a post error', err);
			res.end();
		} else {
			results.forEach(function(repo) {
				database.save(repo)
				// console.log(repo.owner.login);
				// repo.owner.login, repo.name, repo.html_url, repo.stargazers_count
				res.end();
			});
		}
	});
		
	
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // // TODO - your code here!
  // // This route should send back the top 25 repos
  console.log('get request working');
  database.find(function(err, results) {
  	if (err) {
  		console.log('this is a get err', err);
  	} else {
  		res.json(results);
  	}
  });
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

