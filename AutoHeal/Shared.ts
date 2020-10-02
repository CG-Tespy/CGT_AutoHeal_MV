import { HealSource } from "./Structures/HealSource";

/** Defines something as usable by the system. */
export let usableTag = "CGT_AutoHeal_Usable";
/** For setting a priority value. */
export let priorityTag = "CGT_AutoHeal_Priority";

/** For finding priority tags. */
export let priorityTagRegex = new RegExp(`${priorityTag}\\s\\d+`);

export function SortByPriority(firstSource: HealSource, secondSource: HealSource): number
{
    return secondSource.Priority - firstSource.Priority;
}

let ArrayEx = CGT.Core.Extensions.ArrayEx;

export function ArgsDemandHPHeal(args: string[])
{
    return ArrayEx.Includes(args, validCommandArgs.healHP);
}

export function ArgsDemandMPHeal(args: string[])
{
    return ArrayEx.Includes(args, validCommandArgs.healMP);
}

/**
 * Converts all of the passed arr's contents to uppercase.
 * @param arr 
 */
export function MakeUppercase(arr: string[])
{
    for (let i = 0; i < arr.length; i++)
    {
        arr[i] = arr[i].toUpperCase();
    }
}

export let validCommandArgs = 
{
    healHP: "HP",
    healMP: "MP"
};
