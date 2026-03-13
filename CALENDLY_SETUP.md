# Calendly Setup

The demo booking flow uses the **Calendly embed** — works on free plans, no API required. Users stay on your site.

## Embed (Current — Free Plan)

- Lead capture → qualification → Calendly inline widget in the modal
- Name, email, phone are pre-filled from the qualifier
- No `CALENDLY_API_TOKEN` or `CALENDLY_EVENT_TYPE_URI` needed

To change the event URL: edit `CALENDLY_URL` in `src/components/DemoBookingModal.tsx`.

---

## API Setup (Paid Plan Only)

If you upgrade to a Calendly paid plan and want the API flow back, add these to `.env`:

## Required

```env
CALENDLY_API_TOKEN=your_personal_access_token
CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/YOUR_EVENT_TYPE_UUID
```

## Optional

```env
# Timezone for slot display/filtering (default: America/New_York)
DEMO_AVAILABILITY_TIMEZONE=America/New_York

# Meeting location. Default: zoom_conference
# Options: zoom_conference, google_conference, custom_location, out_of_office
CALENDLY_LOCATION_KIND=zoom_conference
```

## How to get values

### 1. Personal Access Token

1. Log in to [Calendly](https://calendly.com)
2. **Integrations** → **API & Webhooks**
3. **Personal Access Tokens** → **Get a token now**
4. Name it (e.g. `Elystra Demo Booking`) → **Create** → **Copy**
5. Add to `.env` as `CALENDLY_API_TOKEN`

### 2. Event Type URI

**Option A — from the API**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.calendly.com/event_types?user=https://api.calendly.com/users/me"
```

Find the event type that matches your 30min demo (e.g. `30 Min Meeting`). Copy its `uri` (e.g. `https://api.calendly.com/event_types/AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE`).

**Option B — from the Calendly dashboard**

1. **Event Types** → Edit your 30min event
2. In the URL you’ll see something like `.../event_types/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
3. Build the full URI: `https://api.calendly.com/event_types/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

### 3. Location kind

Must match the location on your event type:

- **Zoom** → `zoom_conference`
- **Google Meet** → `google_conference`
- **Phone** → `outbound_call` (may need extra config)
- **Custom** → `custom_location`

If your event type has no location, set `CALENDLY_LOCATION_KIND=` (empty) to omit it.

## Notes

- Calendly's Scheduling API requires a **paid plan**.
- **Per-day slot variety**: `PREFERRED_TIMES_BY_WEEKDAY` in `api/demo-availability.ts` controls which times show per weekday. Edit to change Mon vs Thu vs Fri sequences.
