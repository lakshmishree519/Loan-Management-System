import { LoanApplication } from "./loan-application.model";
import { User } from "./user.model";

export interface Feedback {

    feedbackId?: number;
    user?: User;
    loanApplication?: LoanApplication; 
    feedback?:Feedback;
    feedbackText?: string;
    date?: Date;
}


