import React from 'react';

import {Text} from '@gravity-ui/uikit';

export type NoticeTone = 'default' | 'danger' | 'warning' | 'success';

type NoticeProps = {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    children?: React.ReactNode;
    tone?: NoticeTone;
    action?: React.ReactNode;
};

export function Notice({icon, title, children, tone = 'default', action}: NoticeProps) {
    const toneClass = tone === 'default' ? '' : ` notice_${tone}`;

    return (
        <div className={`notice${toneClass}`}>
            {icon && <span className="notice__icon">{icon}</span>}
            <div className="notice__body">
                {title && <Text variant="subheader-1">{title}</Text>}
                {children && (
                    <Text variant="body-1" color="secondary">
                        {children}
                    </Text>
                )}
            </div>
            {action}
        </div>
    );
}
