# 42QSMP

**42QSMP** is a versatile mono repository project that uses **Turborepo** to manage a bot and a web application to whitelist users on both Discord and a Minecraft server using their student login. Originally designed to support the student-run Minecraft survival multiplayer server at School 42, this project simplifies user access management for a seamless gaming experience.

## Table of Contents

- [Introduction](#42qsmp---minecraft-server-whitelist-manager)
- [Setup](#setup)
  - [Using Docker](#using-docker)
  - [Without Docker](#without-docker)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Using Docker

1. Create a `.env` file in the project's root directory and add the following required environment variables:

    ```dotenv
    FORTY_TWO_CLIENT_ID
    FORTY_TWO_CLIENT_SECRET
    DISCORD_TOKEN
    NEXTAUTH_SECRET
    ```

2. Run the following command to start the Docker containers:

    ```sh
    docker compose up (-d)
    ```

### Without Docker

1. For the web application, create a `.env` file in the `/apps/web` directory and include the following environment variables:

    ```dotenv
    FORTY_TWO_CLIENT_ID
    FORTY_TWO_CLIENT_SECRET
    DISCORD_TOKEN
    NEXTAUTH_SECRET
    ```

2. For the Discord bot, create a `.env` file in the `/apps/discord` directory and include the following environment variable:

    ```dotenv
    DISCORD_TOKEN
    ```

3. Install project dependencies by running the following command in the project root directory:

    ```sh
    pnpm install (--prod)
    ```

4. Build and start the project with one of the following commands:

    - Production mode:

        ```sh
        pnpm build
        pnpm start
        ```

    - Development mode:

        ```sh
        pnpm dev
        ```

## Usage

Once the setup is complete, the **42QSMP** project will manage whitelisting on the Discord and Minecraft servers according to your configuration. You can customize the behavior and features to suit your specific needs.

Users can whitelist themselves

## Contributing

Contributions to the **42QSMP** project are welcome! We don't have any specific guidelines, but please keep your code clean according to our styling preferences.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.
