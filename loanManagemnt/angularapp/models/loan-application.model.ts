import { Loan } from "./loan.model";
import { User } from "./user.model";

export interface LoanApplication {
    loanApplicationId?: number;
    user?: User;
    loan?: Loan;
    submissionDate?: string;
    institution?: string;
    hasFeedback?:number;
    course?: string;
    tuitionFee?: number;
    loanStatus?: number;
    address?: string;
    file?: string;
    
    
}
