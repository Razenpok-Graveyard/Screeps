abstract class SmartCreep {

    protected creep: Creep;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    abstract processTick(): void;
}

export default SmartCreep;