export type DayOfWeek = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES' | 'SABADO';

export interface ClassSession {
    id: string;
    subjectCode: string;
    subjectName: string;
    professor: string;
    room: string;
    campus: string;
    day: DayOfWeek;
    startTime: string; 
    endTime: string;   
    colorClass: 'purple' | 'teal' | 'blue' | 'orange' | 'red' | 'green' | 'indigo' | 'dark'; 
    level: number
    }

    export interface ScheduleOption {
    id: number;
    status: 'optimal' | 'good' | 'regular' | 'bad';
    metrics: {
        totalWindow: string; 
        sections: number;
    };
    tags: string[]; 
    professors: string[];
    schedule: ClassSession[]; 
    }


    export interface GeneralCriteria {
    campus: string;
    career: string;
    plan: string[]; 
    shift: string[];
    level: string;
    }

    export interface SpecificCriteria {
    subjects: string[];
    professors: string[];
    }


    export interface DynamicFilterOptions {
    availableSubjects: string[];
    availableProfessors: string[];
    }



export interface ClassSession {
    id: string;
    subjectCode: string;
    subjectName: string;
    professor: string;
    room: string;
    campus: string;
    day: DayOfWeek;
    startTime: string; 
    endTime: string;   
    colorClass: 'purple' | 'teal' | 'blue' | 'orange' | 'red' | 'green' | 'indigo' | 'dark'; 
}

export interface ScheduleOption {
    id: number;
    status: 'optimal' | 'good' | 'regular' | 'bad';
    metrics: {
        totalWindow: string; 
        sections: number;
    };
    tags: string[]; 
    professors: string[];
    schedule: ClassSession[]; 
}



export interface GeneralCriteria {
    campus: string;
    career: string;
    plan: string[]; 
    shift: string[]; 
}

export interface SpecificCriteria {
    subjects: string[];
    professors: string[];
}


export interface DynamicFilterOptions {
    availableSubjects: string[];
    subjectToProfessorsMap: Record<string, string[]>; 
}
