# n8n nodes for Capslane

Official n8n community node for retrieving native or generated YouTube transcripts through Capslane.

## Operations

- Get a native transcript without starting generation.
- Use auto mode to generate only when captions are unavailable.
- Force generated transcription.
- Return plain text or timestamped segments.
- Wait for an asynchronous transcript job.

Create a server API key in Capslane, add the Capslane credential in n8n, then pass a YouTube URL to the node.

The source release and three importable workflow examples are available on GitHub. Installation from the n8n community node catalog remains pending until the npm package is published.

Documentation: [capslane.com/integrations/n8n](https://capslane.com/integrations/n8n)
