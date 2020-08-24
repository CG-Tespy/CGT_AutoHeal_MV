import { PluginParams } from '../Shared';
import { HealWithItems } from './HealWithItems';
import { HealWithSkills } from './HealWithSkills';

export let commandName = "CGT_AutoHeal_ApplyHeal";

export function ApplyHeal(args: string[])
{
    let pluginParams = PluginParams();

    if (pluginParams.useItems)
        HealWithItems();

    if (pluginParams.useSkills)
        HealWithSkills();
}   