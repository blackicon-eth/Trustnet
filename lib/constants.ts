export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export const TRUSTNET_CONTRACT_ADDRESS =
  "0x51E90A8ac166E12d2DC44979F8474674F48C053A";

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
    userFid: 4461,
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
    userFid: 189636,
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
    userFid: 4461,
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
    userFid: 189636,
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

export const mockTakenLoans = [
  {
    id: 1,
    userFid: 215293,
    title: "Personal Loan",
    description: "Loan for personal expenses.",
    loanImageUrl: "https://picsum.photos/200/307",
    amount: 1200,
    collateralPercentage: 75,
    interestPercentage: 8,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 2,
    userFid: 4461,
    title: "Business Expansion Loan",
    description: "Loan to expand business operations.",
    loanImageUrl: "https://picsum.photos/200/308",
    amount: 3000,
    collateralPercentage: 85,
    interestPercentage: 10,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 3,
    userFid: 189636,
    title: "Wedding Loan",
    description: "Loan to cover wedding expenses.",
    loanImageUrl: "https://picsum.photos/200/309",
    amount: 5000,
    collateralPercentage: 90,
    interestPercentage: 12,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 4,
    userFid: 215293,
    title: "Vacation Loan",
    description: "Loan for a family vacation.",
    loanImageUrl: "https://picsum.photos/200/310",
    amount: 2500,
    collateralPercentage: 80,
    interestPercentage: 9,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
];

export const mockOfferedLoans = [
  {
    id: 1,
    userFid: 4461,
    title: "Student Loan",
    description: "Loan offered for educational purposes.",
    loanImageUrl: "https://picsum.photos/200/311",
    amount: 2000,
    collateralPercentage: 70,
    interestPercentage: 7,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 2,
    userFid: 189636,
    title: "Home Improvement Loan",
    description: "Loan offered for home renovations.",
    loanImageUrl: "https://picsum.photos/200/312",
    amount: 3500,
    collateralPercentage: 85,
    interestPercentage: 11,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 3,
    userFid: 215293,
    title: "Auto Loan",
    description: "Loan offered for purchasing a vehicle.",
    loanImageUrl: "https://picsum.photos/200/313",
    amount: 4500,
    collateralPercentage: 88,
    interestPercentage: 10,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 4,
    userFid: 4461,
    title: "Debt Consolidation Loan",
    description: "Loan offered to consolidate debts.",
    loanImageUrl: "https://picsum.photos/200/314",
    amount: 5000,
    collateralPercentage: 90,
    interestPercentage: 13,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
  {
    id: 5,
    userFid: 189636,
    title: "Emergency Loan",
    description: "Loan offered for emergency expenses.",
    loanImageUrl: "https://picsum.photos/200/315",
    amount: 1500,
    collateralPercentage: 75,
    interestPercentage: 9,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
];
