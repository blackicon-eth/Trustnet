export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

// TODO: remove this
export const mockRequestedLoans = [
  {
    id: 1,
    userFid: 215293,
    title: "Car Loan",
    description: "Loan for purchasing a new electric car.",
    loanImageUrl: "https://picsum.photos/200/301",
    amount: 1500,
    collateralPercentage: 85,
    interestPercentage: 9,
    deadline: 1754435200, // unix timestamp 1 month from now
  },
  {
    id: 2,
    userFid: 215293,
    title: "House Renovation Loan",
    description: "Loan to renovate my old house.",
    loanImageUrl: "https://picsum.photos/200/302",
    amount: 2000,
    collateralPercentage: 92,
    interestPercentage: 14,
    deadline: 1757435200, // unix timestamp 1 month from now
  },
  {
    id: 3,
    userFid: 215293,
    title: "Startup Loan",
    description: "Funding for a new tech startup.",
    loanImageUrl: "https://picsum.photos/200/303",
    amount: 5000,
    collateralPercentage: 88,
    interestPercentage: 11,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 4,
    userFid: 215293,
    title: "Education Loan",
    description: "Loan to cover university tuition fees.",
    loanImageUrl: "https://picsum.photos/200/304",
    amount: 3000,
    collateralPercentage: 80,
    interestPercentage: 10,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 5,
    userFid: 215293,
    title: "Travel Loan",
    description: "Loan for a world tour vacation.",
    loanImageUrl: "https://picsum.photos/200/305",
    amount: 2500,
    collateralPercentage: 87,
    interestPercentage: 13,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 6,
    userFid: 215293,
    title: "Medical Loan",
    description: "Loan for medical expenses.",
    loanImageUrl: "https://picsum.photos/200/306",
    amount: 4000,
    collateralPercentage: 90,
    interestPercentage: 12,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
];
