import { ApplyHeal, commandName as applyHealCommandName } from './ApplyingHeals/ApplyHeal';
import { SetHPHeal, commandName as setHPHealCommandName } from './ChangingSettings/SetHPHeal';
import { SetMPHeal, commandName as setMPHealCommandName } from './ChangingSettings/SetMPHeal';

let commands = new Map(
    [
        [applyHealCommandName, ApplyHeal],
        [setHPHealCommandName, SetHPHeal],
        [setMPHealCommandName, SetMPHeal]
    ]
);

let RegisterPluginCommand = CGT.Core.PluginCommands.Register;

for (let commandName of commands.keys())
{
    let commandFunc = commands.get(commandName);
    RegisterPluginCommand(commandName, commandFunc);
}
