import { HealSource } from './HealSource';

/**
 * Provides context for a HealApplier to do its job.
 */
export class HealApplierArgs
{
    /** Name of the proeprty used to access the current stat */
    get CurrentStat(): string { return this.currentStat; }
    private currentStat: string = "";
    set CurrentStat(value: string) { this.currentStat = value; }

    /** Name of the proeprty used to access the max stat */
    get MaxStat(): string { return this.maxStat; }
    private maxStat: string = "";
    set MaxStat(value: string) { this.maxStat = value; }

    /** The party members you want the heals to be potentially applied to. */
    get PartyMembers() { return this.partyMembers.slice(); }
    private partyMembers: Game_Actor[] = [];
    set PartyMembers(value: Game_Actor[]) { this.partyMembers = value; }

    /** The items/skills that can be used to apply the healing. */
    get HealSources(): HealSource[] { return this.healSources.slice(); }
    private healSources: HealSource[] = [];
    set HealSources(value: HealSource[]) { this.healSources = value; }

    /**
     * Function that uses the heal source on a party member.
     */
    UseSource: (toUse: RPG.Item, target: Game_Actor) => void;

    DoHealing: () => void;

}