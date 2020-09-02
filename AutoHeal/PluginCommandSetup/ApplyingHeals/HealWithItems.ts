import { PluginParams } from '../../Shared';

export function HealWithItems()
{
    let pluginParams = PluginParams();

    if (pluginParams.healHP)
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

let RPGItemEx = CGT.Core.Extensions.RPGItemEx;

function SortAscending(firstItem: RPG.Item, secondItem: RPG.Item)
{
    // Sort by flat amount first, then percent
    let healDiff = FlatHPAmountHealed(firstItem) - FlatHPAmountHealed(secondItem);

    if (healDiff == 0)
        healDiff = PercentHPAmountHealed(firstItem) - PercentHPAmountHealed(secondItem);

    return healDiff;
}

let FlatHPAmountHealed = RPGItemEx.FlatHPAmountHealed;
let PercentHPAmountHealed = RPGItemEx.PercentHPAmountHealed;

function HealPartyMember(member: Game_Actor, healingItems: RPG.Item[]): void
{
    while (!MemberAtFullHP(member) && AvailableHealingItemsAreIn(healingItems))
    {
        let item = GetFirstAvailableHealingItem(healingItems);
        RPGItemEx.UseItemOnActor(item, member);
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