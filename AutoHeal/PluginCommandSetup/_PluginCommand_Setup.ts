import { HealWithItems, commandName as itemHealCommandName } from './ApplyingHeals/HealWithItems';
import { HealWithSkills, commandName as skillHealCommandName } from './ApplyingHeals/HealWithSkills';

let commands = new Map(
    [
        [itemHealCommandName, HealWithItems],
        [skillHealCommandName, HealWithSkills]
    ]
);

let RegisterPluginCommand = CGT.Core.PluginCommands.Register;

for (let commandName of commands.keys())
{
    let commandFunc = commands.get(commandName);
    RegisterPluginCommand(commandName, commandFunc);
}
