/* Демонстрационные данные личного кабинета. Заменяются ответами API. */

export const student = {
    lastName: "Тестов",
    firstName: "Андрей",
    middleName: "Иванович",
    fullName: "Тестов Андрей Иванович",
    shortName: "Андрей",
    gender: "Мужской",
    birthDate: "14.05.2005",
    birthPlace: "г. Мурманск",
    group: "4Б-ИСТ-23-1",
    course: 4,
    recordBookNumber: "23-0147",
    studentCardNumber: "23-0147",
    status: "Студент",
    statusNote: "Учится на бюджете",
    institute: "Институт цифровых технологий",
    faculty: "Факультет информационных технологий",
    department: "Кафедра информационных систем и технологий",
    direction: "09.03.02 Информационные системы и технологии",
    profile: "Цифровые технологии в образовании",
    form: "Очная",
    admissionYear: "2023",
    studyPeriod: "2023 – 2027",
    address: "г. Мурманск, ул. Ленина, д. 12, кв. 45",
    hostelAddress: "г. Мурманск, ул. Спортивная, д. 13, комн. 305",
    militaryStatus: "Не военнообязан",
    email: "info@mauniver.ru",
    phone: "+7 (8152) 99-99-99",
    curator: "Иванов Иван Иванович",
} as const;

export const unreadMessages = [
    { id: "eios", service: "ЭИОС", detail: "Новые сообщения в курсах", count: 3 },
    { id: "mail", service: "Электронная почта", detail: "Письма от преподавателей", count: 12 },
];

export type EventItem = {
    id: string;
    date: string;
    time: string;
    title: string;
    place: string;
};

export const upcomingEvents: EventItem[] = [
    {
        id: "ev-1",
        date: "12 ноября",
        time: "18:00",
        title: "Открытая лекция «Нейросети в образовании»",
        place: "Аудитория 305, корпус А",
    },
    {
        id: "ev-2",
        date: "15 ноября",
        time: "16:30",
        title: "Встреча с работодателями ИТ-компаний региона",
        place: "Актовый зал",
    },
    {
        id: "ev-3",
        date: "21 ноября",
        time: "12:00",
        title: "Спортивный турнир «Арктическая осень»",
        place: "Спортивный комплекс МАУ",
    },
    {
        id: "ev-4",
        date: "28 ноября",
        time: "19:00",
        title: "Концерт студенческих объединений",
        place: "Актовый зал",
    },
];

export type NewsItem = {
    id: string;
    title: string;
    source: "Новости" | "СМИ о нас" | "Объявления";
    date: string;
};

export const news: NewsItem[] = [
    {
        id: "news-1",
        title: "Студенты МАУ победили на всероссийской олимпиаде по программированию",
        source: "Новости",
        date: "06.11.2026",
    },
    {
        id: "news-2",
        title: "Открыт набор в студенческий медиацентр университета",
        source: "Объявления",
        date: "05.11.2026",
    },
    {
        id: "news-3",
        title: "МАУ вошёл в топ-10 вузов Северо-Запада по цифровой экономике",
        source: "СМИ о нас",
        date: "03.11.2026",
    },
    {
        id: "news-4",
        title: "Приём заявлений на повышенную стипендию продлится до 20 ноября",
        source: "Объявления",
        date: "01.11.2026",
    },
    {
        id: "news-5",
        title: "В университете открылась новая лаборатория искусственного интеллекта",
        source: "Новости",
        date: "31.10.2026",
    },
];

export type AcademicDebt = {
    id: string;
    course: number;
    semester: string;
    discipline: string;
    teacher: string;
    deadline: string;
};

export const academicDebts: AcademicDebt[] = [
    {
        id: "debt-1",
        course: 3,
        semester: "Весенний семестр 2025/2026",
        discipline: "История России",
        teacher: "Иванов Иван Иванович",
        deadline: "20.11.2026",
    },
];

export const paymentDebt = {
    amount: 4200,
    title: "Задолженность по оплате общежития",
    period: "Октябрь 2026",
    dueDate: "15.10.2026",
    overdueDays: 23,
};

export const scholarship = {
    title: "Повышенная академическая стипендия",
    amount: 12500,
    period: "Ноябрь 2026",
    basis: "Приказ № 1204-ст от 01.11.2026",
    reason: "За достижения в научно-исследовательской деятельности",
};

