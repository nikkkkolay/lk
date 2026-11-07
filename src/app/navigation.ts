import type React from 'react';

import {Briefcase, GraduationCap, House, Link as LinkIcon, Persons, Person, Star} from '@gravity-ui/icons';
import type {IconProps} from '@gravity-ui/uikit';

export type SubsectionConfig = {
    id: string;
    title: string;
};

export type SectionConfig = {
    id: string;
    path: string;
    title: string;
    description: string;
    icon: IconProps['data'];
    subsections?: SubsectionConfig[];
};

export const SECTIONS: SectionConfig[] = [
    {
        id: 'dashboard',
        path: '/dashboard',
        title: 'Дашборд',
        description: 'Сводка по учёбе, событиям и сервисам университета',
        icon: House,
    },
    {
        id: 'info',
        path: '/info',
        title: 'Основные сведения',
        description: 'Личные данные, образование и документы',
        icon: Person,
        subsections: [
            {id: 'general', title: 'Общая информация'},
            {id: 'education', title: 'Образование'},
            {id: 'documents', title: 'Персональные документы'},
            {id: 'study-documents', title: 'Документы по обучению'},
        ],
    },
    {
        id: 'study',
        path: '/study',
        title: 'Учебная деятельность',
        description: 'Студбилет, зачётная книжка, учебный план и курсы',
        icon: GraduationCap,
        subsections: [
            {id: 'student-id', title: 'Электронный студбилет'},
            {id: 'gradebook', title: 'Зачётная книжка'},
            {id: 'curriculum', title: 'Учебный план'},
            {id: 'courses', title: 'Курсы в ЭИОС'},
            {id: 'ir-schedules', title: 'Графики ИР'},
        ],
    },
    {
        id: 'portfolio',
        path: '/portfolio',
        title: 'Портфолио достижений',
        description: 'Достижения для ПГАС и профессиональное развитие',
        icon: Star,
        subsections: [
            {id: 'academic', title: 'Учебные'},
            {id: 'research', title: 'Научные'},
            {id: 'sport', title: 'Спортивные'},
            {id: 'creative', title: 'Культурно-творческие'},
            {id: 'social', title: 'Общественные'},
            {id: 'professional', title: 'Профессиональные'},
        ],
    },
    {
        id: 'office',
        path: '/office',
        title: 'Студенческий офис',
        description: 'Задолженности, стипендии, приказы, справки и платежи',
        icon: Briefcase,
        subsections: [
            {id: 'debts', title: 'Академическая задолженность'},
            {id: 'scholarships', title: 'Стипендии'},
            {id: 'orders', title: 'Приказы'},
            {id: 'certificates', title: 'Справки'},
            {id: 'payments', title: 'Платежи'},
            {id: 'bypass', title: 'Обходной лист'},
        ],
    },
    {
        id: 'links',
        path: '/links',
        title: 'Полезные ссылки',
        description: 'Сервисы и страницы, которые чаще всего нужны студенту',
        icon: LinkIcon,
    },
    {
        id: 'contacts',
        path: '/contacts',
        title: 'Контакты',
        description: 'Институт, куратор, поддержка и другие контакты',
        icon: Persons,
    },
];

export function getSection(id: string): SectionConfig {
    const section = SECTIONS.find((item) => item.id === id);

    if (!section) {
        throw new Error(`Unknown section: ${id}`);
    }

    return section;
}

export function getSubsection(section: SectionConfig, id?: string): SubsectionConfig | undefined {
    if (!section.subsections) {
        return undefined;
    }

    return section.subsections.find((item) => item.id === id) ?? section.subsections[0];
}

export function getSectionUrl(section: SectionConfig, subsectionId?: string): string {
    if (!section.subsections) {
        return section.path;
    }

    const subsection = getSubsection(section, subsectionId);
    return subsection ? `${section.path}/${subsection.id}` : section.path;
}
