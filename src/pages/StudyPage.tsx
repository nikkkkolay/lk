import React from "react";

import { ArrowDownToLine, ArrowUpRightFromSquare, BookOpen, Books, Calendar, FileText, GraduationCap, QrCode } from "@gravity-ui/icons";
import { Button, Dialog, Icon, Select, Text } from "@gravity-ui/uikit";

import { toaster } from "../app/toaster";
import { FileRow } from "../components/FileRow";
import { QrTicket } from "../components/QrTicket";
import { ResponsiveTable, type ResponsibleColumn } from "../components/ResponsiveTable";
import { StatusLabel } from "../components/StatusLabel";
import { Surface } from "../components/Surface";
import { PageShell } from "../layout/PageShell";
import type { SectionConfig } from "../app/navigation";
import { averageGrade, curriculumDocuments, eiosCourses, gradebook, irSchedules, student, type EiosCourse, type GradeRow } from "../data/mock";

type StudyPageProps = {
    section: SectionConfig;
    subsectionId?: string;
    isMobile?: boolean;
};

export function StudyPage({ section, subsectionId, isMobile }: StudyPageProps) {
    const active = subsectionId ?? section.subsections?.[0]?.id ?? "student-id";

    return (
        <PageShell section={section} subsectionId={active} isMobile={isMobile}>
            {active === "student-id" && <StudentIdSubsection />}
            {active === "gradebook" && <GradebookSubsection />}
            {active === "curriculum" && <CurriculumSubsection />}
            {active === "courses" && <CoursesSubsection />}
            {active === "ir-schedules" && <IrSchedulesSubsection />}
        </PageShell>
    );
}

function StudentIdSubsection() {
    const payload = [
        "MAU-STUDENT-CARD",
        `ФИО: ${student.fullName}`,
        `Подразделение: ${student.institute}`,
        `Студенческий: ${student.studentCardNumber}`,
        `Форма обучения: ${student.form}`,
        `Приказ о зачислении: № 1420-ст от 21.08.2023`,
        `Срок действия: 31.08.2027`,
    ].join("\n");

    return (
        <>
            <QrTicket
                payload={payload}
                number={student.studentCardNumber}
                fields={[
                    { label: "ФИО", value: student.fullName },
                    { label: "Подразделение", value: student.institute },
                    { label: "Форма обучения", value: student.form },
                    { label: "Приказ о зачислении", value: "№ 1420-ст от 21.08.2023" },
                    { label: "Срок действия", value: "до 31.08.2027" },
                    { label: "Статус", value: <StatusLabel text="Действует" tone="success" /> },
                ]}
            />

            <Surface title="Как пользоваться" variant="muted">
                <ul className="docs-list">
                    <li>QR-код обновляется автоматически и работает без интернета после загрузки.</li>
                    <li>Покажите код на вахте при входе в корпус, в библиотеке и в общежитии.</li>
                    <li>При утере телефона войдите в кабинет с другого устройства и нажмите «Обновить QR».</li>
                </ul>
                <Button
                    view="outlined"
                    size="m"
                    style={{ marginTop: 12 }}
                    onClick={() =>
                        toaster.add({
                            name: "qr-refresh",
                            title: "QR-код обновлён",
                            content: "Новый код действует в течение 24 часов.",
                            theme: "success",
                            autoHiding: 3000,
                        })
                    }
                >
                    <Button.Icon>
                        <Icon data={QrCode} size={16} />
                    </Button.Icon>
                    Обновить QR
                </Button>
            </Surface>
        </>
    );
}

const gradeColumns: ResponsibleColumn<GradeRow>[] = [
    { id: "semester", title: "Семестр", render: (row) => row.semester, width: "160px" },
    { id: "date", title: "Дата", render: (row) => row.date, width: "110px" },
    {
        id: "discipline",
        title: "Дисциплина",
        render: (row) => <Text variant="body-2">{row.discipline}</Text>,
    },
    { id: "hours", title: "Часы", render: (row) => row.hours, width: "80px", hideOnMobile: true },
    { id: "credits", title: "ЗЕТ", render: (row) => row.credits, width: "70px", hideOnMobile: true },
    { id: "assessment", title: "Аттестация", render: (row) => row.assessment, width: "190px" },
    {
        id: "grade",
        title: "Оценка",
        width: "110px",
        align: "right",
        render: (row) =>
            row.grade === "—" ? (
                <Text variant="body-1" color="secondary">
                    —
                </Text>
            ) : (
                <StatusLabel
                    text={row.grade}
                    tone={
                        row.grade === "5" || row.grade === "Зачёт" ? "success" : row.grade === "4" ? "info" : row.grade === "3" ? "warning" : "danger"
                    }
                />
            ),
    },
    {
        id: "teacher",
        title: "Преподаватель",
        render: (row) => row.teacher,
        width: "230px",
    },
];

