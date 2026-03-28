document.getElementById("year").textContent = new Date().getFullYear();

const bookingForm = document.getElementById("booking-form");
const quoteResult = document.getElementById("quote-result");

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

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const eventType = document.getElementById("eventType").value;
  const guests = Number(document.getElementById("guests").value);
  const packageType = document.getElementById("packageType").value;
  const eventDate = document.getElementById("eventDate").value;

  const basePerGuest = packagePricing[packageType] ?? packagePricing.silver;
  const eventFactor = eventMultipliers[eventType] ?? 1;
  const estimatedTotal = Math.round(guests * basePerGuest * eventFactor);

  quoteResult.classList.add("visible");
  quoteResult.textContent = `Thank you, ${name}! Your ${eventType || "event"} booking for ${guests} guests on ${eventDate} has been received. Estimated catering cost: ${formatCurrency(estimatedTotal)}. Our team will contact you within 24 hours to confirm your menu and venue details.`;

  bookingForm.reset();
});
