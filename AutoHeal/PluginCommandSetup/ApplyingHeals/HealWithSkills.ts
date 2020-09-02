import { PluginParams, SortByPriority } from '../../Shared';

export function HealWithSkills()
{
    let pluginParams = PluginParams();

    if (pluginParams.healHP)
        HealHP();
    
    if (pluginParams.healMp)
        HealMP();
}

function HealHP()
{
    let aliveMembers = $gameParty.aliveMembers();

    for (let member of aliveMembers)
    {
        MakeMemberHealParty(member);
    }
}

function MakeMemberHealParty(member: Game_Actor)
{
    let healingSkills = HealingSkillsHadBy(member);
    healingSkills = healingSkills.sort(SortByPriority);

    for (let i = 0; i < healingSkills.length; i++)
    {
        let skill = healingSkills[i];
        UseSkillToHealParty(member, skill);
    }

}

function HealingSkillsHadBy(member: Game_Actor)
{
    let result = [];
    let validHealingSkills = CGT.AutoHeal.healingSkills;
    // The valid skills are those designated as such in the notetags.

    for (let skill of member.usableSkills())
    {
        for (let healingSkill of validHealingSkills)
            if (healingSkill.BaseObject == skill)
                result.push(skill);
    }

    return result;
}

function UseSkillToHealParty(user: Game_Actor, skill: RPG.Skill)
{
    for (let member of $gameParty.aliveMembers())
    {
        // To make sure the member's healed fully if possible
        while (CanPayCost(user, skill) && !IsFullyHealed(member))
        {
            UseSkillOnActor(skill, user, member);
        }
    }
}

let CoreExt = CGT.Core.Extensions;
let Game_ActorEx = CoreExt.Game_ActorEx;
let CanPayCost = Game_ActorEx.CanPaySkillCost.bind(Game_ActorEx);

let RPGSkillEx = CoreExt.RPGSkillEx;
let UseSkillOnActor = RPGSkillEx.UseSkillOnActor.bind(RPGSkillEx);

let IsFullyHealed = Game_ActorEx.IsAtFullHP.bind(Game_ActorEx);

function HealMP()
{
    throw 'Not yet implemented, fool!';
}