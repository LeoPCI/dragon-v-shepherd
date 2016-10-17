

$(document).ready(function() {

var dragon = $('#dragon')
dragon.rotate(90)

$('button').click(function() {

var ball = $('#ball')
ball.css({top: 300, left: 300})
ball.empty()
ball.append("<img id='dragon' src='dragon.gif'>")

var dragon = $('#dragon')

var clockwize = false
var counterclockwize = false

$(window).keydown(function(x) {
	if (x.which == 37){
		clockwize = true
	}
	else if (x.which == 39){
		counterclockwize = true
	};
});

$(window).keyup(function(x) {
	if (x.which == 37){
		clockwize = false
	}
	else if (x.which == 39){
		counterclockwize = false
	};

});

dragon.rotate(90) //give image an angle

var loop = setInterval(function() {

//movement variables
var tpos = ball.position().top;
var lpos = ball.position().left;

//rotation stuff

angle = parseInt(dragon.getRotateAngle());

turnc = angle + 2
turncc = angle - 2

function rotating() {
if (clockwize==true) {
	dragon.rotate(turncc)
}
else if (counterclockwize==true) {
	dragon.rotate(turnc)
};};



if ((angle >= 0)&&(angle<361)) {
	rotating()
}
else if (angle < 0) {
	dragon.rotate(360+angle)
	rotating()
}
else if (angle > 360) {
	dragon.rotate(angle-360)
	rotating()
};

//direction stuff
var newdown = 0
var newright = 0

if ((angle>=0)&&(angle<91)) {
	var newAngle = angle*0.05
	newdown = -1*(5-newAngle)
	newright = newAngle
}
else if ((angle>90)&&(angle<181)) {
	var newAngle = (angle-90)*0.05
	newdown = newAngle
	newright = 5-newAngle
}
else if ((angle>180)&&(angle<269)) {
	var newAngle = (angle-180)*0.05
	newdown = 5-newAngle
	newright = -1*(newAngle)
}
else if ((angle>0)&&(angle<360)){
	var newAngle = (angle-270)*0.05
	newdown = -1*(newAngle)
	newright = -1*(5-newAngle)
}
else {
	counterclockwize = false
	clockwize = false
};
//position stuff

var isinside = (tpos<539)&&(lpos<1060)&&(tpos>81)&&(lpos>100);

	//position of sheep
var s1t = 70+  415
var s1l = 100+  60
var s2t = 80+  457
var s2l = 100+  200
var s3t = 70+  400
var s3l = 100+  700
var margin = 25

var overlaps1 = (tpos>(s1t-margin))&&(tpos<s1t+margin)&&(lpos>s1l-margin)&&(lpos<s1l+margin);
var overlaps2 = (tpos>s2t-margin)&&(tpos<s2t+margin)&&(lpos>s2l-margin)&&(lpos<s2l+margin);
var overlaps3 = (tpos>s3t-margin)&&(tpos<s3t+margin)&&(lpos>s3l-margin)&&(lpos<s3l+margin);

if (overlaps1) {
	$('#s1').empty()
	$('#s1').append("<img class='sheep' id='si1' src='puddle.png' />")
};
if (overlaps2) {
	$('#s2').empty()
	$('#s2').append("<img class='sheep' id='si2' src='puddle.png' />")
};
if (overlaps3) {
	$('#s3').empty()
	$('#s3').append("<img class='sheep' id='si3' src='puddle.png' />")
};

if (isinside) {
	ball.css({top: (tpos+newdown), left: (lpos+newright)});
}
else {
	ball.empty();
	ball.append("<img id='dragon' src='puddle.png'>")
    clearInterval(loop);
};

}, 30);

});
});