import { HealSource } from './HealSource';
import { HealApplierArgs } from './HealApplierArgs';
import { SortByPriority as ByPriority } from '../Shared';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

/**
 * Abstract class containing hooks for different types of heal-appliers.
 */
export class HealApplier
{
    Apply(): void
    {
        this.CheckSourcesAndParty();

        while (this.CanHeal() && this.AnyNeedHealing())
        {
            this.DecideSourceToUse();
            this.DecideSourceUser();
            this.DecideTargets();

            this.UseSourceOnTargets();
            this.ApplySourceCost();

            this.CheckSourcesAndParty();
        }

    }

    protected CheckSourcesAndParty(): void
    {
        // So this knows what it has to work with
        this.UpdateAlivePartyMembers();
        this.UpdateMembersNeedingHealing();
        this.UpdateUsableSources();
    }

    protected UpdateUsableSources(): void
    {
        ArrayEx.Clear(this.usableSources);

        for (let i = 0; i < this.healSources.length; i++)
        {
            let source = this.healSources[i];
            if (this.IsUsable(source))
                this.usableSources.push(source);
        }

        this.usableSources.sort(ByPriority);
    }

    protected usableSources: HealSource[] = []
    healSources: HealSource[] = []
    
    protected IsUsable(source: HealSource): boolean
    {
        throw 'Must be implemented in subclass!';
    }

    protected UpdateAlivePartyMembers(): void
    {
        this.alivePartyMembers = $gameParty.aliveMembers();
    }

    protected alivePartyMembers: Game_Actor[] = []

    protected UpdateMembersNeedingHealing()
    {
        ArrayEx.Clear(this.needHealing);

        for (let i = 0; i < this.alivePartyMembers.length; i++)
        {
            let member = this.alivePartyMembers[i];
            if (!this.IsFullyHealed(member))
                this.needHealing.push(member);
        }

    }

    protected needHealing: Game_Actor[] = []

    protected IsFullyHealed(member: Game_Actor): boolean
    {
        return member[this.currentStat] >= member[this.maxStat];
    }

    // Names to access the stats
    currentStat: string;
    maxStat: string;

    protected CanHeal(): boolean
    {
        return this.usableSources.length > 0;
    }

    protected AnyNeedHealing(): boolean
    {
        return this.needHealing.length > 0;
    }

    protected DecideSourceToUse(): void
    {
        // As we use the ones with higher priority sooner, and
        // the sources are sorted based on priority descending...
        this.sourceToUse = this.usableSources[0];
    }

    protected sourceToUse: HealSource;

    protected DecideSourceUser(): void
    {
        // For when you need to tie the source use to some object type,
        // like you would for skills
    }

    protected DecideTargets()
    {
        ArrayEx.Clear(this.targets);

        if (this.sourceToUse.TargetsAll)
        {
            let everyone = this.needHealing;
            this.targets.push(...everyone);
        }
        else
        {
            let firstInLine = this.needHealing[0];
            this.targets.push(firstInLine);
        }
    }

    protected targets: Game_Actor[] = [];

    protected ApplySourceCost(): void
    {
        throw 'Must be implemented in subclass!';
    }

    /**
     * Applies the source's effects on each target, making sure not to
     * consume the source; the source cost should have already been paid
     * before this func gets called.
     */
    protected UseSourceOnTargets(): void
    {
        throw 'Must be implemented in subclass!';
    }

    /** Creates a HealApplier with the info it needs to do its job. */
    static From<T extends HealApplier>(subType: new() => T, context: HealApplierArgs): T
    {
        let newApplier = new subType();
        newApplier.currentStat = context.CurrentStat;
        newApplier.maxStat = context.MaxStat;
        newApplier.healSources = context.HealSources;

        return newApplier;
    }

}
