const mineflayer = require('mineflayer');
const AutoAuth = require('mineflayer-auto-auth');
const readline = require('readline');
const fs = require('fs');
const { SocksProxyAgent } = require('socks-proxy-agent');


const proxies = JSON.parse(fs.readFileSync('proxies.json', 'utf8'));


function getProxy(botNumber) {
  return proxies[(botNumber - 1) % proxies.length];
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask user for input parameters
function askUserInput() {
  rl.question('Enter base bot name (e.g., "bot"): ', (botName) => {
    rl.question('Enter number of bots to create: ', (botCount) => {
      rl.question('Enter server address (e.g., localhost): ', (host) => {
        rl.question('Enter server port (default 25565): ', (port) => {
          rl.question('Enter password for authentication (if required): ', (password) => {
            rl.close();

            // Use default values if not specified
            const serverPort = port || 25565;
            const count = parseInt(botCount) || 1;

            // Create bots
            createBots(botName, count, host, serverPort, password);
          });
        });
      });
    });
  });
}

// Array to store all bots
const bots = [];

// Function to create bots with numbering
function createBots(baseName, count, host, port, password) {
  console.log(`\nCreating ${count} bots with names: ${baseName}1, ${baseName}2, ... ${baseName}${count}\n`);
  console.log(`Available proxies: ${proxies.length}\n`);

  for (let i = 1; i <= count; i++) {
    const botName = `${baseName}${i}`;

    setTimeout(() => {
      createBot(botName, host, port, password, i);
    }, i * 10); // Create bots with 10ms interval for reliability
  }
}

// Function to create a single bot
function createBot(username, host, port, password, botNumber) {
  const proxy = getProxy(botNumber);
  const proxyNum = Math.floor((botNumber - 1) / 2) + 1;
  console.log(`Connecting bot "${username}" to server ${host}:${port}...`);
  console.log(`Using proxy #${proxyNum}: ${proxy.host}:${proxy.port}`);

  // Use SOCKS5 proxy for Minecraft TCP connections
  console.log(`Using SOCKS5 proxy`);
  const proxyUrl = `socks5h://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`;
  const socksAgent = new SocksProxyAgent(proxyUrl);

  const botOptions = {
    host: host,
    port: port,
    username: username,
    version: false, // Automatically detect server version
    plugins: [AutoAuth],
    AutoAuth: password ? {
      password: password,
      logging: true,
      ignoreRepeat: true
    } : undefined,
    socksAgent: socksAgent
  };

  const bot = mineflayer.createBot(botOptions);

  // Add bot to array
  bots.push(bot);

  // Bot events
  bot.on('login', () => {
    console.log(`Bot "${username}" successfully connected!`);
    console.log(`Coordinates: X: ${bot.entity.position.x.toFixed(2)}, Y: ${bot.entity.position.y.toFixed(2)}, Z: ${bot.entity.position.z.toFixed(2)}`);
  });

  bot.on('serverAuth', () => {
    console.log(`Bot "${username}" authorized on server`);
  });

  bot.on('spawn', () => {
    console.log(`Bot "${username}" spawned on server`);
  });

  bot.on('error', (err) => {
    console.error(`Bot "${username}" error: ${err.message}`);
    console.error(`   Proxy: ${proxy.host}:${proxy.port}`);
    console.error(`   Code: ${err.code || 'unknown'}`);
    console.error(`   Stack: ${err.stack}`);
  });

  bot.on('end', () => {
    console.log(`Bot "${username}" disconnected from server`);
  });

  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    console.log(`[${username}]: ${message}`);
  });

  // Example command - bot will look up on spawn
  bot.on('spawn', () => {
    bot.look(Math.PI / 4, 0.5);
  });

  return bot;
}

// Start the program
askUserInput();
