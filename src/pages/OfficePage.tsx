import React from 'react';

import {
    Calendar,
    CircleCheck,
    CircleExclamation,
    CirclePlus,
    ListCheck,
    FileText,
    Receipt,
    SealPercent,
    Wallet,
} from '@gravity-ui/icons';
import {Button, Dialog, Icon, Select, Text, TextInput} from '@gravity-ui/uikit';

import {toaster} from '../app/toaster';
import {BypassSheet} from '../components/BypassSheet';
import {EmptyState} from '../components/EmptyState';
import {Notice} from '../components/Notice';
import {PaymentCard} from '../components/PaymentCard';
import {ResponsiveTable, type ResponsibleColumn} from '../components/ResponsiveTable';
import {ORDER_STATUS, StatusLabel} from '../components/StatusLabel';
import {Surface} from '../components/Surface';
import {PageShell} from '../layout/PageShell';
import type {SectionConfig} from '../app/navigation';
import {
    academicDebts,
    bypassSheet,
    certificateRequests,
    orders,
    pgasApplication,
    payments,
    scholarship,
    scholarshipHistory,
    type AcademicDebt,
    type CertificateRequest,
    type OrderItem,
} from '../data/mock';

type OfficePageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

export function OfficePage({section, subsectionId, isMobile}: OfficePageProps) {
    const active = subsectionId ?? section.subsections?.[0]?.id ?? 'debts';

    return (
        <PageShell section={section} subsectionId={active} isMobile={isMobile}>
            {active === 'debts' && <DebtsSubsection />}
            {active === 'scholarships' && <ScholarshipsSubsection />}
            {active === 'orders' && <OrdersSubsection />}
            {active === 'certificates' && <CertificatesSubsection />}
            {active === 'payments' && <PaymentsSubsection isMobile={isMobile} />}
            {active === 'bypass' && <BypassSubsection />}
        </PageShell>
    );
}

const debtColumns: ResponsibleColumn<AcademicDebt>[] = [
    {id: 'course', title: 'Курс', render: (row) => row.course, width: '80px'},
    {id: 'semester', title: 'Семестр', render: (row) => row.semester, width: '220px'},
    {id: 'discipline', title: 'Дисциплина', render: (row) => <Text variant="body-2">{row.discipline}</Text>},
    {id: 'teacher', title: 'Преподаватель', render: (row) => row.teacher, width: '230px'},
    {id: 'deadline', title: 'Срок закрытия', render: (row) => row.deadline, width: '150px'},
];

function DebtsSubsection() {
    return (
        <>
            {academicDebts.length === 0 ? (
                <Surface>
                    <EmptyState
                        icon={<Icon data={CircleCheck} size={28} />}
                        title="Академических задолженностей нет"
                        description="Все дисциплины закрыты. Так держать!"
                    />
                </Surface>
            ) : (
                <>
                    <Notice
                        tone="danger"
                        icon={<Icon data={CircleExclamation} size={20} />}
                        title={`Задолженностей: ${academicDebts.length}`}
                    >
                        Закройте задолженность до {academicDebts[0].deadline}, иначе не будет допуска к
                        сессии.
                    </Notice>

                    <Surface
                        title="Перечень задолженностей"
                        icon={<Icon data={ListCheck} size={18} />}
                    >
                        <ResponsiveTable
                            columns={debtColumns}
                            rows={academicDebts}
                            getRowId={(row) => row.id}
                            renderMobileTitle={(row) => row.discipline}
                            renderMobileBadge={() => <StatusLabel text="Долг" tone="danger" size="xs" />}
                        />
                    </Surface>
                </>
            )}
        </>
    );
}

