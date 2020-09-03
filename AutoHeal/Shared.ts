import { HealApplier } from "./Structures/HealApplier";

// The params might not be initialized when this part of the API is, so
// we can't just have each file point immediately to the params and expect things to work.
// The params should be ready whenever any of the commands execute, though, so yeah.
export function PluginParams() { return CGT.AutoHeal.PluginParams; }

export let usableTag = "CGT_AutoHeal_Usable";
export let priorityTag = "CGT_AutoHeal_Priority";

export let priorityTagRegex = new RegExp(`${priorityTag}\\b\\d+`);

export function SortByPriority(firstApplier: HealApplier, secondApplier: HealApplier): number
{
    return secondApplier.Priority - firstApplier.Priority;
}

let Game_ActorEx = CGT.Core.Extensions.Game_ActorEx;

export let IsAtFullHP = Game_ActorEx.IsAtFullHP;
export let IsAtFullMP = Game_ActorEx.IsAtFullMP;