import { ApplicationOptions, CreateApplicationOptions } from 'discordoo'
import { DiscordooApplicationMode } from 'src/constants'

export interface DiscordooClient
  extends ApplicationOptions,
    CreateApplicationOptions {
  token: string
  mode: DiscordooApplicationMode
  name: string
}

export interface DiscordooOptions {
  apps: DiscordooClient[]
}
