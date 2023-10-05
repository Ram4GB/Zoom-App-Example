# Zoom app

## Requirement

```
nvm use 18
```

## Run develope

Before you get starting, please create `.env.goat`. Fill out your env key in file `env.goat`

<pre>
ZOOM_CLIENT_ID=
ZOOM_SDK_KEY=ZOOM_CLIENT_ID
ZOOM_CLIENT_SECRET=
ZOOM_SECRET_TOKEN=
</pre>

> How to get sdk key https://recallai.readme.io/reference/zoom-oauth-getting-started#1-creating-a-meeting-sdk-app

Run source

```
npm run dev:goat
```

Login your account to [Zoom](https://zoom.us/), create a meeting room and get `Meeting number` and `Password`

Fill your details to app
![alt](./images/CleanShot%202023-09-20%20at%2015.46.19@2x.png)
![alt](./images/CleanShot%202023-09-28%20at%2012.09.29@2x.png)

## Payload sample that send to create bot

<pre>
{
  "bot_name": "Bot Amplify Youtube",
  "real_time_media": {
    "rtmp_destination_url": "rtmp://a.rtmp.youtube.com/live2/gdts-yjep-tcfb-a3mg-18a5"
  },
  "meeting_url": "zoom.us/j/8561292498?pwd=YkJtN25JSElIQlRwM0hjek1ldFJsUT09",
  "recording_mode": "gallery_view_v2",
  "recording_mode_options": {
    "participant_video_when_screenshare": "beside",
    "start_recording_on": "call_join"
  }
}
</pre>

## Reference link

<pre>
https://recallai.readme.io/reference/zoom-new-bot-requirements
https://api.recall.ai/api/v2/zoom-oauth-apps/YOUR-RECALL-ZOOM-OAUTH-APP-ID/webhook
https://api.recall.ai/api/v2/zoom-oauth-apps/ec66acdb-7fed-49c9-a5e2-6cbf5bb092b1/webhook
https://zoom.us/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A8000&client_id=YOUR-CLIENT-ID-HERE
https://zoom.us/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A5173&client_id=jb4JtgARSHmXt39RHENsZg
https://localhost:5173/?code=fxH2h0UW23U4WJBpNcxQ2CQ5pDS32EDzg
https://github.com/zoom/meetingsdk-web
https://developers.zoom.us/docs/meeting-sdk/auth/
https://recallai.readme.io/reference/zoom-oauth-getting-started
https://recallai.readme.io/reference/zoom_meetings_to_credentials_list
https://recallai.readme.io/reference/zoom_oauth_credentials_create
https://marketplace.zoom.us/develop/apps/hSpZuXeATgGvEEZBGH17ow/feature
https://recallai.readme.io/reference/zoom_oauth_apps_create
https://stackoverflow.com/questions/69417788/vite-https-on-localhost
https://github.com/vitejs/vite-plugin-basic-ssl
https://zoom.us/meeting#/pmi/8561292498
https://devforum.zoom.us/t/gallery-view-button-not-displaying/58266/16
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
https://github.com/chaosprint/vite-plugin-cross-origin-isolation
</pre>

## Zoom support

https://developers.zoom.us/docs/meeting-sdk/web/browser-support/

## Why do we need Array Buffer

https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/#how-views-look-with-and-without-sharedarraybuffer

# Width/height zoom ratio

https://developers.zoom.us/docs/meeting-sdk/web/component-view/resizing/#sizing-components-at-init
