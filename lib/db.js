import { MongoClient } from "mongodb";

export async function connectoDatabase() {
    const client = await MongoClient.connect('mongodb+srv://aris-worktech:LamKdB6OA59xuIuV@aris-platform.q5tedxv.mongodb.net/aris-platform?retryWrites=true&w=majority');
    return client;
}