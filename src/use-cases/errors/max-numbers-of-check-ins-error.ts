export class MaxNumbersOfCheckInError extends Error{
    constructor(){
        super("Max Number of check-ins reached.");
    }
}