//1st Player or User
var player0 = {HP:10, handRight:"Fist", handLeft:"Fist", exp:0, lvl:1, defam:0, live:"Alive"};
setInterval(stats, 1000);
setInterval(save, 1000);
setTimeout(function(){
	player0.HP = localStorage.getItem("playerHP");
	maxhp = localStorage.getItem("maxHP");
	player0.handRight = localStorage.getItem("playerHR");
	player0.handLeft = localStorage.getItem("playerHL");
	player0.lvl = localStorage.getItem("playerLVL");
	player0.deflvl = localStorage.getItem("playerDef");
	fix();
}, 500)
setInterval(fix, 5000);
function fix(){
	if (player0.HP == undefined || player0.HP == 0){
		player0.HP = 10;
	}
	if (player0.handRight == null || player0.handRight == NaN || player0.handRight == undefined){
		player0.handRight = "Fist";
	}
	if (player0.handLeft == null || player0.handLeft == NaN || player0.handLeft == undefined){
		player0.handLeft = "Fist";
	}
	if (player0.lvl == null || player0.lvl == undefined || player0.lvl == NaN){
		player0.lvl = 1;
	}
	
	if (player0.defam == null || player0.defam == undefined || player0.defam == NaN){
		player0.defam = 0;
	}
	if (maxhp == null){
		maxhp = 10;
	}
}
function save(){
	localStorage.setItem("playerHP", player0.HP);
	localStorage.setItem("maxHP", maxhp);
	localStorage.setItem("playerHR", player0.handRight);
	localStorage.setItem("playerHL", player0.handLeft);
	localStorage.setItem("playerLVL", player0.lvl);
	localStorage.setItem("playerDef", player0.deflvl);
}
function stats(){
	//Player0
	document.getElementById('player0AD').innerHTML=player0.live;
	document.getElementById('player0HP').innerHTML=player0.HP;
	document.getElementById('player0HR').innerHTML=player0.handRight;
	document.getElementById('player0HL').innerHTML=player0.handLeft;
	document.getElementById('player0EXP').innerHTML=player0.exp; 
	document.getElementById('player0LVL').innerHTML=player0.lvl;
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
	document.getElementById('player1HR').innerHTML=player1.hand1;
	document.getElementById('player1HL').innerHTML=player1.hand0
	document.getElementById('player1HP').innerHTML=player1.HP;
	document.getElementById('player1LVL').innerHTML=player1.lvl;
}
//'AI' or Enemy
var player1 = {HP:0, hand0:"", hand1:"", lvl:1, live:"Loading, Please Wait", expdrop:0};
function livea(){
	player1.live = "Left Fight";
	setTimeout(live, 10000);
}
function live(){
	if (player1.live !== "Alive"){
		var rngLvl = Math.floor(Math.random() * player0.lvl + 1);
		var rngHP = Math.floor(Math.random() * 3);
		rngHP +=  Number(maxhp);
		var rngH0 = Math.floor(Math.random() * weaponlist.length) - player0.HP;
		var rngH1 = Math.floor(Math.random() * weaponlist.length) - player0.HP;
		var rngED = Math.floor(Math.random() * player0.lvl ** 2 + 20);
		player1.expdrop = rngED;
		player1.HP = rngHP;
		player1.lvl = rngLvl;
		if (rngH0 <= -1){
			rngH0 = 0;
		}
		if (rngH1 <= -1){
			rngH1 = 0;
		}
		player1.hand0 = rngH0;
		player1.hand1 = rngH1;
		player1.live = "Alive";
		document.getElementById('FS').style.display="initial";
		document.getElementById('crit').innerHTML="";
		AV();
	} 
}

