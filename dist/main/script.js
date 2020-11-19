var database;
var ref;
var scores;
var x;

var firebaseConfig = {
    apiKey: "AIzaSyC9QeEJYhYOaBwQibABgHH_COqqYQmc5Io",
    authDomain: "quizbar-57d1b.firebaseapp.com",
    databaseURL: "https://quizbar-57d1b.firebaseio.com",
    projectId: "quizbar-57d1b",
    storageBucket: "quizbar-57d1b.appspot.com",
    messagingSenderId: "340698618557",
    appId: "1:340698618557:web:e5f5be32bf21df7eb235d4"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();
updateQuestion();

function onload() {
	colorAnswers();
}

function colorAnswers() {
	colors = ["#618985","#BCB6FF","#f2e3bc","#c19875", "#9BC53D","#764248","#716A5C","#bf0603", "#5DB7DE", "#fffd82", "#F7B1AB", "#e84855", "#CC5A71", "#CB904D"]
	for (var i = 1; i < 15; i++) {
		var id = "answer" + i.toString();
		document.getElementById(id).style.backgroundColor = colors[i - 1];
	}
}

function submit(obj) {
	ref = database.ref("counters");
	var firedButton = obj.value;
	ref.child(firedButton).set(firebase.database.ServerValue.increment(1));
	disableButtonActivation(true);
}

function updateQuestion() {
	ref = database.ref('questions');
	ref.on('value', function (snap) {
		var qsObj = snap.val();
		var h = document.getElementById("question-h");
		var qsleft = Object.keys(qsObj).length - 1 - qsObj.questionCounter;

		if (qsleft > 0) {
			var qpos = "q" + qsObj.questionCounter.toString();
			h.innerHTML = eval("qsObj." + qpos);
			disableButtonActivation(false);
			clearInterval(x);
			timer(30);	
		} else {
			h.innerHTML = "No question here";
			clearInterval(x);
			var timerP = document.getElementById("timer");
			timerP.innerHTML = "Timer Stopped";
		}
	}, function (e) {
		alert("Error" + e);
	})
}

function disableButtonActivation(temp) {
	for (var i = 1; i < 15; i++) {
		var b = document.getElementById("answer" + i.toString())
		b.disabled = temp;
	}
}

function timer(t) {
	var c = t + 1;
	var timerP = document.getElementById("timer");
	x = setInterval(function () {
		c = c - 1
		timerP.innerHTML = c.toString();
		if (c == 0) {
			clearInterval(x);
			timerP.innerHTML = "TIME UP";
			disableButtonActivation(true);
		}
	}, 1000)
}


