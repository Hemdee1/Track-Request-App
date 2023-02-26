import axios from "axios";
import { Buffer } from "buffer";
import { Logger } from "../../utils";
import { TrackInterface } from '../../pages/Clubpage/Clubpage';

const baseURL = "https://api.spotify.com";
const Cid = "164f32a969034dadbb1219ae0ecc8c2f";
const CSec = "5356efc476ca4b5385d4042bc9011027";


interface resetToken {
  reset?: boolean
}
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

    // COLLECT STORED TOKEN
    const activeToken = localStorage.getItem('access_token')
    if(activeToken) {
      Logger('Token found ✅✅✅')

      // SET OPTIONS TO TEST TOKEN
      const Defaultoptions = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.spotify.com/v1/search?type=track&q=h&limit=1",
        headers: {
          Authorization: "Bearer " + activeToken,
          "Content-Type": "application/json",
        },
      };

      // TEST IF TOKEN IS VALID
      try{
        const tester = await axios(Defaultoptions);
      
      return activeToken;
      } catch(err:any) {
        console.log({tester:err})
        console.log({tester:err.response.data.error.message})
        if((err?.request?.status === 401) && (err.response.data.error.message == 'The access token expired')) { //THIS MEANS TOKEN IS EXPIRED
          const reIssuedToken = await axios(authOptions)
          localStorage.setItem('access_token', reIssuedToken?.data?.access_token);
          return reIssuedToken?.data?.access_token;
        }
      }
    } else {
      const response = await axios(authOptions)
      localStorage.setItem('access_token', response?.data?.access_token);
      Logger('New token generated 🚀🚀🚀');
      return response?.data?.access_token;
    }

    return ''
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
          } else {
            getSpotifyToken()
          }
        }catch(error){
          console.log(error)
        }
    }
}


export const searchSpotifyTracks = async (search: string) => {
  const token = await getSpotifyToken();
  console.log({searching:token});
  if(!search) return 

  const options = {
    method: "get",
    maxBodyLength: Infinity,
    url: baseURL + "/v1/search?type=track&q=" + search,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  
 try{
  const response = await axios(options);
  console.log({myError: response.status})
  let sorted: TrackInterface[] = [];
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
  return sorted;

 } catch(error:any){
  console.log(error)
  Logger({myError: error?.response?.status})
 }
};
