import WorkerCreep from "./WorkerCreep";
import Settings from "./Settings";

export default class Harvester extends WorkerCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    expendEnergy() {
        const creep = this.creep;
        const structures = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_TOWER,
            STRUCTURE_CONTAINER
        ];
        const targets = creep.room.find<Structure>(FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return (structures.indexOf(structure.structureType) > -1) &&
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