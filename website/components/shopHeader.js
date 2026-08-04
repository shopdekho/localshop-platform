/**
 * =============================================
 * LocalShop
 * Shop Header Component
 * Version : 1.0
 * =============================================
 */

function shopHeader(shop){

return `

<header class="shop-header">

<div class="shop-banner">

<img
src="${shop.banner}"
alt="${shop.name.en}">

</div>

<div class="shop-info">

<div class="shop-logo">

<img
src="${shop.logo}"
alt="${shop.name.en}">

</div>

<div class="shop-details">

<h1>

${shop.name.en}

</h1>

<h2>

${shop.name.hi}

</h2>

<div class="shop-meta">

<span class="verified">

✔ Verified Shop

</span>

<span>

⭐ ${shop.rating}

</span>

</div>

<p>

${shop.address}

</p>

</div>

</div>

</header>

`;

}
