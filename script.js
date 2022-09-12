var game=document.getElementById("game");
var loader=document.getElementById("loader");


setTimeout(function(){
    game.style.display='block';
    loader.style.display='none';
},4000);



/*--------------Declaring variables-----------*/

var guess=document.getElementById("guess");
var trialsCont=document.getElementById("trials-cont");
var guess_trials=document.querySelector("#guess-trials");
var num_trials=document.querySelector("#number-trials");
var pos_trials=document.querySelector("#position-trials");

var go=document.getElementById("submit");
var dele=document.getElementById("del");

var num=random(3);
var count=1;
var number=0,position=0;



/*-------------Random Number----------*/

function random(num_of_digit,digit=0){
    num="";
   while (digit < num_of_digit){
       let rand=String(Math.ceil(Math.random(9) * 9));

        if(num.indexOf(rand) == -1){
            num=num+rand;
            digit++;
        }
}
console.log(num);
return num;
}


/*--------------Validating Guess---------------*/



function validate(){
    let ges=guess.value;
    let valid=true;
    if(ges.search('0') != -1){
        valid=false;
        title.innerHTML="Error";
        content.innerHTML="No zeros Please!";
        openMsg("red");
    }

    else if(isNaN(ges)){
        valid=false;
        title.innerHTML="Error";
        content.innerHTML="Only Numbers Please!";
        openMsg("red");
    }

    else if(ges.length != 3){
        valid=false;
        title.innerHTML="Error";
        content.innerHTML="3 digits Please!";
        openMsg("red");
    }

    for(i=0;i<ges.length;i++){
        if(ges.indexOf(ges[i]) != ges.lastIndexOf(ges[i])){
            valid=false;
            title.innerHTML="Error";
            content.innerHTML="No repeat please!";
            openMsg("red");
            break;
        }
    }

    if(valid){
        check();
        count++;
        console.log("Count : ",count);
    }
}



/*---------------Keyboard Buttons--------------*/


document.addEventListener("keyup",function(e){
    if(e.keyCode == 13){
        if(msgOpened){
            closeMsg();
        }
        else{
        go.click();
        }
    }
    if(e.keyCode == 32){
        del();
        title.innerHTML="Error";
        content.innerHTML="No spaces please!";
        openMsg("red");
        console.log(guess.disabled)
        }
    if(e.keyCode == 70){
        guess.focus();
    }
})

/*---------------Go and Restart------------*/
go.onclick=function(){
    if(go.innerHTML == "GO"){
        validate();
    }
    else{
        Restart();
    }
}


/*--------------Checking  Guess-----------*/


function check(){
    number=0;
    position=0;
    ges=guess.value;
    for(i=0;i<ges.length;i++){
        for(j=0;j<num.length;j++){
            if(ges[i] == num[j]){
                number++;
                if(i==j){
                    position++;
                }
            }
        }
    }
    guess_trials.innerHTML+="<p class='trials-text'>" + guess.value + "</p>"
    num_trials.innerHTML+="<p class='trials-text'>" + number + "</p>"
    pos_trials.innerHTML+="<p class='trials-text'>" + position + "</p>"
    guess.value="";
    // trialsCont.scrollTo(0,1000);
    window.scrollTo(0,2000);


    if(number == 3 && position == 3){
        title.innerHTML="Congratulations";
        content.innerHTML="You have won!";
        guess.disabled=true;
        openMsg("#0a0");
        go.innerHTML="Restart";
        dele.style.display="none";
    }
    else{
        if(count >= 10){
            go.innerHTML="Retry";
            dele.style.display="none";
            guess.disabled=true;
            guess.placeholder="Try again";
            title.innerHTML="Loss";
            content.innerHTML="<p>You have tried " + count + " times </p>" +
             "<p class='main'>You have lost!</p>" + 
             "<p>The Number was " + num;
            openMsg("#fa0");
            console.log("Count is : ",count);
        }
    }
}


/*-----------Removing last value---------*/

function del(){
    temp=guess.value;
    temp=temp.slice(0,-1);
    guess.value=temp;
}


/*---------------Messages--------------*/

var msgCont=document.getElementById("msg-cont");
var msg=document.getElementById("msg");
var content=document.getElementById("content");
var titleTop=document.getElementById("title-top");
var title=document.getElementById("title");
var msgOpened=false;



function openMsg(color){
    titleTop.style.background=color;
    msgCont.style.display="flex";

    setTimeout(function(){
        msgCont.style.zIndex="1000";
        msgCont.style.transform="scale(1)";
        msgCont.style.opacity="1";
        msgCont.style.borderRadius="0%";
    },150);
    setTimeout(function(){
        msgOpened=true;
    },500);
}

function closeMsg(){
    msgCont.style.zIndex="-1000";
    msgCont.style.transform="scale(0)";
    msgCont.style.opacity="0";
    msgCont.style.borderRadius="50%";

    setTimeout(function(){
        msgOpened=false;
        msgCont.style.display="none";
    },500);
}

document.addEventListener("click",function(e){
    if(e.target.id=="msg-cont" || e.target.id=="close"){
        closeMsg();
    }
});



function Restart(){
    guess.disabled=false;
    guess_trials.innerHTML="";
    num_trials.innerHTML="";
    pos_trials.innerHTML="";

    guess.placeholder="Eg: 258";
    go.innerHTML="GO";
    dele.style.display="block";

    count=1;
    random(3);
}
