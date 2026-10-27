const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openSeal = document.getElementById("openSeal");
const openHint = document.getElementById("openHint");
const backToEnvelope = document.getElementById("backToEnvelope");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const feedback = document.getElementById("rsvpFeedback");
const rsvpButtons = document.getElementById("rsvpButtons");

openSeal.addEventListener("click", () => {
  intro.classList.add("opening");
  openHint.textContent = "Your invitation is opening…";
  window.setTimeout(() => {
    intro.classList.add("hidden");
    invitation.classList.remove("hidden");
    invitation.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1050);
});

backToEnvelope.addEventListener("click", () => {
  invitation.classList.add("hidden");
  intro.classList.remove("hidden", "opening");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let yesMoves = 0;
function moveYesButton() {
  // Keep it playful, but never make the RSVP impossible: after several dodges,
  // the button stays still so guests can actually choose "yes".
  if (yesMoves >= 5) return;
  yesMoves++;
  const dx = Math.round((Math.random() * 2 - 1) * 85);
  const dy = Math.round((Math.random() * 2 - 1) * 28);
  yesButton.style.transform = `translate(${dx}px, ${dy}px)`;
  if (yesMoves === 5) {
    feedback.textContent = "Okay, okay… the next click is all yours. 😂";
    yesButton.style.transform = "translate(0, 0)";
  }
}
yesButton.addEventListener("pointerenter", moveYesButton);
yesButton.addEventListener("click", () => {
  feedback.textContent = "YAY! 🥂 We’ll save you a seat (and a slice of cake). Thank you for celebrating with us!";
  yesButton.textContent = "Yes! Can't wait!";
  yesButton.style.transform = "translate(0, 0)";
  yesButton.disabled = true;
  yesButton.style.opacity = ".75";
  noButton.disabled = true;
  noButton.style.opacity = ".5";
});

noButton.addEventListener("click", () => {
  const jokes = [
    "No? We’ll tell the cake you said that. It’s already crying frosting. 😭🍰",
    "That’s okay… but the dance floor will be dramatically less iconic without you. 😂",
    "Your RSVP has been received. The bride and groom are now staring into the distance like a music video. 🥲"
  ];
  feedback.textContent = jokes[Math.floor(Math.random() * jokes.length)];
});

// On touch devices there is no reliable hover, so the first tap playfully dodges.
// The button becomes stationary after five dodges and remains fully clickable.
yesButton.addEventListener("touchstart", () => {
  if (yesMoves < 5) moveYesButton();
}, { passive: true });
