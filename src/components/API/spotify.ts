import axios from "axios";
import { Buffer } from "buffer";
import { Logger } from "../../utils";

const baseURL = "https://api.spotify.com";
const Cid = "164f32a969034dadbb1219ae0ecc8c2f";
const CSec = "5356efc476ca4b5385d4042bc9011027";

export const checkToken = () => {
  // check if an active token exist
  const activeToken = localStorage.getItem("access_token") ?? null;
  if (activeToken) return activeToken;
  return null;
};


export const getSpotifyToken = async ():Promise<string> => {
  // generate new token
  let token:string = '';
  const Cid = "164f32a969034dadbb1219ae0ecc8c2f"
  const CSec = "5356efc476ca4b5385d4042bc9011027"
    // generate new token
    const authOptions = {
      method:'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(Cid + ':' + CSec).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    const activeToken = localStorage.getItem('access_token')
    if(activeToken) {
      Logger('Token found ✅✅✅')
      return activeToken;
    } else {
      const response = await axios(authOptions)
      localStorage.setItem('access_token', response?.data?.access_token);
      Logger('New token generated 🚀🚀🚀');
      return response?.data?.access_token;
    }
}

export const getSpotifyNewRelease = async (token:string) => {
    const sotredNewRelease = localStorage.getItem('new_release');
    if(sotredNewRelease) {
      return JSON.parse(sotredNewRelease)
    } else {
          let authOptions = {
            method: 'get',
            maxBodyLength: Infinity,
              url: 'https://api.spotify.com/v1/browse/new-releases',
              headers: { 
                'Authorization': 'Bearer ' + token
              }
          }
        try{
          const nr = await axios(authOptions)
          if(nr.status === 200){
            const newRelease = nr.data.albums.items
            localStorage.setItem('new_release', JSON.stringify(newRelease));
            return newRelease;
          }
        }catch(error){
          console.log(error)
        }
    }

 
}


let searchedtracks: any[];
export const searchTracks = (search: string) => {
  let token;
  if(!search) return 
  if(checkToken()) {token = checkToken()}
  else {
    token = getSpotifyToken()
  };

  const options = {
    method: "get",
    maxBodyLength: Infinity,
    url: baseURL + "/v1/search?type=track&q=" + search,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  axios(options)
    .then((response) => {
      let sorted: any[] = [];
      let i = response?.data?.tracks?.items;

      i.map((item: any) => {
        const cover = item?.album?.images[1].url;
        const artists = item?.album?.artists
          .map((artist: any) => {
            return artist.name;
          })
          .join(", ");
        const trackname = item?.name;
        sorted = [...sorted, { cover, artists, trackname }];
      });

    searchedtracks = sorted;
  })
  .catch( (error) => {
    console.log(error.response.status)
    if(error.response.status === 401){
      getSpotifyToken();
      searchTracks(search);
    }
  })
  return searchedtracks;
};
