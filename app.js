"use strict";

/* SOME CONSTANTS */
var endpoint01 = "http://misdemo.temple.edu/auth";
var endpoint02 = "http://54.91.79.37:8220";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		localStorage.usertoken = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

var loginController = function(){
	//go get the data off the login form
	var the_serialized_data = $('#form-login').serialize();
	var url = endpoint01;
	$.getJSON(url,the_serialized_data,function(data){
		//console.log(data);
		if (typeof data === 'string'){
			localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
			$('#login_message').html(data);
			$('#login_message').show();
		} else {
			$('#login_message').html('');
			$('#login_message').hide();
			localStorage.usertoken = data['user_id']; //login succeeded.  Set usertoken.
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			$('#div-ABC').show();
		}
	});
	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};


//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/

	/* lock all secured content */
	$('.secured').removeClass('unlocked');
	$('.secured').addClass('locked');


    /* this reveals the default page */
    $("#div-login").show();

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
		
	/* what happens if the login button is clicked? */
	$('#btnLogin').click(function(){
		loginController();
	});
	
	$('#btnLogin').click(function(){
		$(".content-wrapper").hide();
	$("#div-health").show();
		 	
	});
	
	
	$(".nav-link").click(function(){
		$("#result").hide();
		
	});

	$('#btnC02').click(function(){
		$("#result").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-C02").show(); /* show the chosen content wrapper */
	});

	$('#btnGas').click(function(){
		$("#result").show();
		$("#div-C02").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Gas").show(); /* show the chosen content wrapper */
	});

	$('#btnCalories').click(function(){
		$("#result").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-C02").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").show(); /* show the chosen content wrapper */
	});
		
}); /* end the document ready event*/
