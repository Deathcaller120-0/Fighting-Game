console.log("Why are you here? Are you looking for some debug outputs? Or are you Cheating?");
//1st Player or User
var player0 = {HP:12, dmg:5, exp:0, lvl:1, defam:0, live:"Alive", NAME:"PLAYER"};
setInterval(stats, 1000);
setInterval(save, 1000);
setTimeout(function(){
	player0.HP = localStorage.getItem("playerHP");
	maxhp = localStorage.getItem("maxHP");
	player0.dmg = localStorage.getItem("playerDMG");
	player0.lvl = localStorage.getItem("playerLVL");
	player0.NAME = localStorage.getItem("playerNAME");
	explvl = localStorage.getItem("EXPLVL");
	fix();
}, 500);
setInterval(fix, 5000);
function fix(){
	if (player0.HP == undefined || player0.HP == 0){
		player0.HP = 12;
	}
	if (player0.dmg == null || player0.dmg == NaN || player0.dmg == undefined){
		player0.dmg = 5;
	}
	if (player0.lvl == null || player0.lvl == undefined || player0.lvl == NaN){
		player0.lvl = 1;
	}
	if (player0.exp == NaN){
		player0.exp = 0;
	}
	if (player0.defam == null || player0.defam == undefined || player0.defam == NaN){
		player0.defam = 0;
	}
	if (maxhp == null){
		maxhp = player0.HP;
	}
	if (player0.NAME == undefined){
		player0.NAME = "PLAYER";
	}
	if (explvl == undefined){
		explvl = 100;
	}
}
function save(){
	localStorage.setItem("playerHP", player0.HP);
	localStorage.setItem("maxHP", maxhp);
	localStorage.setItem("playerDMG", player0.dmg);
	localStorage.setItem("playerLVL", player0.lvl);
	localStorage.setItem("playerNAME", player0.NAME);
}
function stats(){
	//Player0
	document.getElementById('player0AD').innerHTML=player0.live;
	document.getElementById('player0HP').innerHTML=player0.HP;
	document.getElementById('player0DMG').innerHTML=player0.dmg;
	document.getElementById('player0EXP').innerHTML=player0.exp; 
	document.getElementById('player0LVL').innerHTML=player0.lvl;
	document.getElementById('player0NAME').innerHTML=player0.NAME;
	//'AI'
	document.getElementById('player1AD').innerHTML=player1.live;
	if (player1.HP <= 0 && player1.live !== "Loading, Please Wait."){
		player1.HP = 10;
		player0.defam++;
		player1.live = "Loading, Please Wait.";
		document.getElementById('player1AD').innerHTML = "Dead";
		var expgain = Number(player1.expdrop);
		var exp = Number(player0.exp);
		player0.exp = expgain + exp;
		setTimeout(live, 5000);
		lvlup();
	}
	document.getElementById('player1HP').innerHTML=player1.HP;
	document.getElementById('player1LVL').innerHTML=player1.lvl;
}
//'AI' or Enemy
var player1 = {HP:0, DMG:0, lvl:1, live:"Loading, Please Wait", expdrop:0};
function livea(){
	document.getElementById('player1AD').innerHTML = "Left Fight";
	setTimeout(live, 10000);
}
function live(){
	if (player1.live !== "Alive"){
		var rngLvl = Math.floor(Math.random() * player0.lvl) + 1;
		var rngHP = Math.floor(Math.random() * 6);
		rngHP +=  Number(player0.dmg) * 2;
		var rngDMG = Math.floor(Math.random() * player0.DMG + 2);
		var rngED = Math.floor(Math.random() * player0.lvl ** 2 + 20);
		rngED += Math.floor(Math.random() * player1.lvl);
		player1.expdrop = rngED;
		player1.HP = rngHP;
		player1.lvl = rngLvl;
		if (rngDMG <= -1){
			rngDMG = 0;
		}
		player1.DMG = rngDMG;
		player1.live = "Alive";
		document.getElementById('FS').style.display="initial";
		document.getElementById('crit').innerHTML="";
	} 
}

