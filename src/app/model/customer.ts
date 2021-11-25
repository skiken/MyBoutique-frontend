import { Address } from './address';

export class Customer {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    telephone: String;
    username: String;
    password: String;
    matchingPassword: String;
    address: Address;
}