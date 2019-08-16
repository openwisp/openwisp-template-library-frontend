openwisp library frontend
===================

OpenWISP 2 library frontend module (built using reactjs).

**Want to help OpenWISP?** `Find out how to help us grow here
<http://openwisp.io/docs/general/help-us.html>`_.

------------

.. contents:: **Table of Contents**:
   :backlinks: none
   :depth: 3

------------

Dependencies
------------

*Node >= 8.10

Settings
--------
Edit the config.json file found in the src directory.

``BACKEND_DOMAIN``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+--------------+--------------------------------------------------------------------+
| **type**:    | ``string``                                                         |
+--------------+--------------------------------------------------------------------+
| **default**: | .. code-block:: node_js                                            |
|              |                                                                    |
|              |   "http://localhost:8000/"                                         |
+--------------+--------------------------------------------------------------------+

``FACEBOOK_APP_ID``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+--------------+--------------------------------------------------------------------+
| **type**:    | ``string``                                                         |
+--------------+--------------------------------------------------------------------+
| **default**: | .. code-block:: node_js                                            |
|              |                                                                    |
|              |   ""                                                               |
+--------------+--------------------------------------------------------------------+

``FACEBOOK_APP_ID``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+--------------+--------------------------------------------------------------------+
| **type**:    | ``string``                                                         |
+--------------+--------------------------------------------------------------------+
| **default**: | .. code-block:: node_js                                            |
|              |                                                                    |
|              |   ""                                                               |
+--------------+--------------------------------------------------------------------+


Installation
------------
In the project directory, you can run:

.. code-block:: shell
    npm install

to install all required dependencies

.. code-block:: shell
    npm test

to run the test

.. code-block::shell
    npm start

to run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser

.. code-block::shell
    npm run build

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

.. coce-block::shell
    npm run eject

to remove the single build dependency from the project

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


Contributing
------------

Please read the `OpenWISP contributing guidelines
<http://openwisp.io/docs/developer/contributing.html>`_
