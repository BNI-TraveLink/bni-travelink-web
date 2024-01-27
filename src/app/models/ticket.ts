export interface Ticket {
    skTicket:     string;
    ticketNumber: null;
    isActive:     boolean;
    createdAt:    Date;
    updatedAt:    null;
    transaction:  Transaction;
}

export interface Transaction {
    skTransaction: string;
    customer:      Customer;
    service:       Service;
    createdAt:     Date;
    expiredAt:     Date;
    departure:     string;
    destination:   string;
    amount:        number;
    updatedAt:     null;
    active:        boolean;
}

export interface Customer {
    sk_customer: string;
    name:        string;
    fkLogin:     FkLogin;
}

export interface FkLogin {
    skLogin:             string;
    accountNumber:       string;
    userId:              string;
    transactionPassword: string;
    mpin:                string;
    jwt:                 null;
}

export interface Service {
    skService: string;
    price:     number;
    name:      string;
}
