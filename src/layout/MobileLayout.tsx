import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRightFromSquare, Moon, Sun } from "@gravity-ui/icons";
import { MobileHeader } from "@gravity-ui/navigation";
import { Button, Icon, Text } from "@gravity-ui/uikit";

import { useAuth } from "../auth/AuthContext";
import { useThemeMode } from "../app/ThemeModeProvider";
import { SECTIONS } from "../app/navigation";
import { student } from "../data/mock";

type MobileLayoutProps = React.PropsWithChildren<{
    activeSection: string;
}>;

export function MobileLayout({ activeSection, children }: MobileLayoutProps) {
    const navigate = useNavigate();
    const { login, signOut } = useAuth();
    const { theme, toggleTheme } = useThemeMode();

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
        <MobileHeader
            logo={{
                text: "",
                onClick: () => navigate("/dashboard"),
            }}
            burgerMenu={{
                items: menuItems,
                renderFooter: () => (
                    <div className="mobile-menu-footer">
                        <div className="mobile-menu-footer__user">
                            <span className="mobile-menu-footer__avatar">{student.firstName.charAt(0)}</span>
                            <div className="text-block">
                                <span className="mobile-menu-footer__name">{student.fullName}</span>
                                <span className="mobile-menu-footer__role">
                                    {student.group} · {login}
                                </span>
                            </div>
                        </div>
                        <Button view="outlined" size="l" width="max" onClick={toggleTheme}>
                            <Button.Icon>
                                <Icon data={theme === "dark" ? Sun : Moon} size={16} />
                            </Button.Icon>
                            {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
                        </Button>
                        <Button view="flat" size="l" width="max" onClick={onSignOut}>
                            <Button.Icon>
                                <Icon data={ArrowRightFromSquare} size={16} />
                            </Button.Icon>
                            Выйти
                        </Button>
                    </div>
                ),
            }}
            sideItemRenderContent={() => (
                <Text variant="caption-2" color="secondary" as="div" style={{ textAlign: "center", marginTop: 24 }}>
                    МАУ
                </Text>
            )}
            renderContent={() => (
                <div className="app-content app-content_mobile">
                    <div className="app-content__inner">{children}</div>
                    <Text variant="caption-2" color="secondary" as="div" style={{ textAlign: "center", marginTop: 24 }}>
                        Мурманский арктический университет · {new Date().getFullYear()}
                    </Text>
                </div>
            )}
        />
    );
}

export const MOBILE_HEADER_OFFSET = 52;
