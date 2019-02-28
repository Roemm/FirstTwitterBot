// console.log("running")

var Twit = require('twit')

var config = require('./config.js')

var T = new Twit(config);

//ask the user to type in a twitter account she wants to know
//offer options to explore
//1.how many followers/followings she/he/it has
//2. search certein keywords
//3. retweet tweets with certein keywords

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})


readline.question(`Who's account you want to know more about: `, (request) => {
	// console.log(`Hi ${name}!`)
	readline.question('What do you wanna know about this user?' + '\n'
			+ '1. how many followers this user has' + '\n'
			+ '2. search certein keywords' + '\n'
			+ "3. Tweet with this user's profile picture" + '\n', (answer) => {
				// console.log(answer)
	T.get('users/lookup', 
		{screen_name: request},
		function(err, data, response) {	
			if (answer == '1') {
				console.log('This user has ' + data[0].followers_count + 'followers.');
				readline.close()
			}else if (answer == '2') {
				readline.question('What word do you wanna search: ', (word) => {
					T.get('search/tweets',
						{ q: '${word} since:2019-01-01'
						}, 
						function(err, data, response) {
							for (var i = 0; i < data.statuses.length; i++) {
								if (data.statuses[i].screen_name == request) {
									console.log(data.statuses[i].text);
									
								}								
							}
						})
					readline.close()
				})
			}else if (answer == '3') {
				T.post('statuses/update', { 
					status: data[0].profile_image_url
				}, 

				function(err, data, response) {
  					console.log(data)
				})
				readline.close()
			}		
			
		})
	})
})





