const express = require('express')
const app = express()
const port = 3000
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 3000, // 5 milliseconds
  max: 1 // limit each IP to 1 requests per windowMs
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//app.use(limiter);
app.use(express.static('public'))
app.use(express.json());

//routing: where we determine how app responds to client requests
// api is our path - when route is matched, handler functions are executed
app.post('/api', (request, response) => {
  //console.log(request.body.part);
  //convert(request.body.part, response.json({userDetails}))
  //response.send('hello')

    // convert(request.body.part, function (err,data) {
    //   if (err) return console.log('err');
    //   //response.send(data)
    //   console.log(data)
    // });

    // https://stackoverflow.com/questions/44415130/how-can-i-send-information-from-nodejs-server-to-client-side#44417148
    // make calls to database and fetch the data
    // have a think about scope!!!
    // use convert & main
    // store in a variable, like so:
    // var dataToSendToClient = {'message': 'error message from server'};

    // convert that data to json

    function string(data) {
       console.log(data)
       var JSONdata = JSON.stringify(data);
       response.send(JSONdata);
    }
convert(request.body.part, main, string)




  //   convert(request.body.part, main(part,function(data) {
  //     var JSONdata = JSON.stringify(data)
  //     console.log(JSONdata)
  //   }
  // ));

// I want to say convert(request.body.part) then pass return value
// to main which should pass return value to a function that
// sends

//convert(request.body.part, main, string)

  //   , function (err, data) {
  //   if(!err){
  //   console.log('ho')
  //   console.log(data)// do something with test
  //   console.log('he')
  // } else {
  //   console.log(err);
  // }
  // });
    // console.log('he')
    // console.log(dataToSendToClient)
      //function(data) {

      //response.send(data)
    //  console.log(data)
    });

   //response.json('Hello')
   //response.end(convert(request.body.part), 'yay')
//});


 //saying server is api we're sending the data to (could call this route anything!)
// (request, response) is a callback, two arguments, request holds all data being sent
// response is how we send stuff back to client
var request = require("request");
var userDetails;

//var part = 'eye';
var size = '50';
//var field = 'body';
var after = '20d';
var before = '1d';
// flip around dates to get different parts of the dataset as limited to max 500
// return results

// app.get('/', (req, res) => res.send('Hello World!'))

function convert(word, callback, othercallback) {
  console.log("word is" + word)
  if (word == 'leftEye') {
    var part = 'eyelid'
    console.log('eyelid')
  } else if (word == 'rightEye') {
    var part = 'eyebags'
    console.log('eyebag')
  } else if (word == 'rightShoulder') {
    var part = 'shoulders'
    console.log('shoulders')
  } else if (word == 'leftShoulder') {
    var part = 'shoulder'
    console.log('shoulder')
  } else if (word == 'rightEar') {
    var part = 'earlobe'
    console.log('earlobe')
  } else if (word == 'leftEar') {
    var part = 'eardrum'
    console.log('eardrum')
  } else {
    var part = 'nostril'
    console.log('nostril')
}
callback(part, othercallback)
};

// function convert(word) {
//   console.log(word)
//   if (word == 'leftEye') {
//     return part = 'eyelid'
//     console.log('eyelid')
//   } else if (word == 'rightEye') {
//     return part = 'eyebags'
//     console.log('eyebag')
//   } else if (word == 'rightShoulder') {
//     return part = 'shoulders'
//     console.log('shoulders')
//   } else if (word == 'leftShoulder') {
//     return part = 'shoulder'
//     console.log('shoulder')
//   } else if (word == 'rightEar') {
//     return part = 'earlobe'
//     console.log('earlobe')
//   } else if (word == 'leftEar') {
//     return part = 'eardrum'
//     console.log('eardrum')
//   } else {
//     return part = 'nostril'
//     console.log('nostril')
// }
// //callback(part)
// };

function initialize(part) {
    // Setting URL and headers for request

    var options = {
        //url: 'https://api.github.com/users/narenaryan',
        //url: 'https://api.pushshift.io/reddit/search/comment/?q=' + part + '/?size=' + size
        url: 'https://api.pushshift.io/reddit/search?size=' + size + '&q=' + part + '&after=' + after //+ '&before=' + before
         // headers: {
         //
         //
         //     'User-Agent': 'request'
         // }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
    	// Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                console.log('error')
                reject(err);
            } else {
                //console.log(resp)
                resolve(JSON.parse(body));

            }
        })
    })

}

function main(part, callback) {
  //  console.log('smack')
    var initializePromise = initialize(part);
    initializePromise.then(function(result) {
        // try .data[0].body - if not it will error
        let len = result.data.length
        if (len == 0) {
        //  console.log('nothing')
        } else {
        //  console.log('we have something')
          num = Math.floor(Math.random() * len);
          //console.log(result.data[num].body)
          //console.log(result.data)
          let body = []
          let sen = []
          let i;
          for (i = 0; i < len; i++) {
            let res = result.data[i].body.split(".");

            let j;
            for (j = 0; j < res.length; j++) {
              if (res[j].includes(part) && res[j].length < 40) {
                //console.log(res[j])
                sen.push(res[j])
              }
              else {}
              //console.log(res[j]) //if string contains part && length is less than
            //body.push(result.data[i].body)
          }

          //console.log(sen[Math.floor(Math.random() * res.length)])
          //  console.log(result.data[i].body)
          }
          //return sen[Math.floor(Math.random() * sen.length)]
        //  console.log('okk')
          //console.log(sen[Math.floor(Math.random() * sen.length)])
          //this.data= sen[Math.floor(Math.random() * sen.length)]

          var data= sen[Math.floor(Math.random() * sen.length)]
          console.log(data)
          callback(data)
          //return this.data;
          //console.log(body.length)
          //loop through all results and push body strings to array
          // ideally extract all body content
          // seperate into sentences
          // find sentences of x characters or less
          // find random one which contains word
        }
        //console.log(result.data.length);
        //console.log(result.data)
        // Use user details from here
        //console.log(userDetails.data[1].body)
    }, function(err) {
        console.log(err);
    })
}

//main();
