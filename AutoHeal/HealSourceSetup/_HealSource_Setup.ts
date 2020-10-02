import { HealingSourcesIn } from './HealingSourcesIn';
import { HealSource } from '../Structures/HealSource';

// Goes through the database, creates HealSources for the parts the 
// user set as usable by this system, and assigns said sources to
// the system's public arrays.

// Given how the database is loaded, the items and skills won't necessarily be
// available as soon as this plugin starts up. So we need to wait for a time
// when they'll definitely be set up: the title screen boot!
let Callbacks = CGT.Core.Utils.Callbacks;
let RightTimeToFetch = Callbacks.TitleScreenStart;
RightTimeToFetch.AddListener(FetchSources, this);

function FetchSources()
{
    FetchItemSources();
    FetchSkillSources();
}

function FetchItemSources()
{
    let healingItems = HealingSourcesIn($dataItems);
    let hpHealingItems = ArrayEx.Filter(healingItems, CanHealHP, this);
    let mpHealingItems = ArrayEx.Filter(healingItems, CanHealMP, this);

    CGT.AutoHeal.healingItems = healingItems;
    CGT.AutoHeal.hpHealingItems = hpHealingItems;
    CGT.AutoHeal.mpHealingItems = mpHealingItems;
}

let CoreExtensions = CGT.Core.Extensions;
let ArrayEx = CoreExtensions.ArrayEx;

function CanHealHP(source: HealSource)
{
    return source.HealsHP;
}

function CanHealMP(source: HealSource)
{
    return source.HealsMP;
}

function FetchSkillSources()
{
    let healingSkills = HealingSourcesIn($dataSkills);
    let hpHealingSkills = ArrayEx.Filter(healingSkills, CanHealHP, this);
    let mpHealingSkills = ArrayEx.Filter(healingSkills, CanHealMP, this);
    
    CGT.AutoHeal.healingSkills = healingSkills;
    CGT.AutoHeal.hpHealingSkills = hpHealingSkills;
    CGT.AutoHeal.mpHealingSkills = mpHealingSkills;
}
