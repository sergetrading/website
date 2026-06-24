# Deployment

Die Website kann auf zwei Wegen live gehen.

## 1. Hostinger VPS (Docker + Traefik) — Hauptbetrieb

Der VPS nutzt `docker-compose.yml`. Darin laufen zwei Container:

- **traefik** – Reverse-Proxy, der die Ports 80/443 entgegennimmt und
  automatisch HTTPS-Zertifikate von Let's Encrypt holt.
- **web** – die Next.js-App (Standalone-Server, intern Port 3000).

### Ohne Domain (jetzt)

Einfach deployen. Die Seite ist sofort per **HTTP über die VPS-IP**
erreichbar: `http://<deine-VPS-IP>`. Es wird noch kein Zertifikat angefragt.

### Mit Domain (HTTPS aktivieren)

1. Beim Domain-Anbieter einen **A-Record** anlegen, der auf die VPS-IP zeigt.
2. Auf dem VPS eine Datei `.env` neben der `docker-compose.yml` anlegen
   (Vorlage: `.env.example`):

   ```env
   DOMAIN=meinprojekt.de
   ACME_EMAIL=sergej.hoffmann@gmail.com
   ```

3. Neu deployen / `docker compose up -d --build`.

Traefik holt dann automatisch ein Zertifikat und leitet HTTP → HTTPS um.

> Voraussetzung: Die DNS-Einträge müssen aktiv sein, **bevor** das
> Zertifikat angefragt wird, sonst schlägt die Let's-Encrypt-Prüfung fehl.

### Port 80/443 belegt?

Falls auf dem VPS schon ein Webserver läuft, diesen stoppen — Traefik
braucht die Ports 80 und 443 exklusiv.

## 2. GitHub Pages — automatischer Nebenbetrieb

Bei jedem Push auf `main` baut die GitHub Action
(`.github/workflows/deploy.yml`) einen statischen Export und veröffentlicht
ihn unter <https://sergetrading.github.io/website/>.

Die Umschaltung Standalone (VPS) ↔ statischer Export (Pages) steuert die
Variable `GITHUB_PAGES` in `next.config.ts` — nur die Action setzt sie auf
`true`.
