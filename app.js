"use strict";
/* SOME CONSTANTS */
var endpoint01 = "http://misdemo.temple.edu/auth";
var endpoint02 = "http://54.91.79.37:8201";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var leaderboardco2 = function(){

    let the_serialized_data = 'usertoken='+localStorage.usertoken;

    $.ajax({
        url: endpoint02 + '/leaderboardco2',
        data: the_serialized_data,
        type: 'GET',
        success: function(results){
            console.log(results);
            $('#div-Co2').html("<tr><th>usertoken</th><th>Co2 Emissions Saved</th></tr>");

            for(var i =0; i < results.length; i++){
                    let co2emissions = results[i]['co2emissions'];
                    let usertoken = results[i]['usertoken'];
                   
                    $("#div-Co2").append('<tr><td>'+ usertoken +'</td><td>' + co2emissions +'</td></tr>');

            };
        }

    });
	}

	var leaderboardgas = function(){

		let the_serialized_data = 'usertoken='+localStorage.usertoken;
	
		$.ajax({
			url: endpoint02 + '/leaderboardgas',
			data: the_serialized_data,
			type: 'GET',
			success: function(results){
				console.log(results);
				$('#div-Gas').html("<tr><th>usertoken</th><th> Gas Saved </th></tr>");
	
				for(var i =0; i < results.length; i++){
						let gas = results[i]['gas'];
						let usertoken = results[i]['usertoken'];
					   
						$("#div-Gas").append('<tr><td>'+ usertoken +'</td><td>' + gas +'</td></tr>');
	
				};
			}
	
		});
		}
	
		var leaderboardcalories = function(){

			let the_serialized_data = 'usertoken='+localStorage.usertoken;
		
			$.ajax({
				url: endpoint02 + '/leaderboardcalories',
				data: the_serialized_data,
				type: 'GET',
				success: function(results){
					console.log(results);
					$('#div-Calories').html("<tr><th>usertoken</th><th>Calories Lost</th></tr>");
		
					for(var i =0; i < results.length; i++){
							let calories = results[i]['calories'];
							let usertoken = results[i]['usertoken'];
						   
							$("#div-Calories").append('<tr><td>'+ usertoken +'</td><td>' + calories +'</td></tr>');
		
					};
				}
		
			});
			}

			var leaderboard = function(){

				let the_serialized_data = 'usertoken='+localStorage.usertoken;
			
				$.ajax({
					url: endpoint02 + '/leaderboard',
					data: the_serialized_data,
					type: 'GET',
					success: function(results){
						console.log(results);
						$('#div-Calories').html("<tr><th>usertoken</th><th>Calories Lost</th></tr>");
			
						for(var i =0; i < results.length; i++){
								let calories = results[i]['calories'];
								let usertoken = results[i]['usertoken'];
							   
								$("#div-Calories").append('<tr><td>'+ usertoken +'</td><td>' + calories +'</td></tr>');
			
						};
					}
			
				});
				}



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
$(document).ready(function(){

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
		$("#div-form").show();
	});
	
	
	$(".nav-link").click(function(){
		$("#div-Leaderboard").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); /* show the chosen content wrapper */
	});

	$("#btnForm").click(function(){
		$("#div-form").hide();
		$("#div-formresult").show();
	})

	$('#btnCo2').click(function(){
		$("#result").show();
		$("#div-Leaderboard").hide();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").show(); /* show the chosen content wrapper */
	});

	$('#btnGas').click(function(){
		$("#result").show();
		$("#div-Leaderboard").hide();
		$("#div-Co2").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Gas").show(); /* show the chosen content wrapper */
	});

	$('#btnCalories').click(function(){
		$("#result").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").show(); /* show the chosen content wrapper */
	});


		
}); /* end the document ready event*/
