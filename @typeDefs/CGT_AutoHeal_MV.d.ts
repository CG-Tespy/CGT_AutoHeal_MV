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
         * Wrapper for items and skills registered as usable by the system,
         * to make it easier to see what they can do.
         */
        class HealSource
        {
            constructor(baseObject: RPG.UsableItem)

            get BaseObject(): RPG.UsableItem
            set BaseObject(value: RPG.UsableItem)

            /** Whether or not this source heals HP. */
            get HealsHP(): boolean

            /** Whether or not this source heals MP. */
            get HealsMP(): boolean

            /** Whether or not this source targets all allies. */
            get TargetsAll(): boolean

            /** The higher this is, the sooner the system uses it before others. */
            get Priority(): number
        }

        /**
         * Provides context for a HealApplier to do its job.
         */
        class HealApplierArgs
        {
            /** Name of the property used to access the current stat */
            get CurrentStat(): string 
            set CurrentStat(value: string)

            /** Name of the property used to access the max stat */
            get MaxStat(): string 
            set MaxStat(value: string)

            /** That which can be used to apply the healing. */
            get HealSources(): HealSource[] 
            set HealSources(value: HealSource[])

        }

        /**
         * Abstract class containing hooks for different types of heal-appliers.
         */
        abstract class HealApplier
        {
            Apply(): void

            /** All sources this type of heal applier is allowed to use. */
            healSources: HealSource[]

            // Names to access the stats
            currentStat: string;
            maxStat: string;

            /** Creates a HealApplier with the info it needs to do its job. */
            static From<T extends HealApplier>(subType: new() => T, context: HealApplierArgs): T

        }


    }
}