const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
const len = list.length;
const deg = 360 / len;

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
let num = 0;
let active = 0;

const names = ["cardio", "groove", "happy", "light", "lily", "limes", "pop", "swing"];

let before = -1;

for(let i = 0; i < len; i++) {
    list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

    list[i].querySelector(".pic").style.backgroundImage = `url("../img/${names[i]}.jpg")`;
    list[i].querySelector(".text>h2").innerHTML = names[i];

    const audio = document.createElement("audio");
    audio.setAttribute("src", `../music/${names[i]}.mp3`);
    audio.setAttribute("loop", "loop");
    list[i].append(audio);
    
    list[i].querySelector(".play").addEventListener("click", function(e) {
        if(before === -1) before = list[i];
        else if(before != list[i]) {
            before.closest("article").querySelector("audio").pause();
            before.closest("article").querySelector(".pic").classList.remove("on");
            before = list[i];
        }

        list[i].querySelector(".pic").classList.add("on");
        list[i].querySelector("audio").play();
    });

    list[i].querySelector(".pause").addEventListener("click", function(e) {
        list[i].querySelector(".pic").classList.remove("on");
        list[i].querySelector("audio").pause();
    });

    list[i].querySelector(".reload").addEventListener("click", function(e) {
        if(before === -1) before = list[i];
        else if(before != list[i]) {
            before.closest("article").querySelector("audio").pause();
            before.closest("article").querySelector(".pic").classList.remove("on");
            before = list[i];
        }

        list[i].querySelector(".pic").classList.add("on");
        list[i].querySelector("audio").load();
        list[i].querySelector("audio").play();
    });
};

prev.addEventListener("click", function(e) {
    frame.style.transform = `rotate(${deg * ++num}deg)`;

    if(active === 0) active = len - 1;
    else active--;

    for(let el of list) {
        el.classList.remove("on");
    }
    list[active].classList.add("on");

});

next.addEventListener("click", (e) => {
    frame.style.transform = `rotate(${deg * --num}deg)`;

    if(active === len - 1) active = 0;
    else active++;

    for(let el of list) {
        el.classList.remove("on");
    }
    list[active].classList.add("on");
});

// for(let el of list) {
//     el.querySelector(".play").addEventListener("click", function(e) {
//         e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
//     })
//     el.querySelector(".pause").addEventListener("click", function(e) {
//         e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
//     })
// }
