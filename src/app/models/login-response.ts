export interface LoginResponse {
    accessToken: string;
    refreshToken: string | null;
    tokenType: string;
    expiresIn: number;
}