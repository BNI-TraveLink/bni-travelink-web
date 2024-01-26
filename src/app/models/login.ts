export class Login{
    sk_Login:string;
    accountNumber:string;
    userId:string;
    transactionPassword:string;
    mpin:string;
    jwt:string;

    constructor(sk_Login:string, accountNumber:string, userId:string, transactionPassword:string,mpin:string, jwt:string ){
        this.sk_Login = sk_Login;
        this.accountNumber = accountNumber;
        this.userId = userId;
        this.transactionPassword = transactionPassword;
        this.mpin = mpin;
        this.jwt = jwt;
    }
}