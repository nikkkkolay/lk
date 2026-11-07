import React from 'react';

import {Check, CircleDashed, Clock, TriangleExclamation} from '@gravity-ui/icons';
import {Text} from '@gravity-ui/uikit';

import {BYPASS_STATUS, StatusLabel} from './StatusLabel';

export type BypassStatus = 'done' | 'problem' | 'waiting' | 'not-started';

type BypassItem = {
    id: string;
    title: string;
    note: string;
    status: BypassStatus;
};

const ICONS: Record<BypassStatus, React.ReactNode> = {
    done: <Check width={16} height={16} />,
    problem: <TriangleExclamation width={16} height={16} />,
    waiting: <Clock width={16} height={16} />,
    'not-started': <CircleDashed width={16} height={16} />,
};

export function BypassSheet({items}: {items: BypassItem[]}) {
    const done = items.filter((item) => item.status === 'done').length;
    const problems = items.filter((item) => item.status === 'problem').length;

    return (
        <div>
            <div className="inline" style={{marginBottom: 12}}>
                <Text variant="body-1" color="secondary">
                    Пройдено {done} из {items.length}
                </Text>
                {problems > 0 && (
                    <StatusLabel text={`${problems} проблема`} tone="danger" />
                )}
            </div>

            <div className="bypass">
                {items.map((item) => {
                    const status = BYPASS_STATUS[item.status];
                    return (
                        <div className="bypass__item" key={item.id}>
                            <span className={`bypass__marker bypass__marker_${item.status}`}>
                                {ICONS[item.status]}
                            </span>
                            <div className="bypass__body">
                                <div className="inline" style={{justifyContent: 'space-between'}}>
                                    <Text variant="subheader-1">{item.title}</Text>
                                    <StatusLabel text={status.text} tone={status.tone} />
                                </div>
                                <Text variant="body-1" color="secondary">
                                    {item.note}
                                </Text>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
