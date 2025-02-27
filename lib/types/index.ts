export interface SafeAreaInsets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface RequestedLoan {
  id: number;
  userFid: number;
  title: string;
  description: string;
  loanImageUrl: string;
  amount: number;
  collateralPercentage: number;
  interestPercentage: number;
  deadline: number;
}
