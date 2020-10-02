import { MakeUppercase, ArgsDemandHPHeal, ArgsDemandMPHeal } from '../../Shared';
import { HealApplier } from '../../Structures/HealApplier';
import { HealSource } from '../../Structures/HealSource';
import { HealApplierArgs } from '../../Structures/HealApplierArgs';
import { SkillHealApplier } from '../../Structures/SkillHealApplier';

export let commandName = "CGT_AutoHeal_ApplyHeal_Skills";

SetThingsUpWhenTitleScreenStarts();

function SetThingsUpWhenTitleScreenStarts()
{
    let coreEngine = CGT.Core;
    let callbacks = coreEngine.Utils.Callbacks;
    let TitleScreenStart = callbacks.TitleScreenStart;
    TitleScreenStart.AddListener(SetUpHealAppliers, this);
}

let hpHealer: HealApplier = null;
let mpHealer: HealApplier = null;

function SetUpHealAppliers(): void
{
    let hpHealSources = <HealSource[]>CGT.AutoHeal.hpHealingSkills;
    let currentHP = "hp", maxHP = "mhp";
    hpHealer = CreateSkillApplier(currentHP, maxHP, hpHealSources);

    let mpHealSources = <HealSource[]>CGT.AutoHeal.mpHealingSkills;
    let currentMP = "mp", maxMP = "mmp";
    mpHealer = CreateSkillApplier(currentMP, maxMP, mpHealSources);
}

function CreateSkillApplier(currentStat: string, 
    maxStat: string, 
    healSources: HealSource[]) : HealApplier
{
    let healerArgs = CreateSkillHealingArgs(currentStat, maxStat, healSources);
    let healer = HealApplier.From(SkillHealApplier, healerArgs);
    return healer;   
}


function CreateSkillHealingArgs(currentStat: string, 
    maxStat: string, 
    healSources: HealSource[]): HealApplierArgs
{
    let healerArgs = new HealApplierArgs();
    healerArgs.CurrentStat = currentStat;
    healerArgs.MaxStat = maxStat;
    healerArgs.HealSources = healSources;
    return healerArgs;
}

export function HealWithSkills(args: string[])
{
    // Make the args uppercase
    MakeUppercase(args);

    if (ArgsDemandHPHeal(args))
        HealHP();

    if (ArgsDemandMPHeal(args))
        HealMP();
}

function HealHP()
{
    hpHealer.Apply();
}

function HealMP()
{
    mpHealer.Apply();
}