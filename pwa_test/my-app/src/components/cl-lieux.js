import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import 'leaflet';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { increment, decrement } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
  counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ClLieux extends connect(store)(PageViewElement) {
  _render(props) {


    return html`
      ${SharedStyles}
      <style>
        #osm { height: 180px; margin-left: 1em; margin-right: 1em;}
      </style>
      <section>
        Importez une photo localisée ou
        touchez la carte pour ajouer un lieu nettoyé

      </section>
      <div id="osm"></div>

    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _clicks: Number,
    _value: Number
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
//    this._clicks = state.counter.clicks;
//    this._value = state.counter.value

  }


  _didRender(props, changedProps, prevProps){
    //setTimeout(function(this_) {  initMap(this_);}, 5000,this);
    initMap(this.shadowRoot.querySelector('#osm'))
  }

  _firstRendered() {

  }





}

var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
function initMap(el) {
     // set up the map
console.log(el)
     var map = new L.Map(el);

     // create the tile layer with correct attribution
     var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
     var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
     var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

     // start the map in South-East England
    // map.setView(new L.LatLng(51.3, 0.7),9);
     map.locate({setView: true, maxZoom: 16});
     map.addLayer(osm);
 }
window.customElements.define('cl-lieux', ClLieux);
