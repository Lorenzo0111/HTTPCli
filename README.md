<div align="center">

# HTTP Cli

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/HTTPCLI)](https://github.com/Lorenzo0111/HTTPCLI/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/HTTPCLI)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

</div>

## What is HTTPCli

HTTPCli is a parser for HTTP files. It allows you to run HTTP requests easily with a basic syntax.

## Installing

### Binaries
HTTP Cli is available for Windows, Linux and MacOS. You can download the latest release from the [releases page](https://github.com/Lorenzo0111/HTTPCLI/releases/latest).

### NPM
You can also install HTTPCli using npm:
```bash
npm install -g @lorenzo0111/httpcli
```
### Importing as a module
You can also import HTTPCli as a module in your project and use its functions

```bash
npm install @lorenzo0111/httpcli
```

## Usage

### Command Line
```bash
# Start a REPL session
httpcli

# Run a file
httpcli file.http
```

### As a module
```javascript
import { parse } from "@lorenzo0111/httpcli";

const httpFile = `
GET https://jsonplaceholder.typicode.com/todos/1
`;

parse(httpFile).then((res) => {
    console.log(res);
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.