let Scope = CGT.Core.RPGEx.Scope;

/**
 * For items and skills registered as usable by the system.
 */
export class HealSource
{
    get Priority(): number { return this.priority; }
    private priority: number;
    set Priority(value: number) { this.priority = value; }

    get HealsHP(): boolean { return this.healsHP; }
    private healsHP: boolean;

    get HealsMP(): boolean { return this.healsMP; }
    private healsMP: boolean;

    get TargetsAll(): boolean { return this.targetsAll; }
    private targetsAll: boolean;

    get BaseObject(): RPG.UsableItem { return this.baseObject; }
    private baseObject: RPG.UsableItem;
    set BaseObject(value: RPG.UsableItem) 
    { 
      this.baseObject = value; 
      this.UpdateFlags();
    }

    protected UpdateFlags()
    {
      this.healsHP = this.baseObject.damage.type == DamageType.HPRecovery;
      this.healsMP = this.baseObject.damage.type == DamageType.MPRecovery;
      this.targetsAll = this.baseObject.scope === Scope.AllAllies ||
                        this.baseObject.scope === Scope.AllAlliesDead; 
    }

    constructor(baseObject: RPG.UsableItem, priority: number = 0)
    {
      this.BaseObject = baseObject;
      this.Priority = priority;
    }

}

let RPGEx = CGT.Core.RPGEx;
let DamageType = RPGEx.DamageType;