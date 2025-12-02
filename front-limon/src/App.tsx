import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { AcademicFilters } from './components/AcademicFilters';
import { OptimizationResults } from './components/OptimizationResults';
import { DetailedSchedule } from './components/DetailedSchedule';
import { VisualTimetable } from './components/VisualTimetable';
import type { ScheduleOption, GeneralCriteria, SpecificCriteria, DynamicFilterOptions } from './types';
import './style.css';

function App() {
  const [allData, setAllData] = useState<ScheduleOption[]>([]);
  const [filteredData, setFilteredData] = useState<ScheduleOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ScheduleOption | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [dynamicOptions, setDynamicOptions] = useState<DynamicFilterOptions>({
    availableSubjects: [],
    subjectToProfessorsMap: {}
  });

  useEffect(() => {
    fetch('/data.json').then(res => res.json()).then(json => setAllData(json.options));
  }, []);

  const handleGeneralSubmit = (criteria: GeneralCriteria) => {
    const matches = allData.filter(option => {
      if (criteria.campus) {
        return option.schedule.some(cls => cls.campus.includes(criteria.campus));
      }
      return true;
    });

    const uniqueSubjects = new Set<string>();
    const subToProfMap: Record<string, string[]> = {};

    matches.forEach(opt => {
      opt.schedule.forEach(cls => {
        uniqueSubjects.add(cls.subjectName);
        
        if (!subToProfMap[cls.subjectName]) {
          subToProfMap[cls.subjectName] = [];
        }
        if (!subToProfMap[cls.subjectName].includes(cls.professor)) {
          subToProfMap[cls.subjectName].push(cls.professor);
        }
      });
    });

    setDynamicOptions({
      availableSubjects: Array.from(uniqueSubjects).sort(),
      subjectToProfessorsMap: subToProfMap
    });
    

    setFilteredData(matches);
    setStep(1);
  };


  const handleSpecificSubmit = (criteria: SpecificCriteria) => {
    

    const prunedResults = filteredData.map(option => {
      

      const newSchedule = option.schedule.filter(cls => {
        const isSubjectSelected = criteria.subjects.includes(cls.subjectName);
        

        let isProfessorSelected = true;
        if (criteria.professors.length > 0) {

            isProfessorSelected = criteria.professors.includes(cls.professor);

        }

        return isSubjectSelected;
      });

      if (newSchedule.length === 0) return null;

      const newTags = Array.from(new Set(newSchedule.map(c => c.subjectName)));
      const newProfessors = Array.from(new Set(newSchedule.map(c => c.professor)));


      return {
        ...option,
        tags: newTags,
        professors: newProfessors,
        schedule: newSchedule,
        metrics: {
          ...option.metrics,
          sections: newSchedule.length 
        }
      };
    }).filter(item => item !== null) as ScheduleOption[]; 


    const finalResults = prunedResults.filter(opt => {
        if (criteria.professors.length > 0) {
          
            return opt.professors.some(p => criteria.professors.includes(p));
        }
        return true;
    });

    setFilteredData(finalResults);
    setStep(2);
  };

  const handleBackToResults = () => {
    setSelectedOption(null);
  };

  return (
    <div className="main-container">
      <Sidebar />
      <main className="content-area">
        <TopHeader />
        {!selectedOption ? (
          <>
              <AcademicFilters 
                  isSecondStageUnlocked={step >= 1}
                  dynamicOptions={dynamicOptions}
                  onApplyGeneralFilters={handleGeneralSubmit}
                  onApplySpecificFilters={handleSpecificSubmit}
              />
              {step === 2 && (
                <OptimizationResults 
                    options={filteredData} 
                    onSelectOption={(opt) => setSelectedOption(opt)} 
                />
              )}
          </>
        ) : (
          <>
            <DetailedSchedule 
              selectedOption={selectedOption} 
              onBack={handleBackToResults} 
            />
            <VisualTimetable schedule={selectedOption.schedule} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;