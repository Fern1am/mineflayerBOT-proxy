# Minecraft Botlogin with Mineflayer

A Node.js application that creates multiple Minecraft bots with automatic numbering using the Mineflayer library.

## Prerequisites

- Node.js 12 or higher
- A running Minecraft Java Edition server
- Proxy access (optional, but recommended for multiple bots)

## Installation

### 1. Install Node.js

#### Windows
- Download from [nodejs.org](https://nodejs.org/)
- Run the installer and follow the installation wizard
- Choose "Add to PATH" during installation
- Restart your computer after installation

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

#### Verify Installation
```bash
node --version
npm --version
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `mineflayer` - Minecraft bot library
- `mineflayer-auto-auth` - Auto-authentication plugin
- `socks-proxy-agent` - SOCKS5h proxy support
- `socks` - SOCKS protocol library
- `readline` - Command-line interface (built-in)

## Configuration

### Setting up Proxies

The application uses SOCKS5h proxies from Decodo for bot connections. Configure proxies in `proxies.json` with your actual credentials:

```json
[
  {
    "host": "dc.decodo.com",
    "port": 10001,
    "username": "your_username",
    "password": "your_password",
    "type": "socks5h"
  },
  {
    "host": "dc.decodo.com",
    "port": 10002,
    "username": "your_username",
    "password": "your_password",
    "type": "socks5h"
  }
]
```

#### Proxy Configuration Details

- **Provider**: Decodo (SOCKS5h)
- **Host**: dc.decodo.com
- **Port Range**: 10001+ (configure as needed)
- **Protocol**: SOCKS5h (required for Minecraft)
- **Current Status**: Configured with Decodo credentials

⚠️ **IMPORTANT SECURITY NOTE**: Never commit your actual credentials to version control! Use the template format above with placeholder values and replace with your real credentials locally.

#### Using SOCKS5h Proxies

1. Obtain proxy credentials from your provider (Decodo or similar)
2. Update `proxies.json` with valid host, port, username, and password
3. Each bot will rotate through the available proxies
4. SOCKS5h proxies support Minecraft Java Edition connections
5. Using multiple proxies helps avoid rate limiting and IP bans

#### Proxy Rotation System

- Proxies are distributed across bots in sequential order
- Bot 1 uses proxy 1, Bot 2 uses proxy 2, etc.
- If you have more bots than proxies, rotation cycles back to the first proxy
- Ensure you have enough proxies configured for your bot count

## Usage

```bash
npm start
```

The program will prompt you for:

1. **Bot base name** - e.g., "bot" (will create bot1, bot2, bot3...)
2. **Number of bots** - how many bots to create
3. **Server address** - IP or domain name (e.g., localhost, play.example.com)
4. **Server port** - usually 25565 (press Enter to use default)
5. **Password** - for authentication (press Enter if not required)

### Example

```
Enter base bot name (e.g., "bot"): mybot
Enter number of bots to create: 3
Enter server address (e.g., localhost): localhost
Enter server port (default 25565): 25565
Enter password for authentication (if required): mypassword
```

Result:
- Bots named `mybot1`, `mybot2`, `mybot3` will be created
- Each bot will connect to the server using a proxy from your list
- Console will display connection status and bot actions

## Features

✅ Create multiple bots with one command  
✅ Automatic numbering for bot names  
✅ Proxy rotation support (each bot uses a different proxy)  
✅ Real-time logging of bot status  
✅ Spawn coordinates display  
✅ Error handling with detailed messages  
✅ Auto-authentication support  
✅ Chat message handling  
✅ Player targeting capability  

## Project Structure

```
botlogin/
├── bot.js           # Main bot application
├── package.json     # Project dependencies
├── proxies.json     # Proxy configuration
└── README.md        # This file
```

## Troubleshooting

### Connection fails with "ECONNREFUSED"
- Verify the Minecraft server is running
- Check the server address and port
- Ensure your proxy credentials are correct
- Make sure the proxy supports SOCKS5h protocol

### Bot names already exist on server
- Use a different base name
- Wait for previous bots to disconnect

### Proxy connection error
- Verify proxy credentials in `proxies.json`
- Check proxy host and port configuration
- Ensure proxies support SOCKS5h protocol
- Test proxy availability with: `ping dc.decodo.com`

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` folder and reinstall: `rm -r node_modules && npm install`

### Bots not using proxies correctly
- Verify all proxies in `proxies.json` have host, port, username, and password fields
- Check that `type` is set to `"socks5h"`
- Ensure bot count matches or exceeds proxy count for proper distribution

## Requirements

- Node.js 12+
- Active Minecraft server (Java Edition)
- Valid SOCKS5h proxy credentials
- Stable internet connection

## License

MIT
