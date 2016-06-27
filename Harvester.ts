import WorkerCreep from "./WorkerCreep";
import Settings from "./Settings";
import GameController from "./GameController";

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
            for (let target of targets) {
                const outcome = creep.transfer(target, RESOURCE_ENERGY);
                console.log(outcome);
                if (outcome === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    return;
                }
                if (outcome === OK) return;
            }
        } else {
            creep.moveTo(GameController.MainSpawn);
        }
    }
}