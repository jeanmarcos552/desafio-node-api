import { Writable, Readable } from 'node:stream';

class ReadStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${i}`);
        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(+chunk.toString() * 10);
    callback();
  }
}
new ReadStream().pipe(new MultiplyStream());