function GradebookSubsection() {
    const semesters = React.useMemo(() => Array.from(new Set(gradebook.map((row) => row.semester))), []);
    const [semester, setSemester] = React.useState("all");
    const [exportOpen, setExportOpen] = React.useState(false);

    const rows = React.useMemo(() => (semester === "all" ? gradebook : gradebook.filter((row) => row.semester === semester)), [semester]);

    const graded = gradebook.filter((row) => /^[1-5]$/.test(row.grade));
    const computedAverage = graded.reduce((sum, row) => sum + Number(row.grade), 0) / Math.max(graded.length, 1);

    return (
        <>
            <div className="grid grid_3">
                <Surface title="Средний балл" variant="muted">
                    <div className="metric">
                        <span className="metric__value">{computedAverage.toFixed(2)}</span>
                        <span className="metric__hint">по {graded.length} дисциплинам с оценками</span>
                    </div>
                </Surface>
                <Surface title="Академическая разница" variant="muted">
                    <div className="metric">
                        <span className="metric__value">{averageGrade.toFixed(1)}</span>
                        <span className="metric__hint">по данным деканата</span>
                    </div>
                </Surface>
                <Surface title="Выписка" variant="muted">
                    <div className="metric">
                        <span className="metric__value metric__value_small">PDF</span>
                        <span className="metric__hint">за все семестры или выбранный период</span>
                    </div>
                    <Button view="action" size="m" style={{ marginTop: 10 }} onClick={() => setExportOpen(true)}>
                        <Button.Icon>
                            <Icon data={ArrowDownToLine} size={16} />
                        </Button.Icon>
                        Выписка из зачётной книжки
                    </Button>
                </Surface>
            </div>

            <Surface
                title="Зачётная книжка"
                subtitle="Успеваемость по семестрам"
                icon={<Icon data={BookOpen} size={18} />}
                action={
                    <Select
                        width="max"
                        size="m"
                        value={[semester]}
                        onUpdate={(value) => setSemester(value[0] ?? "all")}
                        options={[{ value: "all", content: "Все семестры" }, ...semesters.map((item) => ({ value: item, content: item }))]}
                    />
                }
            >
                <ResponsiveTable
                    columns={gradeColumns}
                    rows={rows}
                    getRowId={(row) => row.id}
                    renderMobileTitle={(row) => row.discipline}
                    renderMobileBadge={(row) =>
                        row.grade === "—" ? null : (
                            <StatusLabel
                                text={row.grade}
                                tone={row.grade === "5" || row.grade === "Зачёт" ? "success" : row.grade === "4" ? "info" : "warning"}
                            />
                        )
                    }
                />
            </Surface>

            <Dialog open={exportOpen} onOpenChange={setExportOpen} hasCloseButton>
                <div className="modal-body">
                    <Text variant="header-1">Выписка из зачётной книжки</Text>
                    <Text variant="body-1" color="secondary">
                        Файл формируется в PDF. Можно выбрать все семестры или только текущий.
                    </Text>

                    <div className="stack stack_sm">
                        <Text variant="body-2">Период</Text>
                        <Select
                            width="max"
                            value={[semester]}
                            onUpdate={(value) => setSemester(value[0] ?? "all")}
                            options={[{ value: "all", content: "Все семестры" }, ...semesters.map((item) => ({ value: item, content: item }))]}
                        />
                    </div>

                    <div className="modal-actions">
                        <Button view="flat" size="l" onClick={() => setExportOpen(false)}>
                            Отмена
                        </Button>
                        <Button
                            view="action"
                            size="l"
                            onClick={() => {
                                setExportOpen(false);
                                toaster.add({
                                    name: "gradebook-export",
                                    title: "Выписка формируется",
                                    content: "PDF будет доступен в разделе «Справки» через несколько секунд.",
                                    theme: "success",
                                    autoHiding: 4000,
                                });
                            }}
                        >
                            Сформировать PDF
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

function CurriculumSubsection() {
    return (
        <>
            <Surface title="Учебный план" subtitle={`${student.direction} · ${student.profile}`} icon={<Icon data={Books} size={18} />}>
                <div className="stack">
                    {curriculumDocuments.map((document) => (
                        <FileRow
                            key={document.id}
                            title={document.title}
                            description={document.description}
                            meta={document.meta}
                            fileName={`${document.id}.pdf`}
                        />
                    ))}
                </div>
            </Surface>

            <div className="section-note">
                Учебный план вступает в силу с года поступления. Если обнаружили расхождения — напишите в студенческий офис.
                <Button view="flat" size="s" href="mailto:info@mauniver.ru">
                    Сообщить о проблеме
                </Button>
            </div>
        </>
    );
}

function CoursesSubsection() {
    const [selected, setSelected] = React.useState<EiosCourse | null>(null);

    return (
        <>
            <div className="section-note">
                Показаны курсы, на которые вы записаны в текущем семестре.
                <Button view="action" size="m" href="https://mauniver.ru" target="_blank">
                    <Button.Icon>
                        <Icon data={ArrowUpRightFromSquare} size={16} />
                    </Button.Icon>
                    Личный кабинет ЭИОС
                </Button>
            </div>

            <div className="grid grid_2">
                {eiosCourses.map((course, index) => (
                    <Surface
                        key={course.id}
                        title={course.title}
                        subtitle={`${course.teacher} · ${course.semester}`}
                        icon={<Icon data={BookOpen} size={18} />}
                        action={<StatusLabel text={`#${index + 1}`} tone="normal" size="xs" />}
                        footer={
                            <>
                                <Button view="outlined" size="m" onClick={() => setSelected(course)}>
                                    Подробнее
                                </Button>
                                <Button view="flat" size="m" href={course.url} target="_blank">
                                    Открыть в Moodle
                                    <Button.Icon side="end">
                                        <Icon data={ArrowUpRightFromSquare} size={14} />
                                    </Button.Icon>
                                </Button>
                            </>
                        }
                    >
                        <div className="inline">
                            <Text variant="body-1" color="secondary">
                                Оценочная ведомость:
                            </Text>
                            <Text variant="body-2">{course.grades.length > 0 ? `${course.grades.length} работ` : "оценок пока нет"}</Text>
                        </div>
                    </Surface>
                ))}
            </div>

            <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} hasCloseButton>
                <div className="modal-body modal-body_wide">
                    <Text variant="header-1">{selected?.title}</Text>
                    <Text variant="body-1" color="secondary">
                        {selected?.teacher} · {selected?.semester}
                    </Text>

                    {selected && selected.grades.length > 0 ? (
                        <ResponsiveTable
                            rows={selected.grades}
                            getRowId={(row) => row.id}
                            columns={[
                                { id: "title", title: "Работа", render: (row) => row.title },
                                { id: "date", title: "Дата", render: (row) => row.date, width: "120px" },
                                {
                                    id: "grade",
                                    title: "Оценка",
                                    render: (row) => `${row.grade} / ${row.max}`,
                                    width: "120px",
                                    align: "right",
                                },
                            ]}
                            forceTable
                        />
                    ) : (
                        <Text variant="body-1" color="secondary">
                            В курсе пока нет выставленных оценок.
                        </Text>
                    )}

                    <div className="modal-actions">
                        <Button view="action" size="l" href={selected?.url} target="_blank">
                            Перейти в курс
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

function IrSchedulesSubsection() {
    return (
        <>
            <Surface
                title="Графики индивидуальной работы преподавателей"
                subtitle="Консультации и ИР по институтам и кафедрам"
                icon={<Icon data={Calendar} size={18} />}
            >
                <div className="stack">
                    {irSchedules.map((document) => (
                        <FileRow
                            key={document.id}
                            title={document.title}
                            description={document.description}
                            meta={document.meta}
                            fileName={`${document.id}.pdf`}
                        />
                    ))}
                </div>
            </Surface>

            <Surface title="Другие подразделения" variant="muted">
                <Text variant="body-1" color="secondary">
                    Графики ИР остальных институтов и факультетов публикуются на сайте университета.
                </Text>
                <div style={{ marginTop: 12 }}>
                    <Button view="outlined" size="m" href="https://mauniver.ru" target="_blank">
                        <Button.Icon>
                            <Icon data={FileText} size={16} />
                        </Button.Icon>
                        Все графики ИР
                    </Button>
                </div>
            </Surface>
        </>
    );
}
