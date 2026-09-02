# n8n node for Capslane

This n8n community node retrieves native or generated YouTube transcripts through Capslane. It can return timestamped segments or one plain text string and can wait for an asynchronous transcript job to finish.

## Installation

Install the package from the community nodes settings in n8n:

```text
n8n-nodes-capslane
```

## Credentials

1. Create an API key in the [Capslane dashboard](https://capslane.com/api-keys).
2. Create a Capslane credential in n8n.
3. Paste the API key into the credential.

Use a dedicated key for each n8n instance. Do not store the key in workflow fields.

## Node fields

- **YouTube URL or ID**: the public video to transcribe.
- **Mode**: selects how Capslane obtains the transcript.
- **Language**: optional preferred language code.
- **Plain Text**: returns one text string instead of timestamped segments.
- **Wait for Generated Transcript**: waits for an accepted transcript job before continuing.
- **Polling Interval**: number of seconds between job status requests.

## Modes

- **Auto**: use native captions and generate only when unavailable.
- **Native**: never start speech transcription.
- **Generate**: create a transcript from the video audio.

## Example workflows

The package includes workflows for:

- transcribing a video received through a webhook;
- transcribing a video from a spreadsheet row;
- checking the state of a generated transcript job.

## Output

The node returns the Capslane API response. Completed transcripts include `content`, `lang`, `availableLangs`, `source`, `cached` and `requestId`. An asynchronous request returns a `jobId`, status and request ID.

## Links

- [n8n integration guide](https://capslane.com/integrations/n8n)
- [API reference](https://capslane.com/api-reference)
- [Dashboard](https://capslane.com/dashboard)
- [GitHub](https://github.com/WebbaLuca/n8n-nodes-capslane)

## License

MIT
