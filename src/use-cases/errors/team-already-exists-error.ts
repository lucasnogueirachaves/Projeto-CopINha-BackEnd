export class TeamAlreadyExistsError extends Error {
    constructor() {
        super('Já existe esse time no sistema.')
    }
}