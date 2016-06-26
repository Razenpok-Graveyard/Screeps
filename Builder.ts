import WorkerCreep from "./WorkerCreep";
import Settings from "./Settings";

export default class Builder extends WorkerCreep {

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
        const targets = creep.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            const damaged = creep.room.find<Structure>(FIND_STRUCTURES,
            {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
            });
            if (damaged.length > 0) {
                if (creep.repair(damaged[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(damaged[0]);
                }
            } else {
                let walls = creep.room.find<Structure>(FIND_STRUCTURES,
                {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType === STRUCTURE_WALL
                });
                walls = walls.sort((first, second) => first.hits - second.hits);
                if (creep.repair(walls[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(walls[0]);
                }
            }
        }
    }
}