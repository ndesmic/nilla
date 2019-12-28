customElements.define("$NAME$",
	class extends HTMLElement {
		static get observedAttributes(){
			return [];
		}
		constructor(){
			super();
			this.bind(this);
		}
		bind(element){
			element.attachEvents = element.attachEvents.bind(element);
			element.cacheDom = element.cacheDom.bind(element);
			element.render = element.render.bind(element);
		}
		render(){
			this.attachShadow({ mode: "open" });
			this.shadowRoot.innerHTML = `
				<!-- -->
			`;
		}
		connectedCallback(){
			this.render();
			this.cacheDom();
			this.attachEvents();
		}
		cacheDom(){
			this.dom = {};
		}
		attachEvents(){

		}
		attributeChangedCallback(name, oldValue, newValue){
			this[name] = newValue;
		}
	}
);
