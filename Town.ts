import Settings from "./Settings";
import SmartCreepFactory from "./SmartCreepFactory";
import SmartCreepType from "./SmartCreepType";

export default class Town {

    private room: Room;

    constructor(room: Room) {
        this.room = room;
    }

    tick(): void {
        const room = this.room;
        const spawns = room.find<Spawn>(FIND_MY_SPAWNS);
        if (spawns.length < 1) return;
        Settings.MainSpawn = spawns[0];
        const spawn = Settings.MainSpawn;
        if (spawn != null) {
            let spawning = false;
            const harvesters = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Harvester);
            if (harvesters.length < 2) {
                const newName = spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Harvester });
                console.log(`Spawning new harvester: ${newName}`);
                spawning = true;
            }

            const upgraders = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Upgrader);
            if (upgraders.length < 2 && !spawning) {
                const newName = spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Upgrader });
                console.log(`Spawning new upgrader: ${newName}`);
                spawning = true;
            }

            const builders = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Builder);
            if (builders.length < 2 && !spawning) {
                const newName = spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Builder });
                console.log(`Spawning new builder: ${newName}`);
            }
        }


        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const gameCreep = Game.creeps[name];
                const creep = SmartCreepFactory.create(gameCreep);
                creep.processTick();
            }
        }
    }
}