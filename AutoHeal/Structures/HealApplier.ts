// For items and skills registered as usable by the system.
// Exists mainly to help optimize the algorithms for using skills and items
export class HealApplier
{
    get Priority(): number { return this.priority; }
    get BaseObject(): RPG.Item | RPG.Skill { return this.baseObject; }

    set Priority(value: number) { this.priority = value; }
    set BaseObject(value: RPG.Item | RPG.Skill) { this.baseObject = value; }

    constructor(protected baseObject: RPG.Item | RPG.Skill, protected priority: number)
    {}

}