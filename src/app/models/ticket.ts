export interface Ticket {
    skTransaction: string;
    customer:      Customer;
    service:       Service;
    createdAt:     Date;
    expiredAt:     Date;
    departure:     string;
    destination:   string;
    amount:        number;
    updatedAt:     Date | null;
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
