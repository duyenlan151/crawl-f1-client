import { useState } from 'react';

type Tab = {
  key: string | number;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  children: React.ReactNode;
};

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="flex pb-4">
        {tabs.map((tab, index) => (
          <button
            key={`${tab.label}`}
            className={`px-4 py-2 hover:bg-gray-50 focus:outline-none ${
              activeTab === index
                ? 'border-t-2 border-primary'
                : 'text-gray-500 bg-gray-100'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab !== 0 && children}
      <div className="">{tabs[activeTab].content}</div>
    </>
  );
};

export default Tabs;
