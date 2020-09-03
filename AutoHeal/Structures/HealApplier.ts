// For items and skills registered as usable by the system.
// Exists mainly to help optimize the algorithms for using skills and items
export class HealApplier
{
    get Priority(): number { return this.priority; }
    get BaseObject(): RPG.Item | RPG.Skill { return this.baseObject; }

    set Priority(value: number) { this.priority = value; }
    set BaseObject(value: RPG.Item | RPG.Skill) { this.baseObject = value; }

    get HealsHP(): boolean { return this.healsHP; }
    private healsHP: boolean;
    set HealsHP(value: boolean) { this.healsHP = value; }

    get HealsMP(): boolean { return this.healsMP; }
    private healsMP: boolean;
    set HealsMP(value: boolean) { this.healsMP = value; }

    constructor(protected baseObject: RPG.Item | RPG.Skill, protected priority: number)
    {
        this.HealsHP = baseObject.damage.type == DamageType.HPRecovery;
        this.healsMP = baseObject.damage.type == DamageType.MPRecovery;
    }

}

let RPGEx = CGT.Core.RPGEx;
let DamageType = RPGEx.DamageType;