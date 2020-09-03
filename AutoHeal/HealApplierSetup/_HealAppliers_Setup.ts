import { HealingAppliersIn } from './HealingAppliersIn';
import { SortByPriority } from '../Shared';
import { HealApplier } from '../Structures/HealApplier';

// Given how the database is loaded, the items and skills won't necessarily be
// available as soon as this plugin starts up. So we need to wait for a time
// when they'll definitely be set up: the title screen boot!
let Callbacks = CGT.Core.Utils.Callbacks;
let RightTimeToFetch = Callbacks.TitleScreenStart;
RightTimeToFetch.AddListener(FetchAppliers, this);

function FetchAppliers()
{
    FetchItemAppliers();
    FetchSkillAppliers();
}

function FetchItemAppliers()
{
    let unsortedHealingItems = HealingAppliersIn($dataItems);
    let healingItems = unsortedHealingItems.sort(SortByPriority);
    CGT.AutoHeal.healingItems = healingItems;

    let hpHealingItems = ArrayEx.Filter(healingItems, CanHealHP, this);
    let mpHealingItems = ArrayEx.Filter(healingItems, CanHealMP, this);
    CGT.AutoHeal.hpHealingItems = hpHealingItems;
    CGT.AutoHeal.mpHealingItems = mpHealingItems;
}

let CoreExtensions = CGT.Core.Extensions;
let ArrayEx = CoreExtensions.ArrayEx;

function CanHealHP(applier: HealApplier)
{
    return applier.HealsHP;
}

function CanHealMP(applier: HealApplier)
{
    return applier.HealsMP;
}

function FetchSkillAppliers()
{
    let unsortedHealingSkills = HealingAppliersIn($dataSkills);
    let healingSkills = unsortedHealingSkills.sort(SortByPriority);
    CGT.AutoHeal.healingSkills = healingSkills;

    let hpHealingSkills = ArrayEx.Filter(healingSkills, CanHealHP, this);
    let mpHealingSkills = ArrayEx.Filter(healingSkills, CanHealMP, this);
    CGT.AutoHeal.hpHealingSkills = hpHealingSkills;
    CGT.AutoHeal.mpHealingSkills = mpHealingSkills;
}
