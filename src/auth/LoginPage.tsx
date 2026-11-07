import React from "react";
import { useNavigate } from "react-router-dom";

import { CircleCheck, Moon, Sun } from "@gravity-ui/icons";
import { Button, Icon, Text, TextInput } from "@gravity-ui/uikit";

import { DEMO_CREDENTIALS } from "./credentials";
import { useAuth } from "./AuthContext";
import { useThemeMode } from "../app/ThemeModeProvider";

type LoginFormErrors = {
    login?: string;
    password?: string;
    common?: string;
};

/**
 * Страница входа. Пока без бэкенда: логин и пароль жёстко заданы
 * в src/auth/credentials.ts (admin / admin).
 */
export function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { theme, toggleTheme } = useThemeMode();

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<LoginFormErrors>({});
    const [loading, setLoading] = React.useState(false);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: LoginFormErrors = {};
        if (!login.trim()) {
            nextErrors.login = "Введите логин";
        }
        if (!password) {
            nextErrors.password = "Введите пароль";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        // Имитация запроса к API — оставляем небольшую задержку для обратной связи.
        window.setTimeout(() => {
            const ok = signIn({ login, password });
            setLoading(false);

            if (ok) {
                navigate("/dashboard", { replace: true });
            } else {
                setErrors({ common: "Неверный логин или пароль. Попробуйте ещё раз." });
            }
        }, 320);
    };

    return (
        <div className="login">
            <div className="login__panel">
                <aside className="login__promo">
                    <div className="login__brand">
                        <span className="login__logo">
                            <img src="logo_rgb_rus_abb_VW.png" alt="" />
                        </span>
                    </div>

                    <div className="login__promo-body">
                        <h1 className="login__promo-title">Вся учёба в одном месте — от зачётки до обходного листа</h1>
                        <p className="login__promo-text">
                            Расписание и оценки, электронный студенческий билет, стипендии, справки и платежи — без очередей и бумажных заявлений.
                        </p>
                    </div>

                    <div className="login__features">
                        <span className="login__feature">
                            <Icon data={CircleCheck} size={16} /> Электронная зачётная книжка и студбилет с QR-кодом
                        </span>
                        <span className="login__feature">
                            <Icon data={CircleCheck} size={16} /> Портфолио достижений и заявление на ПГАС онлайн
                        </span>
                        <span className="login__feature">
                            <Icon data={CircleCheck} size={16} /> Уведомления вуза, календарь событий и техподдержка
                        </span>
                    </div>
                </aside>

                <div className="login__form">
                    <div className="login__form-header">
                        <h2 className="login__form-title">Вход в кабинет кабинет</h2>
                        <Text variant="body-1" color="secondary">
                            Используйте учётную запись университета
                        </Text>
                    </div>

                    <form className="login__fields" onSubmit={onSubmit} noValidate>
                        <TextInput
                            size="l"
                            type="text"
                            placeholder="Введите логин"
                            value={login}
                            onUpdate={setLogin}
                            hasClear
                            autoComplete="username"
                            errorMessage={errors.login}
                            validationState={errors.login ? "invalid" : undefined}
                        />
                        <TextInput
                            size="l"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onUpdate={setPassword}
                            autoComplete="current-password"
                            errorMessage={errors.password}
                            validationState={errors.password ? "invalid" : undefined}
                        />

                        {errors.common && (
                            <Text variant="body-1" color="danger">
                                {errors.common}
                            </Text>
                        )}

                        <Button type="submit" view="action" size="l" width="max" loading={loading} disabled={loading}>
                            Войти
                        </Button>
                    </form>

                    <div className="login__hint">
                        Демо-доступ: логин <b>{DEMO_CREDENTIALS.login}</b>, пароль <b>{DEMO_CREDENTIALS.password}</b>
                    </div>
                </div>
            </div>

            <Button
                view="outlined"
                size="m"
                className="login__theme"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            >
                <Button.Icon>
                    <Icon data={theme === "dark" ? Sun : Moon} size={16} />
                </Button.Icon>
            </Button>
        </div>
    );
}
