declare namespace CGT
{
    namespace AutoHeal
    {
        let version: number;

        let PluginParams:
        {
            /** Whether or not to heal HP */
            healHP: boolean,
            /** Whether or not to heal MP */
            healMp: boolean,
            /** Whether or not to use items */
            useItems: boolean,
            /** Whether or not to use skills */
            useSkills: boolean,
            /** Common Events to execute before the healing happens */
            beforeHealingActions: RPG.CommonEvent[],
            /** Common Events to execute after the healing happens */
            afterHealingActions: RPG.CommonEvent[],
            paramNames:
            {
                healHP: string,
                healMp: string,
                useItems: string,
                useSkills: string,
                actionsBeforeHealing: string,
                actionsAfterHealing: string,
            },
        };

        let healingItems: Array<HealApplier>;
        let hpHealingItems: Array<HealApplier>;
        let mpHealingItems: Array<HealApplier>;

        let healingSkills: Array<HealApplier>;
        let hpHealingSkills: Array<HealApplier>;
        let mpHealingSkills: Array<HealApplier>;

        class HealApplier
        {
            get Priority(): number
            get BaseObject(): RPG.Item | RPG.Skill

            set Priority(value: number)
            set BaseObject(value: RPG.Item | RPG.Skill)

            constructor(baseObject: RPG.Item | RPG.Skill, priority: number)

        }

    }
}