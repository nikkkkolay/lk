import React from 'react';
import {Navigate, useParams} from 'react-router-dom';

import {useIsMobile} from '../app/useIsMobile';
import {SECTIONS, getSectionUrl, getSubsection} from '../app/navigation';
import {ContactsPage} from '../pages/ContactsPage';
import {InfoPage} from '../pages/InfoPage';
import {LinksPage} from '../pages/LinksPage';
import {OfficePage} from '../pages/OfficePage';
import {PortfolioPage} from '../pages/PortfolioPage';
import {StudyPage} from '../pages/StudyPage';

/**
 * Разводит раздел и подраздел по URL: /info/general, /office/payments и т.д.
 */
export function SectionRouter() {
    const {sectionId, subsectionId} = useParams<{sectionId: string; subsectionId?: string}>();
    const isMobile = useIsMobile();

    const section = SECTIONS.find((item) => item.id === sectionId);

    if (!section) {
        return <Navigate to="/dashboard" replace />;
    }

    if (!section.subsections) {
        if (subsectionId) {
            return <Navigate to={section.path} replace />;
        }
    } else {
        const subsection = getSubsection(section, subsectionId);

        if (!subsectionId || subsection?.id !== subsectionId) {
            return <Navigate to={getSectionUrl(section)} replace />;
        }
    }

    switch (section.id) {
        case 'info':
            return <InfoPage section={section} subsectionId={subsectionId} isMobile={isMobile} />;
        case 'study':
            return <StudyPage section={section} subsectionId={subsectionId} isMobile={isMobile} />;
        case 'portfolio':
            return (
                <PortfolioPage section={section} subsectionId={subsectionId} isMobile={isMobile} />
            );
        case 'office':
            return <OfficePage section={section} subsectionId={subsectionId} isMobile={isMobile} />;
        case 'links':
            return <LinksPage section={section} subsectionId={subsectionId} isMobile={isMobile} />;
        case 'contacts':
            return (
                <ContactsPage section={section} subsectionId={subsectionId} isMobile={isMobile} />
            );
        default:
            return <Navigate to="/dashboard" replace />;
    }
}
