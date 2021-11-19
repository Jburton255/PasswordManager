//Global Variables 
var manual_state = 0;
var countDownDateTime = 0;
var sBtn_state = 0; // For the start/pause/reset button
var countdownmSeconds;
var x;
//DOM of page ready
$(document).ready(function() {
	//Alarm Audio file
	var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '../sounds/ocean-wave-1.mp3');

	//Click event for snooze button
	$("#btnSnooze").click(function () {
		//Pause the alarm audio 
		audioElement.pause();
		//Add 10 secs. to countdown
		countdownmSeconds += 10000; //*** Adds to current countdown
		// Reset all fields values
		$("#days").val(0);
		$("#hours").val(0);
		$("#minutes").val(0);
		$("#seconds").val(10);
		$("#mSeconds").val(0); 

		// Update the count down every 1 mSecond
		x = setInterval(function() {
			countdownmSeconds -= 10; 

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(countdownmSeconds / (1000 * 60 * 60 * 24));
			var hours = Math.floor((countdownmSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((countdownmSeconds % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.ceil((countdownmSeconds % (1000 * 60)) / 1000);
			var mSeconds = Math.floor((countdownmSeconds % (1000)));

			// Output the result in an correct fields
			$("#days").val(days);
			$("#hours").val(hours);
			$("#minutes").val(minutes);
			$("#seconds").val(seconds);
			$("#mSeconds").val(mSeconds);

			// If the count down is over, sound alarm update text
			if (countdownmSeconds < 0) {
				// Reset all fields values
				$("#days").val(0);
				$("#hours").val(0);
				$("#minutes").val(0);
				$("#seconds").val(0);
				$("#mSeconds").val(0);
				//Update the count to stop
				clearInterval(x);
				//Change Start button text to Quiet
				$("#btnStart").html("Quiet");
				//Play alarm audio
				audioElement.play(); 
				//Update start button state expired(3)
				sBtn_state = 3;
				return;
			}
			//Snooze adds ten secs and counts down by 1 sec**** 
		}, 1000);  
	})

	//Click event for Reset button
	$("#btnReset").click(function() {
		//Reloads the page
		location.reload();
	})

	//Event handler for manual input in display fields
	$(".manual").focusin(function(){
		//Clicked in display/input field color is changed 
		$(".manual").css("background-color", "#FFFFCC");
		//Update manual state to 1
		manual_state = 1;
		// Reset all fields values
		$("#days").val(0);
		$("#hours").val(0);
		$("#minutes").val(0);
		$("#seconds").val(0);
		$("#mSeconds").val(0);
	});

	//Event handler for clicking out of manual input/display fields
	$(".manual").focusout(function(){
		//Fields in display/input color is changed back
		$(".manual").css("background-color", "#FFFFFF");
	});

	//Click event for Set date/time button
	$("#btnSet").click(function() {
		//Set target countdown Date & Time for calculation
		var countDownDate = $("#datePicker").val();
		var countDownTime = $("#timePicker").val();
		countDownDateTime = new Date(countDownDate+" "+countDownTime);
		//Get current Date/Time
		var now = new Date();
		//Calculate difference between Set time and current time
		var diff = (countDownDateTime - now); 
		$("#days").val(Math.floor(diff / (1000 * 60 * 60 * 24)));
		$("#hours").val(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
		$("#minutes").val(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
		$("#seconds").val(Math.ceil((diff % (1000 * 60)) / 1000));
	})

	//Click event for Start button 
	$("#btnStart").click(function(){
		//Update start button state start(0)  
		if (sBtn_state == 0) { 
			//Update start button state to 1 change text to pause(1)
			sBtn_state = sBtn_state + 1;
			$("#btnStart").html("Pause");
			//Update manual state to 1 
			if (manual_state == 1) {
				// Get user defined dates and times
				countdownmSeconds= $("#days").val()*(1000*60*60*24) +  
				$("#hours").val()*(1000*60*60) +
				$("#minutes").val()*(1000*60) +
				$("#seconds").val()*1000;
				//update the manual state 0
				manual_state = 0;
			} else  { 
				//Recalculate the elapsed time using new now()
				var now = new Date();
				countdownmSeconds = (countDownDateTime - now); 
			}
			//Countdown is not set or in past
			if (countdownmSeconds <= 0) {
				//Start button text to Start
				$("#btnStart").html("Start");
				//Update start button state start(0)
				sBtn_state = 0;
				return; // Do nothing
			}
			//Update the count down every 10 msecond
			x = setInterval(function() {
					countdownmSeconds -= 10; 

					//Time calculations for days, hours, minutes and seconds
					var days = Math.floor(countdownmSeconds / (1000 * 60 * 60 * 24));
					var hours = Math.floor((countdownmSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((countdownmSeconds % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.ceil((countdownmSeconds % (1000 * 60)) / 1000);
					var mSeconds = Math.floor((countdownmSeconds % (1000)));

					//Output the result in an correct fields
					$("#days").val(days);
					$("#hours").val(hours);
					$("#minutes").val(minutes);
					$("#seconds").val(seconds);
					$("#mSeconds").val(mSeconds);
					//Countdown is over, report and ring
					if (countdownmSeconds < 0) {
						$("#days").val(0);
						$("#hours").val(0);
						$("#minutes").val(0);
						$("#seconds").val(0);
						$("#mSeconds").val(0);
						clearInterval(x);
						$("#btnStart").html("Quiet");
						audioElement.play(); 
						//Update start button state expired(3)
						sBtn_state = 3;
						return;
					}
				}, 10);
				//Update start button state pause(1)
		} else  if (sBtn_state == 1) { 
			//Update start button state resume(2)
			sBtn_state = 2;
			audioElement.pause();
			//Stop count
			clearInterval(x); 
			//Set start button text to Resume
			$("#btnStart").html("Resume");
			//Update start button state resume(2)
		} else if (sBtn_state == 2 ) { 
			//Update start button state pause(1)
			sBtn_state = 1;
			//Update start button text to Pause
			$("#btnStart").html("Pause");
			//Set to countdown every second 
			x = setInterval(function() {
					countdownmSeconds -= 10; 

					// Time calculations for days, hours, minutes and seconds
					var days = Math.floor(countdownmSeconds / (1000 * 60 * 60 * 24));
					var hours = Math.floor((countdownmSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((countdownmSeconds % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.ceil((countdownmSeconds % (1000 * 60)) / 1000);
					var mSeconds = Math.floor((countdownmSeconds % (1000)));

					// Output the result in an correct fields
					$("#days").val(days);
					$("#hours").val(hours);
					$("#minutes").val(minutes);
					$("#seconds").val(seconds);
					$("#mSeconds").val(mSeconds);
					// If the count down is over, sound alarm stop count
					if (countdownmSeconds < 0) {
						$("#days").val(0); 
						$("#hours").val(0);
						$("#minutes").val(0);
						$("#seconds").val(0);
						$("#mSeconds").val(0);
						clearInterval(x);
						//Set start button text to Quiet
						$("#btnStart").html("Quiet");
						audioElement.play();
						//Update start button state expired(3)
						sBtn_state = 3;
						return;
					}
				}, 10);
				//Update start button state expired(3) Stop Alarm
		} else if (sBtn_state == 3) { 
			//Pause audio
			audioElement.pause();
			//Update start button state start(0)
			sBtn_state = 0;
			clearInterval(x);
			//Set start button text to Start
			$("#btnStart").html("Start");
		}
	})
})