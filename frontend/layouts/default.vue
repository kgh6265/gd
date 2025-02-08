<template>
  <NuxtLoadingIndicator color="#F76902" />
  <Nav />
  <Banner />
  <div>
    <slot />
  </div>
  <Footer />
</template>

<style>
@import url("https://use.typekit.net/gmb0olm.css");

/*
font-family: "playfair-display", serif;
font-weight: 900;
font-style: normal;

font-family: "playfair-display", serif;
font-weight: 900;
font-style: italic;
*/

@font-face {
  font-family: "Geist";
  src: url("/Geist-Thin.ttf");
  font-weight: 100;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-ExtraLight.ttf");
  font-weight: 200;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Light.ttf");
  font-weight: 300;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Regular.ttf");
  font-weight: 400;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Medium.ttf");
  font-weight: 500;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-SemiBold.ttf");
  font-weight: 600;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Bold.ttf");
  font-weight: 700;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-ExtraBold.ttf");
  font-weight: 800;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Black.ttf");
  font-weight: 900;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-REGULAR.OTF") format("opentype");
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ITALIC.OTF") format("opentype");
  font-style: italic;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRABOLD.OTF") format("opentype");
  font-weight: 800;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRABOLDITALIC.OTF") format("opentype");
  font-style: italic;
  font-weight: 800;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRALIGHT.OTF") format("opentype");
  font-weight: 100;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRALIGHTITALIC.OTF") format("opentype");
  font-style: italic;
  font-weight: 100;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Geist", "Inter V", "Inter",
    sans-serif;
  background-color: #030304;
  background: url("/noise-big.png") repeat scroll center/1000px, #030304;
  font-display: swap;
  color: white;
  scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "PP Editorial", "playfair-display", serif;
}

h1 {
  color: #f76902;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease;
}
.page-fade-enter,
.page-fade-leave-to {
  opacity: 0;
}
</style>
