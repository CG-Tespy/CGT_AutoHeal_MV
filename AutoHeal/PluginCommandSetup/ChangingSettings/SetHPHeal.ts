import { PluginParams } from '../../Shared';

export let commandName = "CGT_AutoHeal_SetHPHeal";

export function SetHPHeal(args: string[])
{
    let pluginParams = PluginParams();

    let boolString = args[0].toLowerCase();
    let shouldHealHp = boolString === 'true';

    pluginParams.healHP = shouldHealHp;
}