export function getFront(imgs) {
  if (imgs) {
    const img = imgs.find(
      (img) => img.url && img.types.find((t) => t === "Front")
    );
    return img ? img.url : null;
  } else return null;
}

export async function getAlbumById(id) {
  fetch("/data/albums.json")
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar el archivo");
      return res.json();
    })
    .then((data) => {
      console.log("Contenido del JSON:", data);
      return data.find((album) => album.id === id);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

export function getTotal(cart) {
  let total = 0;
  if (cart)
    cart.forEach((p) => {
      total += +p.item.price * p.count;
    });
  return total.toFixed(2);
}
