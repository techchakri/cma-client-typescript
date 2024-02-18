export class TokenUtil {

    private static SESSION_TOKEN_KEY = "contact-mgr-react-jwt-key";

    public static saveTokenToSession (token: string): void {
        sessionStorage.setItem(this.SESSION_TOKEN_KEY, token);
    }

    public static getToken(): string | null {
        return sessionStorage.getItem(this.SESSION_TOKEN_KEY);
    }

    public static isLoggedIn(): boolean {
        const token: string | null = this.getToken();
        return !!token;
    }

    public static deleteTokenFromSession(): void {
        sessionStorage.removeItem(this.SESSION_TOKEN_KEY)
    } 
}