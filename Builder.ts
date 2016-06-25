import WorkerCreep from "./WorkerCreep";
import Settings from "./Settings";

export default class Builder extends WorkerCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    expendEnergy() {
        const creep = this.creep;
        const targets = creep.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            const damaged = creep.room.find<Structure>(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (creep.repair(damaged[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(damaged[0]);
            }
        }
    }
}