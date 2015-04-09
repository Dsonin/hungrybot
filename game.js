$(document).ready( function(){
	//variables
	var ore=0;
	var hunger=250;
	var age = 0;
	var maxHunger = 1000;
	var birthdayBase = 10;
	var birthday = 10;
	var totalAge = 0;
	var feedClick = 0;
	var scripts = 0;
	var mining =false;
	var feedClickTotal = 0;
	var staminaBase = 100;
	var staminaTotal = 100;
	var oreProduct = 0.5;
	var mining = false;

	console.log(mining);

	//starting values

	    //Starting Rates

	    function oreRate(){
		return totalAge*oreProduct;
		$("#oreRate").html(oreRate());
		}
		function hungerRate(){
			return (100/staminaBase)/5;
			// put in a thingy to show this rate
		}

	//naming the little buddy
	$("#newName").click(function(){
		var botName = $("#newBot").val();
		if (botName === ""){ //this makes it so that if there's nothing there, the name doesn't change
			return;
		}else{
			$("#bot-name").html(botName);
			$("#newBot").val("");
		};
		console.log(botName);
	});

	//setting buddy's stats
	$("#hunger").html(hunger);
	$("#ore").html(ore);
	$("#age").html(totalAge);
	$("#robot").html("<img src='img/robot/hungry-bot.png' alt='eating!' />");
	$("#data").html(age);
	$("#scripts").html(scripts);
	$("#birthday").html(birthday);
	$("#stamina").html(staminaTotal);
	$("#oreRate").html(oreRate());
	$("#hungerRate").html(hungerRate());

	//universal helpers
	function dialog(message){
		$("#dialog").fadeIn();
		$("#dialog").html(message);
		$("#dialog").fadeOut();
	};
	dialog("this is a test!");
//Non-Clickable Events
	//hunger
	setInterval(function(){ 
		$("#hunger").html(hunger);
		if (hunger >=0){
			hunger = +(hunger + hungerRate()).toFixed(2);
			};
		if (hunger > maxHunger){
			hunger="Your robot starved to death";
			$("#hunger").html(hunger);
		};
		}, 1000);
		//Little buddy growing up!
	function ageUp(){
		if (feedClick === birthdayBase){
			totalAge++;
			feedClick = 0;
			birthday=Math.floor(Math.pow(birthdayBase,1.05));
			birthdayBase=Math.floor(Math.pow(birthdayBase,1.05)); 
			$("#age").html(totalAge);
			console.log(birthday);
			dialog("Your robot grew a level!");
			    switch(totalAge){
			    	case 10:
			    	$("#firstLevel").fadeIn(500);
			    	$("#robot").fadeOut("fast");
			    	$("#robot").html("<img src='img/robot/leg-bot.png' alt='yummy!' />").fadeIn(500);
			    	break;
			    	default:
			    	break;
			    }
		};
	};
	//autoeating took for fucking ever do not delete!!!!
	function autoEat(){
		setInterval(function (){ 
		if (hunger > 0 && ore >0){
			hunger = +(hunger - hungerRate()).toFixed(2);
			feedClick++;
			ore--;
			birthday--;
			if (mining){
				staminaTotal++;
			}
			$("#stamina").html(staminaTotal);
			$("#birthday").html(birthday);
			$("#hunger").html(hunger);
			$("#ore").html(ore);
		};
	}, 1000);

	};

	//automining
	function autoMine(){
		setInterval(function (){ 
		if (hunger >0 && staminaTotal > 0){
			hunger = hunger - oreRate();
			staminaTotal--;
			ore= ore + oreRate();
			$("#stamina").html(staminaTotal);
			$("#hunger").html(hunger);
			$("#ore").html(ore);
			mining = true;
		};
	}, 1000);

	};
		
	
	
//gameplay

	//Hunger + death
	$("#feed").click(function (){
		//functionality
		if (ore > 0 && hunger >= 0){
			ore--;
			hunger--;
			feedClick++;
			birthday--;
			feedClickTotal++;
			if (mining){
				staminaTotal++;
				$("#stamina").html(staminaTotal);
				console.log(mining);
			}
			//make up update function
			$("#stamina").html(staminaTotal);
			$("#birthday").html(birthday);
			$("#hunger").html(hunger);
			$("#ore").html(ore);
		}else if(ore < 1 && hunger > 0){
			dialog("You don't have enough ore!");
		}else{
			dialog("Your robot is full!");
		};
		//animation, not the focus right now, going to have to rewrite my original code, oy
		if (hunger === 0){
			$("#robot").html("<img src='img/robot/full-bot.png' alt='yummy!' />");
		};
		if (hunger === "Your robot starved to death"){
			dialog("You can't feed the dead.");
		};
		ageUp();
	});

	//mining cheap ore #1
	$("#mine").click(function(){
		ore++;
		$("#ore").html(ore);
	});
	//coding
	$("#coding").click(function(){
		scripts++;
		$("#scripts").html(scripts);
	});
	//automine (update #1)
	$("#auto-eat").click(function(){
		if (scripts > 9 && totalAge > 9){
			scripts=scripts-10;
			$("#scripts").html(scripts);
			dialog("Your robot learned how to feed itself!");
			$("#auto-eat").fadeOut();
			autoEat();
		}else{
			dialog("Your robbot needs more scripts.")
		};
	});
	$("#auto-mine").click(function(){
		if (scripts > 24){
			scripts=scripts-25;
			$("#scripts").html(scripts);
			dialog("Your robot learned how to dig! Now it can mine!");
			$("#auto-mine").fadeOut();
			mining = true;
			autoMine();
			console.log(mining);
		};
	});


});//the AINND!