export type SupportContact = {
    id: string;
    title: string;
    description: string;
    phone?: string;
    email?: string;
    chat?: string;
};

export const supportContacts: SupportContact[] = [
    {
        id: "support-eios",
        title: "Техподдержка ЭИОС",
        description: "Проблемы со входом и работой в электронной образовательной среде",
        phone: "+7 (8152) 99-99-99",
        email: "info@mauniver.ru",
        chat: "Чат поддержки ЭИОС",
    },
    {
        id: "support-hostel",
        title: "Техподдержка по общежитию",
        description: "Интернет, пропуска и электронные сервисы общежития",
        phone: "+7 (8152) 99-99-99",
        email: "info@mauniver.ru",
        chat: "Чат общежития",
    },
];

export type MonitoringItem = {
    id: string;
    title: string;
    deadline: string;
    status: "new" | "done";
    url: string;
};

export const monitoringItems: MonitoringItem[] = [
    {
        id: "mon-1",
        title: "Анкета удовлетворённости качеством образования — 2026",
        deadline: "до 30 ноября",
        status: "new",
        url: "https://mauniver.ru",
    },
    {
        id: "mon-2",
        title: "Мониторинг занятости выпускников",
        deadline: "до 15 декабря",
        status: "new",
        url: "https://mauniver.ru",
    },
    {
        id: "mon-3",
        title: "Опрос о качестве питания в столовой",
        deadline: "завершён 20.10.2026",
        status: "done",
        url: "https://mauniver.ru",
    },
];

export const announcements = {
    text: "Курсы-объявления по всем институтам и факультетам собраны в ЭИОС.",
    url: "https://mauniver.ru",
};

/* ---------- Основные сведения ---------- */

export const generalInfo = [
    { name: "ФИО", value: student.fullName, copyText: student.fullName },
    { name: "Пол", value: student.gender },
    { name: "Дата рождения", value: student.birthDate },
    { name: "Отношение к ВС", value: student.militaryStatus },
    { name: "Номер зачётной книжки", value: student.recordBookNumber, copyText: student.recordBookNumber },
    { name: "Группа", value: student.group },
    { name: "Курс", value: `${student.course} курс` },
    { name: "Статус", value: student.status },
    { name: "Учебное подразделение", value: student.institute },
    { name: "Направление подготовки", value: student.direction },
    { name: "Профиль / направленность", value: student.profile },
    { name: "Форма обучения", value: student.form },
    { name: "Год поступления", value: student.admissionYear },
    { name: "Адрес проживания", value: student.address },
    { name: "Общежитие", value: student.hostelAddress },
];

export const previousEducation = [
    { name: "Тип образования", value: "Среднее (полное) общее образование" },
    { name: "Тип документа", value: "Аттестат о среднем общем образовании" },
    { name: "Учебное заведение", value: "МБОУ «Гимназия № 7» г. Мурманска" },
    { name: "Год окончания", value: "2023" },
    { name: "Документ", value: "Аттестат № 5123 004571, выдан 27.06.2023" },
];

export const personalDocuments = [
    { name: "Паспорт", value: "Серия 4719 № 084512, выдан 22.06.2019, УМВД России по Мурманской области" },
    { name: "ИНН", value: "519012345678", copyText: "519012345678" },
    { name: "СНИЛС", value: "123-456-789 01", copyText: "12345678901" },
    { name: "Дата рождения", value: student.birthDate },
    { name: "Место рождения", value: "г. Мурманск" },
];

export type StudyDocument = {
    id: string;
    title: string;
    meta: string;
    fileName: string;
};

export const studyDocuments: StudyDocument[] = [
    {
        id: "doc-target",
        title: "Целевой договор",
        meta: "Договор о целевом обучении с АО «Северсталь-инфоком» · до 31.08.2027",
        fileName: "targetnyy-dogovor-smirnova.pdf",
    },
    {
        id: "doc-paid",
        title: "Договор на образовательные услуги",
        meta: "Договор № 2023/ИСТ-147 · подписан 25.08.2023",
        fileName: "dogovor-obrazovatelnye-uslugi.pdf",
    },
    {
        id: "doc-add-1",
        title: "Дополнительное соглашение № 1",
        meta: "Изменение стоимости обучения с 01.09.2025 · подписано 12.08.2025",
        fileName: "dop-soglashenie-1.pdf",
    },
    {
        id: "doc-add-2",
        title: "Дополнительное соглашение № 2",
        meta: "Изменение реквизитов сторон · подписано 10.01.2026",
        fileName: "dop-soglashenie-2.pdf",
    },
];

