export const Sidebar = () => {
    return (
        <aside className="sidebar">
        <div className="brand-logo">
            <div className="red-box-icon logo-size"></div>
        </div>

        <nav className="menu">
            <ul>
            <li><a href="#"><div className="red-box-icon"></div> Inicio</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Horarios de clases</a></li>
            <li><a href="#"><div className="red-box-icon"></div> AVA</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Notas</a></li>
            <li className="active"><a href="#"><div className="red-box-icon"></div> Asistencia</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Progreso Académico</a></li>
            <li className="separator"></li> 
            <li><a href="#"><div className="red-box-icon"></div> Tutoriales</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Biblioteca</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Bibliografía de Asignaturas</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Apoyo al Estudio</a></li>
            <li className="separator"></li>
            <li><a href="#"><div className="red-box-icon"></div> Correo</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Solicitudes</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Centro de Ayuda</a></li>
            <li><a href="#"><div className="red-box-icon"></div> Actividades y Eventos Online</a></li>
            </ul>
        </nav>

        <div className="sidebar-footer">
            <a href="#"><div className="red-box-icon"></div> Programas de apoyo al estudiante</a>
        </div>
        </aside>
    );
};