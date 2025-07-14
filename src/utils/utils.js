export const ALBUM_TEMPLATE = {
  id: 0,
  artist: "",
  title: "",
  releaseDate: "",
  coverImages: [],
  tracklist: [],
  extra: {
    date: "",
    producer: "",
    format: "",
    trackCount: 0,
    duration: 0,
    trackDuration: [],
  },
  price: "",
  count: 0,
};

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

export function getTrackDuration(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export function getShorterString(string, maxLength) {
  return string.length > maxLength
    ? string.slice(0, maxLength) + "(...)"
    : string;
}

//NOTE: UPLOAD TO MOCKAPI CODE (used in nav as a button)
// const [count, setCount] = useState(0);
// const [showModal, setShowModal] = useState(false);
// const [errorCount, setErrorCount] = useState(0);
// const [errorAlbums, setErrorAlbums] = useState([]);
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

{
  /* </div>
        <div>
          <BaseButton
            btnLabel={"UPLOAD"}
            btnAction={postProducts}
            btnType={"success"}
          />
          {showModal && (
            <div className="w-screen h-screen bg-black/50 absolute top-0 left-0">
              <div className="bg-white rounded-2xl py-5 px-5 absolute top-1/2 left-1/2 text-black">
                <p>
                  Count: {count} / {products.length}
                </p>
                <p>Errors: {errorAlbums.length}</p>
              </div>
            </div>
          )} */
}

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