/* ---------- Учебная деятельность ---------- */

export type GradeRow = {
    id: string;
    semester: string;
    date: string;
    discipline: string;
    hours: string;
    credits: string;
    assessment: string;
    grade: string;
    teacher: string;
};

export const gradebook: GradeRow[] = [
    {
        id: "g-1",
        semester: "Осенний 2025/2026",
        date: "24.01.2026",
        discipline: "Проектирование информационных систем",
        hours: "144",
        credits: "4",
        assessment: "Экзамен",
        grade: "5",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-2",
        semester: "Осенний 2025/2026",
        date: "19.01.2026",
        discipline: "Базы данных",
        hours: "108",
        credits: "3",
        assessment: "Экзамен",
        grade: "5",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-3",
        semester: "Осенний 2025/2026",
        date: "15.01.2026",
        discipline: "Веб-технологии",
        hours: "108",
        credits: "3",
        assessment: "Дифференцированный зачёт",
        grade: "4",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-4",
        semester: "Осенний 2025/2026",
        date: "12.01.2026",
        discipline: "Экономика цифровых продуктов",
        hours: "72",
        credits: "2",
        assessment: "Зачёт",
        grade: "Зачёт",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-5",
        semester: "Весенний 2025/2026",
        date: "18.06.2026",
        discipline: "Машинное обучение",
        hours: "144",
        credits: "4",
        assessment: "Экзамен",
        grade: "5",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-6",
        semester: "Весенний 2025/2026",
        date: "11.06.2026",
        discipline: "Информационная безопасность",
        hours: "108",
        credits: "3",
        assessment: "Экзамен",
        grade: "4",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-7",
        semester: "Весенний 2025/2026",
        date: "05.06.2026",
        discipline: "Управление ИТ-проектами",
        hours: "108",
        credits: "3",
        assessment: "Дифференцированный зачёт",
        grade: "5",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-8",
        semester: "Весенний 2025/2026",
        date: "02.06.2026",
        discipline: "История России",
        hours: "72",
        credits: "2",
        assessment: "Экзамен",
        grade: "3",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-9",
        semester: "Осенний 2026/2027",
        date: "—",
        discipline: "Разработка мобильных приложений",
        hours: "144",
        credits: "4",
        assessment: "Экзамен",
        grade: "—",
        teacher: "Иванов Иван Иванович",
    },
    {
        id: "g-10",
        semester: "Осенний 2026/2027",
        date: "—",
        discipline: "Анализ данных",
        hours: "108",
        credits: "3",
        assessment: "Экзамен",
        grade: "—",
        teacher: "Иванов Иван Иванович",
    },
];

export const averageGrade = 4.6;

export type DocumentLink = {
    id: string;
    title: string;
    description: string;
    meta?: string;
};

export const curriculumDocuments: DocumentLink[] = [
    {
        id: "cur-1",
        title: "Учебный план направления",
        description: "Полный учебный план на весь период обучения",
        meta: "PDF · 1,8 МБ",
    },
    {
        id: "cur-2",
        title: "Учебный план по годам обучения",
        description: "Разбивка дисциплин, практик и аттестаций по курсам",
        meta: "PDF · 2,4 МБ · обновлён 01.09.2026",
    },
    {
        id: "cur-3",
        title: "Календарный учебный график (КУГ)",
        description: "Периоды теоретического обучения, сессий и каникул",
        meta: "PDF · 640 КБ",
    },
    {
        id: "cur-4",
        title: "Рабочие программы дисциплин",
        description: "Аннотации и полные РПД по всем дисциплинам направления",
        meta: "Архив · 24,6 МБ",
    },
    {
        id: "cur-5",
        title: "Программы практик",
        description: "Учебная, производственная и преддипломная практики",
        meta: "Архив · 8,2 МБ",
    },
];

export type EiosCourse = {
    id: string;
    title: string;
    teacher: string;
    semester: string;
    url: string;
    grades: { id: string; title: string; date: string; grade: string; max: string }[];
};

