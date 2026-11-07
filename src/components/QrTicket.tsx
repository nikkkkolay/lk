import React from 'react';

import QRCode from 'qrcode';

import {Text} from '@gravity-ui/uikit';

type QrTicketProps = {
    /** Данные, которые кодируются в QR. */
    payload: string;
    /** Крупный номер (номер студбилета). */
    number: string;
    fields: {label: string; value: React.ReactNode}[];
    hint?: string;
};

/**
 * Электронный студенческий билет: QR-код + сведения из билета.
 */
export function QrTicket({payload, number, fields, hint}: QrTicketProps) {
    const [dataUrl, setDataUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        let cancelled = false;

        QRCode.toDataURL(payload, {
            margin: 1,
            width: 400,
            color: {dark: '#0f1720', light: '#ffffff'},
        })
            .then((url) => {
                if (!cancelled) {
                    setDataUrl(url);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setDataUrl(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [payload]);

    return (
        <div className="qr-ticket">
            <div className="qr-ticket__qr">
                {dataUrl ? (
                    <img src={dataUrl} alt="QR-код электронного студенческого билета" />
                ) : (
                    <div style={{width: 180, height: 180}} />
                )}
                <span className="qr-ticket__hint">
                    {hint ?? 'Предъявите QR-код на вахте или при входе в корпус'}
                </span>
            </div>

            <div className="qr-ticket__body">
                <div>
                    <Text variant="caption-2" color="secondary">
                        Электронный студенческий билет
                    </Text>
                    <div className="qr-ticket__number">№ {number}</div>
                </div>

                <div className="qr-ticket__grid">
                    {fields.map((field) => (
                        <div className="qr-ticket__field" key={field.label}>
                            <span className="qr-ticket__label">{field.label}</span>
                            <span className="qr-ticket__value">{field.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
