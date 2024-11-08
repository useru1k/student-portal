import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Modules = () => {
  const { courseId } = useParams();

  const courseModules = {
    1: [
      { id: 1, name: 'Test 1', link: '/dashboard/courses/modules/test/1' ,locked: false },
      { id: 2, name: 'Test 2', link: '/dashboard/courses/modules/test/2' ,locked: true },
    ],
    2: [
      { id: 1, name: 'Test A', link: '/dashboard/courses/modules/test/a' ,locked: false },
      { id: 2, name: 'Test B', link: '/dashboard/courses/modules/test/b' ,locked: true },
    ],
    3: [
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: false },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true  },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true  },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true  },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
      { id: 1, name: 'Test X', link: '/dashboard/courses/modules/test/x' ,locked: true },
      { id: 2, name: 'Test Y', link: '/dashboard/courses/modules/test/y' ,locked: true },
    ],
  };

  const modules = courseModules[courseId];

  return (
    <div className="h-screen overflow-y-auto p-6 custom-scroll bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Modules for Course {courseId}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules ? (
          modules.map((module) => (
            <Link
              to={module.link}
              key={`${module.id}-${module.name}`} 
              className="block bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-gray-800 font-semibold text-lg mb-4 flex items-center">
                {module.name}
                {module.locked && (
                  <Lock className="ml-2 text-gray-500" size={15} />
                )}
              </h3>
              <div className="text-gray-600 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block font-medium">
                Time Limit: 1 hrs
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No modules found for this course.</p>
        )}
      </div>
    </div>
  );
};
export default Modules;
