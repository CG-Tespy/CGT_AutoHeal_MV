import { PluginParams } from '../../Shared';

export let commandName = "CGT_AutoHeal_SetMPHeal";

export function SetMPHeal(args: string[])
{
    let pluginParams = PluginParams();

    let boolString = args[0].toLowerCase();
    let shouldHealMp = boolString === 'true';

    pluginParams.healHP = shouldHealMp;
}