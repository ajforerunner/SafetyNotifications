const SeverityButtons = () => {
  // States for navigation
  const [selectedSeverity, setSelectedSeverity] = React.useState(null);
  const [selectedDetail, setSelectedDetail] = React.useState(null);
  const [showDetailPage, setShowDetailPage] = React.useState(false);
  
  // States for form fields
  const [description, setDescription] = React.useState('');
  const [selectedProject, setSelectedProject] = React.useState('');
  const [selectedPeople, setSelectedPeople] = React.useState([]);

  const severityLevels = [
    {
      level: 'Low',
      color: 'from-green-200 to-green-300',
      icon: 'bandage',
      descriptions: [
        'Near Miss, no injury, no other persons involved',
        'Injury has occurred:',
        '• First Aid Treatment',
        '• Attended hospital & Treated',
        'Member of the public (No injury)'
      ]
    },
    {
      level: 'Medium',
      color: 'from-yellow-200 to-yellow-300',
      icon: 'hospital',
      descriptions: [
        'High Potential Events:',
        '• High Potential Accident 1',
        '• High Potential Incident 2',
        'Lost Time Accident > 1 day',
        '• Attended Hospital and treated / detained < 24 hours',
        'Injury to member of the public'
      ]
    },
    {
      level: 'High',
      color: 'from-orange-200 to-orange-400',
      icon: 'alert-triangle',
      descriptions: [
        'High Potential Accident:',
        '• Hospital treatment > 24 hrs',
        '• Member of Public taken to Hospital for treatment (direct from workplace)',
        '• Specified injuries (RIDDOR reportable i.e. fracture)',
        '• Dangerous Occurrences (RIDDOR Collapse of structures, accidental releases i.e. Asbestos)',
        '• Ill health (Exposures)'
      ]
    },
    {
      level: 'Very High',
      color: 'from-red-200 to-red-400',
      icon: 'alert-octagon',
      descriptions: [
        '• Potential Multiple Major Injuries',
        '• Major Injuries to Member of Public',
        '• Site Evacuation',
        '• Fatality (Crisis Management)'
      ]
    }
  ];

  const projects = ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'];
  const people = ['Project Manager', 'Project Director', 'Safety Officer', 'Site Supervisor', 'Environmental Specialist'];

  const renderIcon = (iconName) => {
    if (iconName === 'bandage') {
      return (
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      );
    } else if (iconName === 'hospital') {
      return (
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      );
    } else if (iconName === 'alert-triangle') {
      return (
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      );
    }
  };

  const handleSeverityClick = (level) => {
    setSelectedSeverity(level);
  };

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    setShowDetailPage(true);
  };

  const handleBackClick = () => {
    if (showDetailPage) {
      setShowDetailPage(false);
      setSelectedDetail(null);
      setDescription('');
      setSelectedProject('');
      setSelectedPeople([]);
    } else {
      setSelectedSeverity(null);
    }
  };

  const togglePerson = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter(p => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  // Detail questions page (third page)
  if (showDetailPage) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Report Details: {selectedDetail}</h2>
            <button 
              onClick={handleBackClick}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please provide a detailed description of the incident:
              </label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what happened, including location, time, and any immediate actions taken to mitigate the situation."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name:
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select people to be notified:
              </label>
              <div className="space-y-2">
                {people.map((person) => (
                  <div key={person} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={person}
                      checked={selectedPeople.includes(person)}
                      onChange={() => togglePerson(person)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={person} className="ml-2 block text-sm text-gray-900">
                      {person}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  setShowDetailPage(false);
                  setSelectedDetail(null);
                  setSelectedSeverity(null);
                }}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Bullet points page (second page)
  else if (selectedSeverity) {
    const severityInfo = severityLevels.find(item => item.level === selectedSeverity);
    const bulletPoints = severityInfo.descriptions
      .filter(desc => desc.startsWith('•'))
      .map(desc => desc.substring(2));
    const headerText = severityInfo.descriptions
      .filter(desc => !desc.startsWith('•'));
    
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className={`rounded-t-lg p-4 bg-gradient-to-r ${severityInfo.color}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">{severityInfo.level} Severity</h2>
            <button 
              onClick={handleBackClick}
              className="px-4 py-2 bg-white bg-opacity-30 rounded-lg hover:bg-opacity-40 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
          </div>
          
          <div className="mt-2 text-black">
            {headerText.map((text, index) => (
              <p key={index} className="font-medium">{text}</p>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-b-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Select an option:</h3>
          <div className="space-y-3">
            {bulletPoints.map((point, index) => (
              <button 
                key={index}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-between items-center"
                onClick={() => handleDetailClick(point)}
              >
                <span>{point}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Main severity grid (first page)
  else {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {severityLevels.map((item) => (
            <div 
              key={item.level} 
              className={`rounded-3xl overflow-hidden shadow-md bg-gradient-to-br ${item.color} cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => handleSeverityClick(item.level)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-black">{item.level}</h2>
                  {renderIcon(item.icon)}
                </div>
                
                <div className="mt-6">
                  <ul className="space-y-2 text-black">
                    {item.descriptions.map((desc, index) => {
                      if (desc.startsWith('•')) {
                        return (
                          <li key={index} className="ml-4">
                            <div className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{desc.substring(2)}</span>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index} className="font-medium">
                            {desc}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// Render the component
ReactDOM.render(<SeverityButtons />, document.getElementById('root'));
