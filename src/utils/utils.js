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

export function buildPagination(total, limit) {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return { totalPages: totalPages, pages: pages };
}

//NOTE: UPLOAD TO MOCKAPI CODE (used in nav as a button)
// const [count, setCount] = useState(0);
// const [showModal, setShowModal] = useState(false);
// const [errorCount, setErrorCount] = useState(0);
// const [errorAlbums, setErrorAlbums] = useState([]);
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

//NOTE:function used to upload fetched album data stored in albums.json to mockAPI
// async function postProducts() {
//   setShowModal(true);
//   const failed = [];
//   let i = 0;
//   let errCount = 0;
//   let albums = errorAlbums.length > 0 ? errorAlbums : products;

//   for (const album of albums) {
//     try {
//       console.log("ALBUM: " + album);

//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(album),
//       });
//       if (!res.ok) throw new Error("Error al subir " + album.title);
//       await res.json();
//       i++;
//     } catch (err) {
//       console.error("ERROR: ", err);
//       errCount++;
//       failed.push(album);
//     }
//     setCount(i);
//     setErrorCount(errCount);
//     await delay(400);
//   }

//   setShowModal(false);
// }

//NOTE: App useEffect old code

// fetch("/data/albums.json")
//   .then((res) => {
//     if (!res.ok) throw new Error("Error al cargar el archivo");
//     return res.json();
//   })
//   .then((data) => {
//     console.log("Contenido del JSON:", data);
//     setProducts(data);
//     setIsLoading(false);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//     setHasErrors(true);
//     setIsLoading(false);
//   });
