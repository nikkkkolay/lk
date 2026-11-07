import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {SectionTabs} from './SectionTabs';
import {getSectionUrl, type SectionConfig} from '../app/navigation';

type PageHeaderProps = {
    section: SectionConfig;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    activeSubsection?: string;
    actions?: React.ReactNode;
    isMobile?: boolean;
    /** Скрыть табы подразделов (например, на дашборде). */
    hideTabs?: boolean;
};

export function PageHeader({
    section,
    title,
    subtitle,
    activeSubsection,
    actions,
    isMobile,
    hideTabs,
}: PageHeaderProps) {
    const showTabs = !hideTabs && Boolean(section.subsections?.length);

    return (
        <div className="page__header-wrap">
            {isMobile ? (
                <div className="page__header">
                    <div className="page__title-wrap">
                        <Text variant="header-1" as="h1" className="page__title">
                            {title ?? section.title}
                        </Text>
                        {subtitle ? (
                            <Text variant="body-1" color="secondary" className="page__subtitle">
                                {subtitle}
                            </Text>
                        ) : null}
                    </div>
                    {actions ? <div className="page__actions">{actions}</div> : null}
                </div>
            ) : (
                <div className="page__header">
                    <div className="page__title-wrap">
                        <Text variant="header-2" as="h1" className="page__title">
                            {title ?? section.title}
                        </Text>
                        <Text variant="body-1" color="secondary" className="page__subtitle">
                            {subtitle ?? section.description}
                        </Text>
                    </div>
                    {actions ? <div className="page__actions">{actions}</div> : null}
                </div>
            )}

            {showTabs && (
                <SectionTabs
                    isMobile={isMobile}
                    activeId={activeSubsection}
                    items={(section.subsections ?? []).map((subsection) => ({
                        id: subsection.id,
                        title: subsection.title,
                        to: getSectionUrl(section, subsection.id),
                    }))}
                />
            )}
        </div>
    );
}