//Attack with Weapon(s)
//Left
var SAL = false;
var SDL = false;
function attackL(lmem){
	if (SAL == false){
		document.getElementById('AL').style.borderColor="#00ff00";
		document.getElementById('DL').style.borderColor="#ff0000";
		SAL = true;
		SDL = false;
	} else {
		document.getElementById('AL').style.borderColor="#000000";
		document.getElementById('DL').style.borderColor="#000000";
		SAL = false;
		SDL = false;
	}
}
function defendL(){
	if(SDL == false){
		document.getElementById('DL').style.borderColor="#00ff00";
		document.getElementById('AL').style.borderColor="#ff0000";
		dmgabsL++;
		dmgabsL++;
		SAL = false;
		SDL = true;
	} else {
		document.getElementById('DL').style.borderColor="#000000";
		document.getElementById('AL').style.borderColor="#000000";
		dmgabsL--;
		dmgabsL--;
		SAL = false;
		SDL = false;
	}
}
//Right
var SAR = false;
var SDR = false;
function attackR(rmem){
	if (SAR == false ){
		document.getElementById('AR').style.borderColor="#00ff00";
		document.getElementById('DR').style.borderColor="#ff0000";
		SAR = true;
		SDR = false;
	} else {
		document.getElementById('AR').style.borderColor="#000000";
		document.getElementById('DR').style.borderColor="#000000";
		SAR = false;
		SDR = false;
	}
}
function defendR(){
	if (SDR == false){
		document.getElementById('DR').style.borderColor="#00ff00";
		document.getElementById('AR').style.borderColor="#ff0000";
		dmgabsR++;
		dmgabsR++;
		SAR = false;
		SDR = true;
	} else {
		document.getElementById('DR').style.borderColor="#000000";
		document.getElementById('AR').style.borderColor="#000000";
		dmgabsR--;
		dmgabsR--;
		SAR = false;
		SDR = false;
	}
}
//Attack
//Player
var dmgabsR = 0;
var dmgabsL = 0;
function exe(){
	document.getElementById('FS').style.display="none";
	var HPR = Number(player1.HP);
	var crit = Math.floor(Math.random() * 5);
	if (SAL == true && dmgabsL !== 2 && SDL == !true){
		if(crit == 4){
			player1.HP = HPR - player0.dmg - 10;
			document.getElementById('crit').innerHTML="Critical Hit!";
		} else {
			player1.HP = HPR - player0.dmg;
		}
		HPR = player1.HP;
	}
	if (SAR == true && dmgabsR !== 2 && SDR == !true){
		if(crit == 4){
			player1.HP = HPR - player0.dmg - 10;
			document.getElementById('crit').innerHTML="Critical Hit!";
		} else {
			player1.HP = HPR - player0.dmg;
		}
	}
	if (player1.HP >= 1){
		setTimeout(exea, 5000);
	} else {
		setTimeout(live, 5000);
		player1.live = "Dead";
		player0.HP = maxhp;
	}
}

//'AI'
function exea(){
	document.getElementById('FS').style.display="initial";
	document.getElementById('crit').innerHTML="";
	if(player1.live !== "Dead"){
		var HPRA = Number(player0.HP);
		var SALA = Math.floor(Math.random() * 3);
		var SARA = Math.floor(Math.random() * 3);
		if (dmgabsL >= 3){
			dmgabsL = 2;
		}
		if (dmgabsR >= 3){
			dmgabsR = 2;
		}
		if (SALA >= 1){
			player0.HP = HPRA - player1.DMG + dmgabsL + dmgabsR;
			HPRA = Number(player0.HP);
		}
		if (SARA >= 1){
			player0.HP = HPRA - player1.DMG + dmgabsL + dmgabsR;
		}
		if (player0.HP <= 0){
			player0.HP = maxhp;
			player0.live = "Dead";
			player0.exp -= 40;
			if (player0.exp <= 0){
				player0.exp = 0;
			}
			stats();
			setTimeout(died, 5000);
		}
	}
}

//On Death
function died(){
	if (player0.live == "Dead"){
		live();
		player0.live = "Alive";
	}
}

//Leveling up
var maxhp = 12;
var explvl = 100;
function lvlup(){
	if (Number(player0.lvl) >= 1 && player0.exp >= explvl){
		player0.lvl++;
		player0.exp -= explvl;
		explvl += 20;
		player0.HP += 2;
		player0.dmg += 2;
		if (player0.lvl >= 5){
			player0.HP++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 10){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 15){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 20){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 25){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 30){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 35){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 40){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 45){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 50){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 55){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 60){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		if (player0.lvl >= 65){
			player0.lvl++;
			maxhp++;
			player0.dmg++;
		}
		maxhp += 2;
		localStorage.setItem('EXPLVL', explvl);
	}
	
}

//Reset
function reset(){
	player0.HP = 12;
	maxhp = 12;
	player0.dmg = 5;
	player0.exp = 0;
	player0.defam = 0;
	player0.lvl = 1;
	live();
	save();
}

//Nameing
function setName(){
	var LN = document.getElementById('NAMEIN').value;
	player0.NAME = LN;
	if (LN == ' ' || typeof(LN) == 0){
		window.alert('INVALID VALUE');
		player0.NAME = "PLAYER";
	}
}