
var dragon = $("#dragon")
var ball = $('#ball')
var spear = $('#nothing')
var clockwize = false
var counterclockwize = false
var a = 'yes'
var points = 0
var margin = 15
var dead = false
var go = false
var left = false
var right = false
var spearball = $('#spearball')
var okay = true
var killedd = false

$(document).ready(function() {

$('#spearball').css({top: (500), left: (500)}); //practice

var restart = function() {  //restart beginning
$('#spear').rotate(0)
point1=0
point2=0
point3=0
point4=0
point5=0
var killedd = false
$('.sheep').attr('src', 'sheep.png'); //repair sheep
ball.css({top: 300, left: 300})
dragon.rotate(90);
if (a=='yes') {
	a='no'
}
else if (a=='no') {
	a='yes'
	$('#points').empty()
};
}; //end of restart

restart()

$('button').click(function(){ //when button is clicked

ball.empty()
ball.append("<img id='dragon' src='dragon.gif'>")
var dragon = $("#dragon")
restart()

$(window).keydown(function(x) {
	if (x.which == 37){
		clockwize = true
	}
	else if (x.which == 39){
		counterclockwize = true
	}
	else if (x.which == 65){
		left = true
	}
	else if (x.which == 68){
		right = true
	}
	else if (x.which == 83){
		go = true
	};
});

$(window).keydown(function(x) {
	if (x.which == 65){
		left = true
	}
	else if (x.which == 68){
		right = true
	}
	else if (x.which == 83){
		go = true
	};
});

$(window).keyup(function(x) {
	if (x.which == 37){
		clockwize = false
	}
	else if (x.which == 65){
		left = false
	}
	else if (x.which == 68){
		right = false
	}
	else if (x.which == 39){
		counterclockwize = false
	};

});

dragon.rotate(90); //give image an angle

var loop = setInterval(function() { //interval start
if (a=='yes') {
	$('button').html('RESTART')
}
if (a=='no') {
/*clearInterval(loop);
ball.empty()
ball.append("<img id='dragon' src='dragon.png'>")
$("#dragon").rotate(90);*/
location.reload();
}
//movement variables
var tpos = ball.position().top;
var lpos = ball.position().left;

//rotation stuff

angle = parseInt(dragon.getRotateAngle());

turnc = angle + 3
turncc = angle - 3

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
var s2t = 80+  437
var s2l = 100+  220
var s3t = 70+  400
var s3l = 100+  500
var s4t = 70+  437
var s4l = 100+  700
var s5t = 70+  420
var s5l = 100+  800

var overlaps1 = (tpos>s1t-margin)&&(tpos<s1t+margin)&&(lpos>s1l-margin)&&(lpos<s1l+margin);
var overlaps2 = (tpos>s2t-margin)&&(tpos<s2t+margin)&&(lpos>s2l-margin)&&(lpos<s2l+margin);
var overlaps3 = (tpos>s3t-margin)&&(tpos<s3t+margin)&&(lpos>s3l-margin)&&(lpos<s3l+margin);
var overlaps4 = (tpos>s4t-margin)&&(tpos<s4t+margin)&&(lpos>s4l-margin)&&(lpos<s4l+margin);
var overlaps5 = (tpos>s5t-margin)&&(tpos<s5t+margin)&&(lpos>s5l-margin)&&(lpos<s5l+margin);

if (overlaps1) {
	$('#s1').empty()
	$('#s1').append("<img class='sheep' id='si1' src='puddle.png' />")
	point1=1
};
if (overlaps2) {
	$('#s2').empty()
	$('#s2').append("<img class='sheep' id='si2' src='puddle.png' />")
	point2=1
};
if (overlaps3) {
	$('#s3').empty()
	$('#s3').append("<img class='sheep' id='si3' src='puddle.png' />")
	point3=1
};
if (overlaps4) {
	$('#s4').empty()
	$('#s4').append("<img class='sheep' id='si4' src='puddle.png' />")
	point4=1
};
if (overlaps5) {
	$('#s5').empty()
	$('#s5').append("<img class='sheep' id='si5' src='puddle.png' />")
	point5=1
};

if (isinside) {
	ball.css({top: (tpos+newdown), left: (lpos+newright)});
}
else {
	ball.empty();
	ball.append("<img id='dragon' src='puddle.png'>")
    clearInterval(loop);
    $('#points').html('<p>OUCH!</p>')
};

if (killedd) {clearInterval(loop);};

if ((point1==1) || (point2==1) || (point3==1) || (point4==1) || (point5==1)) {
	var points = point1+point2+point3+point4+point5
	$('#points').empty()
	$('#points').html('<p>'+points+'</p>')
};

if (points>4) {
	$('#points').html('<p>CONGRATULATIONS DRAGON!!! <br> You ate all the sheep and your tummy is full!</p>')
	clearInterval(loop);
	dragon.css({height: 200, width: 200})
	dragon.css({top: -200, left: -90})
	dragon.rotate(90)
	dead=false
	var x = true
	killedd = true
};
}, 30);
//begin shephard___________________________________________

var newdown2 = 0
var newright2 = 0

var shoot = function() {
var loop = setInterval(function() {

var spear = $('#spear')
var angle2 = parseInt(spear.getRotateAngle());

var st = parseInt(spearball.position().top)
var sl = parseInt(spearball.position().left)
var bt = parseInt(ball.position().top)
var bl = parseInt(ball.position().left)

if ((angle2>=0)&&(angle2<91)) {
	var newAngle = angle2*0.1
	newdown2 = (-1*(10-newAngle))
	newright2 = newAngle
}
else if ((angle2>270)&&(angle2<360)){
	var newAngle = (angle2-270)*0.10
	newdown2 = -1*(newAngle)
	newright2 = -1*(10-newAngle)
};

if ((left)&&(okay==true)) {spear.rotate(angle2-1)}
else if ((right)&&(okay==true)) {spear.rotate(angle2+1)};

if (go) {
	$('#spearball').css({top: (st+newdown2), left: (sl+newright2)});
};

//correcting for unidentifiable rotation angles
if (angle2 < 0) {
	spear.rotate(360+angle2)
}
else if (angle2 > 360) {
	spear.rotate(angle2-360)
};
if ((angle2>90)&&(angle2<120)) {
	spear.rotate(90)
}
else if ((angle2>120)&&(angle2<270)) {
	spear.rotate(270)
};

var overlapping = ((st>bt-margin)&&(st<bt+margin)&&(sl>bl-margin)&&(sl<bl+margin));

var isInside2 = (st<539)&&(sl<1060)&&(st>81)&&(sl>100);
if (isInside2==false) {
	go=false
	spearball.css({top: 500, left: 500})
	okay=true
};

if (overlapping) {
	dead=true
	spearball.css({top: 500, left: 500})
};

/*if (st!=500||sl!=500) {
	okay=false
};*/

if (dead) {
	ball.empty();
	ball.append("<img id='dragon' src='puddle.png'>")
	clearInterval(loop);
	dead=false
	var x = true
	killedd = true
	$('#spoints').html('<p>CONGRATULATIONS SHEPHERD!!! <br> You fended off the dragon <br> and your sheep are safe!</p>')
};

}, 20)};

shoot()

//end shephard

 }) });
