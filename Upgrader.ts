import WorkerCreep from "./WorkerCreep";

export default class Upgrader extends WorkerCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    gatherEnergy(): void {
        const creep = this.creep;
        const containers = creep.room.find<Container>(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && _.sum(structure.store) > 0
        });
        if (containers.length > 0) {
            for (let container of containers) {
                const outcome = container.transfer(creep, RESOURCE_ENERGY);
                if (outcome === ERR_NOT_ENOUGH_RESOURCES) continue;
                if (outcome === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                    return;
                }
                if (outcome === OK) return;
            }
        }
        super.gatherEnergy();
    }

    expendEnergy() {
        const creep = this.creep;
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}