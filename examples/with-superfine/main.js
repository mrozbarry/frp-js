const ferp = require('ferp');
const { h, patch } = require('superfine');

const view = (state, dispatch) => (
  h('div', null, [
    h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } }, [
      h('button', { type: 'button', onclick: () => dispatch('SUBTRACT') }, '-'),
      h('h1', { style: { width: '200px', textAlign: 'center' } }, state),
      h('button', { type: 'button', onclick: () => dispatch('ADDITION') }, '+'),
    ]),
  ])
);

ferp.app({
  init: () => [
    {
      value: 0,
      node: null,
    },
    ferp.effect.immediate('RENDER'),
  ],

  update: (message, state) => {
    switch (message) {
      case 'SUBTRACT':
        return [
          { node: state.node, value: state.value - 1 },
          ferp.effect.immediate('RENDER'),
        ];

      case 'ADDITION':
        return [
          { node: state.node, value: state.value + 1 },
          ferp.effect.immediate('RENDER'),
        ];

      case 'RENDER':
        return (() => {
          const deferred = ferp.effect.defer();
          return [
            {
              node: patch(state.node, view(state.value, deferred.dispatch), document.body),
              value: state.value,
            },
            deferred.effect,
          ];
        })();

      default:
        return [state, ferp.effect.none()];
    }
  },
});
