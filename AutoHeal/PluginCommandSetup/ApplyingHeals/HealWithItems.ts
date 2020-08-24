import { PluginParams } from '../Shared';

export function HealWithItems()
{
    let pluginParams = PluginParams();

    if (pluginParams.healHp)
        HealHP();

    if (pluginParams.healMp)
        HealMP();
}

function HealHP()
{
    let healingItems = SortedByHPHealing($gameParty.items());

    // Go through each alive party member, healing them up to full if possible
    let partyMembers = $gameParty.aliveMembers();

    for (let member of partyMembers)
    {
        HealPartyMember(member, healingItems);
    }
}

/** Ascending */
function SortedByHPHealing(items: RPG.Item[])
{
    let sorted = RPGItemEx.HPHealingItemsIn(items);
    sorted.sort(SortAscending);
    return sorted;
}

let RPGItemEx = CGT.Core.Extensions.Items.RPGItemEx;

function SortAscending(firstItem: RPG.Item, secondItem: RPG.Item)
{
    // Sort by flat amount first, then percent
    let healDiff = FlatHPAmountHealed(firstItem) - FlatHPAmountHealed(secondItem);

    if (healDiff == 0)
        healDiff = PercentHPAmountHealed(firstItem) - PercentHPAmountHealed(secondItem);

    return healDiff;
}

// This goes by the flat amount first, then the percent amount.
// This assumes the item has any hp-healing effects.
function FlatHPAmountHealed(item: RPG.Item): number
{
    let healEffects = HealEffects.OfItem(item);
    let flatAmount = 0;
    
    for (let eff of healEffects.hp)
    {
        flatAmount += eff.value2;
    }

    return flatAmount;
}

let HealEffects = CGT.Core.Extensions.Items.HealEffects;

function PercentHPAmountHealed(item: RPG.Item): number
{
    let healEffects = HealEffects.OfItem(item);
    let percentAmount = 0;
    
    for (let eff of healEffects.hp)
    {
        percentAmount += eff.value1;
    }

    return percentAmount;
}

function HealPartyMember(member: Game_Actor, healingItems: RPG.Item[]): void
{
    while (!MemberAtFullHP(member) && AvailableHealingItemsAreIn(healingItems))
    {
        let item = GetFirstAvailableHealingItem(healingItems);
        RPGItemEx.UseItemOnPartyMember(item, member);
    }
}

function MemberAtFullHP(actor: Game_Actor)
{
    return actor.hp == actor.mhp;
}

function AvailableHealingItemsAreIn(healingItems: RPG.Item[])
{
    for (let item of healingItems)
        if ($gameParty.hasItem(item, false))
            return true;

    return false;
}

function GetFirstAvailableHealingItem(healingItems: RPG.Item[])
{
    for (let item of healingItems)
        if ($gameParty.hasItem(item, false))
            return item;

    return null;
}

function HealMP()
{
    throw 'Not yet implemented!';
}