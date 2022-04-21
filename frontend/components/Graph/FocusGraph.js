import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const FocusGraph = () => {
  const fgRef = React.useRef();

  React.useEffect(() => {
    // const bloomPass = new UnrealBloomPass();
    UnrealBloomPass.strength = 3;
    UnrealBloomPass.radius = 1;
    UnrealBloomPass.threshold = 0.1;
    fgRef.current.postProcessingComposer().addPass(UnrealBloomPass);
  }, []);

  const handleClick = React.useCallback(
    (node) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      if (fgRef.current) {
        fgRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          3000,
        );
      }
    },
    [fgRef],
  );

  return (
    <ForceGraph3D
      ref={fgRef}
      onNodeClick={handleClick}
      height={500}
      width="100%"
      graphData={window.graphData}
      backgroundColor="black"
      showNavInfo={false}
      nodeAutoColorBy={(d) => d.id}
      linkLabel={(r) => r.type}
      linkWidth={1}
      linkAutoColorBy={(r) => r.type}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      linkOpacity={0.9}
    />
  );
};

export default FocusGraph;
