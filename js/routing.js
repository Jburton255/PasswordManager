var RegState = 0;

$(document).ready(function() {
	$.ajax({
	  type: 'POST', 
	  url: 'php/readRegState.php',
	  async: false,
	  dataType: 'json',   
	  encode: true		
	}).always(function(data) {	
		// log data to the console so we can see    
		console.log(data);
		RegState = parseInt(data.RegState);
		//$("#Message").html(data.ErrorMsg);
	});
	// RegState should be defined here
	if (RegState <= 0) {
		$("#loginForm").show();
		$("#registerForm").hide();
		$("#setPasswordForm").hide();
		$("#resetPasswordForm").hide();
		$("#resumeForm").hide();
	}
	if (RegState == 1) {
		$("#loginForm").hide();
		$("#registerForm").show();
		$("#setPasswordForm").hide();
		$("#resetPasswordForm").hide();
		$("#resumeForm").hide();
	}
	if (RegState == 3) {
		$("#loginForm").hide();
		$("#registerForm").hide();
		$("#setPasswordForm").show();
		$("#resetPasswordForm").hide();
		$("#resumeForm").hide();
	}
	if (RegState == 5) {
		$("#loginForm").hide();
		$("#registerForm").hide();
		$("#setPasswordForm").hide();
		$("#resetPasswordForm").show();
		$("#resumeForm").hide();
	}
	if (RegState == 4) {
		$("#loginForm").hide();
		$("#registerForm").hide();
		$("#setPasswordForm").hide();
		$("#resetPasswordForm").hide();
		$("#resumeForm").show();
	}

    // Ajax Calls
    $("#registerSubmit").click(function(e) {    // Register Btn Get Acode
        e.preventDefault();
        //XML
        var formData = {
            'FirstName' : $('input[name=FirstName]').val(),
            'LastName' : $('input[name=LastName]').val(),
            'Email' : $('input[name=Email]').val(),
        };
        $.ajax({
            type: 'GET',
            url: 'php/register.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#registerMessage").html(data.ErrorMsg);
        });
    
    })
    $("#register0Btn").click(function(e) {      // Register Btn  
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/register0.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").hide();
            $("#registerForm").show();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
        });
    })
    $("#resetPassword0Btn").click(function(e) {  // Forgot Btn
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/resetPassword0.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").hide();
            $("#loginMessage").html(data.ErrorMsg);
            $("#registerForm").hide();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").show();
            $("#resumeForm").hide();
        });
    })
    $("#confirmCodeBtn").click(function(e) {     // Confirmation A Code Btn (Good)
        e.preventDefault();
        //XML
        var formData = {
            'Acode' : $('input[name=Acode]').val(),
        };
        $.ajax({
            type: 'GET',
            url: 'php/authenticate.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            RegState = parseInt(data.RegState);
            if (RegState == 3) {
                $("#loginForm").hide();
                $("#registerForm").hide();
                $("#setPasswordForm").show();
                $("#setPasswordMessage").html(data.ErrorMsg);
                $("#resetPasswordForm").hide();
                $("#resumeForm").hide();
                return;
            }
            $("#loginForm").hide();
            $("#registerForm").show();
            $("#setPasswordForm").hide();
            $("registerMessage").html(data.ErrorMsg);
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
            return;
        });
    })
    $("#setPasswordSubmit").click(function(e) {  // Set Password submit (Good)
        e.preventDefault();
        //XML
        var formData = {
            'Password' : $('input[name=Password]').val(),
        };
        $.ajax({
            type: 'POST',
            url: 'php/setPassword.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").show();
            $("#loginMessage").html(data.ErrorMsg);
            $("#registerForm").hide();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
            return;
        });
    })
    $("#loginSubmit").click(function(e) { // Sign In submit (Good)
        e.preventDefault();
        //XML
        var formData = {
            'loginEmail' : $('input[name=loginEmail]').val(),
            'loginPassword' : $('input[name=loginPassword]').val(),
            'RememberMe' : $('input[name=RememberMe]').is(':checked')
        };
        $.ajax({
            type: 'POST',
            url: 'php/login.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            RegState = parseInt(data.RegState)
            $("#loginMessage").html(data.ErrorMsg);
            if (RegState == 4){
                window.location.href = "https://cis-linux2.temple.edu/~tul40235/PasswordManager/protected.html"
                }
                $("#loginForm").show();
                $("#loginMessage").html(data.ErrorMsg);
                $("#registerForm").hide();
                $("#setPasswordForm").hide();
                $("#resetPasswordForm").hide();
                $("#resumeForm").hide();
                return; 
        });
    })
    $("#backBtn").click(function(e) {  // Back on registerForm (Good)
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/back.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").show();
            $("#loginMessage").html(data.ErrorMsg);
            $("#registerForm").hide();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
            return;
        });
    })
    $("#backBtn2").click(function(e) {  // Back on registerForm (Good)
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/back.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").show();
            $("#loginMessage").html(data.ErrorMsg);
            $("#registerForm").hide();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
            return;
        });
    })

     // Not working Yet (Always goes to remebers me)

    $("#resetPasswordBtn").click(function(e) {  // Reset password submit ()
        e.preventDefault();
        //XML
        var formData = {
            'resetPasswordEmail' : $('input[name=Email]').val(),
        };
        $.ajax({
            type: 'GET',
            url: 'php/resetPassword.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#resetPasswordMessage").html(data.ErrorMsg);
        });
    })
    $("#logout").click(function(e) {  // Logout protected.html submit (Good)
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/logout.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            window.location.assign("index.html")
        });
    })
    $("#rememberContinue").click(function(e) {  // Remember again? protected.html submit (Good)
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/logout.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            window.location.href = "https://cis-linux2.temple.edu/~tul40235/PasswordManager/protected.html"
        });
    })
    $("#rememberLogout").click(function(e) {  // Logout from remeber me? submit (Good)
        e.preventDefault();
        //XML
        var formData = {};
        $.ajax({
            type: 'GET',
            url: 'php/logout.php',
            async: true,
            data: formData,
            dataType: 'json',
            encode: true
        }).always(function(data){
            console.log(data);
            $("#loginForm").show();
            $("#loginMessage").html(data.ErrorMsg);
            $("#registerForm").hide();
            $("#setPasswordForm").hide();
            $("#resetPasswordForm").hide();
            $("#resumeForm").hide();
        });
    })
})