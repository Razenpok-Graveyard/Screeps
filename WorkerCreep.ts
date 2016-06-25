import SmartCreep from "./SmartCreep";

abstract class WorkerCreep extends SmartCreep {

    processTick(): void {
        const creep = this.creep;
        if (this.expendingEnergy && creep.carry.energy === 0) {
            this.expendingEnergy = false;
        }
        if (!this.expendingEnergy && creep.carry.energy === creep.carryCapacity) {
            this.expendingEnergy = true;
        }

        if (this.expendingEnergy) {
            this.expendEnergy();
        } else {
            this.gatherEnergy();
        }
    }

    private get expendingEnergy(): boolean {
        return this.creep.memory.expendingEnergy;
    }

    private set expendingEnergy(value) {
        this.creep.memory.expendingEnergy = value;
    }

    private gatherEnergy(): void {
        const creep = this.creep;
        const sources = creep.room.find<Source>(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }

    protected abstract expendEnergy(): void;
}

export default WorkerCreep;