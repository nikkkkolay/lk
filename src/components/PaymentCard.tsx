import React from 'react';

import {CircleCheck, FileText} from '@gravity-ui/icons';
import {Button, Text} from '@gravity-ui/uikit';

import {toaster} from '../app/toaster';
import {StatusLabel, PAYMENT_STATUS} from './StatusLabel';

export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'upcoming';

type PaymentCardProps = {
    id: string;
    title: string;
    period: string;
    amount: number;
    dueDate: string;
    status: PaymentStatus;
};

function formatMoney(value: number) {
    return `${value.toLocaleString('ru-RU')} ₽`;
}

export function PaymentCard({title, period, amount, dueDate, status}: PaymentCardProps) {
    const statusMeta = PAYMENT_STATUS[status];

    const notify = (message: string) => {
        toaster.add({
            name: `payment-${title}-${period}`,
            title: message,
            theme: 'info',
            autoHiding: 3500,
        });
    };

    return (
        <article className={`payment-card${status === 'overdue' ? ' payment-card_overdue' : ''}`}>
            <div className="payment-card__top">
                <Text variant="subheader-1">{title}</Text>
                <StatusLabel text={statusMeta.text} tone={statusMeta.tone} />
            </div>

            <div>
                <div className="payment-card__amount">{formatMoney(amount)}</div>
                <div className="payment-card__meta">
                    <span>{period}</span>
                    <span>Оплатить до {dueDate}</span>
                </div>
            </div>

            <div className="payment-card__actions">
                {status === 'paid' ? (
                    <Button
                        view="outlined"
                        size="m"
                        onClick={() => notify('Подтверждение платежа будет доступно после подключения API')}
                    >
                        <Button.Icon>
                            <CircleCheck width={16} height={16} />
                        </Button.Icon>
                        Подтверждение
                    </Button>
                ) : (
                    <>
                        <Button
                            view="action"
                            size="m"
                            onClick={() => notify('Оплата будет доступна после подключения платёжного шлюза')}
                        >
                            Оплатить онлайн
                        </Button>
                        <Button
                            view="outlined"
                            size="m"
                            onClick={() => notify('Квитанция будет доступна после подключения API')}
                        >
                            <Button.Icon>
                                <FileText width={16} height={16} />
                            </Button.Icon>
                            Квитанция
                        </Button>
                    </>
                )}
            </div>
        </article>
    );
}
