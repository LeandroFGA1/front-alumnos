import type{ ScheduleOption, DayOfWeek } from '../types';

interface Props {
    selectedOption: ScheduleOption;
    onBack: () => void;
    }

    export const DetailedSchedule = ({ selectedOption, onBack }: Props) => {
    
    // Agrupar clases por día
    const days: DayOfWeek[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    
    return (
        <section className="page-content detail-view-section">
        <div className="detail-header-action">
            <h2>Detalle de Horario Seleccionado</h2>
            <button className="btn-back" onClick={onBack}>← Volver a opciones</button>
        </div>
        
        <p className="description-text">
            Visualización semanal del horario <strong>#Opción {selectedOption.id}</strong>.
        </p>

        {days.map(day => {
            // Filtrar clases de este día
            const dayClasses = selectedOption.schedule.filter(c => c.day === day);
            if (dayClasses.length === 0) return null;

            return (
            <div key={day} className="detail-day-container">
                <div className="detail-day-header">
                <h3>{day}</h3>
                </div>
                
                <div className="detail-career-strip">
                <span>INGENIERÍA EN INFORMÁTICA</span>
                </div>

                {dayClasses.map(cls => (
                <div key={cls.id} className="detail-class-row">
                    <div className="col-time">
                    <span className="time-range">{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <div className="col-subject">
                    <span className="subject-code">{cls.subjectCode}</span>
                    <span className="subject-name">{cls.subjectName}</span>
                    </div>
                    <div className="col-prof">
                    <span className="label-tiny">Profesor:</span>
                    <span className="prof-name">{cls.professor}</span>
                    </div>
                    <div className="col-room">
                    <span className="campus-name">{cls.campus}</span>
                    <span className="room-code">{cls.room}</span>
                    </div>
                </div>
                ))}
            </div>
            );
        })}

        <div className="confirm-action-area">
            <button className="btn-submit">Confirmar Inscripción</button>
        </div>
        </section>
    );
};