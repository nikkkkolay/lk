import React from 'react';

import {Label} from '@gravity-ui/uikit';

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'utility' | 'normal';

const TONE_TO_LABEL_THEME: Record<
    StatusTone,
    'success' | 'warning' | 'danger' | 'info' | 'utility' | 'normal'
> = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    info: 'info',
    utility: 'utility',
    normal: 'normal',
};

type StatusLabelProps = {
    text: React.ReactNode;
    tone?: StatusTone;
    size?: 'xs' | 's' | 'm';
};

export function StatusLabel({text, tone = 'normal', size = 's'}: StatusLabelProps) {
    return (
        <Label theme={TONE_TO_LABEL_THEME[tone]} size={size}>
            {text}
        </Label>
    );
}

export const ORDER_STATUS: Record<string, {text: string; tone: StatusTone}> = {
    Готова: {text: 'Готова', tone: 'success'},
    'В обработке': {text: 'В обработке', tone: 'warning'},
};

export const PAYMENT_STATUS: Record<string, {text: string; tone: StatusTone}> = {
    paid: {text: 'Оплачено', tone: 'success'},
    pending: {text: 'Ожидает оплаты', tone: 'warning'},
    overdue: {text: 'Просрочено', tone: 'danger'},
    upcoming: {text: 'Предстоит', tone: 'normal'},
};

export const BYPASS_STATUS: Record<string, {text: string; tone: StatusTone}> = {
    done: {text: 'Отмечено', tone: 'success'},
    problem: {text: 'Есть проблема', tone: 'danger'},
    waiting: {text: 'На проверке', tone: 'warning'},
    'not-started': {text: 'Не получено', tone: 'normal'},
};
