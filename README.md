# Adobe Commerce Tools Extension

This Visual Studio Code extension provides tools for working with Adobe Commerce (Magento) projects. It includes commands for navigating to PHP files and creating new Adobe Commerce extensions.

## Features

- **Navigate to PHP File**: Quickly navigate to a PHP file by selecting a class name.
- **Create Adobe Commerce Extension**: Scaffold a new Adobe Commerce extension with the necessary directory structure and files.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/bgkavinga/adobe-commerce-tools.git
    cd adobe-commerce-tools
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Compile the extension**:
    ```sh
    npm run compile
    ```

4. **Package the extension**:
    ```sh
    vsce package
    ```

5. **Install the extension**:
    - Open Visual Studio Code.
    - Open the Command Palette (`Cmd+Shift+P`).
    - Type `Extensions: Install from VSIX...` and select the generated `.vsix` file.

## Usage

### Navigate to PHP File

1. Select a class name in your PHP file.
2. Open the Command Palette (`Cmd+Shift+P`).
3. Type `Adobe Commerce Tools: Navigate to PHP File` and press Enter.

### Create Adobe Commerce Extension

1. Open the Command Palette (`Cmd+Shift+P`).
2. Type `Adobe Commerce Tools: Create Adobe Commerce Extension` and press Enter.
3. Enter the name of the extension in the format `Vendor_Module`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.