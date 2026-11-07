import React from 'react';

import {Text} from '@gravity-ui/uikit';

type SurfaceProps = React.PropsWithChildren<{
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'flat' | 'muted' | 'transparent';
    id?: string;
}>;

/**
 * Универсальная «карточка» контента: заголовок с иконкой, тело и футер.
 */
export function Surface({
    title,
    subtitle,
    icon,
    action,
    footer,
    className,
    variant = 'default',
    id,
    children,
}: SurfaceProps) {
    const variantClass =
        variant === 'flat'
            ? ' surface_flat'
            : variant === 'muted'
              ? ' surface_muted'
              : variant === 'transparent'
                ? ' surface_transparent'
                : '';

    return (
        <section className={`surface${variantClass}${className ? ` ${className}` : ''}`} id={id}>
            {(title || action) && (
                <div className="surface__header">
                    <div className="surface__title-wrap">
                        {icon && <span className="surface__icon">{icon}</span>}
                        <div className="text-block">
                            {title && (
                                <Text variant="subheader-2" as="h2" className="surface__title">
                                    {title}
                                </Text>
                            )}
                            {subtitle && (
                                <Text variant="caption-2" color="secondary" className="surface__subtitle">
                                    {subtitle}
                                </Text>
                            )}
                        </div>
                    </div>
                    {action}
                </div>
            )}
            {children}
            {footer && <div className="surface__footer">{footer}</div>}
        </section>
    );
}
