import { HealSource } from '../../Structures/HealSource';
import { HealApplierArgs } from '../../Structures/HealApplierArgs';
import { HealApplier } from '../../Structures/HealApplier';
import { ItemHealApplier } from '../../Structures/ItemHealApplier';
import 
{ 
    MakeUppercase, 
    ArgsDemandHPHeal,
    ArgsDemandMPHeal, 
} from '../../Shared';

export let commandName = "CGT_AutoHeal_ApplyHeal_Items";

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
    let hpHealSources = <HealSource[]>CGT.AutoHeal.hpHealingItems;
    let currentHP = "hp", maxHP = "mhp";
    hpHealer = CreateItemApplier(currentHP, maxHP, hpHealSources);

    let mpHealSources = <HealSource[]>CGT.AutoHeal.mpHealingItems;
    let currentMP = "mp", maxMP = "mmp";
    mpHealer = CreateItemApplier(currentMP, maxMP, mpHealSources);

}

function CreateItemApplier(currentStat: string, 
    maxStat: string, 
    healSources: HealSource[]) : ItemHealApplier
{
    let healerArgs = CreateItemHealingArgs(currentStat, maxStat, healSources);
    let healer = HealApplier.From(ItemHealApplier, healerArgs);
    return healer;   
}


function CreateItemHealingArgs(currentStat: string, 
    maxStat: string, 
    healSources: HealSource[]): HealApplierArgs
{
    let healerArgs = new HealApplierArgs();
    healerArgs.CurrentStat = currentStat;
    healerArgs.MaxStat = maxStat;
    healerArgs.HealSources = healSources;
    return healerArgs;
}

export function HealWithItems(args: string[])
{
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