//Weapon Verification
//Player
var wvar = setInterval(WV, 2000);
var lmem = 0;
var rmem = 0;
function WV(){
	var done = 0;
	var arr = 0;
	var aint = setInterval(a ,50);
	if (player0.handLeft == " "){
		player0.handLeft = "Fist";
	}
	if (player0.handRight == " "){
		player0.handRight = "Fist";
	}
	function a(){
		if (player0.handLeft == weaponlist[arr]){
			lmem = weapons[player0.handLeft];
			done++;
		}
		if (player0.handRight == weaponlist[arr]){
			rmem = weapons[player0.handRight];
			done++;
		}
		if (done >= 2){
			clearInterval(aint);
		}
		arr++;
	}
}
//'AI'
var lmema = 0;
var rmema = 0;
function AV(){
	if (player1.hand0 == 0){
		lmema = 5;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand0 == 1){
		lmema = 8;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand0 == 2){
		lmema = 14;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand0 == 3){
		lmema = 1;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if ( player1.hand0 == 4){
		lmema = 20;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	}
	if (player1.hand1 == 0){
		rmema = 5;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand1 == 1){
		rmema = 8;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand1 == 2){
		rmema = 14;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if (player1.hand1 == 3){
		rmema = 1;
		document.getElementById('player1HR').innerHTML=player1.hand0;
	} else if ( player1.hand1 == 4){
		rmema = 20;
		document.getElementById('player1HR').innerHTML=player1.hand0;
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
var prefight = player0.HP;
function exe(){
	document.getElementById('FS').style.display="none";
	var HPR = Number(player1.HP);
	var crit = Math.floor(Math.random() * 5);
	if (SAL == true && dmgabsL !== 2 && SDL == !true){
		if(crit == 4){
			player1.HP = HPR - lmem - 10;
			document.getElementById('crit').innerHTML="Critical Hit!";
		} else {
			player1.HP = HPR - lmem;
		}
		HPR = player1.HP;
	}
	if (SAR == true && dmgabsR !== 2 && SDR == !true){
		if(crit == 4){
			player1.HP = HPR - rmem - 10;
			document.getElementById('crit').innerHTML="Critical Hit!";
		} else {
			player1.HP = HPR - rmem;
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
		if (SALA >= 1){
			player0.HP = HPRA - lmema + dmgabsL + dmgabsR;
			HPRA = Number(player0.HP);
		}
		if (SARA >= 1){
			player0.HP = HPRA - lmema + dmgabsL + dmgabsR;
		}
		dmgabsR = 0;
		dmgabsL = 0;
		if (player0.HP <= 0){
			player0.HP = maxhp;
			player0.live = "Dead";
			var expremove = 40;
			do {
				player0.exp--;
				expremove--;
			} while (expremove >= 1)
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
var maxhp = player0.HP;
function lvlup(){
	if (Number(player0.lvl) == 1 && player0.exp >= 100){
		player0.lvl = 2;
		var expremove = 100;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if(player0.lvl == 2 && player0.exp >= 120){
		player0.lvl++;
		var expremove = 120;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if(player0.lvl == 3 && player0.exp >= 140){
		player0.lvl++;
		var expremove = 140;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 4 && player0.exp >= 160){
		player0.lvl++;
		var expremove = 160;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 5 && player0.exp >= 180){
		player0.lvl++;
		var expremove = 180;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 6 && player0.exp >= 200){
		player0.lvl++;
		var expremove = 200;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 7 && player0.exp >= 220){
		player0.lvl++;
		var expremove = 220;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 8 && player0.exp >= 240){
		player0.lvl++;
		var expremove = 240;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
		maxhp++;
	}
	if (player0.lvl == 9 && player0.exp >= 260){
		player0.lvl++;
		var expremove = 220;
		do{
			player0.exp--;
			expremove--;
		} while (expremove >= 1)
		player0.HP++;
		player0.HP++;
		player0.HP++;
		maxhp++;
		maxhp++;
		maxhp++;
	}
}

//Weapons
var weaponlist = [
	"Fist",
	"Stick",
	"Spear",
	"Shield",
	"Sword"
];
var weapons = {
	Fist:5,
	Stick:8,
	Spear:14,
	Shield:1,
	Sword:20
};
//Reset
function reset(){
	player0.HP = 10;
	maxhp = 10;
	player0.handLeft = "Fist";
	player0.handRight = "Fist";
	player0.exp = 0;
	player0.defam = 0;
	player0.lvl = 1;
	live();
	save();
}
