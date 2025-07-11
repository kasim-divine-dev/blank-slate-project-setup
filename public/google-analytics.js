// Load Google Analytics 4 script
(function () {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gtagScript);

    gtagScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());

        // GA4 Configuration
        gtag('config', 'G-XXXXXXXXXX', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });

        // Enhanced Ecommerce Events
        gtag('config', 'G-XXXXXXXXXX', {
            custom_map: {
                'custom_parameter': 'dimension1'
            }
        });
    };

    // GTM Script
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-XXXXXXX');

    // Utility functions
    window.trackOutboundLink = function (url, target) {
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url,
            transport_type: 'beacon'
        });
        if (target !== '_blank') {
            setTimeout(function () {
                document.location = url;
            }, 150);
            return false;
        }
        return true;
    }

    window.trackDownload = function (filename) {
        gtag('event', 'download', {
            event_category: 'engagement',
            event_label: filename
        });
    }

    window.trackFormSubmission = function (formName) {
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: formName
        });
    }
})();
