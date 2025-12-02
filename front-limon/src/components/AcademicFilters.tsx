import { useState, useEffect } from 'react';
import type { GeneralCriteria, SpecificCriteria, DynamicFilterOptions } from '../types';
import type { ChangeEvent } from 'react';

interface Props {
    isSecondStageUnlocked: boolean;
    dynamicOptions: DynamicFilterOptions;
    onApplyGeneralFilters: (criteria: GeneralCriteria) => void;
    onApplySpecificFilters: (criteria: SpecificCriteria) => void;
}

export const AcademicFilters = ({ 
    isSecondStageUnlocked, 
    dynamicOptions, 
    onApplyGeneralFilters, 
    onApplySpecificFilters 
    }: Props) => {

    const [general, setGeneral] = useState<GeneralCriteria>({
        campus: "", career: "", plan: [], shift: []
    });

    const [specific, setSpecific] = useState<SpecificCriteria>({
        subjects: [],
        professors: []
    });

    const [visibleProfessors, setVisibleProfessors] = useState<string[]>([]);

    useEffect(() => {
        if (specific.subjects.length === 0) {
        setVisibleProfessors([]);
        return;
        }

        const newProfessors = new Set<string>();
        specific.subjects.forEach(subject => {
        const profsForSubject = dynamicOptions.subjectToProfessorsMap[subject] || [];
        profsForSubject.forEach(p => newProfessors.add(p));
        });

        setVisibleProfessors(Array.from(newProfessors).sort());

        setSpecific(prev => ({
        ...prev,
        professors: prev.professors.filter(p => newProfessors.has(p))
        }));

    }, [specific.subjects, dynamicOptions.subjectToProfessorsMap]);

    const handleGeneralChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, options, multiple } = e.target;
        if (multiple) {
        const values = Array.from(options)
            .filter(o => o.selected)
            .map(o => o.value);
        setGeneral(prev => ({ ...prev, [name]: values } as unknown as GeneralCriteria));
        } else {
        setGeneral(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckboxChange = (category: 'subjects' | 'professors', value: string) => {
        setSpecific(prev => {
        const exists = prev[category].includes(value);
        return {
            ...prev,
            [category]: exists 
            ? prev[category].filter(item => item !== value) 
            : [...prev[category], value] 
        };
        });
    };

    return (
        <section className="page-content">
        <h2>Programación Académica</h2>
        <p className="description-text">Selecciona los criterios de búsqueda.</p>

        <div className="form-container">
            <div className="form-header"><h3>1. Criterios Generales</h3></div>
            <div className="form-grid">
            <div className="form-group">
                <label>Sede</label>
                <select name="campus" className="input-standard" value={general.campus} onChange={handleGeneralChange}>
                <option value="" disabled>Seleccione Sede...</option>
                <option value="Sede Maipú">Sede Maipú</option>
                <option value="Sede Centro">Sede Centro</option>
                <option value="Sede Viña">Sede Viña del Mar</option>
                <option value="Online">Online</option>
                </select>
            </div>

            <div className="form-group">
                <label>Carrera</label>
                <select name="career" className="input-standard" value={general.career} onChange={handleGeneralChange}>
                <option value="" disabled>Seleccione Carrera...</option>
                <option value="Ingeniería en Informática">Ingeniería en Informática</option>
                <option value="Analista Programador">Analista Programador</option>
                </select>
            </div>

            </div>

            {!isSecondStageUnlocked && (
            <div className="form-actions">
                <button type="button" className="btn-submit"
                onClick={() => onApplyGeneralFilters(general)}
                disabled={!general.campus || !general.career}>
                Buscar Oferta Académica
                </button>
            </div>
            )}
        </div>

        <hr className="section-divider" />

        <div className="form-container" style={{ opacity: isSecondStageUnlocked ? 1 : 0.5, pointerEvents: isSecondStageUnlocked ? 'auto' : 'none' }}>
            <div className="form-header">
            <h3>2. Filtros Específicos {isSecondStageUnlocked ? '(Disponibles)' : '(Bloqueado)'}</h3>
            </div>

            <div className="form-grid">
            <div className="form-group">
                <label>Asignaturas Disponibles</label>
                <div className="multi-select-box large-box">
                {dynamicOptions.availableSubjects.map(subj => (
                    <label key={subj} className="check-option">
                    <input type="checkbox" 
                        onChange={() => handleCheckboxChange('subjects', subj)}
                        checked={specific.subjects.includes(subj)}
                    /> {subj}
                    </label>
                ))}
                </div>
            </div>

            <div className="form-group">
                <label>Profesores (Según materia)</label>
                <div className="multi-select-box large-box">
                {visibleProfessors.length > 0 ? (
                    visibleProfessors.map(prof => (
                    <label key={prof} className="check-option">
                        <input type="checkbox" 
                        onChange={() => handleCheckboxChange('professors', prof)}
                        checked={specific.professors.includes(prof)}
                        /> {prof}
                    </label>
                    ))
                ) : (
                    <div style={{padding: 10, fontSize: '0.8rem', color: '#999'}}>
                    {specific.subjects.length === 0 ? "Seleccione materias primero" : "No hay profesores disponibles"}
                    </div>
                )}
                </div>
            </div>
            
            <div className="form-group" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                <label>Sección <span className="badge-opt">No disponible</span></label>
                <div className="multi-select-box">
                <label className="check-option"><input type="checkbox" disabled /> 001D</label>
                <label className="check-option"><input type="checkbox" disabled /> 002V</label>
                </div>
            </div>
            </div>

            <div className="form-actions">
            <button type="button" className="btn-submit" onClick={() => onApplySpecificFilters(specific)} disabled={specific.subjects.length === 0}>
                Ver Horarios Disponibles
            </button>
            </div>
        </div>
        </section>
    );
};