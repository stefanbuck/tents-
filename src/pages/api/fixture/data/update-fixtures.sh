#!/usr/bin/env bash
set -e

curl http://localhost:3000/api/github/facebook/react > src/pages/api/fixtures/facebook_react.json
curl http://localhost:3000/api/github/facebook/jest > src/pages/api/fixtures/facebook_jest.json
curl http://localhost:3000/api/github/vercel/next.js > src/pages/api/fixtures/vercel_next.js.json
curl http://localhost:3000/api/github/backstage/backstage > src/pages/api/fixtures/backstage_backstage.json
curl http://localhost:3000/api/github/tdeekens/flopflip > src/pages/api/fixtures/tdeekens_flopflip.json