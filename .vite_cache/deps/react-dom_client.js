import {
  bn,
  nn,
  tn
} from "./chunk-JFIB2TQE.js";
import "./chunk-DC5AMYBS.js";

// node_modules/preact/compat/client.mjs
function createRoot(container) {
  return {
    // eslint-disable-next-line
    render: function(children) {
      nn(children, container);
    },
    // eslint-disable-next-line
    unmount: function() {
      bn(container);
    }
  };
}
function hydrateRoot(container, children) {
  tn(children, container);
  return createRoot(container);
}
var client_default = {
  createRoot,
  hydrateRoot
};
export {
  createRoot,
  client_default as default,
  hydrateRoot
};
//# sourceMappingURL=react-dom_client.js.map
