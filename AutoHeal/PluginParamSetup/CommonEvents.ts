import { paramNames } from './ParamNames';
import { params } from './BaseParams';

// The common events in the raw params are just their IDs. We need to
// use those IDs to get at the real things.
let beforeHealingRaws: string[] = JSON.parse(params[paramNames.actionsBeforeHealing]);
let afterHealingRaws: string[] = JSON.parse(params[paramNames.actionsAfterHealing]);

let beforeHealIDs: number[] = GetTrueIDsFrom(beforeHealingRaws);

function GetTrueIDsFrom(rawIDArr: string[])
{
    let trueIDs: number[] = [];

    for (const rawId of rawIDArr)
    {
        let trueId = parseInt(rawId);
        trueIDs.push(trueId);
    }

    return trueIDs;
}

let afterHealIDs: number[] = GetTrueIDsFrom(afterHealingRaws);

// With the IDs ready, we can now get at the actual Common Events!
// ...Or we would, if MV didn't load the database asynchronously.
// We need to make sure the Common Events are all loaded, else
// we'll get errors.

export function SetUpCommonEvents()
{
    let callbacks = CGT.Core.Utils.Callbacks;
    callbacks.TitleScreenStart.AddListener(FetchCommonEvents, this);

    function FetchCommonEvents()
    {
        let beforeHealingActions: RPG.CommonEvent[] = GetCommonEventsFrom(beforeHealIDs);
        let afterHealingActions: RPG.CommonEvent[] = GetCommonEventsFrom(afterHealIDs);
    
        let pluginParams = CGT.AutoHeal.PluginParams;
        pluginParams.beforeHealingActions = beforeHealingActions;
        pluginParams.afterHealingActions = afterHealingActions;
    }
    
    function GetCommonEventsFrom(intArr: number[])
    {
        let commonEvents: RPG.CommonEvent[] = [];
    
        for (const num of intArr)
        {
            commonEvents.push($dataCommonEvents[num]);
        }
    
        return commonEvents;
    }
}