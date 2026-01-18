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
- `http-proxy-agent` - HTTP proxy support
- `https-proxy-agent` - HTTPS proxy support
- `readline` - Command-line interface (built-in)

## Configuration

### Setting up Proxies

The application uses SOCKS5h proxies from Decodo for bot connections. Configure proxies in `proxies.json`:

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

#### Current Proxy Configuration

- **Provider**: Decodo (SOCKS5h)
- **Host**: dc.decodo.com
- **Port Range**: 10001-10010
- **Protocol**: SOCKS5h (recommended for Minecraft)
- **Status**: 10 proxies configured

#### Using Decodo Proxies

1. Visit [Decodo Dashboard](https://dashboard.decodo.com/) to create an account
2. Select SOCKS5h proxy endpoints from the dashboard
3. Each bot can use a different proxy to avoid rate limiting
4. Decodo provides reliable proxy services for botting purposes
5. Multiple proxies help avoid rate limiting and IP bans

#### Proxy Assignment

- Proxies are rotated across bots for even distribution
- Each bot gets a unique proxy from the pool
- If more bots than proxies, the rotation repeats from the start

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

### Bot names already exist on server
- Use a different base name
- Wait for previous bots to disconnect

### Proxy connection error
- Verify proxy credentials in `proxies.json`
- Check proxy availability on [Decodo Dashboard](https://dashboard.decodo.com/)
- Ensure proxies support HTTP/HTTPS connections

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` folder and reinstall: `rm -r node_modules && npm install`

## Requirements

- Node.js 12+
- Active Minecraft server (Java Edition)
- Valid proxy credentials (optional but recommended)

## License

MIT
