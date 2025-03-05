import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CirclePlus, 
  AlertTriangle, 
  Square, 
  Octagon, 
  ArrowLeft, 
  Check 
} from 'lucide-react';

const SeverityReportingForm = () => {
  const [activePage, setActivePage] = useState("severitySelect");
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const severityLevels = [
    {
      level: 'Low',
      color: 'bg-gradient-to-r from-green-200 to-green-300',
      textColor: 'text-green-800',
      icon: <CirclePlus size={20} />,
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
      color: 'bg-gradient-to-r from-yellow-200 to-yellow-300',
      textColor: 'text-yellow-800',
      icon: <Square size={20} />,
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
      color: 'bg-gradient-to-r from-orange-200 to-orange-400',
      textColor: 'text-orange-800',
      icon: <AlertTriangle size={20} />,
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
      color: 'bg-gradient-to-r from-red-200 to-red-400',
      textColor: 'text-red-800',
      icon: <Octagon size={20} />,
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

  const handleSeveritySelect = (level) => {
    setSelectedSeverity(level);
    setActivePage("detailSelect");
  };

  const handleDetailSelect = (detail) => {
    setSelectedDetail(detail);
    setActivePage("reportForm");
  };

  const handleBackClick = () => {
    if (activePage === "detailSelect") {
      setActivePage("severitySelect");
      setSelectedSeverity(null);
    } else if (activePage === "reportForm") {
      setActivePage("detailSelect");
      setSelectedDetail(null);
    }
  };

  const handleSubmitReport = () => {
    setSubmitted(true);
    setTimeout(() => {
      setActivePage("severitySelect");
      setSelectedSeverity(null);
      setSelectedDetail(null);
      setDescription('');
      setSelectedProject('');
      setSelectedPeople([]);
      setSubmitted(false);
    }, 2000);
  };

  const togglePerson = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter(p => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };
  
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-4 h-64">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Report Submitted!</h2>
        <p className="text-gray-600 text-center">Your incident report has been successfully submitted.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {activePage === "severitySelect" && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Select Incident Severity</CardTitle>
            <CardDescription>Choose the appropriate severity level for the incident</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {severityLevels.map((item) => (
                <button
                  key={item.level}
                  className={`w-full p-4 rounded-lg flex items-center justify-between ${item.color} hover:shadow-md transition-shadow`}
                  onClick={() => handleSeveritySelect(item.level)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.level}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activePage === "detailSelect" && (
        <Card className="w-full">
          <CardHeader className={`${severityLevels.find(item => item.level === selectedSeverity).color}`}>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedSeverity} Severity</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleBackClick}>
                <ArrowLeft size={18} />
              </Button>
            </div>
            <CardDescription className="font-medium mt-2">
              {severityLevels
                .find(item => item.level === selectedSeverity)
                .descriptions
                .filter(desc => !desc.startsWith('•'))
                .map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {severityLevels
                .find(item => item.level === selectedSeverity)
                .descriptions
                .filter(desc => desc.startsWith('•'))
                .map((desc, index) => (
                  <button
                    key={index}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-between items-center"
                    onClick={() => handleDetailSelect(desc.substring(2))}
                  >
                    <span>{desc.substring(2)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activePage === "reportForm" && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Details</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleBackClick}>
                <ArrowLeft size={18} />
              </Button>
            </div>
            <CardDescription>
              {selectedDetail}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">
                Please provide a detailed description of the incident:
              </Label>
              <Textarea 
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what happened, including location, time, and any immediate actions taken to mitigate the situation."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project">Project Name:</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Select people to be notified:</Label>
              <div className="space-y-2">
                {people.map((person) => (
                  <div key={person} className="flex items-center space-x-2">
                    <Checkbox 
                      id={person}
                      checked={selectedPeople.includes(person)}
                      onCheckedChange={() => togglePerson(person)}
                    />
                    <Label htmlFor={person}>{person}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleSubmitReport}
            >
              Submit Report
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SeverityReportingForm;
