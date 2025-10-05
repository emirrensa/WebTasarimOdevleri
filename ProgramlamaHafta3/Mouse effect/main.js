const C_dot = document.querySelector("[data-cursor-dot]");
const C_border = document.querySelector("[data-cursor-border]");
const follower = document.getElementById("mouse-follower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

window.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    C_dot.style.left = mouseX + "px";
    C_dot.style.top = mouseY + "px";
    C_border.style.left = mouseX + "px";
    C_border.style.top = mouseY + "px";
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animateFollower);
}

animateFollower();
