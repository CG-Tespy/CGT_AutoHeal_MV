import { priorityTagRegex } from '../Shared';
let Scope = CGT.Core.RPGEx.Scope;

/**
 * Wrapper for items and skills registered as usable by the system,
 * to make it easier to see what they can do.
 */
export class HealSource
{
    constructor(baseObject: RPG.UsableItem)
    {
      this.BaseObject = baseObject;
    }

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
      this.priority = GetPriorityOf(this.baseObject);
    }

    protected healsHP: boolean = false;
    get HealsHP(): boolean { return this.healsHP; }
    
    protected healsMP: boolean = false;
    get HealsMP(): boolean { return this.healsMP; }
    
    protected targetsAll: boolean = false;
    get TargetsAll(): boolean { return this.targetsAll; }
    
    protected priority: number = defaultPriority;
    get Priority(): number { return this.priority; }
    
}

let RPGEx = CGT.Core.RPGEx;
let DamageType = RPGEx.DamageType;

function GetPriorityOf(obj: RPG.UsableItem): number
{
    let priority = defaultPriority; // For when the priority tag's not there
    let allNotetags = obj.note;
    let priorityTagMatch = allNotetags.match(priorityTagRegex) || [];
    let tagIsThere = priorityTagMatch.length > 0;

    if (tagIsThere)
    {
        let priorityNotetag = priorityTagMatch[0];
        let priorityValMatch = priorityNotetag.match(forPriorityValue);

        let valIsThere = priorityValMatch.length > 0;

        if (valIsThere)
            priority = parseInt(priorityValMatch[0]);
    }

    return priority;
}

let defaultPriority = 0;
let forPriorityValue = /\d+/;