import type{ ScheduleOption, DayOfWeek } from '../types';
import { calculatePosition } from '../utils/timeUtils';

interface Props {
    schedule: ScheduleOption['schedule'];
    }

    export const VisualTimetable = ({ schedule }: Props) => {
    const days: DayOfWeek[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    const hours = Array.from({ length: 15 }, (_, i) => i + 8); // [8, 9, ... 22]

    return (
        <section className="page-content timetable-section">
        <h2>Horario Semanal Visual</h2>
        <p className="description-text">Distribución gráfica de carga académica (08:00 - 23:00).</p>

        <div className="timetable-legend">
            <h4 className="legend-title">Asignaturas:</h4>
            <div className="legend-items">
                <div className="legend-item"><span className="color-box subject-purple"></span>BD</div>
                <div className="legend-item"><span className="color-box subject-teal"></span>Inglés</div>
                <div className="legend-item"><span className="color-box subject-orange"></span>Programación</div>
            </div>
        </div>

        <div className="timetable-grid-container">
            
            {/* Header */}
            <div className="grid-header-row">
            <div className="time-label-header"></div> 
            {days.map(d => <div key={d} className="day-header">{d}</div>)}
            </div>

            {/* Body */}
            <div className="grid-body">
            {/* Columna Horas */}
            <div className="time-labels-column">
                {hours.map(h => (
                <div key={h} className="time-slot-label">{h < 10 ? `0${h}`: h}:00</div>
                ))}
            </div>

            {/* Columnas Días */}
            {days.map(day => (
                <div key={day} className="day-column">
                {schedule
                    .filter(c => c.day === day)
                    .map(cls => {
                    const style = calculatePosition(cls.startTime, cls.endTime);
                    return (
                        <div 
                        key={cls.id} 
                        className={`class-block subject-${cls.colorClass}`} 
                        style={style}
                        title={`${cls.subjectName} (${cls.startTime} - ${cls.endTime})`}
                        >
                        <span className="block-title">{cls.subjectName}</span>
                        <span className="block-time">{cls.startTime} - {cls.endTime}</span>
                        </div>
                    );
                    })}
                </div>
            ))}

            </div> 
        </div> 
        </section>
    );
};