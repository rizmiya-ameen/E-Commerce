
export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}


//Intl.NumberFormat: It's a built-in JavaScript object for formatting numbers according to language-specific conventions, including currency formatting.

// return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);:

// Creates a new instance of the Intl.NumberFormat object, configured for:
// Locale: 'en-US' (US English)
// Style: 'currency' (for formatting as currency)
// Currency: 'USD' (US dollar)
// Calls the format method on this object, passing the amount to be formatted.
// Returns the formatted string representing the currency value.
