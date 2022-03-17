var ok, nok;
var word = "";
var labels = [];

var body = [];
body.push(document.querySelector("#head"));
body.push(document.querySelector("#torso"));
body.push(document.querySelector("#left-arm"));
body.push(document.querySelector("#right-arm"));
body.push(document.querySelector("#left-leg"));
body.push(document.querySelector("#right-leg"));

const setWord = (value) => {
    ok = nok = 0;
    labels = [];
    word = value;
    const el = document.querySelector("#word-container");
    el.innerHTML = '';
    for(let i = 0; i < value.length; ++i) { // iterate word
        labels[i] = document.createElement("label"); // create label
        labels[i].classList.add("label"); // set class
        el.appendChild(labels[i]);
        if(value.charAt(i) === ' ') { // check empty space
            labels[i].style.visibility = "hidden";
            ok++;
        }
    }
    for(let i = 0; i < body.length; ++i) { // hide hangman
        body[i].style.visibility = "hidden";
    }
    
    initKeyboard();
}

const initKeyboard = ()=> {
    const el = document.querySelector("#keyboard");
    el.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let input, c, i = 0; i < alphabet.length; ++i) {
        c = alphabet.charAt(i);
        input = document.createElement("input");
        input.value = c;
        input.type = "button";
        input.addEventListener("click", (e) => {
         
            if(ok < word.length && nok < body.length)  { // is clickable?
                const value = e.target.value; // target value (character)
                e.target.disabled = true;     // disable input button
    
                const tmp = word.toLowerCase();
                if(tmp.indexOf(value) > -1) { // OK
                    let index = -1;
                    while((index = tmp.indexOf(value, index + 1)) > -1) { // iterate matches 
                        labels[index].innerText = word.charAt(index);     // reveal
                        ok++; // increase hits 
                    }
                    if(ok === word.length) { // check game over
                        // TODO : win
                   }
                } else { // NOK
                    body[nok].style.visibility = "visible"; // add body part
                    nok++; // increase fails
                    if(nok >= body.length) { // check game over
                         // TODO : lose
                    }
                }
            } 

        });
        el.appendChild(input);
    }
}

setWord("Maria Gloria");