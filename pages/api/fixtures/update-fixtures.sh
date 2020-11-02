#!/usr/bin/env bash
set -e

curl http://localhost:3000/api/github/facebook/react > pages/api/fixtures/facebook_react.json
curl http://localhost:3000/api/github/facebook/jest > pages/api/fixtures/facebook_jest.json
curl http://localhost:3000/api/github/vercel/next.js > pages/api/fixtures/vercel_next.js.json
curl http://localhost:3000/api/github/spotify/backstage > pages/api/fixtures/spotify_backstage.json