// src/lib/images/data-uri-to-buffer.ts
interface ExtendedBuffer extends Buffer {
  type: string;
  typeFull: string;
  charset: string;
}

export default function dataUriToBuffer(uri: string): ExtendedBuffer {
  if (!/^data:/i.test(uri)) {
    throw new TypeError(
      '`uri` does not appear to be a Data URI (must begin with "data:")',
    );
  }

  // Strip newlines
  uri = uri.replace(/\r?\n/g, '');

  // Split the URI into "metadata" and "data" parts
  const firstComma = uri.indexOf(',');
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError('malformed data: URI');
  }

  // Remove the "data:" scheme and parse the metadata
  const meta = uri.substring(5, firstComma).split(';');

  let charset = '';
  let base64 = false;
  const type = meta[0] || 'text/plain';
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === 'base64') {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf('charset=') === 0) {
        charset = meta[i].substring(8);
      }
    }
  }

  // Defaults to US-ASCII only if the type is not provided
  if (!meta[0] && !charset.length) {
    typeFull += ';charset=US-ASCII';
    charset = 'US-ASCII';
  }

  // Get the encoded data portion and decode URI-encoded chars
  const encoding = base64 ? 'base64' : 'ascii';
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding) as ExtendedBuffer; // Cast to ExtendedBuffer

  // Set `.type` and `.typeFull` properties to MIME type
  buffer.type = type;
  buffer.typeFull = typeFull;

  // Set the `.charset` property
  buffer.charset = charset;

  return buffer;
}
