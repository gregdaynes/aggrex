A step by step guide to getting the development environment running

Install system dependencies through ASDF. This will ensure you're running the correct version of the Node runtime.

```
asdf install
```

With Node installed, install software dependencies

```
npm install
```

Prepare your private development configuration

```
cp .env.example .env
```

Allow `direnv` to detect and load your `.env` configuration for the directory

```
direnv allow
```

Start the docker containers using docker-compose

```
docker-compose up
```

(If you choose to run the containers in a daemon)

```
docker-compose up -d
```
