// The params might not be initialized when this part of the API is, so
// we can't just have each file point immediately to the params and expect things to work.
// The params should be ready whenever any of the commands execute, though, so yeah.
export function PluginParams() { return CGT.AutoHeal.PluginParams; }