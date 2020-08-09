import os from 'os';

export class SystemStatsProbe {
  constructor () {
    this._cpus = os.cpus();
  }

  getStats () {
    const cpus = os.cpus();

    const cpusDelta = cpus.map((cpu, i) => {
      const deltaTimes = diffCpuTimes(cpu.times, this._cpus[i].times);
      return {
        model: cpu.model,
        load: (deltaTimes.user + deltaTimes.sys + deltaTimes.irq) / (deltaTimes.user + deltaTimes.nice + deltaTimes.sys + deltaTimes.idle + deltaTimes.irq)
      };
    });

    return {
      cpus: cpusDelta,
      totalmem: os.totalmem(),
      freemem: os.freemem()
    };
  }
}

const diffCpuTimes = (curr, prev) => ({
  user: curr.user - prev.user,
  nice: curr.nice - prev.nice,
  sys: curr.sys - prev.sys,
  idle: curr.idle - prev.idle,
  irq: curr.irq - prev.irq
});
