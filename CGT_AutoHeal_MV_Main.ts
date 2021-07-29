/*:
* 
* @plugindesc Version 1.01.01a. Lets you use Plugin Commands to automatically heal the party with Items and/or Skills.
* 
* @author CG-Tespy - https://github.com/CG-Tespy
* 
* @help Tested with RMMV versions 1.5.1 and 1.6.2. Requires the CGT Core Engine plugin 
* (Version 1.01.06+). See the User Guide for info on using this plugin.
*
* Please make sure to credit me (and any of this plugin's other contributing coders)
* if you're using this plugin in your game. Include the names and (if available)
* webpage links.
* 
*/

/*:es
* 
* @plugindesc Versión 1.01.01. Te deja usar Comandos de Plugin para sanar automaticamente 
* el Grupo con Objetos y o Habilidades.
* 
* @author CG-Tespy - https://github.com/CG-Tespy
* 
* @help 
* Probé esto con versiónes RMMV 1.5.1 y 1.6.2. Necesita el CGT Core Engine plugin 
* (Versión 1.01.06+). Chequea el Guía de Usario para más información de 
* usando este.
* 
* Por favor acredita a mi y los otros programadores colaboradores de este plugin 
* si lo usas en tu juego. Incluye los nombres y (si disponible) los 
* enlaces de web.
* 
*/

import { AutoHeal } from './AutoHeal/_CGT_AutoHeal_MV_Setup';

// @ts-ignore
window.CGT.AutoHeal = AutoHeal;