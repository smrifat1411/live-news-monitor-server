# Live News Monitor: server

The API behind a newsroom dashboard that plays many live TV news streams side by side. It asks the YouTube Data API which video each news channel is streaming live right now, keeps the answer in MongoDB, and serves it to the dashboard, so the browser never needs an API key.

Built in 2023. It covers 8 Bangladeshi and 6 international news channels.

## How it works

```
YouTube Data API ──search?eventType=live──▶ refresh routes ──upsert by channel──▶ MongoDB
                                                                                 │
dashboard ◀──────────── GET /bd, GET /world ◀────────────────────────────────────┘
```

- A refresh call asks YouTube for each channel's current live video, in parallel, and upserts `{ channelName, videoId }` per channel.
- The read routes answer from MongoDB, so many viewers cost no YouTube quota.

| Route (under `/api/v1/newschannels`) | What it does |
|---|---|
| `GET /bd` | Live videos of the Bangladeshi channels, from the database |
| `GET /world` | Live videos of the international channels, from the database |
| `GET /bdchannels` | Refreshes the Bangladeshi channels from YouTube |
| `GET /worldchannels` | Refreshes the international channels from YouTube |

The channel list lives in `config/url.js`.

## Run it

Needs Node.js 20.6 or newer, a MongoDB database and a YouTube Data API v3 key.

```bash
cp .env.example .env   # then fill in YOUTUBE_API_KEY and MONGO_URI
npm install
npm start              # http://localhost:5000/api/v1/newschannels/bd
```

**Stack:** Node.js, Express, Mongoose (MongoDB), Axios, YouTube Data API v3.

## Licence

MIT
