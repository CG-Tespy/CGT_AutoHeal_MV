import { ApplyHeal, commandName as applyHealCommandName } from './ApplyingHeals/ApplyHeal';
import { HealWithItems, itemHealCommandName } from './ApplyingHeals/HealWithItems';
import { HealWithSkills, skillHealCommandName } from './ApplyingHeals/HealWithSkills';

let commands = new Map(
    [
        [applyHealCommandName, ApplyHeal],
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
