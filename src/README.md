# Tauri-React-Musixel - Excel Stats parser and Analyzer
by PhilJac56 on Github

## Purpose
Created in September 2023, this project is intended purely for educational use and is not designed for production.
This project was developed as a personal exercise to learn the React and Tauri frameworks. It parses Excel files from the music service Routenote.com, which contain statistics on song streaming counts across various platforms. Selected data are parsed and stored in an IndexedDB database based on specific keywords. The statistics are then displayed through tables and charts using Highcharts. 

This release includes (in src/ExcelExempleFile) a test Excel file formatted to match the monthly streaming statistics file from Routenote.com. The data in this file is fictitious and serves as an example for testing purposes only. It replicates the structure of a genuine Routenote report, allowing developers to test the functionality of the application without accessing real user data. This file can be used to practice parsing and analyzing streaming statistics in the same layout as the official Routenote report.

 This is not an official Routenote program; Routenote provides its own online statistics pages with graphs. The purpose of this project is to serve as a guide for developers interested in learning how to parse Excel files, create tables and graphs, and use IndexedDB with React. Tauri then allows the creation of a Windows executable with an integrated Chrome-based navigator and local database.

## Possible Project Extensions
If you need to retrieve data from Excel files for statistical analysis or database creation, this program can serve as a foundation for your development.

## Collaborations
This project is not actively maintained, and pull requests are closed. The code will remain as-is and will not receive updates or improvements. This repository is intended solely as an educational resource for developers learning React and Tauri.

## Key Features
- **React**: A JavaScript library for building user interfaces.
- **Tauri**: A framework for creating fast, lightweight binaries for major desktop platforms.
- **IndexedDB**: A low-level API for storing structured data locally.
- **Highcharts**: A library for creating interactive charts.

## Getting Started
To test the application, an example Excel file is provided in src/ExcelExempleFile. This file is formatted similarly to Routenote's real statistics files (not the "summary" monthly version but includes all data).

## Project Structure
For better organization, it's common to create a `src/components/` folder for `.jsx` components and a `src/services/` folder for `.js` endpoints and calculations. In this project, however, all files are located in the `src` directory, with English comments added for each function.

## Features

- **File Parsing**: Upload one or more Excel files with Routenote streaming statistics using [`exceljs`](https://www.npmjs.com/package/exceljs) for handling Excel files and [`papaparse`](https://www.npmjs.com/package/papaparse) for parsing CSV data.

- **Data Storage**: Stores parsed data in an [IndexedDB database](src/indexedDB.js) for easy retrieval and display.

- **Data Visualization**: Displays streaming statistics in tables using [`AG Grid React`](src/DynamicTable.jsx) and interactive charts created with [`Highcharts`](https://www.npmjs.com/package/highcharts) and [`Highcharts React Official`](https://github.com/highcharts/highcharts-react).

## Dependencies

### Production Dependencies

- `@tauri-apps/api`: ^1.4.0
- `ag-grid-community`: ^30.1.0
- `ag-grid-react`: ^30.1.0
- `exceljs`: ^4.3.0
- `highcharts`: ^11.1.0
- `highcharts-react-official`: ^3.2.1
- `lucide-react`: ^0.454.0
- `papaparse`: ^5.4.1
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.15.0
- `react-table`: ^7.8.0
- `simple-statistics`: ^7.8.3
- `sqlite3`: ^5.1.6

### Development Dependencies
- `@tauri-apps/cli`: ^1.4.0
- `@vitejs/plugin-react`: ^4.0.3
- `vite`: ^4.4.4
  
## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) (Rust, Cargo, etc.)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Tauri-React-Musixel.git
    cd Tauri-React-Musixel
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

   This command starts the React development server and launches the Tauri application in development mode with a link like `http://localhost:1420/`. Click the link or paste it into your browser. Any code changes will automatically reload the app.

## Building the Tauri Executable for Windows

To build the Tauri executable for Windows, follow these steps:

1. Ensure your Tauri prerequisites (Rust, Cargo, etc.) are installed and properly configured.
2. Run the following command to generate the executable:

    ```bash
    npm run tauri build
    ```

   The Windows executable file (`.exe`) will be generated in the `src-tauri/target/release/` directory.

   ## Disclaimer

This project is a personal educational tool and is not affiliated with or endorsed by Routenote.com or Microsoft. Excel is a registered trademark of Microsoft Corporation, and Routenote is a trademark of Routenote.com. All trademarks and copyrights are the property of their respective owners.

## License

This project is licensed under the MIT License. 

---

**MIT License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
