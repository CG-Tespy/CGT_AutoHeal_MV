declare namespace CGT
{
    namespace AutoHeal
    {
        let version: number;

        let PluginParams:
        {
            /** Whether or not to heal HP */
            healHp: boolean,
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
                healHp: string,
                healMp: string,
                useItems: string,
                useSkills: string,
                actionsBeforeHealing: string,
                actionsAfterHealing: string,
            },
        }

    }
}