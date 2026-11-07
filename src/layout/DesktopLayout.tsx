import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRightFromSquare, Gear, Moon, Sun } from "@gravity-ui/icons";
import { AsideHeader } from "@gravity-ui/navigation";
import { Button, Icon } from "@gravity-ui/uikit";

import { useAuth } from "../auth/AuthContext";
import { useThemeMode } from "../app/ThemeModeProvider";
import { SECTIONS } from "../app/navigation";
import { student } from "../data/mock";

type DesktopLayoutProps = React.PropsWithChildren<{
    activeSection: string;
}>;

const COMPACT_STORAGE_KEY = "lk.aside.compact";

export function DesktopLayout({ activeSection, children }: DesktopLayoutProps) {
    const navigate = useNavigate();
    const { login, signOut } = useAuth();
    const { theme, toggleTheme } = useThemeMode();

    const [compact, setCompact] = React.useState(() => {
        try {
            return window.localStorage.getItem(COMPACT_STORAGE_KEY) === "1";
        } catch {
            return false;
        }
    });

    const onChangeCompact = React.useCallback((next: boolean) => {
        setCompact(next);
        try {
            window.localStorage.setItem(COMPACT_STORAGE_KEY, next ? "1" : "0");
        } catch {
            // ignore
        }
    }, []);

    const menuItems = React.useMemo(
        () =>
            SECTIONS.map((section) => ({
                id: section.id,
                title: section.title,
                icon: section.icon,
                current: section.id === activeSection,
                onItemClick: () => navigate(section.path),
            })),
        [activeSection, navigate]
    );

    const onSignOut = () => {
        signOut();
        navigate("/login", { replace: true });
    };

    return (
        <AsideHeader
            logo={{
                text: "Личный кабинет",
                iconSrc: `${import.meta.env.BASE_URL}logo_rgb_rus_abb_V 1.png`,
                iconSize: 32,
                onClick: () => navigate("/dashboard"),
            }}
            compact={compact}
            onChangeCompact={onChangeCompact}
            menuItems={menuItems}
            headerDecoration
            collapseTitle="Свернуть меню"
            expandTitle="Развернуть меню"
            renderContent={() => (
                <div className="app-content">
                    <div className="app-content__inner">{children}</div>
                </div>
            )}
            renderFooter={({ compact: isCompact }) =>
                isCompact ? (
                    <div className="aside-footer aside-footer__row_compact">
                        <Button view="flat" size="l" width="max" title="Сменить тему" onClick={toggleTheme}>
                            <Icon data={theme === "dark" ? Sun : Moon} size={18} />
                        </Button>
                        <Button view="flat" size="l" width="max" title="Настройки" onClick={() => navigate("/contacts")}>
                            <Icon data={Gear} size={18} />
                        </Button>
                        <Button view="flat" size="l" width="max" title="Выйти" onClick={onSignOut}>
                            <Icon data={ArrowRightFromSquare} size={18} />
                        </Button>
                    </div>
                ) : (
                    <div className="aside-footer">
                        <div className="aside-footer__row">
                            <div className="aside-footer__user">
                                <span className="aside-footer__name">{student.fullName}</span>
                                <span className="aside-footer__role">
                                    {student.group} · {login}
                                </span>
                            </div>
                        </div>
                        <div className="aside-footer__row">
                            <Button view="flat" size="m" onClick={toggleTheme}>
                                <Button.Icon>
                                    <Icon data={theme === "dark" ? Sun : Moon} size={16} />
                                </Button.Icon>
                                {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
                            </Button>
                            <Button view="flat" size="m" title="Выйти" onClick={onSignOut}>
                                <Button.Icon>
                                    <Icon data={ArrowRightFromSquare} size={16} />
                                </Button.Icon>
                            </Button>
                        </div>
                    </div>
                )
            }
        />
    );
}
