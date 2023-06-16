export default abstract class Authorization {

    abstract getAuthorizationHeader(): HeadersInit;
}