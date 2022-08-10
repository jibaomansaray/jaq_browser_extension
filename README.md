# JAQ custom protocol handler

This repository contain code for replacing the file, `file://` protocol to `jaqexplorer://` and a desktop application
that can handle the custom protocol `jaqexplorer://` .

>The desktop application uses your operating system default file explorer or extension application for the clicked location.

## How to register the custom protocol
 1. Install the browser extension
 2. Install the desktop application

 Clicking on a link that starts with `file://` will open the ``file`` or ``folder`` on your computer

## Download
Prebuilt packages are under the **releases** section

## Prerequisite for development or manual building
 - [Node JS](https://nodejs.org/)
 - Yarn: After installing nodejs, run:
  
   `npm install -g yarn`
 - Typescript: After installing nodejs, run:

    `npm install -g typescript`

## Setup
- Go into the folder **browser_extension** and run:

   `yarn install`
- Go into the folder **handler** and run:

   `yarn install`

## Building the desktop application
Go into the folder **handler** and run:
  
  `yarn make`

  After the process completes, your platform packaged application will be located under the **handler/out** folder

## Building the browser extension
Go into the folder **browser_extension** and run:

  `yarn make`

When the process completes, a zipped file will be generated under the **browser_extension/dist/bex** folder


## Developing
This code base uses the follow third party packages:
- [Electron Forge](https://www.electronforge.io/) : For the desktop application packaging
- [Electron js](https://www.electronjs.org/) : As the desktop application GUI library
- [Vue Js](https://vuejs.org/) : For the browser extension option page UI
- [Quasar](https://quasar.dev/) : For the browser extension

The browser extension and desktop application are mainly written in Typescript.

### Desktop application
**handler/src/index.ts** contains all of the logic for the desktop application.
To run the desktop application when developing run the command `yarn start` under the **handler** folder. For now, any change to the desktop application code will require you to re-run this command.


### Browser application
 - **browser_extension/src** contains the general code. This includes the UI components
 - **browser_extension/src-bex** contains the browser extension's manifest and service worker scripts.

 The main logic for the extension is located at: **browser_extension/src-bex/my-content-script.js**.

 The browser extension supports *hot reloading*. In order to rebuild the extension as you edit the code base, run `yarn dev` under the **browser_extension** folder. As you develop, the extension is built and store at **browser_extension/dist/bex**.

 Most browsers allow you to enable **developer mode**. Please do so in order to test the extension in the
 browser of your choice. In order to install the unpacked, developer version, of the extension, browse and select the folder **browser_extension/dis/bex**.


 ## Contributing
 Fork this repo, apply your changes and submit a pull request.

 ## License
 MIT

 ## Contributors
 Feel free to place your name here when submitting a pull request