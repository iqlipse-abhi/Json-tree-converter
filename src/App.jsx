import { useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import JsonInput from './components/JsonInput';
import TreeView from './components/TreeView';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import { parseJsonToNodes } from './utils/jsonParser';
import { findNodeByPath } from './utils/pathFinder';
import { useTheme } from './hooks/useTheme';

function App() {
  const [data, setData] = useState(null);
  const [tree, setTree] = useState({ nodes: [], edges: [] });
  const [highlighted, setHighlighted] = useState(null);
  const [msg, setMsg] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (data) {
      const { nodes, edges } = parseJsonToNodes(data);
      setTree({ nodes, edges });
      setHighlighted(null);
      setMsg('');
    }
  }, [data]);

  //  useEffect(() => {
  //   if (data) {
  //     const { nodes, edges } = parseJsonToNodes(data);
  //     setTree({ nodes, edges });
  //   }
  // }, [data, node, edge]);

  const handleSearch = (searchPath) => {
    if (!searchPath.trim()) {
      setMsg('Please enter a search path');
      return;
    }

    // const found = findNodeByPath(searchPath, tree.nodes, data);
    const nodeId = findNodeByPath(searchPath, tree.nodes, data);
    
    if (nodeId) {
      setHighlighted(nodeId);
      setMsg('Match found!');
    } else {
      setHighlighted(null);
      setMsg('No match found');
    }
  };

  const clearAll = () => {
    setData(null);
    setTree({ nodes: [], edges: [] });
    setHighlighted(null);
    setMsg('');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JSON to tree converter
          </h1>
          <p className="text-gray-600">
            Convert your JSON data in tree format
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <JsonInput onVisualize={setData} onClear={clearAll} />
          </div>
          
          <div className="col-span-8">
            {tree.nodes.length > 0 ? (
              <div className="space-y-4">
                <SearchBar onSearch={handleSearch} />
                
                {msg && (
                  <div className={`p-3 rounded-lg font-medium ${
                    msg.includes('found!') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {msg}
                  </div>
                )}
                
                <ReactFlowProvider>
                  <TreeView 
                    nodes={tree.nodes} 
                    edges={tree.edges}
                    highlightedNode={highlighted}
                  />
                </ReactFlowProvider>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No JSON data yet
                </h3>
                <p className="text-gray-500">
                  Enter JSON and click "Generate Tree"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;