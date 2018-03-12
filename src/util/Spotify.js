let uToken ='';
const clientId ='53872c73dfe44f38968919efac71ec37';
const uri = "http://localhost:3000/";

class Spotify ={
  getAccessToken(){
    if (uToken.length) {
      return uToken;
    }
    else {
      return fetch('https://accounts.spotify.com/authorize',{
          client_id: '5fe01282e94241328a84e7c5cc169164'
          response_type: 'token',
          redirct_uri: 'http://localhost:3000'
        }).then(response =>{
          return response.json();
        }).then(jsonResponse => {
          if (jsonResponse.access_token) {
            uToken = jsonResponse.access_token;
            //return uToken;
            window.location = 'https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${uri}';
          }})
        });
    }
  }

  search(term){
    return fetch('https://api.spotify.com/v1/search?type=track&q=${term}',{
      headers: {
        { Authorization: `Bearer ${uToken}` }
      }
    }).then(response =>{
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        )
        );
      }
    });
  }

  savePlaylist(name, trackURIs){
    let access_token = uToken;
    let header = {Authorization: `Bearer ${access_token}` };
    let userId ='';
    if (name.length == 0 || trackURIs.length == 0){
      return;
    }
    fetch('https://api.spotify.com/v1/me',{
      headers: {header}
    }).then(response =>{
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.ID) {
        userId = jsonResponse.ID;
        fetch('https://api.spotify.com//v1/users/${userId}/playlists/${name}/tracks',{headers: {header}, method: 'POST', body: JSON.stringify({id: '200'})}).then(response =>{
          if (response.ok){
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {console.log(networkError.message)}).then(jsonResponse => jsonResponse)
      }
    });
  }

};

export default Spotify;
