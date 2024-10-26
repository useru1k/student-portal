import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Modules = () => {
  const { courseId } = useParams();

  const courseModules = {
    1: [
      { id: 1, name: 'Test 1', link: '/dashboard/courses/modules/test/1' },
      { id: 2, name: 'Test 2', link: '/dashboard/courses/modules/test/2' },
    ],
    2: [
      { id: 1, name: 'Test A', link: '/dashboard/courses/modules/test/a' },
      { id: 2, name: 'Test B', link: '/dashboard/courses/modules/test/b' },
    ],
    3: [
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' },
    ],
  };

  const modules = courseModules[courseId];

  return (
    <div className="h-screen overflow-y-auto p-6 custom-scroll"> {/* Set full height and scroll */}
      <h2 className="text-2xl font-bold mb-4">Modules for Course {courseId}</h2>
      <ul>
        {modules ? (
          modules.map((module) => (
            <li key={module.id} className="mb-2">
              <Link to={module.link} className="text-blue-500 hover:underline">
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
