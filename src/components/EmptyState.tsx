import React from 'react';

import {Text} from '@gravity-ui/uikit';

type EmptyStateProps = {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
};

export function EmptyState({icon, title, description, action}: EmptyStateProps) {
    return (
        <div className="empty-state">
            {icon && <span className="empty-state__icon">{icon}</span>}
            <Text variant="subheader-1">{title}</Text>
            {description && (
                <Text variant="body-1" color="secondary">
                    {description}
                </Text>
            )}
            {action}
        </div>
    );
}
