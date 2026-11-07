import React from 'react';

import {CircleCheck, CirclePlus, PaperPlane, Star} from '@gravity-ui/icons';
import {Button, Dialog, Icon, Text, TextInput} from '@gravity-ui/uikit';

import {toaster} from '../app/toaster';
import {ResponsiveTable, type ResponsibleColumn} from '../components/ResponsiveTable';
import {StatusLabel} from '../components/StatusLabel';
import {Surface} from '../components/Surface';
import {PageShell} from '../layout/PageShell';
import type {SectionConfig} from '../app/navigation';
import {
    achievements,
    professionalAchievements,
    student,
    workExperience,
    type Achievement,
    type PortfolioCategory,
} from '../data/mock';

type PortfolioPageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

const CATEGORY_TITLES: Record<PortfolioCategory, string> = {
    academic: 'Учебная деятельность',
    research: 'Научно-исследовательская деятельность',
    sport: 'Спортивная деятельность',
    creative: 'Культурно-творческая деятельность',
    social: 'Общественная деятельность',
    professional: 'Профессиональная деятельность',
};

export function PortfolioPage({section, subsectionId, isMobile}: PortfolioPageProps) {
    const active = (subsectionId ?? section.subsections?.[0]?.id ?? 'academic') as PortfolioCategory;

    const [extra, setExtra] = React.useState<Partial<Record<PortfolioCategory, Achievement[]>>>({});
    const [addOpen, setAddOpen] = React.useState(false);
    const [pgasOpen, setPgasOpen] = React.useState(false);

    const addAchievement = (achievement: Achievement) => {
        setExtra((current) => ({
            ...current,
            [active]: [...(current[active] ?? []), achievement],
        }));
    };

    return (
        <PageShell
            section={section}
            subsectionId={active}
            isMobile={isMobile}
            subtitle={CATEGORY_TITLES[active]}
            actions={
                <>
                    <Button view="outlined" size="l" onClick={() => setAddOpen(true)}>
                        <Button.Icon>
                            <Icon data={CirclePlus} size={16} />
                        </Button.Icon>
                        Добавить достижение
                    </Button>
                    <Button view="action" size="l" onClick={() => setPgasOpen(true)}>
                        <Button.Icon>
                            <Icon data={PaperPlane} size={16} />
                        </Button.Icon>
                        Отправить в комиссию ПГАС
                    </Button>
                </>
            }
        >
            {active === 'professional' ? (
                <ProfessionalSubsection />
            ) : (
                <AchievementsSubsection
                    category={active}
                    rows={[...achievements[active], ...(extra[active] ?? [])]}
                />
            )}

            <AddAchievementDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={(values) => {
                    addAchievement({
                        id: `ach-new-${Date.now()}`,
                        title: values.title,
                        rank: values.rank || 'Участник',
                        type: values.type || 'Мероприятие',
                        place: values.place || '—',
                        date: values.date || '—',
                        supervisor: values.supervisor || '—',
                        verified: false,
                    });
                    setAddOpen(false);
                    toaster.add({
                        name: 'achievement-added',
                        title: 'Достижение добавлено',
                        content: 'Оно появится в портфолио после проверки сотрудником института.',
                        theme: 'success',
                        autoHiding: 4000,
                    });
                }}
            />

            <Dialog open={pgasOpen} onOpenChange={setPgasOpen} hasCloseButton>
                <div className="modal-body">
                    <Text variant="header-1">Отправить портфолио в комиссию ПГАС</Text>
                    <Text variant="body-1" color="secondary">
                        Проверенные достижения из всех разделов портфолио будут переданы в комиссию
                        по назначению повышенной стипендии. Отправка не требует бумажных документов.
                    </Text>
                    <div className="notice notice_success">
                        <span className="notice__icon">
                            <Icon data={CircleCheck} size={18} />
                        </span>
                        <div className="notice__body">
                            <Text variant="subheader-1">Проверено достижений: 9 из 14</Text>
                            <Text variant="body-1" color="secondary">
                                Непроверенные записи можно дополнить и отправить позже.
                            </Text>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <Button view="flat" size="l" onClick={() => setPgasOpen(false)}>
                            Отмена
                        </Button>
                        <Button
                            view="action"
                            size="l"
                            onClick={() => {
                                setPgasOpen(false);
                                toaster.add({
                                    name: 'pgas-sent',
                                    title: 'Портфолио отправлено',
                                    content: 'Заявка передана в комиссию ПГАС. Статус — «На рассмотрении».',
                                    theme: 'success',
                                    autoHiding: 4500,
                                });
                            }}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </Dialog>
        </PageShell>
    );
}

const achievementColumns: ResponsibleColumn<Achievement>[] = [
    {id: 'title', title: 'Наименование', render: (row) => <Text variant="body-2">{row.title}</Text>},
    {id: 'rank', title: 'Ранг', render: (row) => row.rank, width: '150px'},
    {id: 'type', title: 'Тип работы', render: (row) => row.type, width: '170px'},
    {id: 'place', title: 'Место проведения', render: (row) => row.place, width: '180px'},
    {id: 'date', title: 'Дата', render: (row) => row.date, width: '110px', hideOnMobile: true},
    {
        id: 'supervisor',
        title: 'Руководитель',
        render: (row) => row.supervisor,
        width: '190px',
    },
    {
        id: 'verified',
        title: 'Проверено',
        width: '130px',
        align: 'right',
        render: (row) =>
            row.verified ? (
                <StatusLabel text="Проверено" tone="success" size="xs" />
            ) : (
                <StatusLabel text="На проверке" tone="warning" size="xs" />
            ),
    },
];

