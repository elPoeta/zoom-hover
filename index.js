class ZoomImage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = `
        <template id='zoom-template'>
            <style>
                .zoom-img {
                          background-repeat: no-repeat;
                         
                         }
                .zoom-img:hover img {
                        opacity: 0;
                        cursor: zoom-in;
                    }
                .tumb {
                        align-items: center;
                        justify-content: center;
                        padding:1px;
                }
                .tumb img {
                        max-width: 100%;
                        max-height: 100%;
                    }
             </style>
                
             <figure class="tumb zoom-img">
               <img src='' alt="not found" />
            </figure>
    </template>`;

    this.backgroundImage = "";
    this.backgroundPosition = "0% 0%";
    this.height = "400px";
  }

  connectedCallback() {
    const content = this.root
      .querySelector("#zoom-template")
      .content.cloneNode(true);
    const image = content.querySelector("img");
    const figure = content.querySelector("figure");
    this.hasAttribute("height")
      ? (figure.style.height = `${this.getAttribute("height")}px`)
      : (figure.style.height = this.height);
    if (this.hasAttribute("image")) {
      const imgAttr = this.getAttribute("image");
      this.backgroundImage = `url(${imgAttr})`;
      image.src = imgAttr;
      this.root.appendChild(content);
    }

    figure.addEventListener("mousemove", e => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      this.backgroundPosition = `${x}% ${y}%`;
      figure.style.backgroundImage = this.backgroundImage;
      figure.style.backgroundPosition = this.backgroundPosition;
    });

    figure.addEventListener("mouseout", e => {
      figure.style.backgroundImage = "";
      figure.style.backgroundPosition = "0% 0%";
    });
  }
}

customElements.define("zoom-image", ZoomImage);

module.exports = ZoomImage;
