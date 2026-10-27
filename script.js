
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openSeal = document.getElementById("openSeal");
const openHint = document.getElementById("openHint");
const backButton = document.getElementById("backButton");

const rsvpForm = document.getElementById("rsvpForm");
const rsvpResult = document.getElementById("rsvpResult");
const rsvpMessage = document.getElementById("rsvpMessage");
const emailLink = document.getElementById("emailLink");
const smsLink = document.getElementById("smsLink");

// CHANGE THESE BEFORE PUBLISHING:
const RSVP_EMAIL = "YOUR_EMAIL_HERE";
const RSVP_PHONE = "YOUR_PHONE_NUMBER_HERE"; // Example: +639123456789

let isOpening = false;

openSeal.addEventListener("click", () => {
  if (isOpening) return;

  isOpening = true;
  openSeal.disabled = true;
  intro.classList.add("opening");
  openHint.textContent = "Your invitation is opening...";

  // Allow the paper to slide out before revealing the full invitation.
  window.setTimeout(() => {
    intro.classList.add("hidden");
    invitation.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    isOpening = false;
  }, 1350);
});

backButton.addEventListener("click", () => {
  invitation.classList.add("hidden");
  intro.classList.remove("hidden", "opening");

  openSeal.disabled = false;
  openHint.textContent = "Click the wax seal to open your invitation";

  window.scrollTo({ top: 0, behavior: "smooth" });
});

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(rsvpForm);
  const name = String(data.get("guestName") || "").trim();
  const attendance = String(data.get("attendance") || "");
  const count = String(data.get("guestCount") || "1");

  if (!name || !attendance) return;

  const subject = "Wedding RSVP - Wency & Clea";

  const message =
`Hello Wency and Clea,

Guest name: ${name}
Response: ${attendance}
Number attending: ${count}

Thank you for the invitation!

Best regards,
${name}`;

  const encodedMessage = encodeURIComponent(message);
  const encodedSubject = encodeURIComponent(subject);

  emailLink.href =
    `mailto:${RSVP_EMAIL}?subject=${encodedSubject}&body=${encodedMessage}`;

  smsLink.href =
    `sms:${RSVP_PHONE}?body=${encodedMessage}`;

  rsvpMessage.textContent =
    `Thank you, ${name}! Your RSVP is ready. Choose email or text to send your response.`;

  rsvpResult.classList.remove("hidden");
  rsvpResult.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
