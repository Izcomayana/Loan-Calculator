// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

// Calculate results
function calculateResults(e) {
  console.log("calculating...");

  e.preventDefault();
  //UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your numbers");
  }

  event.preventDefault();
}

// Show Error
function showError(error) {
  //Create a div
  const errorDiv = document.createElement("div");
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add a class
  errorDiv.className = 'alert alert-danger'
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
// Insert error above the heading
  card.insertBefore(errorDiv, heading);

// Clear error
setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('alert').remove();
}
