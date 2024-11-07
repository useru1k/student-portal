import React, { useState } from 'react';
import { FilePlus2, Edit3Icon, Trash2Icon, FolderPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Generic Modal Component
const Modal = ({ isOpen, onClose, onConfirm, placeholder, title, initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue || '');

  const handleConfirm = () => {
    if (inputValue) {
      onConfirm(inputValue);
      setInputValue('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-3 py-1 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Test Component
const Test = ({ testName, onDelete, onEdit }) => (
  <li className="flex justify-between items-center mt-1">
    <Link to={`/adashboard/amodules/atest`} className="text-blue-600 hover:underline">
      {testName}
    </Link>
    <div className="flex space-x-2">
      <button onClick={onEdit} className="text-blue-500">
        <Edit3Icon size={18} />
      </button>
      <button onClick={onDelete} className="text-red-500">
        <Trash2Icon size={18} />
      </button>
    </div>
  </li>
);

// Section Component
const Section = ({ section, onEdit, onDelete, onAddTest, onDeleteTest, onAddSection, onEditTest }) => {
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isEditTestModalOpen, setIsEditTestModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');

  return (
    <div className="mb-6 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{section.name}</h3>
        <div className="flex space-x-2">
          <div title="Add Test">
            <FilePlus2
              className="text-green-500 cursor-pointer"
              onClick={() => setIsAddTestModalOpen(true)}
              size={18}
            />
          </div>
          <div title="Edit Section">
            <Edit3Icon
              className="text-blue-500 cursor-pointer"
              onClick={() => onEdit(section.id)}
              size={18}
            />
          </div>
          <div title="Delete Section">
            <Trash2Icon
              className="text-red-500 cursor-pointer"
              onClick={() => onDelete(section.id)}
              size={18}
            />
          </div>
          <div title="Add Section">
            <FolderPlus
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsAddSectionModalOpen(true)}
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Test List */}
      <ul className="mt-2">
        {section.tests.map((test, index) => (
          <Test
            key={index}
            testName={test}
            onDelete={() => onDeleteTest(section.id, test)}
            onEdit={() => {
              setSelectedTest(test);
              setIsEditTestModalOpen(true); // Open the edit modal
            }}
          />
        ))}
      </ul>
      
      {/* Add Test Modal */}
      <Modal
        isOpen={isAddTestModalOpen}
        onClose={() => setIsAddTestModalOpen(false)}
        onConfirm={(testName) => onAddTest(section.id, testName)}
        placeholder="Enter test name"
        title="Add Test"
      />

      {/* Edit Test Modal */}
      <Modal
        isOpen={isEditTestModalOpen}
        onClose={() => setIsEditTestModalOpen(false)}
        onConfirm={(newTestName) => {
          onEditTest(section.id, selectedTest, newTestName);
          setSelectedTest(''); // Clear selected test after editing
        }}
        placeholder="Edit test name"
        title="Edit Test"
        initialValue={selectedTest} // Pass selected test name to the modal
      />

      {/* Add Section Modal */}
      <Modal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        onConfirm={(sectionName) => onAddSection(section.id, sectionName)}
        placeholder="Enter section name"
        title="Add Section"
      />
    </div>
  );
};

// Main Component
const A_Modules = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'L1', tests: ['Module 1', 'Module 2', 'Module 3'] },
    { id: 2, name: 'L2', tests: ['Module 1', 'Module 2', 'Module 3', 'Module 4'] },
    { id: 3, name: 'L3', tests: ['Assessment'] },
  ]);
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);

  const handleAddSection = (currentSectionId, sectionName) => {
    const newSection = { id: Date.now(), name: sectionName, tests: [] };
    const updatedSections = sections.flatMap((section) => 
      section.id === currentSectionId ? [section, newSection] : [section]
    );
    setSections(updatedSections);
  };

  const handleEditSection = (id) => {
    const section = sections.find((section) => section.id === id);
    if (section) {
      setSectionToEdit(section);
      setIsEditSectionModalOpen(true);
    }
  };

  const handleUpdateSection = (name) => {
    setSections(sections.map((sec) =>
      sec.id === sectionToEdit.id ? { ...sec, name } : sec
    ));
    setIsEditSectionModalOpen(false);
    setSectionToEdit(null);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const handleAddTest = (sectionId, testName) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId ? { ...sec, tests: [...sec.tests, testName] } : sec
    ));
  };

  const handleDeleteTest = (sectionId, testName) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId ? { ...sec, tests: sec.tests.filter((test) => test !== testName) } : sec
    ));
  };

  const handleEditTest = (sectionId, oldTestName, newTestName) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId 
        ? { 
            ...sec, 
            tests: sec.tests.map((test) => test === oldTestName ? newTestName : test) 
          } 
        : sec
    ));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">TEST MANAGEMENT</h2>
       
      </div>

      <div className="h-96 overflow-y-auto border-t border-gray-300 custom-scroll">
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            onEdit={handleEditSection}
            onDelete={handleDeleteSection}
            onAddTest={handleAddTest}
            onDeleteTest={handleDeleteTest}
            onAddSection={handleAddSection}
            onEditTest={handleEditTest} 
          />
        ))}
      </div>

      {/* Edit Section Modal */}
      <Modal
        isOpen={isEditSectionModalOpen}
        onClose={() => setIsEditSectionModalOpen(false)}
        onConfirm={handleUpdateSection}
        placeholder="Edit section name"
        title="Edit Section"
        initialValue={sectionToEdit ? sectionToEdit.name : ''} // Set initial value for the edit modal
      />
    </div>
  );
};

export default A_Modules;
