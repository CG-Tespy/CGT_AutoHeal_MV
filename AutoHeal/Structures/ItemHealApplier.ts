import { HealApplier } from './HealApplier';
import { HealSource } from './HealSource';

export class ItemHealApplier extends HealApplier
{
    protected ApplySourceCost(): void
    {
        $gameParty.consumeItem(this.ItemToUse);
    }

    protected get ItemToUse() { return this.sourceToUse.BaseObject; }

    protected IsUsable(source: HealSource): boolean
    {
        return $gameParty.hasItem(source.BaseObject, this.doEquipsMatter);
    }

    protected doEquipsMatter = false; // Obligatory for some MV funcs

    protected UseSourceOnTargets(): void
    {
        for (let i = 0; i < this.targets.length; i++)
        {
            let member = this.targets[i];

            // Use a method from the core engine that uses an item on
            // someone, without consuming the item. 
            ApplyEffect(this.ItemToUse, member);
        }
    }

}

let CoreEngine = CGT.Core;
let CoreExtensions = CoreEngine.Extensions;
let ItemExtensions = CoreExtensions.RPGItemEx;
let ApplyEffect = ItemExtensions.FreeUseItemOnActor.bind(ItemExtensions);
