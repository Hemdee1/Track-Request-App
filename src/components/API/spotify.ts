import axios from 'axios';
import { Buffer } from 'buffer';
import { Logger } from '../../utils';

const baseURL = "https://api.spotify.com"
const Cid = "164f32a969034dadbb1219ae0ecc8c2f"
const CSec = "5356efc476ca4b5385d4042bc9011027"

export const checkToken = () => {
  // check if an active token exist
  const activeToken = localStorage.getItem('access_token') ?? null
  if(activeToken) return activeToken;
  return null
}

export const generateToken = () => {
  // generate new token
  let token
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
  
  axios(authOptions)
  .then((response) => {
    Logger('calling spotify api for Auth code...')
    token = response?.data?.access_token;
    localStorage.setItem('access_token', token);
    Logger('New token generated ✅✅✅')
  })
  .catch((error) => console.log(error))
  return token
}


export const getNewRelease = () => {
  Logger('Starting Local storage check... ')
  try{
    const sotredNewRelease = localStorage.getItem('new_release') ?? null;
    if(sotredNewRelease) return JSON.parse(sotredNewRelease);
  }catch(err) {
    Logger({checkError: err})
  }
  Logger('Local storage check passed ✅')

  let storedToken = localStorage.getItem('access_token');
  let accessToken, newRelease;
  if(storedToken) {
    accessToken = storedToken;
  }
  let authOptions = {
    method: 'get',
    maxBodyLength: Infinity,
      url: 'https://api.spotify.com/v1/browse/new-releases',
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
  }

  axios(authOptions)
  .then( (response)=> {
    Logger('getting new release from spotify...')
    Logger(response?.data?.albums?.items)
    newRelease = JSON.stringify(response?.data?.albums?.items);
    localStorage.setItem('new_release', newRelease);
  })
  .catch( (error) =>{
    if(error.status === "401") {
      Logger('Token expired...')
      Logger('Generating new token...')
      generateToken();
      getNewRelease();
      return
    }
    console.log(error)
  })
  return newRelease;
}

let searchedtracks:any[];
export const searchTracks = (search: string) => {
  let token;
  if(!search) return 
  if(checkToken()) {token = checkToken()}
  else {
    token = generateToken()
  };

  const options = {
    method: 'get',
    maxBodyLength: Infinity,
    url: baseURL+'/v1/search?type=track&q='+search,
    headers : {
      'Authorization' : 'Bearer '+token,
      'Content-Type': 'application/json'
    },
  }

  axios(options)
  .then( (response) => {
    let sorted:any[] = [];
    let i = response?.data?.tracks?.items;

    i.map( (item:any) => {
      const cover = item?.album?.images[1].url;
      const artists = item?.album?.artists.map((artist:any) => {
         return artist.name
      }).join(', ');
      const trackname = item?.name;
      sorted = [...sorted, {cover, artists, trackname}]
    })

    searchedtracks = sorted;

  })
  .catch( (error) => {
    console.log(error.response.status)
    if(error.response.status === 401){
      generateToken();
      searchTracks(search);
    }
  })
  return searchedtracks;
}