function AchievementsSubsection({category, rows}: {category: PortfolioCategory; rows: Achievement[]}) {
    const verifiedCount = rows.filter((row) => row.verified).length;

    return (
        <Surface
            title={CATEGORY_TITLES[category]}
            subtitle={`Всего ${rows.length}, проверено ${verifiedCount}`}
            icon={<Icon data={Star} size={18} />}
        >
            <ResponsiveTable
                columns={achievementColumns}
                rows={rows}
                getRowId={(row) => row.id}
                renderMobileTitle={(row) => row.title}
                renderMobileBadge={(row) => (
                    <StatusLabel
                        text={row.verified ? 'Проверено' : 'На проверке'}
                        tone={row.verified ? 'success' : 'warning'}
                        size="xs"
                    />
                )}
                emptyText="Достижений в этом разделе пока нет"
            />
        </Surface>
    );
}

function ProfessionalSubsection() {
    return (
        <>
            <Surface
                title="Опыт работы"
                subtitle="Заполняется для сбора данных о работающих студентах"
                icon={<Icon data={Star} size={18} />}
            >
                <ResponsiveTable
                    rows={workExperience}
                    getRowId={(row) => row.id}
                    renderMobileTitle={(row) => row.position}
                    columns={[
                        {id: 'period', title: 'Период', render: (row) => row.period, width: '230px'},
                        {id: 'position', title: 'Должность', render: (row) => row.position},
                        {id: 'company', title: 'Место работы', render: (row) => row.company},
                        {id: 'address', title: 'Адрес', render: (row) => row.address, hideOnMobile: true},
                        {
                            id: 'verified',
                            title: 'Проверено',
                            width: '130px',
                            align: 'right',
                            render: (row) =>
                                row.verified ? (
                                    <StatusLabel text="Проверено" tone="success" size="xs" />
                                ) : (
                                    <StatusLabel text="На проверке" tone="warning" size="xs" />
                                ),
                        },
                    ]}
                />
            </Surface>

            <Surface
                title="Профессиональные достижения"
                subtitle="Не участвуют в назначении ПГАС"
                icon={<Icon data={Star} size={18} />}
            >
                <ResponsiveTable
                    rows={professionalAchievements}
                    getRowId={(row) => row.id}
                    renderMobileTitle={(row) => row.title}
                    columns={[
                        {id: 'title', title: 'Название', render: (row) => row.title},
                        {id: 'date', title: 'Дата', render: (row) => row.date, width: '130px'},
                        {
                            id: 'verified',
                            title: 'Проверено',
                            width: '130px',
                            align: 'right',
                            render: (row) =>
                                row.verified ? (
                                    <StatusLabel text="Проверено" tone="success" size="xs" />
                                ) : (
                                    <StatusLabel text="На проверке" tone="warning" size="xs" />
                                ),
                        },
                    ]}
                />
            </Surface>
        </>
    );
}

type AddAchievementValues = {
    title: string;
    rank: string;
    type: string;
    place: string;
    date: string;
    supervisor: string;
};

function AddAchievementDialog({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: AddAchievementValues) => void;
}) {
    const [values, setValues] = React.useState<AddAchievementValues>({
        title: '',
        rank: '',
        type: '',
        place: '',
        date: '',
        supervisor: '',
    });

    const update = (key: keyof AddAchievementValues) => (value: string) =>
        setValues((current) => ({...current, [key]: value}));

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()} hasCloseButton>
            <div className="modal-body modal-body_wide">
                <Text variant="header-1">Новое достижение</Text>
                <Text variant="body-1" color="secondary">
                    Достижение появится в портфолио и уйдёт на проверку сотруднику института.
                </Text>

                <div className="form-grid">
                    <div className="form-field form-field_full">
                        <span className="form-field__label">Наименование работы или мероприятия</span>
                        <TextInput
                            size="l"
                            value={values.title}
                            onUpdate={update('title')}
                            placeholder="Например, олимпиада по программированию"
                        />
                    </div>
                    <div className="form-field">
                        <span className="form-field__label">Ранг / результат</span>
                        <TextInput
                            size="l"
                            value={values.rank}
                            onUpdate={update('rank')}
                            placeholder="1 место, призёр, участник"
                        />
                    </div>
                    <div className="form-field">
                        <span className="form-field__label">Тип работы</span>
                        <TextInput
                            size="l"
                            value={values.type}
                            onUpdate={update('type')}
                            placeholder="Олимпиада, конкурс, конференция"
                        />
                    </div>
                    <div className="form-field">
                        <span className="form-field__label">Место проведения</span>
                        <TextInput
                            size="l"
                            value={values.place}
                            onUpdate={update('place')}
                            placeholder="Город, учреждение"
                        />
                    </div>
                    <div className="form-field">
                        <span className="form-field__label">Дата (ДД.ММ.ГГГГ)</span>
                        <TextInput
                            size="l"
                            value={values.date}
                            onUpdate={update('date')}
                            placeholder={new Date().toLocaleDateString('ru-RU')}
                        />
                    </div>
                    <div className="form-field form-field_full">
                        <span className="form-field__label">ФИО руководителя</span>
                        <TextInput
                            size="l"
                            value={values.supervisor}
                            onUpdate={update('supervisor')}
                            placeholder="Иванов Иван Иванович"
                        />
                    </div>
                </div>

                <Text variant="caption-2" color="secondary">
                    Студент: {student.fullName}, {student.group}
                </Text>

                <div className="modal-actions">
                    <Button view="flat" size="l" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button
                        view="action"
                        size="l"
                        disabled={!values.title.trim()}
                        onClick={() => {
                            onSubmit(values);
                            setValues({
                                title: '',
                                rank: '',
                                type: '',
                                place: '',
                                date: '',
                                supervisor: '',
                            });
                        }}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
