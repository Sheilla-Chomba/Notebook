export interface User{
    user_id: string;
    name: string;
    email: string;
    phone_number: string;
    role: string;
    password: string;
    profile_image?: string;
    location?: string;
}