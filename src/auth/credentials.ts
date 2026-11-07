/**
 * Демо-учётные данные для входа в личный кабинет.
 * Пока авторизация жёстко зашита: admin / admin.
 * При подключении реального бэкенда этот файл заменяется на вызов API.
 */
export const DEMO_CREDENTIALS = {
    login: 'admin',
    password: 'admin',
} as const;

export type Credentials = {
    login: string;
    password: string;
};

export function validateCredentials({login, password}: Credentials): boolean {
    return (
        login.trim().toLowerCase() === DEMO_CREDENTIALS.login &&
        password === DEMO_CREDENTIALS.password
    );
}
