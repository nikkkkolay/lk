import React from 'react';

import {ClipboardButton} from '@gravity-ui/uikit';

export type DataListItem = {
    name: string;
    value: React.ReactNode;
    copyText?: string;
};

type DataListProps = {
    items: DataListItem[];
    /** Количество колонок на десктопе. */
    columns?: 1 | 2;
    className?: string;
};

/**
 * Список «поле — значение». На широких экранах — одна или две колонки,
 * на мобильных всегда одна колонка.
 */
export function DataList({items, columns = 1, className}: DataListProps) {
    return (
        <dl
            className={`data-list${columns === 2 ? ' data-list_2' : ''}${
                className ? ` ${className}` : ''
            }`}
        >
            {items.map((item) => (
                <div className="data-list__row" key={item.name}>
                    <dt className="data-list__name">{item.name}</dt>
                    <dd className="data-list__value">
                        <span className="data-list__text">{item.value}</span>
                        {item.copyText && (
                            <ClipboardButton
                                text={item.copyText}
                                size="s"
                                view="flat"
                                className="data-list__copy"
                            />
                        )}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
