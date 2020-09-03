import * as PluginParams from "./PluginParamSetup/_PluginParam_Setup";
import "./PluginCommandSetup/_PluginCommands_Setup";
import './HealApplierSetup/_HealAppliers_Setup';

export let AutoHeal =
{
    version: 0.10,
    PluginParams: PluginParams,

    // These arrays will be populated sometime after the initial plugin initialization
    healingItems: [],
    hpHealingItems: [],
    mpHealingItems: [],

    healingSkills: [],
    hpHealingSkills: [],
    mpHealingSkills: [],
    
};

