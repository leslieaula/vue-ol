const VueOpenlayers = {
  install: function (Vue) {
    this.Maps = {}
    this.Views = {}

    Vue.prototype.$openlayers = this
    Vue.openlayers = this
  }
}

var GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(VueOpenlayers)
}

export default VueOpenlayers
