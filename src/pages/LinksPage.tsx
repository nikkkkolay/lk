import React from 'react';

import {
    ArrowUpRightFromSquare,
    BookOpen,
    Calendar,
    Comment,
    Envelope,
    House,
    LayoutList,
    Persons,
    PlugConnection,
} from '@gravity-ui/icons';
import {Button, Icon, Text} from '@gravity-ui/uikit';
import type {IconProps} from '@gravity-ui/uikit';

import {PageShell} from '../layout/PageShell';
import type {SectionConfig} from '../app/navigation';
import {usefulLinks} from '../data/mock';

type LinksPageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

const LINK_ICONS: Record<string, IconProps['data']> = {
    'link-1': Calendar,
    'link-2': PlugConnection,
    'link-3': Persons,
    'link-4': BookOpen,
    'link-5': House,
    'link-6': Calendar,
    'link-7': LayoutList,
    'link-8': Envelope,
};

export function LinksPage({section, subsectionId, isMobile}: LinksPageProps) {
    return (
        <PageShell section={section} subsectionId={subsectionId} isMobile={isMobile} hideTabs>
            <div className="grid grid_3 grid_mobile_1">
                {usefulLinks.map((link) => {
                    const LinkIcon = LINK_ICONS[link.id] ?? Comment;

                    return (
                        <a
                            key={link.id}
                            className="quick-card"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="quick-card__top">
                                <span className="surface__icon">
                                    <Icon data={LinkIcon} size={18} />
                                </span>
                                <Icon data={ArrowUpRightFromSquare} size={16} className="quick-card__arrow" />
                            </div>
                            <div className="text-block">
                                <span className="quick-card__title">{link.title}</span>
                                <Text variant="body-1" color="secondary" className="quick-card__text">
                                    {link.description}
                                </Text>
                            </div>
                            <Text variant="body-1" color="brand">
                                {link.action}
                            </Text>
                        </a>
                    );
                })}
            </div>

            <div className="section-note">
                Не нашли нужный сервис? Напишите в техническую поддержку — подскажем, где искать.
                <Button view="outlined" size="s" href="mailto:info@mauniver.ru">
                    Написать в поддержку
                </Button>
            </div>
        </PageShell>
    );
}