export const eiosCourses: EiosCourse[] = [
    {
        id: "course-1",
        title: "Разработка мобильных приложений",
        teacher: "Иванов И. И.",
        semester: "Осенний 2026/2027",
        url: "https://mauniver.ru",
        grades: [
            { id: "cg-1", title: "Лабораторная работа № 1", date: "20.09.2026", grade: "10", max: "10" },
            { id: "cg-2", title: "Лабораторная работа № 2", date: "04.10.2026", grade: "9", max: "10" },
            { id: "cg-3", title: "Промежуточный тест", date: "25.10.2026", grade: "18", max: "20" },
        ],
    },
    {
        id: "course-2",
        title: "Анализ данных",
        teacher: "Иванов И. И.",
        semester: "Осенний 2026/2027",
        url: "https://mauniver.ru",
        grades: [
            { id: "cg-4", title: "Практическая работа № 1", date: "18.09.2026", grade: "8", max: "10" },
            { id: "cg-5", title: "Практическая работа № 2", date: "16.10.2026", grade: "10", max: "10" },
        ],
    },
    {
        id: "course-3",
        title: "Проектирование информационных систем",
        teacher: "Иванов И. И.",
        semester: "Осенний 2026/2027",
        url: "https://mauniver.ru",
        grades: [{ id: "cg-6", title: "Курсовой проект, этап 1", date: "12.10.2026", grade: "22", max: "25" }],
    },
    {
        id: "course-4",
        title: "Информационная безопасность",
        teacher: "Иванов И. И.",
        semester: "Осенний 2026/2027",
        url: "https://mauniver.ru",
        grades: [{ id: "cg-7", title: "Тест по разделу 1", date: "08.10.2026", grade: "14", max: "15" }],
    },
    {
        id: "course-5",
        title: "Философия и методология науки",
        teacher: "Иванов И. И.",
        semester: "Осенний 2026/2027",
        url: "https://mauniver.ru",
        grades: [],
    },
];

export const irSchedules: DocumentLink[] = [
    {
        id: "ir-1",
        title: "График ИР преподавателей института",
        description: "Консультации и индивидуальная работа на осенний семестр 2026/2027",
        meta: "PDF · 320 КБ",
    },
    {
        id: "ir-2",
        title: "График ИР кафедры информационных систем",
        description: "Каб. 312, корпус А · пн–пт 14:00–18:00",
        meta: "PDF · 180 КБ",
    },
    {
        id: "ir-3",
        title: "График ИР кафедры прикладной математики",
        description: "Каб. 208, корпус Б · вт, чт 15:00–19:00",
        meta: "PDF · 160 КБ",
    },
];

/* ---------- Портфолио ---------- */

export type Achievement = {
    id: string;
    title: string;
    rank: string;
    type: string;
    place: string;
    date: string;
    supervisor: string;
    verified: boolean;
};

export type PortfolioCategory = "academic" | "research" | "sport" | "creative" | "social" | "professional";