function ScholarshipsSubsection() {
    const [formOpen, setFormOpen] = React.useState(false);
    const deadlineDate = parseDate(pgasApplication.deadline);
    const isOpen = pgasApplication.open && deadlineDate.getTime() > Date.now();

    return (
        <>
            <div className="grid grid_2">
                <Surface
                    title="Текущая стипендия"
                    icon={<Icon data={SealPercent} size={18} />}
                    action={<StatusLabel text="Назначена" tone="success" />}
                >
                    <div className="metric">
                        <span className="metric__value">{scholarship.amount.toLocaleString('ru-RU')} ₽</span>
                        <span className="metric__hint">
                            {scholarship.title} · {scholarship.period}
                        </span>
                        <Text variant="caption-2" color="secondary">
                            {scholarship.basis}
                        </Text>
                    </div>
                </Surface>

                <Surface
                    title="Повышенная стипендия (ПГАС)"
                    icon={<Icon data={CirclePlus} size={18} />}
                >
                    {isOpen ? (
                        <>
                            <Text variant="body-1" color="secondary">
                                {pgasApplication.description}
                            </Text>
                            <div className="inline" style={{marginTop: 12}}>
                                <StatusLabel text={`Приём до ${pgasApplication.deadline}`} tone="warning" />
                                <Button view="action" size="m" onClick={() => setFormOpen(true)}>
                                    Подать заявление
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Notice tone="warning" icon={<Icon data={Calendar} size={18} />}>
                            Приём заявлений закрыт {pgasApplication.deadline}. Следующая волна — в
                            декабре.
                        </Notice>
                    )}
                </Surface>
            </div>

            <Surface title="История назначений" icon={<Icon data={Receipt} size={18} />}>
                <div className="list">
                    {scholarshipHistory.map((item) => (
                        <div className="list__item" key={item.id}>
                            <div className="list__main">
                                <Text variant="subheader-1">{item.type}</Text>
                                <Text variant="body-1" color="secondary">
                                    {item.period} · {item.basis}
                                </Text>
                            </div>
                            <div className="list__aside">
                                <Text variant="subheader-1" className="nowrap">
                                    {item.amount.toLocaleString('ru-RU')} ₽
                                </Text>
                                <StatusLabel
                                    text={item.action}
                                    tone={item.status === 'active' ? 'success' : 'normal'}
                                    size="xs"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Surface>

            <PgasDialog
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmitted={() => {
                    setFormOpen(false);
                    toaster.add({
                        name: 'pgas-application',
                        title: 'Заявление отправлено',
                        content: 'Заявка ушла на модерацию ответственному по институту.',
                        theme: 'success',
                        autoHiding: 4500,
                    });
                }}
            />
        </>
    );
}

function PgasDialog({
    open,
    onClose,
    onSubmitted,
}: {
    open: boolean;
    onClose: () => void;
    onSubmitted: () => void;
}) {
    const [criterion, setCriterion] = React.useState('research');
    const [comment, setComment] = React.useState('');

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()} hasCloseButton>
            <div className="modal-body">
                <Text variant="header-1">Заявление на повышенную стипендию</Text>
                <Text variant="body-1" color="secondary">
                    Приём заявлений открыт до {pgasApplication.deadline}. Документы из портфолио
                    подтянутся автоматически.
                </Text>

                <div className="form-field">
                    <span className="form-field__label">Основание</span>
                    <Select
                        width="max"
                        size="l"
                        value={[criterion]}
                        onUpdate={(value) => setCriterion(value[0])}
                        options={[
                            {value: 'academic', content: 'Учебная деятельность'},
                            {value: 'research', content: 'Научно-исследовательская деятельность'},
                            {value: 'sport', content: 'Спортивная деятельность'},
                            {value: 'creative', content: 'Культурно-творческая деятельность'},
                            {value: 'social', content: 'Общественная деятельность'},
                        ]}
                    />
                </div>

                <div className="form-field">
                    <span className="form-field__label">Комментарий (необязательно)</span>
                    <TextInput
                        size="l"
                        value={comment}
                        onUpdate={setComment}
                        placeholder="Уточнения для комиссии"
                    />
                </div>

                <div className="notice">
                    <span className="notice__icon">
                        <Icon data={FileText} size={18} />
                    </span>
                    <div className="notice__body">
                        <Text variant="body-1" color="secondary">
                            К заявлению будут приложены проверенные достижения из портфолио.
                        </Text>
                    </div>
                </div>

                <div className="modal-actions">
                    <Button view="flat" size="l" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button view="action" size="l" onClick={onSubmitted}>
                        Отправить заявление
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

const orderColumns: ResponsibleColumn<OrderItem>[] = [
    {id: 'number', title: 'Номер', render: (row) => row.number, width: '120px'},
    {id: 'date', title: 'Дата', render: (row) => row.date, width: '120px'},
    {id: 'motivation', title: 'Мотивировка', render: (row) => <Text variant="body-2">{row.motivation}</Text>},
];

function OrdersSubsection() {
    const [selected, setSelected] = React.useState<OrderItem | null>(null);

    return (
        <>
            <Surface
                title="Приказы"
                subtitle="Приказы по студенческому составу"
                icon={<Icon data={FileText} size={18} />}
            >
                <ResponsiveTable
                    columns={[
                        ...orderColumns,
                        {
                            id: 'view',
                            title: '',
                            width: '130px',
                            align: 'right',
                            render: (row) => (
                                <Button view="flat" size="s" onClick={() => setSelected(row)}>
                                    Просмотреть
                                </Button>
                            ),
                        },
                    ]}
                    rows={orders}
                    getRowId={(row) => row.id}
                    renderMobileTitle={(row) => `№ ${row.number} от ${row.date}`}
                    renderMobileBadge={(row) => (
                        <Button view="flat" size="s" onClick={() => setSelected(row)}>
                            Просмотреть
                        </Button>
                    )}
                />
            </Surface>

            <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} hasCloseButton>
                <div className="modal-body">
                    <Text variant="header-1">Приказ № {selected?.number}</Text>
                    <Text variant="body-1" color="secondary">
                        от {selected?.date} · {selected?.motivation}
                    </Text>
                    <Text variant="body-2">{selected?.content}</Text>
                    <div className="modal-actions">
                        <Button
                            view="outlined"
                            size="l"
                            onClick={() =>
                                toaster.add({
                                    name: 'order-download',
                                    title: 'Демо-режим',
                                    content: 'Скан приказа будет доступен после подключения API.',
                                    theme: 'info',
                                    autoHiding: 3500,
                                })
                            }
                        >
                            Скачать копию
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

const certificateColumns: ResponsibleColumn<CertificateRequest>[] = [
    {id: 'type', title: 'Тип справки', render: (row) => <Text variant="body-2">{row.type}</Text>},
    {id: 'format', title: 'Формат', render: (row) => row.format, width: '190px'},
    {id: 'createdAt', title: 'Создана', render: (row) => row.createdAt, width: '120px'},
    {
        id: 'status',
        title: 'Статус',
        width: '140px',
        align: 'right',
        render: (row) => (
            <StatusLabel
                text={ORDER_STATUS[row.status].text}
                tone={ORDER_STATUS[row.status].tone}
                size="xs"
            />
        ),
    },
];

function CertificatesSubsection() {
    const [requestOpen, setRequestOpen] = React.useState(false);
    const [list, setList] = React.useState(certificateRequests);

    return (
        <>
            <Surface
                title="Справки"
                subtitle="Заявка на справку с места учёбы или справку-вызов"
                icon={<Icon data={FileText} size={18} />}
                action={
                    <Button view="action" size="m" onClick={() => setRequestOpen(true)}>
                        <Button.Icon>
                            <Icon data={CirclePlus} size={16} />
                        </Button.Icon>
                        Заказать справку
                    </Button>
                }
            >
                <ResponsiveTable
                    columns={certificateColumns}
                    rows={list}
                    getRowId={(row) => row.id}
                    renderMobileTitle={(row) => row.type}
                    renderMobileBadge={(row) => (
                        <StatusLabel
                            text={ORDER_STATUS[row.status].text}
                            tone={ORDER_STATUS[row.status].tone}
                            size="xs"
                        />
                    )}
                />
            </Surface>

            <Surface title="Как это работает" variant="muted">
                <ul className="docs-list">
                    <li>Электронная справка с ЭП придёт в личный кабинет и на корпоративную почту.</li>
                    <li>Бумажную справку можно забрать в студенческом офисе (каб. 101, корпус А).</li>
                    <li>Срок изготовления — до 3 рабочих дней.</li>
                </ul>
            </Surface>

            <CertificateRequestDialog
                open={requestOpen}
                onClose={() => setRequestOpen(false)}
                onSubmit={(type, format) => {
                    setList((current) => [
                        {
                            id: `cert-${Date.now()}`,
                            type,
                            format,
                            createdAt: new Date().toLocaleDateString('ru-RU'),
                            status: 'В обработке',
                        },
                        ...current,
                    ]);
                    setRequestOpen(false);
                    toaster.add({
                        name: 'certificate-request',
                        title: 'Заявка создана',
                        content: 'Справка появится в списке после изготовления.',
                        theme: 'success',
                        autoHiding: 4000,
                    });
                }}
            />
        </>
    );
}

function CertificateRequestDialog({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (type: string, format: CertificateRequest['format']) => void;
}) {
    const [type, setType] = React.useState('Справка с места учёбы');
    const [format, setFormat] = React.useState<CertificateRequest['format']>('Электронная с ЭП');

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()} hasCloseButton>
            <div className="modal-body">
                <Text variant="header-1">Заказ справки</Text>

                <div className="form-field">
                    <span className="form-field__label">Тип справки</span>
                    <Select
                        width="max"
                        size="l"
                        value={[type]}
                        onUpdate={(value) => setType(value[0])}
                        options={[
                            {value: 'Справка с места учёбы', content: 'Справка с места учёбы'},
                            {value: 'Справка-вызов на сессию', content: 'Справка-вызов на сессию'},
                            {value: 'Справка для военкомата', content: 'Справка для военкомата'},
                        ]}
                    />
                </div>

                <div className="form-field">
                    <span className="form-field__label">Формат</span>
                    <Select
                        width="max"
                        size="l"
                        value={[format]}
                        onUpdate={(value) => setFormat(value[0] as CertificateRequest['format'])}
                        options={[
                            {value: 'Электронная с ЭП', content: 'Электронная с ЭП'},
                            {value: 'Бумажная', content: 'Бумажная'},
                        ]}
                    />
                </div>

                <div className="modal-actions">
                    <Button view="flat" size="l" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button view="action" size="l" onClick={() => onSubmit(type, format)}>
                        Создать заявку
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

function PaymentsSubsection({isMobile}: {isMobile?: boolean}) {
    const total = payments.reduce((sum, item) => sum + item.amount, 0);
    const overdue = payments.filter((item) => item.status === 'overdue');
    const pending = payments.filter((item) => item.status === 'pending' || item.status === 'upcoming');

    return (
        <>
            <div className="grid grid_3">
                <Surface title="К оплате" variant="muted">
                    <div className="metric">
                        <span className="metric__value">
                            {total.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="metric__hint">за все периоды</span>
                    </div>
                </Surface>
                <Surface title="Просрочено" variant="muted">
                    <div className="metric">
                        <span className="metric__value">
                            {overdue.reduce((sum, item) => sum + item.amount, 0).toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="metric__hint">
                            {overdue.length > 0 ? 'оплатите как можно скорее' : 'просрочек нет'}
                        </span>
                    </div>
                </Surface>
                <Surface title="Ожидает оплаты" variant="muted">
                    <div className="metric">
                        <span className="metric__value">{pending.length}</span>
                        <span className="metric__hint">платежа в этом семестре</span>
                    </div>
                </Surface>
            </div>

            {overdue.length > 0 && (
                <Notice
                    tone="danger"
                    icon={<Icon data={CircleExclamation} size={20} />}
                    title="Есть просроченная задолженность"
                >
                    {overdue.map((item) => `${item.title} · ${item.period}`).join('; ')}. Погасите долг,
                    чтобы избежать проблем с заселением в общежитие.
                </Notice>
            )}

            <div className={isMobile ? 'stack' : 'grid grid_2'}>
                {payments.map((payment) => (
                    <PaymentCard key={payment.id} {...payment} />
                ))}
            </div>

            <Surface title="Реквизиты и подтверждение" variant="muted">
                <div className="inline">
                    <Icon data={Wallet} size={16} />
                    <Text variant="body-1" color="secondary">
                        Онлайн-платёж проходит через защищённый шлюз. Подтверждение платежа
                        сохраняется в личном кабинете.
                    </Text>
                </div>
            </Surface>
        </>
    );
}

function BypassSubsection() {
    return (
        <>
            <Notice tone="warning" icon={<Icon data={CircleExclamation} size={20} />} title="Обходной лист активен">
                Отметки проставляются автоматически подразделениями. Проблемные пункты нужно закрыть
                вручную.
            </Notice>

            <Surface
                title="Электронный обходной лист"
                subtitle="Период: осенний семестр 2026/2027"
                icon={<Icon data={ListCheck} size={18} />}
            >
                <BypassSheet items={bypassSheet} />
            </Surface>
        </>
    );
}

function parseDate(value: string): Date {
    const [day, month, year] = value.split('.').map(Number);
    return new Date(year, month - 1, day);
}
