var word = "";
var labels = [];

var body = [];
body.push(document.querySelector("#head"));
body.push(document.querySelector("#torso"));
body.push(document.querySelector("#left-arm"));
body.push(document.querySelector("#right-arm"));
body.push(document.querySelector("#left-leg"));
body.push(document.querySelector("#right-leg"));

let failures = 0;

const setWord = (value) => {
    labels = [];
    let el = document.querySelector("#word-container");
    el.innerHTML = '';
    for(let label, i = 0; i < value.length; ++i) {
        label = document.createElement("label");
        label.classList.add("label")
        label.innerText = '';
        el.appendChild(label);
        labels[i] = label;
    }
    word = value;

    for(let i = 0; i < body.length; ++i) {
        body[i].style.visibility = "hidden";
    }
}

const initKeyboard = ()=> {
    let el = document.querySelector("#keyboard");
    el.innerHTML = "";

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let input, c, i = 0; i < alphabet.length; ++i) {
        c = alphabet.charAt(i);

        input = document.createElement("input");
        input.value = c;
        input.type = "button";
        el.appendChild(input);

        input.addEventListener("click", (e) => {

            if(failures < body.length)  {
                const value = e.target.value;
                e.target.disabled = true;
    
                const tmp = word.toLowerCase();
                if(tmp.indexOf(value) > -1) {
                    let index = -1;
                    while((index = tmp.indexOf(value, index + 1)) > -1) {
                        labels[index].innerText = word.charAt(index);
                    }
                } else {
                    body[failures].style.visibility = "visible";
                    failures++;
                    if(failures === body.length) {
                         // TODO : 
                    }
                }
                
            }

        });

    }
}

setWord("Alicia");
initKeyboard();