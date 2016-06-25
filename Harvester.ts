import WorkerCreep from "./WorkerCreep";
import Settings from "./Settings";

export default class Harvester extends WorkerCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    expendEnergy() {
        const creep = this.creep;
        const targets = creep.room.find<Structure>(FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
}