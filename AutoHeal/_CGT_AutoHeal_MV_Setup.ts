import './HealSourceSetup/_HealSource_Setup';
import "./PluginCommandSetup/_PluginCommand_Setup";
import 
{ 
    HealApplier, HealApplierArgs, 
    HealSource, 
    ItemHealApplier, SkillHealApplier
} from "./Structures/_Structures_Setup"


export let AutoHeal =
{
    version: 10101, // 1.01.01

    // These arrays will be populated sometime after the initial plugin initialization
    healingItems: [],
    hpHealingItems: [],
    mpHealingItems: [],

    healingSkills: [],
    hpHealingSkills: [],
    mpHealingSkills: [],

    // Structures
    HealApplier: HealApplier,
    HealApplierArgs: HealApplierArgs,
    HealSource: HealSource,
    ItemHealApplier: ItemHealApplier,
    SkillHealApplier: SkillHealApplier
    
};

