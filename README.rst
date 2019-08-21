openwisp library frontend
=========================

OpenWISP template library frontend module (built using reactjs).

This Frontend is used to interract with the openwisp `library backend
<https://github.com/openwisp/openwisp-template-library-backend>`_. It provides an interface to
list and search for public templates and to create public templates and view their
details.

**Want to help OpenWISP?** `Find out how to help us grow here
<http://openwisp.io/docs/general/help-us.html>`_.

------------

.. contents:: **Table of Contents**:
   :backlinks: none
   :depth: 3

------------

Dependencies
------------

* Node >= 8.10


Installation
------------
Make sure nodejs and npm are installed, then
fork and clone this repository to your local machine then move into
the project root directory.

Install the dependencies:

.. code-block:: shell

    npm install

Run tests

.. code-block:: shell

    npm test

Start server

.. code-block:: shell

    npm start

This should start the server on http://localhost:3000/
with the backend running on http://localhost:8000/ .  You can refer to the
`library backend <https://github.com/openwisp/openwisp-template-library-backend>`_ for installation of the
library backend.

Deployment
----------
In case you wish to deploy this app to a server, then you need to edit the ``config.json``
file found in the ``src/`` directory to add your
``FACEBOOK_APP_ID`` and ``GOOGLE_CLIENT_ID`` for social logins and the domain on which your backend is running to
``BACKEND_DOMAIN``. remember to append the last ``/`` to the ``BACKEND_DOMAIN``.

If the method which you using to deploy this app needs the ``build``, then you can get the build by running
the following command from the project root directory;

.. code-block:: shell

    npm run build


Contributing
------------

Please read the `OpenWISP contributing guidelines
<http://openwisp.io/docs/developer/contributing.html>`_
