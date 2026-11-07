import React from 'react';

import {Envelope, Handset, Persons} from '@gravity-ui/icons';
import {Button, Icon, Link, Text} from '@gravity-ui/uikit';

import {Surface} from '../components/Surface';
import {PageShell} from '../layout/PageShell';
import type {SectionConfig} from '../app/navigation';
import {contactGroups} from '../data/mock';

type ContactsPageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

export function ContactsPage({section, subsectionId, isMobile}: ContactsPageProps) {
    return (
        <PageShell section={section} subsectionId={subsectionId} isMobile={isMobile} hideTabs>
            <div className="grid grid_2">
                {contactGroups.map((group) => (
                    <Surface
                        key={group.id}
                        title={group.title}
                        subtitle={group.description}
                        icon={<Icon data={Persons} size={18} />}
                        footer={
                            group.link ? (
                                <Button
                                    view="outlined"
                                    size="m"
                                    href={group.link.url}
                                    target="_blank"
                                >
                                    {group.link.label}
                                </Button>
                            ) : undefined
                        }
                    >
                        <div className="list">
                            {group.people.map((person) => (
                                <div className="list__item" key={person.id}>
                                    <div className="list__main">
                                        <Text variant="subheader-1">{person.name}</Text>
                                        <Text variant="body-1" color="secondary">
                                            {person.position}
                                        </Text>
                                        <div className="inline">
                                            {person.phone && (
                                                <Link href={`tel:${person.phone.replace(/[^\d+]/g, '')}`}>
                                                    <span className="inline" style={{gap: 4}}>
                                                        <Icon data={Handset} size={14} />
                                                        {person.phone}
                                                    </span>
                                                </Link>
                                            )}
                                            {person.email && (
                                                <Link href={`mailto:${person.email}`}>
                                                    <span className="inline" style={{gap: 4}}>
                                                        <Icon data={Envelope} size={14} />
                                                        {person.email}
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                        {person.extra && (
                                            <Text variant="caption-2" color="secondary">
                                                {person.extra}
                                            </Text>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>
                ))}
            </div>

            <div className="section-note">
                Если контакт устарел, сообщите в студенческий офис — мы обновим информацию.
                <Button view="outlined" size="s" href="mailto:info@mauniver.ru">
                    Сообщить
                </Button>
            </div>
        </PageShell>
    );
}
