import React from 'react';

import {PageHeader} from './PageHeader';
import type {SectionConfig} from '../app/navigation';

type PageShellProps = React.PropsWithChildren<{
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
    hideTabs?: boolean;
}>;

export function PageShell({
    section,
    subsectionId,
    isMobile,
    title,
    subtitle,
    actions,
    hideTabs,
    children,
}: PageShellProps) {
    return (
        <div className="page">
            <PageHeader
                section={section}
                activeSubsection={subsectionId}
                isMobile={isMobile}
                title={title}
                subtitle={subtitle}
                actions={actions}
                hideTabs={hideTabs}
            />
            <div className="page__content">{children}</div>
        </div>
    );
}
