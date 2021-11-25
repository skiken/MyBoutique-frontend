import { Address } from './address';
import { OrderItem } from './orderItem';

export class Order{
    
    id: number;
	
	totalPrice: number;

	status: string;

	shipped: Date;

	paymentId:number; 

	orderItems:OrderItem[];


    
}