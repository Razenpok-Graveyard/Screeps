import Harvester from "./Harvester";
import SmartCreep from "./SmartCreep";
import DumbCreep from "./DumbCreep";
import Upgrader from "./Upgrader";
import Builder from "./Builder";
import SmartCreepType from "./SmartCreepType";

export default class SmartCreepFactory {
    static create(creep: Creep): SmartCreep {
        const type = creep.memory.type as SmartCreepType;
        switch (type) {
            case SmartCreepType.Harvester: return new Harvester(creep);
            case SmartCreepType.Upgrader: return new Upgrader(creep);
            case SmartCreepType.Builder: return new Builder(creep);
            default: return new DumbCreep(creep);
        }
    }
}