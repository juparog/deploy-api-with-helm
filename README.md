# Deploy Api with Helm

The purpose of this project is the deployment of an api using the package manager for Kubernetes Helm.

## How to use

### With Helm

### Already working database.
Copy the .env.example file and rename it to .env, change the internal values of the file to the connection values for your already running database.

```bash
$> cp .env.example .env
# change internal values of .env file
```

### With docker-compose
Run the following command which will compile the api image, deploy the api and a mongodb database.
```bash
$> docker-compose up -d --build
```