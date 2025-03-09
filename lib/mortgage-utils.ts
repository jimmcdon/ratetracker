export function calculateMortgage(loanAmount: number, annualInterestRate: number, loanTermYears: number): number {
  const monthlyInterestRate = annualInterestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  return monthlyPayment
}

export function calculateMortgageRange(
  loanAmount: number,
  currentRate: number,
  loanTermYears: number,
): { rate: number; payment: number }[] {
  const results = []
  for (let reduction = 0.125; reduction <= 2; reduction += 0.125) {
    const newRate = currentRate - reduction
    if (newRate > 0) {
      const payment = calculateMortgage(loanAmount, newRate, loanTermYears)
      results.push({ rate: newRate, payment })
    }
  }
  return results
}

export function calculateInterestRate(loanAmount: number, monthlyPayment: number, loanTermYears: number): number {
  const numberOfPayments = loanTermYears * 12
  let low = 0
  let high = 100
  let guess: number
  let guessPayment: number

  while (high - low > 0.0001) {
    guess = (low + high) / 2
    guessPayment = calculateMortgage(loanAmount, guess, loanTermYears)

    if (guessPayment > monthlyPayment) {
      high = guess
    } else {
      low = guess
    }
  }

  return guess
}

