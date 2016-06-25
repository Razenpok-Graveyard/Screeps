import WorkerCreep from "./WorkerCreep";

export default class Upgrader extends WorkerCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    expendEnergy() {
        const creep = this.creep;
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}