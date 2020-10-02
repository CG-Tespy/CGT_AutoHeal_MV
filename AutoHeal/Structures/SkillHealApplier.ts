import { HealApplier } from './HealApplier';
import { HealSource } from './HealSource';

export class SkillHealApplier extends HealApplier
{
    protected ApplySourceCost(): void
    {
        this.skillUser.paySkillCost(this.SkillToUse);
    }

    protected DecideSourceUser()
    {
        // The first one who can use it will be the user.
        for (let i = 0; i < this.alivePartyMembers.length; i++)
        {
            let member = this.alivePartyMembers[i];
            if (member.isLearnedSkill(this.SkillToUse.id) && member.canPaySkillCost(this.SkillToUse))
            {
                this.skillUser = member;
                return;
            }
        }
    }

    protected get SkillToUse(): RPG.Skill { return <RPG.Skill> this.sourceToUse.BaseObject; }

    protected skillUser: Game_Actor = null;

    protected IsUsable(source: HealSource): boolean
    {
        let skill = <RPG.Skill> source.BaseObject;

        for (let i = 0; i < this.alivePartyMembers.length; i++)
        {
            let member = this.alivePartyMembers[i];
            if (member.isLearnedSkill(skill.id) && member.canPaySkillCost(skill))
                return true;
        }

        return false;
        
    }

    protected UseSourceOnTargets(): void
    {
        ApplyEffect(this.SkillToUse, this.skillUser, this.targets);
    }
}

let CoreEngine = CGT.Core;
let Extensions = CoreEngine.Extensions;
let SkillExtensions = Extensions.RPGSkillEx;
interface FreeSkillUseOnActors
{
    (skill: RPG.Skill, user: Game_Actor, targets: Game_Actor[]): boolean
}
let ApplyEffect: FreeSkillUseOnActors = SkillExtensions.FreeUseSkillOnActors.bind(SkillExtensions);