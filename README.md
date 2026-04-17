# React JS for Beginners

This project is based on the following YouTube playlist:
https://www.youtube.com/playlist?list=PLZKTXPmaJk8J_fHAzPLH8CJ_HO_M33e7-

## Overview

A TOEIC vocabulary learning app built with React + TypeScript + Vite.
The original tutorial used older versions of React and Node.js, so this project has been upgraded to use the latest versions.

| | Original (YouTube) | This Project |
|---|---|---|
| Node.js | 14.18.0 | 22.14.0 |
| React | 17 | 18 |
| Bundler | Webpack (CRA) | Vite |
| Router | react-router-dom v5 | react-router-dom v6 |

## Getting Started

There are two ways to run this project.

---

### Option 1: Local (Windows / Mac / Linux)

**Terminal 1 — Frontend**
```bash
cd voca-master
npm install
npm start
```

**Terminal 2 — Backend (json-server)**
```bash
cd voca-master
json-server --watch src/db/data.json --port 3001
```

Open your browser at: http://localhost:3000

---

### Option 2: Docker (Linux / WSL / Mac)

```bash
cd voca-master
docker-compose up --build
```

Open your browser at: http://localhost

> **Note:** The `src/db/data.json` file is mounted as a volume, so any data changes made in the app will be persisted on your local machine.

---

## Tech Stack

- React 18
- TypeScript
- Vite
- react-router-dom v6
- json-server
- nginx (Docker only)
- Docker / Docker Compose

---

Enjoy it!
