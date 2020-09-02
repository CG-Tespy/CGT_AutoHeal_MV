import { usableTag, priorityTagRegex } from '../Shared';
import { HealApplier } from '../Structures/HealApplier';

interface HasNotetag
{
    note: string
}

export function HealingAppliersIn(inDatabase: HasNotetag[]): HealApplier[]
{
    let healAppliers: HealApplier[] = [];
    let firstIndex = 1;

    for (let i = firstIndex; i < inDatabase.length; i++)
    {
        let applier = <RPG.Item | RPG.Skill> inDatabase[i];
        let isForSystem = applier.note.includes(usableTag);

        if (isForSystem)
        {
            let priority = GetPriorityOf(applier);
            let toRegister = new HealApplier(applier, priority);
            healAppliers.push(toRegister);
        }
    }

    return healAppliers;
}

function GetPriorityOf(obj: HasNotetag): number
{
    let priority = 0; // If the priority tag's not there, the value defaults to this.
    let notetag = obj.note;
    let priorityLineMatch = notetag.match(priorityTagRegex) || [];
    let tagIsThere = priorityLineMatch.length > 0;

    if (tagIsThere)
    {
        // Use a regex to find the priority value
        let priorityNotetag = priorityLineMatch[0];
        let priorityValMatch = priorityNotetag.match(/\d+/);

        let valIsThere = priorityValMatch.length > 0;

        if (valIsThere)
            priority = parseInt(priorityValMatch[0]);
    }

    return priority;
}
