const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('We\'re connected!');
});

let repoSchema = mongoose.Schema({
  repoId: Number,
  userName: String,
  repoName: String,
  repoUrl: String,
  stars: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (repo) {
  	var repo = new Repo({
	  	repoId: repo.id,
	  	userName: repo.owner.login,
	  	repoName: repo.name,
	  	repoUrl: repo.html_url,
	  	stars: repo.stargazers_count
	  });
  	repo.save(repo);
  }	
}

let find = (callback) => {

	Repo.find().limit(25).sort('-stars')
		.then(results => { 
			return callback(null, results);
			//(results)
			})
		.catch(err => {console.error(err)
			});
  // return callback(Repo.find().limit(25).sort('-stars'));

}


module.exports.save = save;
module.exports.find = find;