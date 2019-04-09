const IPFS_NODE = "https://ipfs.infura.io:5001";

export function addFile (file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${IPFS_NODE}/api/v0/add?pin=true`, {
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

export function pin (hash) {
  return fetch(`${IPFS_NODE}/api/v0/pin/add?arg=/ipfs/${hash}`, {
    method: "get"
  }).then(resp => {
    if(resp.ok)
      return resp.json();
    const err = resp.text();
    console.error(err);
    throw new Error(err);
  });
}
