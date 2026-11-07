import React from 'react';

import {Text} from '@gravity-ui/uikit';

export type ResponsibleColumn<T> = {
    id: string;
    title: string;
    render: (row: T) => React.ReactNode;
    /** Скрыть колонку в мобильной карточке. */
    hideOnMobile?: boolean;
    /** Ширина колонки для таблицы. */
    width?: string;
    align?: 'left' | 'right';
};

type ResponsiveTableProps<T> = {
    columns: ResponsibleColumn<T>[];
    rows: T[];
    getRowId: (row: T) => string;
    /** Заголовок мобильной карточки. Если не указан — первая колонка. */
    renderMobileTitle?: (row: T) => React.ReactNode;
    /** Правый верхний угол мобильной карточки (статус, оценка). */
    renderMobileBadge?: (row: T) => React.ReactNode;
    /** Показывать таблицу на мобильных вместо карточек. */
    forceTable?: boolean;
    className?: string;
    emptyText?: string;
};

/**
 * Единая реализация списка: таблица на десктопе, карточки на мобилке.
 * Данные при этом описываются один раз — в колонках.
 */
export function ResponsiveTable<T>({
    columns,
    rows,
    getRowId,
    renderMobileTitle,
    renderMobileBadge,
    forceTable = false,
    className,
    emptyText = 'Пока нет данных',
}: ResponsiveTableProps<T>) {
    if (rows.length === 0) {
        return (
            <Text variant="body-1" color="secondary">
                {emptyText}
            </Text>
        );
    }

    const mobileColumns = columns.filter((column) => !column.hideOnMobile);
    const fieldColumns = renderMobileTitle ? mobileColumns : mobileColumns.slice(1);

    return (
        <>
            <div className={`table-wrap responsive-table__desktop${forceTable ? ' responsive-table__desktop_forced' : ''}`}>
                <table className={`data-table${className ? ` ${className}` : ''}`}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    style={{
                                        width: column.width,
                                        textAlign: column.align === 'right' ? 'right' : undefined,
                                    }}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={getRowId(row)}>
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        style={{
                                            textAlign: column.align === 'right' ? 'right' : undefined,
                                        }}
                                    >
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!forceTable && (
                <div className="responsive-table__mobile cards-list">
                    {rows.map((row) => (
                        <article className="row-card" key={getRowId(row)}>
                            <div className="row-card__header">
                                <div className="row-card__title">
                                    {renderMobileTitle
                                        ? renderMobileTitle(row)
                                        : mobileColumns[0]?.render(row)}
                                </div>
                                {renderMobileBadge?.(row)}
                            </div>
                            <div className="row-card__grid">
                                {fieldColumns.map((column) => (
                                    <div className="row-card__field" key={column.id}>
                                        <span className="row-card__label">{column.title}</span>
                                        <span className="row-card__value">{column.render(row)}</span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}
