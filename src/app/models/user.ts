export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    password2: string;
    role: string;
    token: string;
    address?: string;  // Adresse
    postalCode?: string;  // PLZ
    city?: string;  // Ort
    healthInsurance?: string;  // Krankenkasse
    insuranceType?: string;  // Versicher
}  