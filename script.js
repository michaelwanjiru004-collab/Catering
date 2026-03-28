document.getElementById("year").textContent = new Date().getFullYear();

const bookingForm = document.getElementById("booking-form");
const quoteResult = document.getElementById("quote-result");
const smsActions = document.getElementById("sms-actions");
const smsLink = document.getElementById("sms-link");

const OWNER_CONTACTS = ["0796950999", "0793840565"];

const packagePricing = {
  silver: 1800,
  gold: 2500,
  platinum: 3400
};

const eventMultipliers = {
  ruracio: 1.1,
  wedding: 1.2,
  graduation: 1,
  birthday: 0.95,
  corporate: 1.05,
  other: 1
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(value);
}

function toInternationalPhone(number) {
  return number.startsWith("0") ? `254${number.slice(1)}` : number;
}

function createSmsUri(message) {
  const recipients = OWNER_CONTACTS.map(toInternationalPhone).join(",");
  return `sms:${recipients}?body=${encodeURIComponent(message)}`;
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventType = document.getElementById("eventType").value;
  const guests = Number(document.getElementById("guests").value);
  const packageType = document.getElementById("packageType").value;
  const eventDate = document.getElementById("eventDate").value;
  const notes = document.getElementById("notes").value.trim() || "No additional notes";

  const basePerGuest = packagePricing[packageType] ?? packagePricing.silver;
  const eventFactor = eventMultipliers[eventType] ?? 1;
  const estimatedTotal = Math.round(guests * basePerGuest * eventFactor);

  const bookingSummary = [
    "NEW MARIANA CATERERS BOOKING",
    `Client Name: ${name}`,
    `Client Phone: ${phone}`,
    `Event Type: ${eventType || "Not specified"}`,
    `Event Date: ${eventDate}`,
    `Guests: ${guests}`,
    `Package: ${packageType}`,
    `Estimated Total: ${formatCurrency(estimatedTotal)}`,
    `Notes: ${notes}`
  ].join("\n");

  const smsUri = createSmsUri(bookingSummary);

  quoteResult.classList.add("visible");
  quoteResult.textContent = `Thank you, ${name}! Your ${eventType || "event"} booking for ${guests} guests on ${eventDate} has been received. Estimated catering cost: ${formatCurrency(estimatedTotal)}. An SMS draft with your full booking details is now prepared for Mariana Caterers owners (${OWNER_CONTACTS.join(" / ")}).`;

  smsActions.hidden = false;
  smsLink.href = smsUri;

  // Try opening the phone SMS app automatically after booking.
  window.location.href = smsUri;

  bookingForm.reset();
});
