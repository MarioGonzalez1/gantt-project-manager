interface SidebarProps {
  selectedDepartment: string;
  onSelectDepartment: (department: string) => void;
}

const departments = [
  'Software Development',
  'Business Intelligence',
  'Robotic Process Automation'
];

export default function Sidebar({ selectedDepartment, onSelectDepartment }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img 
          src="/logo.png" 
          alt="Forza Transportation Services" 
          className="h-14 w-auto"
        />
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => onSelectDepartment(dept)}
              className={`w-full text-left px-4 py-3 rounded transition-colors text-sm ${
                selectedDepartment === dept
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

