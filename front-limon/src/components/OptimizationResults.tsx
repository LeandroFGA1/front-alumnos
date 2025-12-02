import type{ ScheduleOption } from "../types";

interface Props {
    options: ScheduleOption[];
    onSelectOption: (option: ScheduleOption) => void;
    }

    export const OptimizationResults = ({ options, onSelectOption }: Props) => {
    

    const getStatusClass = (status: string) => {
        switch(status) {
        case 'optimal': return 'status-optimal';
        case 'good': return 'status-good';
        case 'regular': return 'status-regular';
        case 'bad': return 'status-bad';
        default: return '';
        }
    };

    const getBadgeClass = (status: string) => `badge badge-${status}`;

    const translateStatus = (status: string) => {
        const dict = { optimal: 'Óptimo', good: 'Bueno', regular: 'Regular', bad: 'Malo' };
        return dict[status as keyof typeof dict];
    }

    return (
        <section className="page-content">
        <h2>Resultados de Optimización</h2>
        <p className="description-text">Se han generado {options.length} combinaciones posibles.</p>

        <div className="cards-grid">
            {options.map((opt) => (
            <article 
                key={opt.id} 
                className={`schedule-card ${getStatusClass(opt.status)}`}
            >
                <div className="card-header">
                <span className={getBadgeClass(opt.status)}>{translateStatus(opt.status)}</span>
                <span className="card-id">#Opción {opt.id}</span>
                </div>
                <div className="card-body">
                <div className="metrics-row">
                    <div className="metric">
                    <span className="metric-label">Ventana Total</span>
                    <span className="metric-value">{opt.metrics.totalWindow}</span>
                    </div>
                    <div className="metric">
                    <span className="metric-label">Secciones</span>
                    <span className="metric-value">{opt.metrics.sections}</span>
                    </div>
                </div>
                
                <div className="info-group">
                    <label>Asignaturas Inscritas</label>
                    <div className="tags-container">
                    {opt.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                </div>

                <div className="info-group">
                    <label>Docentes Principales</label>
                    <p className="text-content">{opt.professors.join(', ')}</p>
                </div>
                </div>
                <div className="card-footer">
                <button className="btn-select" onClick={() => onSelectOption(opt)}>
                    Seleccionar Horario
                </button>
                </div>
            </article>
            ))}
        </div>
        </section>
    );
};