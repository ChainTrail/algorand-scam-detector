const template = `
<!doctype html>
<html lang="en-us">

    <head>
        <!-- Meta -->
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">

        <title>Algorand Scam Detector - Explain {{ txId }}</title>
        <meta name="description" content="Detecting whether the Algorand transaction {{ txId }} is a SCAM or not. Powered by Chaintrail - Uncovering Algorand.">

        <!-- The compiled CSS file -->
        <link rel="stylesheet" href="https://scam-detector-s3.chaintrail.io/public/css/production.css">

        <!-- Web fonts -->
        <link href="https://fonts.googleapis.com/css?family=Space+Mono:400,700" rel="stylesheet">

        <!-- favicon.ico. Place these in the root directory. -->
        <link rel="apple-touch-icon" sizes="180x180" href="https://scam-detector-s3.chaintrail.io/public/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="https://scam-detector-s3.chaintrail.io/public/img/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="https://scam-detector-s3.chaintrail.io/public/img/favicon/favicon-16x16.png">
        <link rel="shortcut icon" href="https://scam-detector-s3.chaintrail.io/public/img/favicon/favicon.ico">

    </head>

    <body class="has-animations">


    <!-- Create outer border -->
    <div class="page-border">
    <div class="bg--white">

        <!-- Header -->
        <header class="align--center pt3 pb2">
            <div class="container">
                <h1 class="mb3 reveal-on-scroll is-revealing" title="Algorand Scam Detector"><img src="https://scam-detector-s3.chaintrail.io/public/img/logo.svg" alt="Algorand Scam Detector"></h1>
                
                {{#txFound}}
                    {{#txIsScam}}
                    <h2 class="mb3 reveal-on-scroll is-revealing underline">
                        Warning: this transaction is considered a <span class="text-color-red">SCAM</span>!
                    </h2>
                    {{/txIsScam}}

                    {{^txIsScam}}
                    <h2 class="mb3 reveal-on-scroll is-revealing">
                        This transaction is <span class="underline">not considered</span> a SCAM.
                    </h2>
                    {{/txIsScam}}

                    <p class="mb1 text-wrap word-break">Tx: {{ txId }}</p>
                {{/txFound}}

                {{^txFound}}
                    {{#blacklistRetrieved}}
                    <h2 class="mb3 reveal-on-scroll is-revealing underline">
                        Transaction not found
                    </h2>
                    {{/blacklistRetrieved}}
                    
                    {{^blacklistRetrieved}}
                    <h2 class="mb3 reveal-on-scroll is-revealing">
                        Something went wrong detecting this transaction.
                    </h2>
                    {{/blacklistRetrieved}}
                {{/txFound}}
                <p></p>
            </div>
        </header>

        <!-- Body -->
        <main>
            <div class="container">

                <!-- Info -->
                <section class="pt2 pb3">                    
                    <div class="grid-row">
                        {{#txIsScam}}
                        <div class="grid-column span-one-third  mt1 reveal-on-scroll is-revealing">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="35px" fill="#4e504d"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                            <p>This transaction has been considered a SCAM due to a malicious note or sender.</p>
                        </div>
                        <div class="grid-column span-one-third mt1 reveal-on-scroll is-revealing">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="35px" fill="#4e504d"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                            <p>Never interact with the link being shown in the note as it could lead to loss of all your funds.</p>
                        </div>
                        {{/txIsScam}}

                        {{^txIsScam}}
                        <div class="grid-column span-one-third mt1 reveal-on-scroll is-revealing">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="35px" fill="#4e504d"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>

                            {{#blacklistRetrieved}}
                                <p>This transaction doesn't seem to be malicious. Although - stay vigilant & safe!.</p>
                            {{/blacklistRetrieved}}

                            {{^blacklistRetrieved}}
                                <p>This transaction couldn't be processed, so unsure if it's a scam or not. Stay vigilant & safe!</p>
                            {{/blacklistRetrieved}}
                        </div>
                        <div class="grid-column span-one-third mt1 reveal-on-scroll is-revealing">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="35px" fill="#4e504d"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                            <p>Never interact with unknown links send to you in a transaction note, as this could lead to loss of funds.</p>
                        </div>
                        {{/txIsScam}}
                        
                        <div class="grid-column span-one-third mt1 reveal-on-scroll is-revealing">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="35px" fill="#4e504d"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                            <p>This AI based Algorand scam detection is brought to you by <a href="https://chaintrail.io" class="link">Chaintrail.io - Uncovering Algorand</a>.</p>
                        </div>
                    </div>
                     
                </section>

                <!-- Sponsors -->
                <section class="pt3 pb3 align--center">
                    <h3 class="mb2">Used by</h3>
                    <a href="https://allo.info" target="_blank"><img class="m1" src="https://scam-detector-s3.chaintrail.io/public/img/allo.svg" alt="Stripe" style="height:50px"></a>
                    <a href="https://chaintrail.io" target="_blank"><img class="m1" src="https://scam-detector-s3.chaintrail.io/public/img/chaintrail.svg" alt="Segment" style="height:45px"></a>
                </section>

                <section class="pt2 pb3">
                    <h3 class="align--center mb2">About Algorand Scam Detector</h3>
                    <div class="grid-row">
                        <div class="grid-column span-one-third mt1">
                            <blockquote class="blockquote">
                                <p>Algorand Scam Detector verifies every transaction on-chain for malicious notes.</p>
                                <p>> <cite>Malicious detection</cite></p>
                            </blockquote>
                        </div>
                        <div class="grid-column span-one-third mt1">
                            <blockquote class="blockquote">
                                <p>With the help of AI, each and every transaction is flagged as scam, potential scam or no scam.</p>
                                <p>> <cite>AI Powered</cite></p>
                            </blockquote>
                        </div>
                        <div class="grid-column span-one-third mt1">
                            <blockquote class="blockquote">
                                <p>This service is brought to you freely & fully open-source by Chaintrail - Uncovering Algorand.</p>
                                <p>> <cite>by Chaintrail</cite></p>
                            </blockquote>
                        </div>
                    </div>
                </section>

                <!-- Sponsors -->
                <section class="pt3 pb3 align--center">
                    <h3 class="mb2">Built for Algorand</h3>
                    <img class="m1" src="https://scam-detector-s3.chaintrail.io/public/img/algorand.png" alt="Stripe" style="height:50px">
                </section>
            </div>
        </main>

        <!-- Footer -->
        <footer class="mt2 pb3 align--center">
            <p class="mt1 small text--gray">Powered by <a href="https://chaintrail.io/" class="link">Chaintrail - Uncovering Algorand</a>.</p>
            <p class="mt1 small text--gray" style="max-width: 75%; margin: 0 auto; line-height: 1.2rem; margin-top: 10px;">Although we do our best to spot scams, we can't guarantee we catch them all. Stay alert and prioritize your safety. We want to emphasize that we are not liable for any damages incurred through scams.</p>
        </footer>

    </div>
    </div>

    <!-- Scroll reveal -->
    <script src="https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js"></script>

    <!-- The compiled JavaScript file -->
    <script src="https://scam-detector-s3.chaintrail.io/public/js/production.js"></script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DE4DQPLPDV"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-DE4DQPLPDV');
    </script>

    </body>
</html>
`

export default template;