/*:

@plugindesc Version 0.05.03. Adds functionality that makes the system use party skills and/or items to fully heal party members.

@author CG-Tespy - https://github.com/CG-Tespy

@help For RMMV versions 1.5.1 and above. Requires the CGT Core Engine plugin.
See the User Guide for info on using this plugin.

Please make sure to credit me (and any of this plugin's other contributing coders)
if you're using this plugin in your game. Include the names and (if available)
webpage links.

@param Heal HP
@type boolean
@default true
@desc Whether this will try to heal HP to full.

@param Heal MP
@type boolean
@default true
@desc Whether this will try to heal MP to full.

@param Use Items
@type boolean
@default true
@desc Whether this will use items in the party's inventory to do healing.

@param Use Skills
@type boolean
@default true
@desc Whether this will have active, alive party members do healing.

@param Actions Before Healing
@type common_event[]
@default []
@desc Common Events to execute before the healing is applied.

@param Actions After Healing
@type common_event[]
@default []
@desc Common Events to execute after the healing is applied.

*/

import { AutoHeal } from './AutoHeal/_CGT_AutoHeal_MV_Setup';

// @ts-ignore
window.CGT.AutoHeal = AutoHeal;