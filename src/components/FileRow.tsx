import React from 'react';

import {ArrowDownToLine, FileText} from '@gravity-ui/icons';
import {Button, Text} from '@gravity-ui/uikit';

import {toaster} from '../app/toaster';

type FileRowProps = {
    title: string;
    description?: string;
    meta?: string;
    fileName?: string;
    actionLabel?: string;
};

export function FileRow({
    title,
    description,
    meta,
    fileName,
    actionLabel = 'Скачать',
}: FileRowProps) {
    const onDownload = () => {
        toaster.add({
            name: `download-${title}`,
            title: 'Демо-режим',
            content: fileName
                ? `Файл «${fileName}» будет доступен после подключения API.`
                : 'Загрузка документов станет доступна после подключения API.',
            theme: 'info',
            autoHiding: 4000,
        });
    };

    return (
        <div className="file-row">
            <span className="file-row__icon">
                <FileText width={20} height={20} />
            </span>
            <div className="file-row__main">
                <span className="file-row__title">{title}</span>
                {description && (
                    <Text variant="body-1" color="secondary">
                        {description}
                    </Text>
                )}
                {meta && <span className="file-row__meta">{meta}</span>}
            </div>
            <Button view="outlined" size="m" onClick={onDownload}>
                <Button.Icon>
                    <ArrowDownToLine width={16} height={16} />
                </Button.Icon>
                {actionLabel}
            </Button>
        </div>
    );
}
