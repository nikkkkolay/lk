import React from 'react';
import {useNavigate} from 'react-router-dom';

import {
    ArrowUpRightFromSquare,
    Calendar,
    CircleExclamation,
    Clock,
    Envelope,
    GraduationCap,
    ListCheck,
    Persons,
    QrCode,
    Receipt,
    SealPercent,
    Wrench,
} from '@gravity-ui/icons';
import {Button, Icon, Label, Text} from '@gravity-ui/uikit';

import {Notice} from '../components/Notice';
import {StatusLabel} from '../components/StatusLabel';
import {Surface} from '../components/Surface';
import {
    academicDebts,
    announcements,
    averageGrade,
    monitoringItems,
    news,
    paymentDebt,
    scholarship,
    student,
    supportContacts,
    unreadMessages,
    upcomingEvents,
} from '../data/mock';

const NEWS_SOURCE_TONE = {
    Новости: 'info',
    'СМИ о нас': 'utility',
    Объявления: 'warning',
} as const;

export function DashboardPage() {
    const navigate = useNavigate();

    const totalUnread = unreadMessages.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="page">
            <section className="hero">
                <div className="hero__content">
                    <div className="hero__text">
                        <span className="hero__eyebrow">
                            {getGreeting()}, {student.firstName}!
                        </span>
                        <h1 className="hero__title">
                            {student.group} · {student.course} курс
                        </h1>
                        <div className="hero__meta">
                            <span className="hero__chip">
                                <Icon data={GraduationCap} size={14} />
                                {student.direction}
                            </span>
                            <span className="hero__chip">{student.form} форма обучения</span>
                        </div>
                    </div>

                    <div className="hero__actions">
                        <Button
                            view="normal"
                            size="l"
                            className="hero__button"
                            onClick={() => navigate('/study/student-id')}
                        >
                            <Button.Icon>
                                <Icon data={QrCode} size={16} />
                            </Button.Icon>
                            Студбилет
                        </Button>
                        <Button
                            view="normal"
                            size="l"
                            className="hero__button"
                            onClick={() => navigate('/study/gradebook')}
                        >
                            Зачётная книжка
                        </Button>
                    </div>
                </div>

                <div className="hero__stats">
                    <div className="hero__stat">
                        <span className="hero__stat-value">{averageGrade.toFixed(1)}</span>
                        <span className="hero__stat-label">Средний балл</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">{academicDebts.length}</span>
                        <span className="hero__stat-label">Академических задолженности</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">{paymentDebt.amount.toLocaleString('ru-RU')} ₽</span>
                        <span className="hero__stat-label">Долг по оплате</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">{totalUnread}</span>
                        <span className="hero__stat-label">Непрочитанных сообщений</span>
                    </div>
                </div>
            </section>

            <div className="grid grid_wide">
                <div className="stack">
                    <Surface
                        title="Непрочитанные сообщения"
                        subtitle="Электронная почта и ЭИОС"
                        icon={<Icon data={Envelope} size={18} />}
                        action={
                            <Button view="flat" size="m" onClick={() => navigate('/links')}>
                                Подробнее
                            </Button>
                        }
                    >
                        <div className="list">
                            {unreadMessages.map((item) => (
                                <div className="list__item" key={item.id}>
                                    <span className="list__dot" />
                                    <div className="list__main">
                                        <Text variant="subheader-1">{item.service}</Text>
                                        <Text variant="body-1" color="secondary">
                                            {item.detail}
                                        </Text>
                                    </div>
                                    <div className="list__aside">
                                        <Label theme="info" size="s">
                                            {item.count}
                                        </Label>
                                        <Button
                                            view="flat"
                                            size="s"
                                            onClick={() =>
                                                navigate(item.id === 'mail' ? '/links' : '/links')
                                            }
                                        >
                                            Перейти
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>

                    <Surface
                        title="Календарь событий"
                        subtitle="Мероприятия института на ближайший месяц"
                        icon={<Icon data={Calendar} size={18} />}
                        action={
                            <Button view="flat" size="m" onClick={() => navigate('/links')}>
                                Все мероприятия
                            </Button>
                        }
                    >
                        <div className="list">
                            {upcomingEvents.map((event) => (
                                <div className="list__item" key={event.id}>
                                    <div className="date-badge">
                                        <span className="date-badge__date">{event.date}</span>
                                        <span className="date-badge__time">{event.time}</span>
                                    </div>
                                    <div className="list__main">
                                        <Text variant="subheader-1">{event.title}</Text>
                                        <Text variant="body-1" color="secondary">
                                            {event.place}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>

                    <Surface
                        title="Новости и объявления"
                        subtitle="Сайт университета за текущую неделю"
                        icon={<Icon data={ListCheck} size={18} />}
                        action={
                            <Button
                                view="flat"
                                size="m"
                                onClick={() => navigate('/links')}
                            >
                                Все новости
                            </Button>
                        }
                    >
                        <div className="list">
                            {news.map((item) => (
                                <div className="list__item" key={item.id}>
                                    <div className="list__main">
                                        <Text variant="body-2" as="div">
                                            {item.title}
                                        </Text>
                                        <div className="list__meta">
                                            <StatusLabel
                                                text={item.source}
                                                tone={NEWS_SOURCE_TONE[item.source]}
                                                size="xs"
                                            />
                                            <Text variant="caption-2" color="secondary">
                                                {item.date}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="list__aside">
                                        <Button view="flat" size="s" aria-label="Открыть новость">
                                            <Icon data={ArrowUpRightFromSquare} size={14} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>
                </div>

                <div className="stack">
                    {academicDebts.length > 0 && (
                        <Notice
                            tone="danger"
                            icon={<Icon data={CircleExclamation} size={20} />}
                            title="Есть академическая задолженность"
                        >
                            {academicDebts[0].discipline} · {academicDebts[0].semester}. Срок
                            закрытия — {academicDebts[0].deadline}.
                        </Notice>
                    )}

                    <Surface
                        title="Задолженность по оплате"
                        icon={<Icon data={Receipt} size={18} />}
                        action={
                            <Button view="flat" size="m" onClick={() => navigate('/office/payments')}>
                                К платежам
                            </Button>
                        }
                    >
                        <div className="metric">
                            <span className="metric__value">
                                {paymentDebt.amount.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="metric__hint">
                                {paymentDebt.title} · {paymentDebt.period}
                            </span>
                            <span className="inline">
                                <StatusLabel
                                    text={`Просрочено на ${paymentDebt.overdueDays} дн.`}
                                    tone="danger"
                                />
                                <Text variant="caption-2" color="secondary">
                                    Оплатить до {paymentDebt.dueDate}
                                </Text>
                            </span>
                        </div>
                    </Surface>

                    <Surface
                        title="Моя стипендия"
                        icon={<Icon data={SealPercent} size={18} />}
                        action={
                            <Button
                                view="flat"
                                size="m"
                                onClick={() => navigate('/office/scholarships')}
                            >
                                Подробнее
                            </Button>
                        }
                    >
                        <div className="metric">
                            <span className="metric__value">
                                {scholarship.amount.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="metric__hint">
                                {scholarship.title} · {scholarship.period}
                            </span>
                            <Text variant="caption-2" color="secondary">
                                {scholarship.basis}
                            </Text>
                        </div>
                    </Surface>

                    <Surface title="Техническая поддержка" icon={<Icon data={Wrench} size={18} />}>
                        <div className="list">
                            {supportContacts.map((contact) => (
                                <div className="list__item" key={contact.id}>
                                    <div className="list__main">
                                        <Text variant="subheader-1">{contact.title}</Text>
                                        <Text variant="body-1" color="secondary">
                                            {contact.description}
                                        </Text>
                                        <Text variant="caption-2" color="secondary">
                                            {contact.phone} · {contact.email}
                                        </Text>
                                    </div>
                                    <div className="list__aside">
                                        <Button
                                            view="outlined"
                                            size="s"
                                            onClick={() => navigate('/contacts')}
                                        >
                                            Контакты
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>

                    <Surface
                        title="Объявления"
                        icon={<Icon data={Persons} size={18} />}
                        footer={
                            <Button
                                view="outlined"
                                size="m"
                                href={announcements.url}
                                target="_blank"
                            >
                                <Button.Icon>
                                    <Icon data={ArrowUpRightFromSquare} size={14} />
                                </Button.Icon>
                                Открыть раздел в ЭИОС
                            </Button>
                        }
                    >
                        <Text variant="body-1" color="secondary">
                            {announcements.text}
                        </Text>
                    </Surface>

                    <Surface
                        title="Мониторинг"
                        subtitle="Анкеты, которые нужно пройти"
                        icon={<Icon data={Clock} size={18} />}
                    >
                        <div className="list">
                            {monitoringItems.map((item) => (
                                <div className="list__item" key={item.id}>
                                    <div className="list__main">
                                        <Text variant="body-2" as="div">
                                            {item.title}
                                        </Text>
                                        <div className="list__meta">
                                            <Text variant="caption-2" color="secondary">
                                                {item.deadline}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="list__aside">
                                        {item.status === 'done' ? (
                                            <StatusLabel text="Пройдена" tone="success" size="xs" />
                                        ) : (
                                            <Button
                                                view="outlined"
                                                size="s"
                                                href={item.url}
                                                target="_blank"
                                            >
                                                Пройти
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Surface>
                </div>
            </div>

        </div>
    );
}

function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 5) {
        return 'Доброй ночи';
    }
    if (hour < 12) {
        return 'Доброе утро';
    }
    if (hour < 18) {
        return 'Добрый день';
    }

    return 'Добрый вечер';
}
