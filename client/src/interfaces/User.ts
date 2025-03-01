export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    triviapoints: number,
    correctTriviaCount: number,
    totalTriviaCount: number,
    correctRiddleCount: number,
    totalRiddleCount: number,
}