import { PluginParams, IsAtFullHP, IsAtFullMP } from '../../Shared';

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
    // Go through each alive party member, healing them up to full if possible
    let partyMembers = $gameParty.aliveMembers();

    for (let member of partyMembers)
    {
        HealPartyMemberHP(member);
    }
}

let RPGItemEx = CGT.Core.Extensions.RPGItemEx;
let UseItemOnActor = RPGItemEx.UseItemOnActor.bind(RPGItemEx);

function HealPartyMemberHP(member: Game_Actor): void
{
    while (!IsAtFullHP(member) && ThereAreHPHealingItemsLeft())
    {
        let item = GetFirstAvailableHPHealingItem();
        UseItemOnActor(item, member);
    }
}

function ThereAreHPHealingItemsLeft(): boolean
{
    for (let item of HPHealingItems())
        if ($gameParty.hasItem(<RPG.Item>item.BaseObject, false))
            return true;

    return false;
}

function HPHealingItems() { return CGT.AutoHeal.hpHealingItems; }

function GetFirstAvailableHPHealingItem(): RPG.Item
{
    for (let item of HPHealingItems())
        if ($gameParty.hasItem(item.BaseObject, false))
            return <RPG.Item>item.BaseObject;

    return null;
}


function HealMP()
{
    throw 'Not yet implemented!';
}