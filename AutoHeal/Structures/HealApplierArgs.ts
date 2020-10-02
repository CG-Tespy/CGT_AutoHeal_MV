import { HealSource } from './HealSource';

/**
 * Provides context for a HealApplier to do its job.
 */
export class HealApplierArgs
{
    /** Name of the property used to access the current stat */
    get CurrentStat(): string { return this.currentStat; }
    private currentStat: string = "";
    set CurrentStat(value: string) { this.currentStat = value; }

    /** Name of the property used to access the max stat */
    get MaxStat(): string { return this.maxStat; }
    private maxStat: string = "";
    set MaxStat(value: string) { this.maxStat = value; }

    /** That which can be used to apply the healing. */
    get HealSources(): HealSource[] { return this.healSources.slice(); }
    private healSources: HealSource[] = [];
    set HealSources(value: HealSource[]) { this.healSources = value; }

}