# Tauri-React-Musixel - Excell Stats parser and Analyzer

Created in September 2023, this project represents Phil Jac (philjac56) first complete project using React and Tauri. It is not intended for commercial use.This is not a Routenote.com official release, Routenote has his own online stats pages with graphs. This is just an educational exercise. The Github repository is for developpers who are searching for exemples of tauri/react excell file parsing and tables and graphs creation with indexedDB database .

This project is a small desktop application built with **React** and **Tauri**, developed as a personal practice to learn both frameworks. It parses  Excell files from the Routenote.com stats service, which contain statistics on song streaming counts, across various music platforms. Only selected datas are parsed and stored in an **IndexedDB** database based on specific keywords. Then the javascript displayed the stats through tables and charts. Tauri allows to create a .exe build for windows and it works fine. Creating a .exe allows to store the datas and keep it after each file upload process. To test it you will find in the insights an Excell exemple file  with the same structure of Routenote stats (Not "summary" month version but all datas).

## Features

- **File Parsing**: Upload one or multiple Excel files with Routenote streaming stats using [`exceljs`](https://www.npmjs.com/package/exceljs) for handling Excel files and [`papaparse`](https://www.npmjs.com/package/papaparse) for parsing CSV data.

- **Data Storage**: Saves parsed data into an [IndexedDB database](src/indexedDB.js) using the [`indexedDB.js`](src/indexedDB.js) module for easy retrieval and display.

- **Data Visualization**: Displays streaming statistics in tables with [`AG Grid React`](src/DynamicTable.jsx) and interactive charts using [`Highcharts`](https://www.npmjs.com/package/highcharts) along with [`Highcharts React Official`](https://github.com/highcharts/highcharts-react).
  
## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) (Rust, Cargo, etc.)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/routenote-stats-analyzer.git
    cd routenote-stats-analyzer
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Application in Development

1. Open the project in Visual Studio Code.
2. Start the development server with the following command:

    ```bash
    npm run dev
    ```

   This command will start the React development server and launch the Tauri application in development mode. Any changes to the code will automatically reload the app.

## Building the Tauri Executable for Windows

To build the Tauri executable for Windows, follow these steps:

1. Ensure that your Tauri prerequisites (Rust, Cargo, etc.) are installed and properly configured.
2. Run the following command to generate the executable:

    ```bash
    npm run tauri build
    ```

   The Windows executable file (`.exe`) will be generated in the `src-tauri/target/release` directory.

## License

This project is licensed under the MIT License. It represents the author's first completed project using React and Tauri and is intended purely for educational purposes. No commercial use is intended or permitted.

---

**MIT License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

