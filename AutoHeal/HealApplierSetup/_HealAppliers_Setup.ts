import { HealingAppliersIn } from './HealingAppliersIn';
import { SortByPriority } from '../Shared';

// Given how the database is loaded, the items and skills won't necessarily be
// available as soon as this plugin starts up. So we need to wait for a time
// when they'll definitely be set up: the title screen boot!
let RightTimeToFetch = CGT.Core.Utils.Callbacks.TitleScreenStart;
RightTimeToFetch.AddListener(FetchAppliers, this);

function FetchAppliers()
{
    let unsortedHealingItems = HealingAppliersIn($dataItems);
    let unsortedHealingSkills = HealingAppliersIn($dataSkills);

    CGT.AutoHeal.healingItems = unsortedHealingItems.sort(SortByPriority);
    CGT.AutoHeal.healingSkills = unsortedHealingSkills.sort(SortByPriority);
}

