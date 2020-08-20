//
// Copyright 2020 DXOS.org
//

import debug from 'debug';

import React, { useEffect, useState, useRef } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ForceGraph2D } from 'react-force-graph';

import { Simulation, Connectivity } from '../src/simulation';

const log = debug('dxos:echo:stories');
debug.enable('dxos:echo:stories');

export default {
  title: 'Replicating p2p Network'
};

const simulation = new Simulation();

const useSimulation = () => {
  return simulation;
};

const Graph = (parameters: any) => {
  const { simulation, onNodeClick } = parameters as {simulation: Simulation, onNodeClick: any};
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const graphRef = useRef() as any;

  useEffect(() => {
    const init = async () => {
      await simulation.initialize();
      simulation.onUpdate( () => { setGraphData(simulation.toForceGraph() as any); });
    };
    init();
  }, []);

  // TODO(dboreham): Fix zooming magic below.
  return <ForceGraph2D graphData={graphData}
    ref={graphRef}
    onNodeClick={onNodeClick}
    cooldownTicks={100}
    onEngineStop={() => graphRef.current.zoomToFit(100, 100)}
  >
  </ForceGraph2D>;
};

export const Network1 = () => {
  const [continuousMutations, setContinuousMutations] = useState(false);
  const simulation = useSimulation();

  const handleContinuousToggled = async () => {
    if (continuousMutations) {
      simulation.stopMutating();
      setContinuousMutations(false);
    } else {
      simulation.startMutating();
      setContinuousMutations(true);
    }
  };

  return <div>
    <Toolbar>
      <div><Button onClick={() => simulation.addPeer()}>Add peer</Button></div>
      <div><Button onClick={() => simulation.changeConnectivity(Connectivity.DISCONNECTED)}>Disconnect All</Button></div>
      <div><Button onClick={() => simulation.changeConnectivity(Connectivity.CONNECTED)}>Fully Connect</Button></div>
      <div><Button onClick={() => simulation.changeConnectivity(Connectivity.RANDOM)}>Random</Button></div>
      <div><Button onClick={() => simulation.changeConnectivity(Connectivity.SPLIT)}>Split Brain</Button></div>
      <div><Typography>Continuous</Typography></div>
      <div><Switch checked={continuousMutations} onChange={handleContinuousToggled}></Switch></div>
      <div><Button onClick={() => simulation.singleMutation()}>One Mutation</Button></div>
    </Toolbar>
    <Graph simulation={simulation} onNodeClick={(node: any) => simulation.disconnectNode(node.id)}></Graph>
  </div>;
};
