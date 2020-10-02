import { usableTag, priorityTagRegex } from '../Shared';
import { HealSource } from '../Structures/HealSource';

// Helper code for HealSources_Setup
interface HasNotetag
{
    note: string
}

export function HealingSourcesIn(databaseContents: HasNotetag[]): HealSource[]
{
    let healSources: HealSource[] = [];
    let firstIndex = 1; // The 0th-index item in the RM Database is always null

    for (let i = firstIndex; i < databaseContents.length; i++)
    {
        let source = <RPG.Item | RPG.Skill> databaseContents[i];
        let isForSystem = source.note.includes(usableTag);

        if (isForSystem)
        {
            let priority = GetPriorityOf(source);
            let toRegister = new HealSource(source, priority);
            healSources.push(toRegister);
        }
    }

    return healSources;
}

function GetPriorityOf(obj: HasNotetag): number
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
