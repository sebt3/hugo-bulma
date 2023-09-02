document.addEventListener('DOMContentLoaded', () => {

    const $scrollDelay = 500;

/**********/
/* Navbar */
/**********/

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
    });
    });


/****************/
/* Notification */
/****************/

    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        const $notification = $delete.parentNode;

        $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
        });
    });

/*************/
/* BackToTop */
/*************/

    window.addEventListener("scroll", (event) => {
        if (window.scrollY) {
            (document.querySelectorAll(".back-to-top") || []).forEach((elSrc) => {
                if (elSrc.classList.contains('is-hidden')){
                    el = elSrc.cloneNode(true);
                    elSrc.parentNode.replaceChild(el, elSrc);
                    el.classList.remove("is-hidden");
                    el.classList.remove("fadeout");
                    el.classList.add("fadein");
                    el.addEventListener("click", () => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    })
                }
            });
        } else {
            (document.querySelectorAll(".back-to-top") || []).forEach((elSrc) => {
                if (!elSrc.classList.contains('is-hidden')) {
                    el = elSrc.cloneNode(true);
                    elSrc.parentNode.replaceChild(el, elSrc);
                    el.classList.remove("fadein");
                    el.addEventListener('animationend', () => {
                        el.classList.add("is-hidden");
                    });
                    el.classList.add("fadeout");
                }
            });
        }
    });


/**********************************/
/* Fix Anchors + Navbar fixed top */
/**********************************/
    // ref: https://jsfiddle.net/ianclark001/aShQL/
    function scrollToAnchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");
        // fix for chinese and cyrillic character hash and href values
        // ref: https://gomakethings.com/handling-chinese-and-cyrillic-character-hash-and-href-values-in-javascript/
        var hash;
        try {
            hash = decodeURIComponent(href);
        } catch(e) {
           hash = href;
        }

        var $navbar = document.querySelectorAll(".navbar.is-fixed-top");
        if (hash.indexOf("#") == 0 && $navbar.length) {
            // fix for id of footnote
            // ref: https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
            hash = hash.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
            var $target = document.querySelectorAll(hash);
            if($target.length) {
                (document.querySelectorAll("html, body") || []).forEach((el) => {
                    el.scrollTo({ top: $target.offset().top - $navbar.height(), behavior: 'smooth' });
                });
            }
        }
    }

    // When our page loads, check to see if it contains and anchor
    scrollToAnchor(window.location.hash);
    // Intercept all anchor clicks
    (document.querySelectorAll("a[href*=\\#]:not([href=\\#])") || []).forEach((el) => {
        el.addEventListener('click', scrollToAnchor);
    });


/********************/
/* Extension: KaTeX */
/********************/
    if (document.querySelectorAll("script[src$='katex.min.js']").length ) { // KaTeX enabled
        renderMathInElement(document.body);
    }
/**********************/
/* Extension: mermaid */
/**********************/
    if (document.querySelectorAll("script[src$='mermaid.min.js']").length ) { // mermaid enabled
        mermaid.initialize({startOnLoad:true, securityLevel:'loose'});
    }
});
