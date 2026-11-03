window.__ModuleLoader__.load({
  id: '@local/dsh-amadeus-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const logoData = '__AMADEUS_LOGO_DATA__';
    function ComposerInsignia() {
      return h('div', { 'aria-hidden': true, style: {display:'flex', alignItems:'center', gap:6, minWidth:0, maxWidth:'100%', overflow:'hidden', color:'var(--dsw-alias-label-tertiary)', pointerEvents:'none', opacity:.8} },
        h(BrandMark,{size:19}), h('span',{style:{minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', font:'9px ui-monospace, monospace',letterSpacing:'.12em'}},'AMADEUS / TERMINAL'));
    }
    function BrandMark({size = 32, className}) {
      return h('img', {src:logoData, width:size, height:size, className, alt:'', 'aria-hidden':true, style:{objectFit:'contain'}});
    }
    function InputFrame() {
      return h('div', {'aria-hidden':true, style:{boxSizing:'border-box',width:'100%',maxWidth:952,margin:'0 auto',display:'flex',alignItems:'center',gap:8,padding:'2px 12px',color:'var(--dsw-alias-label-tertiary)',pointerEvents:'none',font:'10px/1.4 ui-monospace, monospace',letterSpacing:'.09em'}},
        h(BrandMark,{size:15}), h('span',null,'AMADEUS / TERMINAL'),
        h('span',{style:{flex:1,height:1,background:'var(--dsw-alias-border-l1)',opacity:.6}}));
    }
    return {
      inject: ['theme', 'slots'],
      apply(ctx) {
        const dark = {
            '--dsw-alias-bg-base': '#100b0e',
            '--dsw-alias-bg-layer-1': '#1b1015',
            '--dsw-alias-bg-layer-2': '#29171c',
            '--dsw-alias-bg-overlay': '#322027',
            '--dsw-alias-border-l1': '#543039',
            '--dsw-alias-border-l2': '#81505a',
            '--dsw-alias-brand-primary': '#e2ae69',
            // Business accent also themes cost-meter's off-peak indicator; warning colors remain distinct.
            '--dsw-alias-state-business-primary': '#e2ae69',
            '--dsw-alias-label-primary': '#f5e8dc',
            '--dsw-alias-label-secondary': '#c9b3ae',
            '--dsw-alias-label-tertiary': '#a68d8c',
            '--dsw-alias-label-caption': '#c9b3ae',
            '--dsw-alias-state-error-primary': '#ff8591',
            '--dsw-alias-state-warn-primary': '#f2bd6b',
            '--dsw-alias-state-success-primary': '#91d0aa',
            '--dsw-alias-state-idle-primary': '#a68d8c',
            '--dsw-specific-sidebar-fill': '#170d12',
            // Preserve the shipped dark surfaces; warm these independently in light mode.
            '--dsw-specific-bubble': '#2c2c2e',
            '--dsw-alias-markdown-code-block': '#1b1b1c',
            // Current DSH markdown links and composer primary (send/stop) aliases.
            '--dsw-alias-link': '#efba74',
            '--dsw-alias-button-info-fill': '#993a3e',
            '--dsw-alias-button-info-hover': '#7f3035',
            // Current DSH activity shimmer and focus ring aliases.
            '--dsw-alias-label-deep-diving': '#e2ae69',
            '--dsw-alias-label-deep-diving-shimmer': '#fff0ce',
            '--dsw-focus-ring-color': '#eab56b',
            // Shiki variables are implementation-specific to the current DSH version.
            '--shiki-token-constant': '#eab56b',
            '--shiki-token-string': '#d9c69a',
            '--shiki-token-comment': '#a98a80',
            '--shiki-token-keyword': '#ee8587',
            '--shiki-token-parameter': '#f0c386',
            '--shiki-token-function': '#e5ac79',
            '--shiki-token-string-expression': '#e2cc9e',
            '--shiki-token-punctuation': '#ddc7ba',
            '--shiki-token-link': '#efba74'
        };
        const light = {
          '--dsw-alias-bg-base':'#f7f1eb', '--dsw-alias-bg-layer-1':'#fffaf6',
          '--dsw-alias-bg-layer-2':'#f1e5df', '--dsw-alias-bg-overlay':'#fffaf7',
          '--dsw-alias-border-l1':'#dec9c2', '--dsw-alias-border-l2':'#b99890',
          '--dsw-alias-brand-primary':'#843b47', '--dsw-alias-state-business-primary':'#843b47', '--dsw-alias-label-primary':'#30201f',
          '--dsw-alias-label-secondary':'#654641', '--dsw-alias-label-tertiary':'#765a55',
          '--dsw-alias-label-caption':'#654641', '--dsw-alias-state-error-primary':'#a1293b',
          '--dsw-alias-state-warn-primary':'#865312', '--dsw-alias-state-success-primary':'#256b48',
          '--dsw-alias-state-idle-primary':'#765a55', '--dsw-specific-sidebar-fill':'#efe2dc',
          '--dsw-specific-bubble':'#efe0d8', '--dsw-alias-markdown-code-block':'#fff8f2',
          '--dsw-alias-label-deep-diving':'#86414b', '--dsw-alias-label-deep-diving-shimmer':'#c47a47',
          '--dsw-focus-ring-color':'#86414b',
          '--dsw-alias-link':'#894a16', '--dsw-alias-button-info-fill':'#993a3e',
          '--dsw-alias-button-info-hover':'#7f3035',
          '--shiki-token-constant':'#8c4f1c', '--shiki-token-string':'#685325',
          '--shiki-token-comment':'#806b66', '--shiki-token-keyword':'#a33247',
          '--shiki-token-parameter':'#87511d', '--shiki-token-function':'#894331',
          '--shiki-token-string-expression':'#705a29', '--shiki-token-punctuation':'#543f3e',
          '--shiki-token-link':'#894a16'
        };
        const tokens = Object.fromEntries(Object.entries(dark).map(([name, value]) => [name, {light: light[name], dark: value}]));
        ctx.effect(() => ctx.theme.overrideTokens('@local/dsh-amadeus-skin', tokens));
        ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock', id: 'amadeus-terminal-insignia', order: 20,
        }, ComposerInsignia));
        ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
          name: 'conversation.input.dock', id: 'amadeus-message-frame', order: 30,
        }, InputFrame));
        ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({
          name: 'conversation.hero.brand.mark',
        }, BrandMark));
        ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({
          name: 'sidebar.brand.mark',
        }, BrandMark));
      }
    };
  }
});