export const achievements: Record<Exclude<PortfolioCategory, "professional">, Achievement[]> = {
    academic: [
        {
            id: "ach-a1",
            title: "Всероссийская олимпиада по программированию",
            rank: "Призёр",
            type: "Олимпиада",
            place: "г. Санкт-Петербург",
            date: "18.10.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
        {
            id: "ach-a2",
            title: "Конкурс курсовых проектов МАУ",
            rank: "1 место",
            type: "Конкурс",
            place: "г. Мурманск",
            date: "22.05.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
        {
            id: "ach-a3",
            title: "Олимпиада «IT-Арктика»",
            rank: "Участник",
            type: "Олимпиада",
            place: "г. Архангельск",
            date: "12.04.2026",
            supervisor: "Иванов И. И.",
            verified: false,
        },
    ],
    research: [
        {
            id: "ach-r1",
            title: "Доклад «Нейросетевые методы анализа образовательных данных»",
            rank: "1 место",
            type: "Конференция",
            place: "МАУ, г. Мурманск",
            date: "24.10.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
        {
            id: "ach-r2",
            title: "Статья в сборнике «Цифровая экономика Северо-Запада»",
            rank: "Публикация",
            type: "Научная публикация",
            place: "г. Мурманск",
            date: "10.09.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
        {
            id: "ach-r3",
            title: "Стипендиальная программа «Шаг в науку»",
            rank: "Финалист",
            type: "Конкурс",
            place: "г. Москва",
            date: "15.06.2026",
            supervisor: "Иванов И. И.",
            verified: false,
        },
    ],
    sport: [
        {
            id: "ach-s1",
            title: "Первенство МАУ по лёгкой атлетике, 800 м",
            rank: "2 место",
            type: "Соревнование",
            place: "г. Мурманск",
            date: "05.10.2026",
            supervisor: "Иванов Иван Иванович",
            verified: true,
        },
        {
            id: "ach-s2",
            title: "Арктический полумарафон",
            rank: "Участник",
            type: "Соревнование",
            place: "г. Мурманск",
            date: "20.09.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
    ],
    creative: [
        {
            id: "ach-c1",
            title: "Фестиваль студенческого творчества «Студенческая весна»",
            rank: "Лауреат 2 степени",
            type: "Фестиваль",
            place: "г. Мурманск",
            date: "18.04.2026",
            supervisor: "Иванов Иван Иванович",
            verified: true,
        },
        {
            id: "ach-c2",
            title: "Фотоконкурс «Арктика в объективе»",
            rank: "1 место",
            type: "Конкурс",
            place: "г. Мурманск",
            date: "12.02.2026",
            supervisor: "Иванов И. И.",
            verified: false,
        },
    ],
    social: [
        {
            id: "ach-so1",
            title: "Волонтёрская программа «Северное тепло»",
            rank: "Благодарность",
            type: "Волонтёрство",
            place: "г. Мурманск",
            date: "15.10.2026",
            supervisor: "Иванов Иван Иванович",
            verified: true,
        },
        {
            id: "ach-so2",
            title: "Организация школы кураторов МАУ",
            rank: "Благодарственное письмо",
            type: "Организатор",
            place: "МАУ",
            date: "01.09.2026",
            supervisor: "Иванов И. И.",
            verified: true,
        },
    ],
};

export const workExperience = [
    {
        id: "work-1",
        period: "Июль 2026 — по настоящее время",
        position: "Junior Data Analyst",
        company: "АО «Северсталь-инфоком»",
        address: "г. Мурманск, ул. Софьи Перовской, д. 5",
        verified: true,
    },
    {
        id: "work-2",
        period: "Сентябрь 2025 — май 2026",
        position: "Лаборант кафедры информационных систем",
        company: "МАУ",
        address: "г. Мурманск, ул. Коммуны, д. 9",
        verified: true,
    },
];

export const professionalAchievements = [
    {
        id: "prof-1",
        title: "Сертификат «Основы анализа данных в Yandex Cloud»",
        date: "20.08.2026",
        verified: true,
    },
    {
        id: "prof-2",
        title: "Хакатон «Цифровая Арктика» — 3 место",
        date: "14.11.2025",
        verified: true,
    },
    {
        id: "prof-3",
        title: "Стажировка в департаменте аналитики «Северсталь-инфоком»",
        date: "01.07.2025",
        verified: false,
    },
];

/* ---------- Студенческий офис ---------- */

export const scholarshipHistory = [
    {
        id: "sch-1",
        type: "Повышенная академическая стипендия",
        amount: 12500,
        period: "Ноябрь 2026",
        basis: "Приказ № 1204-ст от 01.11.2026",
        action: "Назначена",
        status: "active" as const,
    },
    {
        id: "sch-2",
        type: "Академическая стипендия",
        amount: 3600,
        period: "Сентябрь — октябрь 2026",
        basis: "Приказ № 987-ст от 01.09.2026",
        action: "Назначена",
        status: "active" as const,
    },
    {
        id: "sch-3",
        type: "Социальная стипендия",
        amount: 2900,
        period: "Февраль 2026",
        basis: "Приказ № 214-ст от 03.02.2026",
        action: "Снята",
        status: "closed" as const,
    },
];

export const pgasApplication = {
    open: true,
    deadline: "20.11.2026",
    title: "Заявление на повышенную стипендию (ПГАС)",
    description: "Заполните форму и приложите подтверждающие документы из портфолио. Заявка уйдёт на модерацию ответственному по институту.",
};

export type OrderItem = {
    id: string;
    number: string;
    date: string;
    motivation: string;
    content: string;
};

export const orders: OrderItem[] = [
    {
        id: "order-1",
        number: "1783-ст",
        date: "01.11.2026",
        motivation: "О назначении стипендии",
        content: "Назначить повышенную академическую стипендию Тестову А. И. на ноябрь 2026 года.",
    },
    {
        id: "order-2",
        number: "1544-ст",
        date: "01.09.2026",
        motivation: "О переводе на следующий курс",
        content: "Перевести Тестова А. И. на 4 курс по направлению 09.03.02 «Информационные системы и технологии».",
    },
    {
        id: "order-3",
        number: "1201-ст",
        date: "15.06.2026",
        motivation: "О допуске к государственной итоговой аттестации",
        content: "Допустить Тестова А. И. к подготовке выпускной квалификационной работы.",
    },
    {
        id: "order-4",
        number: "876-ст",
        date: "10.03.2026",
        motivation: "О предоставлении места в общежитии",
        content: "Предоставить Тестову А. И. место в общежитии № 3 на период с 01.09.2026 по 30.06.2027.",
    },
    {
        id: "order-5",
        number: "2104-ст",
        date: "28.12.2025",
        motivation: "Об утверждении состава студенческого совета",
        content: "Утвердить Тестова А. И. членом студенческого совета института на 2026 год.",
    },
];

export type CertificateRequest = {
    id: string;
    type: string;
    format: "Электронная с ЭП" | "Бумажная";
    createdAt: string;
    status: "Готова" | "В обработке";
};

export const certificateRequests: CertificateRequest[] = [
    {
        id: "cert-1",
        type: "Справка с места учёбы",
        format: "Электронная с ЭП",
        createdAt: "28.10.2026",
        status: "Готова",
    },
    {
        id: "cert-2",
        type: "Справка-вызов на сессию",
        format: "Бумажная",
        createdAt: "02.11.2026",
        status: "В обработке",
    },
];

export type PaymentItem = {
    id: string;
    title: string;
    period: string;
    amount: number;
    dueDate: string;
    status: "paid" | "pending" | "overdue" | "upcoming";
};

export const payments: PaymentItem[] = [
    {
        id: "pay-1",
        title: "Обучение",
        period: "Осенний семестр 2026/2027",
        amount: 68400,
        dueDate: "01.12.2026",
        status: "pending",
    },
    {
        id: "pay-2",
        title: "Общежитие",
        period: "Октябрь 2026",
        amount: 4200,
        dueDate: "15.10.2026",
        status: "overdue",
    },
    {
        id: "pay-3",
        title: "Обучение",
        period: "Весенний семестр 2025/2026",
        amount: 68400,
        dueDate: "01.05.2026",
        status: "paid",
    },
    {
        id: "pay-4",
        title: "Общежитие",
        period: "Ноябрь 2026",
        amount: 4200,
        dueDate: "15.11.2026",
        status: "upcoming",
    },
];

export type BypassDepartment = {
    id: string;
    title: string;
    note: string;
    status: "done" | "problem" | "waiting" | "not-started";
};

export const bypassSheet: BypassDepartment[] = [
    {
        id: "bypass-1",
        title: "Библиотека",
        note: "Задолженности по книгам отсутствуют",
        status: "done",
    },
    {
        id: "bypass-2",
        title: "Общежитие",
        note: "Задолженность по оплате — 4 200 ₽ за октябрь 2026",
        status: "problem",
    },
    {
        id: "bypass-3",
        title: "Кафедра информационных систем",
        note: "Ожидает проверки курсовой работы",
        status: "waiting",
    },
    {
        id: "bypass-4",
        title: "Деканат института",
        note: "Отметка будет проставлена после закрытия задолженности",
        status: "not-started",
    },
    {
        id: "bypass-5",
        title: "Бухгалтерия",
        note: "Отметка получена 05.11.2026",
        status: "done",
    },
];

/* ---------- Полезные ссылки ---------- */

export type UsefulLink = {
    id: string;
    title: string;
    description: string;
    url: string;
    action: string;
};

export const usefulLinks: UsefulLink[] = [
    {
        id: "link-1",
        title: "Расписание занятий",
        description: "Актуальное расписание, изменения и чат-боты",
        url: "https://mauniver.ru",
        action: "Открыть расписание",
    },
    {
        id: "link-2",
        title: "Вход в ЭИОС",
        description: "Электронная образовательная среда университета",
        url: "https://mauniver.ru",
        action: "Войти в ЭИОС",
    },
    {
        id: "link-3",
        title: "Студенческие объединения",
        description: "Клубы, отряды и сообщества МАУ",
        url: "https://mauniver.ru",
        action: "Смотреть объединения",
    },
    {
        id: "link-4",
        title: "Библиотечные сервисы",
        description: "Электронный каталог, ЭБС и читальные залы",
        url: "https://mauniver.ru",
        action: "Перейти в библиотеку",
    },
    {
        id: "link-5",
        title: "Вопросы общежития",
        description: "Заселение, оплата и правила проживания",
        url: "https://mauniver.ru",
        action: "Открыть раздел",
    },
    {
        id: "link-6",
        title: "Календарь событий",
        description: "Мероприятия университета и институтов",
        url: "https://mauniver.ru",
        action: "Смотреть календарь",
    },
    {
        id: "link-7",
        title: "Онлайн-сервисы для студентов",
        description: "Заявки, справки и цифровые сервисы",
        url: "https://mauniver.ru",
        action: "Перейти к сервисам",
    },
    {
        id: "link-8",
        title: "Электронная почта",
        description: "Корпоративная почта обучающегося",
        url: "https://mauniver.ru",
        action: "Открыть почту",
    },
];

/* ---------- Контакты ---------- */

export type ContactPerson = {
    id: string;
    name: string;
    position: string;
    phone?: string;
    email?: string;
    extra?: string;
};

export type ContactGroup = {
    id: string;
    title: string;
    description?: string;
    people: ContactPerson[];
    link?: { label: string; url: string };
};

export const contactGroups: ContactGroup[] = [
    {
        id: "contact-institute",
        title: "Учебное подразделение",
        description: "Институт цифровых технологий",
        people: [
            {
                id: "p-1",
                name: "Иванов Иван Иванович",
                position: "Директор института",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
            },
            {
                id: "p-2",
                name: "Иванов Иван Иванович",
                position: "Заместитель директора по учебной работе",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
            },
            {
                id: "p-3",
                name: "Иванов Иван Иванович",
                position: "Специалист по работе со студентами",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
                extra: "ВКонтакте: mauniver.ru",
            },
        ],
        link: { label: "Контакты института на сайте", url: "https://mauniver.ru" },
    },
    {
        id: "contact-curator",
        title: "Куратор академической группы",
        description: `Группа ${student.group}`,
        people: [
            {
                id: "p-4",
                name: "Иванов Иван Иванович",
                position: "Доцент кафедры информационных систем и технологий",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
                extra: "Каб. 312, корпус А · консультации: вт, чт 16:00–18:00",
            },
        ],
    },
    {
        id: "contact-support",
        title: "Техническая поддержка",
        description: "Управление информационных технологий",
        people: [
            {
                id: "p-5",
                name: "Служба поддержки УИТ",
                position: "Пн–пт, 09:00–18:00",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
                extra: "Чат поддержки в Telegram: @mau_support",
            },
        ],
        link: { label: "Информация об УИТ", url: "https://mauniver.ru" },
    },
    {
        id: "contact-accounting",
        title: "Бухгалтерия",
        description: "Специалисты по работе со студентами",
        people: [
            {
                id: "p-6",
                name: "Иванов Иван Иванович",
                position: "Ведущий бухгалтер",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
                extra: "Каб. 108, корпус А · пн–чт 10:00–17:00",
            },
        ],
    },
    {
        id: "contact-office",
        title: "Студенческий офис",
        description: "Заявки, справки и документы обучающихся",
        people: [
            {
                id: "p-7",
                name: "Иванов Иван Иванович",
                position: "Специалист студенческого офиса по ИЦТиЭ",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
                extra: "Каб. 101, корпус А · пн–пт 09:00–17:00",
            },
        ],
        link: { label: "Страница студенческого офиса", url: "https://mauniver.ru" },
    },
    {
        id: "contact-youth",
        title: "Управление молодёжной политики",
        description: "Внеучебная деятельность, объединения и мероприятия",
        people: [
            {
                id: "p-8",
                name: "Иванов Иван Иванович",
                position: "Начальник управления молодёжной политики",
                phone: "+7 (8152) 99-99-99",
                email: "info@mauniver.ru",
            },
        ],
        link: { label: "Контакты управления", url: "https://mauniver.ru" },
    },
    {
        id: "contact-chats",
        title: "Чаты и сообщества",
        description: "Быстрая связь со структурными подразделениями",
        people: [
            { id: "p-9", name: "Чат института", position: "Telegram", extra: "@mau_ite_chat" },
            { id: "p-10", name: "Чат общежития № 3", position: "Telegram", extra: "@mau_hostel3" },
            { id: "p-11", name: "Чат студенческого офиса", position: "Telegram", extra: "@mau_student_office" },
        ],
    },
];
