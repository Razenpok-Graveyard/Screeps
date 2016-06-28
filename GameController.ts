import SmartCreepFactory from "./SmartCreepFactory";
import Settings from "./Settings";
import Town from "./Town";

export default class GameController {


    static initialize() {
    }

    static loop() {
        for (let name in Memory.creeps) {
            if (Memory.creeps.hasOwnProperty(name)) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log(`Clearing non-existing creep memory: ${name}`);
                }
            }
        }

        for (let roomName in _.filter(Game.rooms)) {
            if (Game.rooms.hasOwnProperty(roomName)) {
                const room = Game.rooms[roomName];
                const town = new Town(room);
                town.tick();
            }
        }
    }
}