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

1. Create a `.env` file in the project's root directory and add the following required environment variables:

| Environment Variable    | Description                                        | Default Value            |
|-------------------------|----------------------------------------------------|--------------------------|
| FORTY_TWO_CLIENT_ID     | 42's application client ID.                        |                          |
| FORTY_TWO_CLIENT_SECRET | 42's application client secret.                    |                          |
| DISCORD_TOKEN           | Token for your Discord application.                |                          |
| NEXTAUTH_SECRET         | Secret key used for NextAuth.js authentication.    |                          |
| SITE_URL                | The URL of your website.                           | http://localhost:3000    |
| RCON_HOST               | Hostname or IP address for RCON.                   | localhost                |
| RCON_PORT               | Port number for RCON.                              | 25575                    |
| RCON_PASSWORD           | Password for RCON authentication.                  |                          |

Please note that some of these variables may not have default values, and you should set them with appropriate values for your specific application.

### Using Docker

2. Run the following command to start the Docker containers:

    ```sh
    docker compose up (-d)
    ```

### Without Docker

2. Install project dependencies by running the following command in the project root directory:

    ```sh
    pnpm install (--prod)
    ```

3. Build and start the project with one of the following commands:

    ```sh
    pnpm db:push
    pnpm db:generate
    ```

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

A `/setup auth` command is available via the bot, run it in the channel where you want to set up the authentication system and specify the role to be given to the authorised users.
Alternatively, you can redirect your users to the `/auth` page of the website, where they can whitelist themselves with 42.

## Contributing

Contributions to the **42QSMP** project are welcome! We don't have any specific guidelines, but please keep your code clean according to our styling preferences.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.
