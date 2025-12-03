export class UserUtil {
  private static readonly TOKEN_KEY = "token";

  public static saveToken(token: string): void {
    sessionStorage.setItem(UserUtil.TOKEN_KEY, token);
  }

  public static getToken(): string | null {
    return sessionStorage.getItem(UserUtil.TOKEN_KEY);
  }

  public static isAuthenticated(): boolean {
    return !!UserUtil.getToken();
  }

  public static removeToken(): void {
    sessionStorage.removeItem(UserUtil.TOKEN_KEY);
  }
}
