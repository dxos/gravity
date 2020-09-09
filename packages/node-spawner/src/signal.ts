import { ChildProcess, spawn } from "child_process";

export function startSignal(port: number): Promise<ChildProcess> {
  const child = spawn('node', [require.resolve('@geut/discovery-swarm-webrtc/bin/index.js'), '--port', port.toString()], { stdio: 'pipe' });
  return new Promise((resolve, reject) => {
    child.stdout.on('data', data => {
      console.log('signal', data.toString())
      if(data.toString().includes('discovery-swarm-webrtc running')) {
        resolve(child)
      }
    })
    child.on('exit', code => {
      reject(new Error(`Failed to start signal. Exit code: ${code}`));
    })
  })
}
