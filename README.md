panic-http-test
===============

This app is a test of communication between a localhost server and an EVE Ingame Browser window.

Usage
-----

    $ git clone https://github.com/SocietyPro/panic-http-test.git
    $ cd panic-http-test
    $ npm install
    $ npm start

Now go to EVE's ingame browser and visit: `http://localhost:3000`

When you click the panic button, if you have granted trust, you will see the
extra headers indicating the pilot's name, location, ship type, etc. in the
server console.