"use strict";
/* SOME CONSTANTS */
var endpoint01 = "http://misdemo.temple.edu/auth";
var endpoint02 = "http://54.91.79.37:8201";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var SendTheForm = function(){
	var the_serialized_data = $('#form-health').serialize();
	//console.log(the_serialized_data);

		//send the form
		$.ajax({
			url: endpoint02 + '/form',
			type: 'POST',
			data: the_serialized_data,
			success: function(result){
				//console.log(result);
				$('#Co2result').html('You stopped ' + result['co2_saved'] + ' grams of c02 emssions from entering the atmosphere!');
				$('#Gasresult').html('You saved ' + result['gas_saved'] + ' gallons of gasoline!');
				$("#Calories").html('You burned ' + result['calories_lost'] + ' calories!');
			},


			error: function(result){
				//what to do if error occurs
				$('#Co2result').append('You did something wrong')
			}
		});
	} //end

var GetUserID = function(){
	$.ajax({
		url: endpoint02 + '/form',
		type: 'GET',
		data: 'usertoken='+localStorage.usertoken,
		success: function(result){
			let userid = result[0]['userid'];
			//console.log(userid);
			$('#userid').val(userid);
		},

		error: function(result){
			//if error occurs
			$('#userid').html('You did something wrong');
		}
	});

}

var DeleteActivity = function(){
	let userid = $('#userid').val();
	$.ajax({
		url: endpoint02 + '/form',
		type: 'DELETE',
		data: 'userid='+userid,
		success: function(result){
			//NEED TO LET USER KNOW DATA WAS DELETED
		},

		error: function(result){
			//if error occurs
			//WHAT IF IT DOESNT DELETE CORRECTLY???
		}
	});
}

var getHistory = function(){
	$.ajax({
		url: endpoint02 + '/history',
		data: 'usertoken='+localStorage.usertoken,
		type: 'GET',
		success: function(results){
			
			//clear table so it does not append multiple times
			$('#HistBody').empty();

			//console.log(results);
			//loop to store array & append to table
			for(var i =0; i < results.length; i++) {
				//storing JSON object to var
				var HistoryData = results[i];
				//declaring vars for table data
				var Weight = HistoryData.weight;
				var Duration = HistoryData.duration;
				var Intensity = HistoryData.intensity;
				var Distance = HistoryData.distance;
				var Transportation = HistoryData.transportation;
				var co2 = HistoryData.c02;
				var gas = HistoryData.gas;
				var calories = HistoryData.calories;
				
				//Appending data to table
				//$('#HistoryTable').html("<tr><th><b>" + "HistoryID" + "</b></th><th><b>" + "UserToken" + "</b></th><th><b>" + "SecretWord" + "</b></th><th><b>" + "GameResult" + "</b></th></tr>");
				$('#HistBody').append("<tr><td>" + Weight + "</td><td>" + Duration + "</td><td>" + Intensity + "</td><td>" + Distance + "</td><td>" + Transportation + "</td><td>" + co2 + "</td><td>" + gas + "</td><td>" + calories + "</td></tr>");

				//"<tr><th><b>" + "HistoryID" + "</b></th><th><b>" + "UserToken" + "</b></th><th><b>" + "SecretWord" + "</b></th><th><b>" + "GameResult" + "</b></th></tr>" +

				//console.log(HistoryData.usertoken);

				
				//$('#div-history').append(array[0]);
				//console.log(HistoryArray[i])

			};
		},
		error: function(results){
			console.log(results);
		}

	});

}//end getHistory


