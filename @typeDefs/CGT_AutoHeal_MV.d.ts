declare namespace CGT
{
    namespace AutoHeal
    {
        let version: number;

        let healingItems: HealSource[];
        let hpHealingItems: HealSource[];
        let mpHealingItems: HealSource[];

        let healingSkills: HealSource[];
        let hpHealingSkills: HealSource[];
        let mpHealingSkills: HealSource[];

        /**
         * For items and skills registered as usable by the system.
         */
        class HealSource
        {
            /** Whether or not this source heals HP. */
            get HealsHP(): boolean

            /** Whether or not this source heals MP. */
            get HealsMP(): boolean

            /** Whether or not this source targets all allies. */
            get TargetsAll(): boolean

            /** The higher this is, the sooner the system uses it before others. */
            get Priority(): number
            set Priority(value: number)

            get BaseObject(): RPG.UsableItem
            set BaseObject(value: RPG.UsableItem)
            
            constructor(baseObject: RPG.UsableItem, priority: number)
        }

    }
}