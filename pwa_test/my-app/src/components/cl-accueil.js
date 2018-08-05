import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ClAccueil extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Partagez vos oeuvres</h2>
        <p>Lorsqu'un lieu a été nettoyé, publiez une photo avant et après, qui sera visible sur le carte. Les informations de date et de localisation des photos seront utilsés.</p>
      </section>
      <section>
        <h2>Actualité</h2>
        <p>Racontez vos expériences, vos idées, souhaîts.</p>
      </section>
      <section>

        <p>Merci pour votre action !</p>
      </section>
    `;
  }
}

window.customElements.define('cl-accueil', ClAccueil);
