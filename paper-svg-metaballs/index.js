// Setup globals
project.currentStyle = {
  fillColor: "#2e2f30"
};
var handle_len_rate = 2.4;
var max_distance = 400;
var debug = false;
var v = 0.5;
var circlePaths = [];
var connections = new Group();

// Setup large static circle
var bigCircle = new Path.Circle({
  center: [260, 300],
  radius: 200
});
bigCircle.selected = debug;
bigCircle.selectedColor = "#ff485e";
circlePaths.push(bigCircle);

// Setup small circle
var smallCircle = new Path.Circle({
  center: [535, 120],
  radius: 80
});
smallCircle.selectedColor = "#ff485e";
smallCircle.selected = debug;
circlePaths.push(smallCircle);

// Setup mousemove handler
function onMouseMove(event) {
  smallCircle.position = event.point;
  generateConnections(circlePaths);
}

// Render first frame
generateConnections(circlePaths);

function generateConnections(paths) {
  // Clear previous connection paths
  connections.children = [];

  for (var i = 0; i < paths.length; i++) {
    for (var j = i - 1; j >= 0; j--) {
      var path = metaball(
        paths[i],
        paths[j],
        v,
        handle_len_rate,
        max_distance,
        debug
      );

      if (path) {
        connections.appendTop(path);
        path.removeOnMove();
      }
    }
  }
}

function metaball(ball1, ball2, v, handle_len_rate, maxDistance, debug) {
  var center1 = ball1.position;
  var center2 = ball2.position;
  var radius1 = ball1.bounds.width / 2;
  var radius2 = ball2.bounds.width / 2;
  var pi2 = Math.PI / 2;
  var d = center1.getDistance(center2);
  var u1, u2;

  // Don't draw metaball if circles are undefined
  if (radius1 == 0 || radius2 == 0) return;

  // Don't draw metaball if circles are too distanct
  if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
    return;
  }

  // Calculate u1 & u2 if circles are overlapping
  else if (d < radius1 + radius2) {
    u1 = Math.acos(
      (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
    );
    u2 = Math.acos(
      (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
    );
  } else {
    u1 = 0;
    u2 = 0;
  }

  var angleBetweenCenters = (center2 - center1).getAngleInRadians();
  var maxSpread = Math.acos((radius1 - radius2) / d);

  // Angles for circle 1's side of trapazoid
  var angle1a = angleBetweenCenters + u1 + (maxSpread - u1) * v;
  var angle1b = angleBetweenCenters - u1 - (maxSpread - u1) * v;

  // Angles for circle 2's side of trapazoid
  var angle2a =
    angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
  var angle2b =
    angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

  // Convert angles → vectors to produce trapazoid's cartesian bounds
  var p1a = center1 + getVector(angle1a, radius1);
  var p1b = center1 + getVector(angle1b, radius1);
  var p2a = center2 + getVector(angle2a, radius2);
  var p2b = center2 + getVector(angle2b, radius2);

  // Define handle length by the distance between both ends of the curve to draw
  var totalRadius = radius1 + radius2;
  var d2 = Math.min(v * handle_len_rate, (p1a - p2a).length / totalRadius);

  // Hiroyuki's sauce from the orginal algorithm
  // "Handle overlapping circles"
  d2 *= Math.min(1, (d * 2) / (radius1 + radius2));

  // Apply handle length scalar
  radius1 *= d2;
  radius2 *= d2;

  var trapazoid = new Path({
    segments: [p1a, p2a, p2b, p1b],
    closed: true
  });

  trapazoid.fullySelected = debug;
  var segments = trapazoid.segments;

  // Set curves of trapazoid to produce metaball shape
  segments[0].handleOut = getVector(angle1a - pi2, radius1);
  segments[1].handleIn = getVector(angle2a + pi2, radius2);
  segments[2].handleOut = getVector(angle2b - pi2, radius2);
  segments[3].handleIn = getVector(angle1b + pi2, radius1);

  return trapazoid;
}

function getVector(radians, length) {
  return new Point({
    // Convert radians to degrees
    angle: (radians * 180) / Math.PI,
    length: length
  });
}
