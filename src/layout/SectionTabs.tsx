import React from 'react';
import {NavLink} from 'react-router-dom';

export type SectionTabItem = {
    id: string;
    title: string;
    to: string;
};

type SectionTabsProps = {
    items: SectionTabItem[];
    activeId?: string;
    isMobile?: boolean;
};

export function SectionTabs({items, activeId, isMobile}: SectionTabsProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav className={`section-tabs${isMobile ? ' section-tabs_mobile' : ''}`} aria-label="Подразделы">
            <div className="section-tabs__list" role="tablist">
                {items.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.to}
                        role="tab"
                        aria-selected={item.id === activeId}
                        className={({isActive}) =>
                            `section-tab${isActive || item.id === activeId ? ' section-tab_active' : ''}`
                        }
                    >
                        {item.title}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
