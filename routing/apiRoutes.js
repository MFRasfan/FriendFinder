// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on Friends-List.
// ===============================================================================

var friendArray = require('../app/data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/friends', function (req, res) {
    res.json(friendArray);
});

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // Then the server saves the data to the Freind array)
  // ---------------------------------------------------------------------------

  app.post('/api/friends', function (req, res) {   
    
        //Grabs the new friend's scores to compare with friends in friendArray array
        var newUser = req.body.scores;
        var scoreArray = [];
        var bestMatch = 0;

        for (var i = 0; i < friendArray.length; i++) {
            var Diff = 0;
            //Run through scores to compare friends
            for (var j = 0; j < newUser.length; j++) {
                Diff += (Math.abs(parseInt(friendArray[i].scores[j]) - parseInt(newUser[j])));
            }

            scoreArray.push(Diff);
        }

        //After all friends are compared, find best match
        for (var i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] <= scoreArray[bestMatch]) {
                bestMatch = i;
            }
        }
        var freinds = friendArray[bestMatch];
        res.json(freinds);

        //Pushes new submission into the friends array
        friendArray.push(req.body);
  });

}