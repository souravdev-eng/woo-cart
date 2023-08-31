import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from '../types/subject';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    protected ackWait: number;
    private client;
    constructor(client: Stan);
    subscriptionOption(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseData(msg: Message): any;
}
export {};
