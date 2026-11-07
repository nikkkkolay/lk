import React from 'react';

import {FileCheck, Passport, Persons} from '@gravity-ui/icons';
import {Button, Icon, Text} from '@gravity-ui/uikit';

import {DataList} from '../components/DataList';
import {FileRow} from '../components/FileRow';
import {StatusLabel} from '../components/StatusLabel';
import {Surface} from '../components/Surface';
import {PageShell} from '../layout/PageShell';
import type {SectionConfig} from '../app/navigation';
import {
    generalInfo,
    personalDocuments,
    previousEducation,
    student,
    studyDocuments,
} from '../data/mock';

type InfoPageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

export function InfoPage({section, subsectionId, isMobile}: InfoPageProps) {
    const active = subsectionId ?? section.subsections?.[0]?.id ?? 'general';

    return (
        <PageShell section={section} subsectionId={active} isMobile={isMobile}>
            {active === 'general' && <GeneralSubsection />}
            {active === 'education' && <EducationSubsection />}
            {active === 'documents' && <DocumentsSubsection />}
            {active === 'study-documents' && <StudyDocumentsSubsection />}
        </PageShell>
    );
}

function GeneralSubsection() {
    return (
        <>
            <Surface
                title="Карточка обучающегося"
                subtitle={student.institute}
                icon={<Icon data={Persons} size={18} />}
                action={<StatusLabel text={student.status} tone="success" />}
            >
                <div className="student-card">
                    <span className="student-card__avatar">{student.firstName.charAt(0)}</span>
                    <div className="text-block">
                        <Text variant="subheader-2">{student.fullName}</Text>
                        <Text variant="body-1" color="secondary">
                            {student.group} · {student.course} курс · {student.form} форма обучения
                        </Text>
                        <Text variant="caption-2" color="secondary">
                            Зачётная книжка № {student.recordBookNumber}
                        </Text>
                    </div>
                </div>
            </Surface>

            <Surface title="Общая информация">
                <DataList items={generalInfo} columns={2} />
            </Surface>
        </>
    );
}

function EducationSubsection() {
    return (
        <>
            <Surface
                title="Предыдущее образование"
                subtitle="Данные из документа о предыдущем уровне образования"
                icon={<Icon data={FileCheck} size={18} />}
            >
                <DataList items={previousEducation} />
            </Surface>

            <Surface title="Текущее обучение" variant="muted">
                <DataList
                    items={[
                        {name: 'Учебное подразделение', value: student.institute},
                        {name: 'Факультет', value: student.faculty},
                        {name: 'Кафедра', value: student.department},
                        {name: 'Направление подготовки', value: student.direction},
                        {name: 'Профиль / направленность', value: student.profile},
                        {name: 'Период обучения', value: student.studyPeriod},
                    ]}
                />
            </Surface>
        </>
    );
}

function DocumentsSubsection() {
    return (
        <>
            <Surface
                title="Персональные документы"
                subtitle="Данные защищены и видны только вам"
                icon={<Icon data={Passport} size={18} />}
            >
                <DataList items={personalDocuments} />
            </Surface>

            <Surface title="Контактные данные">
                <DataList
                    items={[
                        {name: 'Телефон', value: student.phone, copyText: student.phone},
                        {name: 'Электронная почта', value: student.email, copyText: student.email},
                        {name: 'Адрес регистрации', value: student.address},
                    ]}
                />
            </Surface>
        </>
    );
}

function StudyDocumentsSubsection() {
    return (
        <Surface
            title="Документы по обучению в МАУ"
            subtitle="Целевой договор, договор на образовательные услуги и дополнительные соглашения"
            icon={<Icon data={FileCheck} size={18} />}
        >
            <div className="stack">
                {studyDocuments.map((document) => (
                    <FileRow
                        key={document.id}
                        title={document.title}
                        description={document.meta}
                        fileName={document.fileName}
                    />
                ))}
            </div>

            <div className="section-note" style={{marginTop: 16}}>
                Если нужного документа нет в списке, обратитесь в студенческий офис.
                <Button view="flat" size="s" href="mailto:info@mauniver.ru">
                    Написать в студофис
                </Button>
            </div>
        </Surface>
    );
}
