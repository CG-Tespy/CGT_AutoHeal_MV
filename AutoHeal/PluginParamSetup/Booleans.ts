import { paramNames } from './ParamNames';

let pluginName = "CGT_AutoHeal_MV";
let params = PluginManager.parameters(pluginName);

export let healHp = params[paramNames.healHp] == 'true';
export let healMp = params[paramNames.healMp] == 'true';
export let useItems = params[paramNames.useItems] == 'true';
export let useSkills = params[paramNames.useSkills] == 'true';