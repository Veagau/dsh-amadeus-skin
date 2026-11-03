import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

let plugin, captured, disposed = false, slotDisposed = 0;
const registrations = new Map();
const context = { window: { __ModuleLoader__: { load(m) { plugin = m.factory(() => ({ createElement: (type, props, ...children) => ({ type, props, children }) })); } } } };
vm.runInNewContext(await readFile(new URL('./client.js', import.meta.url), 'utf8'), context);
plugin.apply({ effect(fn) { const dispose = fn(); dispose(); }, theme: { overrideTokens(source, tokens) { assert.equal(source, '@local/dsh-amadeus-skin'); captured = tokens; return () => { disposed = true; }; } }, slots: { inject(name, fn) { const dispose = fn(); dispose(); }, register(config, render) { registrations.set(config.name, {config, render}); return () => { slotDisposed++; }; } } });
assert.equal(registrations.get('conversation.composer.dock').config.id, 'amadeus-terminal-insignia');
assert.equal(registrations.get('conversation.input.dock').config.id, 'amadeus-message-frame');
for (const name of ['conversation.composer.dock','conversation.input.dock']) assert.equal(registrations.get(name).render().props['aria-hidden'], true);
const insignia = registrations.get('conversation.composer.dock').render();
assert.equal(insignia.props.style.minWidth, 0);
assert.equal(insignia.children[1].props.style.whiteSpace, 'nowrap');
assert.equal(insignia.children[1].props.style.textOverflow, 'ellipsis');
for (const name of ['sidebar.brand.mark','conversation.hero.brand.mark']) {
  const mark = registrations.get(name).render({size: 28, className:'host-mark'});
  assert.equal(mark.type,'img'); assert.match(mark.props.src, /^data:image\/png;base64,/);
  assert.equal(mark.props.width,28); assert.equal(mark.props.className,'host-mark');
}
assert.equal(slotDisposed,4);
assert(disposed);
assert.equal(Object.keys(captured).length, 34);
assert.deepEqual({...captured['--dsw-specific-bubble']}, {light:'#efe0d8', dark:'#2c2c2e'});
assert.deepEqual({...captured['--dsw-alias-markdown-code-block']}, {light:'#fff8f2', dark:'#1b1b1c'});
assert.deepEqual({...captured['--dsw-alias-state-business-primary']}, {light:'#843b47', dark:'#e2ae69'});
for (const key of ['--dsw-alias-link', '--dsw-alias-button-info-fill', '--dsw-alias-button-info-hover']) assert(key in captured);
for (const [name, value] of Object.entries(captured)) for (const mode of ['light', 'dark']) assert.match(value[mode], /^#[\da-f]{6}$/i, `${name} ${mode}`);
const lum = hex => {
  const rgb = hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};
for (const bg of ['--dsw-alias-bg-base','--dsw-alias-bg-layer-1','--dsw-alias-bg-layer-2','--dsw-specific-sidebar-fill']) {
  for (const fg of ['--dsw-alias-label-primary','--dsw-alias-label-secondary','--dsw-alias-label-tertiary','--dsw-alias-state-business-primary']) {
    const a=lum(captured[fg].light), b=lum(captured[bg].light);
    assert((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05) >= 4.5, `light ${fg} against ${bg}`);
  }
}
for (const mode of ['light', 'dark']) {
  const background = lum(captured['--dsw-alias-markdown-code-block'][mode]);
  for (const [name, value] of Object.entries(captured).filter(([key]) => key.startsWith('--shiki-token-'))) {
    const foreground = lum(value[mode]);
    const ratio = (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05);
    assert(ratio >= 4.5, `${mode} ${name} contrast ${ratio.toFixed(2)} against layer-1`);
  }
}
for (const mode of ['light', 'dark']) {
  for (const key of ['--dsw-alias-button-info-fill', '--dsw-alias-button-info-hover']) {
    const ratio = 1.05 / (lum(captured[key][mode]) + 0.05);
    assert(ratio >= 4.5, `${mode} ${key} white foreground contrast ${ratio.toFixed(2)}`);
  }
  const a = lum(captured['--dsw-alias-link'][mode]), b = lum(captured['--dsw-alias-bg-layer-1'][mode]);
  assert((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05) >= 4.5, `${mode} link contrast`);
}
console.log('34 paired colors, disposal, business accent, link/button and syntax contrast checks passed.');
