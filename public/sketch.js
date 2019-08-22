// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let bpart;
let cpart;
let x= 0;
let y= 0;
let xx;
let yy;
let part;
let pp;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  textSize(32);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  interval = setInterval(sendIt, 3000)
}

function sendIt() {

  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let point = []
    //console.log(pp)
    for (let j = 0; j < pose.keypoints.length; j++) {
      if (pose.keypoints[j].score > 0.2) {
      point.push(pose.keypoints[j])
    }
    }
    //console.log(pose.keypoints.length)
    let keypoint = point[Math.floor(Math.random()*point.length)]
    part = keypoint.part;
    // x= keypoint.position.x;
    // y= keypoint.position.y;
    //console.log(keypoint)
    data = keypoint
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  };

  fetch('/api', options).then(response => {
    let result = response.json()

    //console.log('send:' + options.body)
    // xx= x;
    // yy= y;
    //console.log(part)
    result.then(function(worked) {
    //console.log(worked)
    bpart = worked
    //console.log('return' + bpart)
    cpart = part;
    //pass to function to map comment to the face ...
  })
    //var words = JSON.parse(response)
    //console.log(words)
  });
  // console.log('woo')

  // fetch('https://jsonplaceholder.typicode.com/posts/1')
  //   .then(function(response) {
  //     // The response is a Response instance.
  //     // You parse the data into a useable format using `.json()`
  //     return response.json();
  //   }).then(function(data) {
  //     // `data` is the parsed version of the JSON returned from the above endpoint.
  //     console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
  //   });
}



function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
//  drawSkeleton();
  if (typeof bpart !== 'undefined') {
    textSize(12);
    //console.log('yeah')
    fill(255, 255, 255);
    text(bpart, x, y, 100, 200);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
    //console.log(pose.keypoints.length)
    if (poses[i].pose.keypoints[j].part == cpart) {
    //let keypoint = point[Math.floor(Math.random()*point.length)]
     x= poses[i].pose.keypoints[j].position.x;
     y= poses[i].pose.keypoints[j].position.y;
   }
 }
}
};


    //submitRequest(keypoint)
      // // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      // let keypoint = pose.keypoints[j];
      // // Only draw an ellipse is the pose probability is bigger than 0.2
      // if (keypoint.score > 0.2) {
      //   fill(255, 0, 0);
      //   noStroke();
      //   ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      // }
    //}



// function submitRequest(results) {
//     request = $.ajax({
//         type: "post",
//         url: "/poses",
//         data: JSON.stringify(results),
//         dataType: 'JSON',
//         contentType: 'application/json'
//     });

// send from browser to server

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
