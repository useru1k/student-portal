import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Modules = () => {
  const { courseId } = useParams(); // Get the dynamic course ID from the URL

  // Data structure for course-specific modules or tests
  const courseModules = {
    1: [
      { id: 1, name: 'Test 1', link: '/test/1' },
      { id: 2, name: 'Test 2', link: '/test/2' },
    ],
    2: [
      { id: 1, name: 'Test A', link: '/test/a' },
      { id: 2, name: 'Test B', link: '/test/b' },
    ],
    3: [
      { id: 1, name: 'Test X', link: '/test/x' },
      { id: 2, name: 'Test Y', link: '/test/y' },
    ],
  };

  // Get the modules for the specific course
  const modules = courseModules[courseId];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Modules for Course {courseId}</h2>
      <ul>
        {modules ? (
          modules.map((module) => (
            <li key={module.id} className="mb-2">
              <Link
                to={module.link}
                className="text-blue-500 hover:underline"
              >
                {module.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No modules found for this course.</p>
        )}
      </ul>
    </div>
  );
};

export default Modules;
