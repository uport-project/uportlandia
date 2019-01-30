export function addFile (file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch("https://ipfs.infura.io:5001/api/v0/add", {
    method: "post",
    body: formData
  }).then(resp => {
    if(resp.ok)
      return resp.json();
    const err = resp.text();
    console.error(err);
    throw new Error(err);
  });
}
