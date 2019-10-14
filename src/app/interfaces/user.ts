export interface User {
    id: string;
    name: string;
    image?: string;
    email: string;
    role?: string;
    weight?: number;
    height?: number;
    datebirth?: Date | null;
}
