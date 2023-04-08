/* 
configure body
set response Content-type json
*/

export async function json(req, res) {
  const buffers = [];

  for await (const chuck of req) {
    buffers.push(chuck);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-type', 'aplication/json');
}
