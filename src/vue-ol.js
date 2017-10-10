var VueOl = {
  install: function (Vue) {
    this.Maps = {}
    this.Views = {}

    Vue.prototype.$openlayers = this
    Vue.openlayers = this
  },

  init: function (setting) {
    if (this.Maps[setting.element] !== undefined) {
      console.log('Map already exist')
      return
    }

    var controls = OlControl.defaults({
      attribution: (setting.attibution !== undefined && setting.attibution !== false),
      zoom: (setting.zoomButton !== undefined && setting.zoomButton !== false)
    })

    if (setting.scaleLine !== undefined && setting.scaleLine !== false) {
      controls = OlControl.defaults({
        attribution: (setting.attibution !== undefined && setting.attibution !== false),
        zoom: (setting.zoomButton !== undefined && setting.zoomButton !== false)
      }).extend([
        new OlControlScaleLine()
      ])
    }

    this.addView(setting)

    this.Maps[setting.element] = new OlMap({
      layers: [],
      controls: controls,
      target: setting.element,
      view: this.Views[setting.element],
      interactions: OlInteraction.defaults({
        dragPan: (setting.pan !== undefined && setting.pan !== false),
        mouseWheelZoom: (setting.mouseWheelZoom !== undefined && setting.mouseWheelZoom !== false),
        doubleClickZoom: (setting.doubleClickZoom !== undefined && setting.doubleClickZoom !== false)
      })
    })

    this.Maps[setting.element]['layers'] = {}
    this.Maps[setting.element]['markers'] = {}

    return this.Maps[setting.element]
  },

  addView: function (setting) {
    if (this.Views[setting.element] !== undefined) {
      console.log('View already exist')
      return null
    }

    this.Views[setting.element] = new OlView({
      center: (setting.center === undefined) ? [0, 0] : setting.center,
      zoom: (setting.zoom === undefined) ? 4 : setting.zoom,
      minZoom: (setting.minZoom === undefined) ? 4 : setting.minZoom,
      maxZoom: (setting.maxZoom === undefined) ? 18 : setting.maxZoom
    })

    return this.Views[setting.element]
  }
}

var GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(VueOl)
}

export default VueOl