var leaderboardco2 = function(){

    let the_serialized_data = 'usertoken='+localStorage.usertoken;

    $.ajax({
        url: endpoint02 + '/leaderboardco2',
        data: the_serialized_data,
        type: 'GET',
        success: function(results){
            console.log(results);
            $('#div-Co2').html("<tr><th>usertoken</th><br>" + " " + "<th> Co2 Emissions Saved</th></tr>");

            for(var i =0; i < results.length; i++){
                    let co2emissions = results[i]['sum(c02)'];
                    let usertoken = results[i]['usertoken'];
                   
                    $("#div-Co2").append('<tr><td>'+ usertoken +'</td><td>' + co2emissions + " " + 'Grams </td></tr>');

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
				$('#div-Gas').html("<tr><th>usertoken Gas Saved </th></tr>");
	
				for(var i =0; i < results.length; i++){
						let gas = results[i]['sum(gas)'];
						let usertoken = results[i]['usertoken'];
					   
						$("#div-Gas").append('<tr><td>'+ usertoken +'</td><td>' + gas + " " + "Total Gallons Saved" + '</td></tr>');
	
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
							let calories = results[i]['sum(calories)'];
							let usertoken = results[i]['usertoken'];
						   
							$("#div-Calories").append('<tr><td>'+ usertoken +'</td><td>' + calories + " " + 'Calories Lost' +'</td></tr>');
		
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
						$('#div-Leaderboard').html("<tr><th>usertoken</th><th>Total Calories Lost</th><th>Total Gas Saved</th><th>Total Co2 Emissions Saved</th></tr>");
			
						for(var i =0; i < results.length; i++){
								let calories = results[i]['sum(calories)'];
								let gas = results[i]['sum(gas)']
								let co2emission = results[i]["sum(c02)"]
								let usertoken = results[i]['usertoken'];
							   
								$("#div-Leaderboard").append('<tr><td>'+ usertoken +'</td><td>' + calories +'</td><td>' + gas + '</td><td>' + co2emission +'</td></tr>' );
			
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
		$('#distance_error').empty().hide();
		$('#weight_error').empty().hide();
		$('#duration_error').empty().hide();
		$('#travel_error').empty().hide();
		$('#intensity_error').empty().hide();
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
			$("#usertoken").val(localStorage.usertoken)
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			//$('#div-ABC').show();
			$(".content-wrapper").hide();
			$("#div-form").show();
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
	
	$(".nav-link").click(function(){
		leaderboard();
		getHistory();
		$("#div-Leaderboard").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); /* show the chosen content wrapper */
	});

	//show form of results after submitting
	$("#btnForm").click(function(){
		//$("#div-form").hide();
		//$("#div-formresult").show();
		
		//error trapping BEFORE request is sent to avoid any possible user input errors
		var distance = $('#distance').val();
		var weight = $('#weight_lbs').val();
		var duration = $('#duration').val();
		var travel = $('#travel').val();
		var intensity = $('#intensity_level').val();
		var weight = $('#weight_lbs').val();

		$('#distance_error').empty().hide();
		$('#weight_error').empty().hide();
		$('#duration_error').empty().hide();
		$('#travel_error').empty().hide();
		$('#intensity_error').empty().hide();

		if (distance == "" || distance == undefined){
			$('#distance_error').show().text('Please provide the distance in miles');
		}
		if(isNaN(distance)){
			$('#distance_error').show().text('Distance must be a number');
		}

		if (weight == "" || weight == undefined ){
			$('#weight_error').show().text('Please provide your weight in pounds');
		}
		if (isNaN(weight)) {
			$('#weight_error').show().text('Pounds must be a number');
		}

		if (duration == "" || duration == undefined ){
			$('#duration_error').show().text('Please provide the duration in minutes');
		}
		if(isNaN(duration)) {
			$('#duration_error').show().text('Duration must be a number');
		}

		if (travel == undefined || travel == ""){
			$('#travel_error').show().text('Please select a travel method');
		}

		if (intensity == undefined || intensity == ""){
			$('#intensity_error').show().text('Please select an intensity level');
		}

		if (distance != "" && distance != undefined && weight != "" && weight != undefined && duration != "" && duration != undefined && travel != undefined && travel != "" && intensity != undefined && intensity != "") {
			SendTheForm();
			GetUserID();
			$("#div-form").hide();
			$("#div-formresult").show();
			//empty after submitting
			var distance = $('#distance').val('');
			var weight = $('#weight_lbs').val('');
			var duration = $('#duration').val('');
			var travel = $('#travel').val('');
			var intensity = $('#intensity_level').val('');
			var weight = $('#weight_lbs').val('');
		}
	});

	$("#btnContinue").click(function(){
		$("#div-formresult").hide();
		$("#div-Result").show();
		$("#div-leaderboard").show();
		$("#div-Leaderboard").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); /* show the chosen content wrapper */
		leaderboard();
		getHistory();
	});

	$("#btnDiscard").click(function(){
		DeleteActivity();
		$("#div-formresult").hide();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); /* show the chosen content wrapper */
	});

	$('#btnCo2').click(function(){
		leaderboardco2();
		$("#result").show();
		$("#div-Leaderboard").hide();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").show(); /* show the chosen content wrapper */
	});

	$('#btnGas').click(function(){
		leaderboardgas();
		$("#result").show();
		$("#div-Leaderboard").hide();
		$("#div-Co2").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").hide(); 	/* hide all content-wrappers */
		$("#div-Gas").show(); /* show the chosen content wrapper */
	});

	$('#btnCalories').click(function(){
		leaderboardcalories();
		$("#result").show();
		$("#div-Gas").hide(); 	/* hide all content-wrappers */
		$("#div-Co2").hide(); 	/* hide all content-wrappers */
		$("#div-Calories").show(); /* show the chosen content wrapper */
	});


		
}); /* end the document ready event*/
