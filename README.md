# Guild Gearscore Server
The Guild Gearscore Server gives access to the WoW Community APIs with caching and is designed for use with the [Guild GearScore web app](https://github.com/EZTEQ/guild-gearscore-web).

## How to run
```bash
# Get the dependencies
$ yarn # or 'npm install'

# Configuration
$ export APIKEY=yourapikey      #REQUIRED - dev.battle.net API key
$ export PORT=80                #OPTIONAL - defaults to 8080
$ export CORS=true              #OPTIONAL - enables CORS - defaults to false 

$ export NODE_ENV=production    #RECOMMENDED

# Run it
$ yarn start
```
